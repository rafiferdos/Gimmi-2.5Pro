/**
 * AI Service abstraction: builds provider request payloads and parses responses.
 * Currently supports Google Generative Language (Gemini) generateContent endpoint.
 * Falls back to a mock response if provider unreachable and MOCK_AI=1.
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GenerateOptions {
  temperature?: number;
  maxOutputTokens?: number;
  model?: string; // optionally override full endpoint url model part
}

export interface GenerateResult {
  text: string;
  raw?: any;
}

function buildGoogleBody(messages: ChatMessage[], opts: GenerateOptions) {
  const userParts = messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));

  // Prepend system message as a synthetic instruction if present
  const systemMsg = messages.find(m => m.role === 'system');
  if (systemMsg) {
    userParts.unshift({ role: 'user', parts: [{ text: `System instruction: ${systemMsg.content}` }] });
  }

  return {
    contents: userParts,
    generationConfig: {
      temperature: opts.temperature ?? 0.7,
      maxOutputTokens: opts.maxOutputTokens ?? 512,
    },
  };
}

function extractGoogleText(json: any): string | null {
  if (!json) return null;
  if (Array.isArray(json.candidates)) {
    const parts: string[] = [];
    for (const c of json.candidates) {
      const p = c?.content?.parts;
      if (Array.isArray(p)) parts.push(p.map((x: any) => x?.text).filter(Boolean).join(''));
    }
    if (parts.length) return parts.join('\n\n');
  }
  if (json.generated_text) return json.generated_text;
  return null;
}

export async function generateWithGoogle(
  endpointUrl: string,
  apiKey: string,
  messages: ChatMessage[],
  opts: GenerateOptions = {}
): Promise<GenerateResult> {
  const body = buildGoogleBody(messages, opts);
  const url = new URL(endpointUrl);
  if (apiKey.startsWith('AIza')) url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(apiKey.startsWith('AIza') ? {} : { Authorization: `Bearer ${apiKey}` }) },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: any;
  try { json = JSON.parse(text); } catch { /* ignore */ }
  if (!res.ok) {
    throw new Error(json?.error?.message || `Upstream error ${res.status}`);
  }
  const extracted = extractGoogleText(json) || text;
  return { text: extracted, raw: json };
}

export async function generate(
  messages: ChatMessage[],
  opts: GenerateOptions = {}
): Promise<GenerateResult> {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const endpoint = process.env.GEMINI_API_URL || '';
  if (!apiKey || !endpoint) {
    if (process.env.MOCK_AI === '1') {
      return {
        text: `MOCK RESPONSE: ${messages[messages.length - 1]?.content || ''}`,
      };
    }
    throw new Error('AI provider not configured. Set GEMINI_API_KEY and GEMINI_API_URL.');
  }
  if (endpoint.includes('generativelanguage.googleapis.com')) {
    return generateWithGoogle(endpoint, apiKey, messages, opts);
  }
  throw new Error('Unsupported provider endpoint.');
}
