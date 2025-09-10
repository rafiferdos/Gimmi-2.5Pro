import { NextResponse } from "next/server";

type ClientBody = {
   prompt?: string;
   // future: messages, temperature, etc.
};

export async function POST(req: Request) {
   const body = (await req.json().catch(() => ({}))) as ClientBody;

   const apiKey = process.env.GEMINI_API_KEY;
   let apiUrl = process.env.GEMINI_API_URL;
   const project = process.env.GEMINI_PROJECT_NUMBER;

   if (!apiKey || !apiUrl) {
      return NextResponse.json(
         {
            error: "Server not configured. Set GEMINI_API_KEY and GEMINI_API_URL.",
         },
         { status: 500 }
      );
   }

   // If using Google Generative API, sometimes the URL expects a parent path with project
   if (project && apiUrl.includes("generativelanguage.googleapis.com")) {
      // ensure parent param is present if the url looks like a generate endpoint
      // many users use: https://generativelanguage.googleapis.com/v1beta/models/MODEL:generateText
      // Google also supports POST to v1beta2/{parent=projects/*/locations/*}/models/*:generate
      // We'll keep the provided url but include project in body where appropriate.
   }

   try {
      // Build provider-specific payload for Google Generative Language / Gemini
      // Use the `prompt.text` shape which is commonly accepted by Google's generate endpoints.
      // Build provider-specific payload for Google Generative Language / Gemini generateContent endpoint
      // Endpoint: POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=API_KEY
      // Required shape: { contents: [ { role: "user", parts: [{ text: "..." }] } ], generationConfig: { ... } }
      const generationConfig = {
         maxOutputTokens:
            typeof (body as any).maxOutputTokens === "number"
               ? (body as any).maxOutputTokens
               : 512,
         temperature:
            typeof (body as any).temperature === "number"
               ? (body as any).temperature
               : 0.7,
      };
      const providerBody: Record<string, any> = {
         contents: [
            {
               role: "user",
               parts: [
                  {
                     text: body.prompt || "",
                  },
               ],
            },
         ],
         generationConfig,
      };

      // For Google Generative Language endpoints, API keys are passed as a query param (key=...) while
      // OAuth2 access tokens are sent in the Authorization header. Detect common cases and prefer
      // using the API key as a query parameter when the hostname matches generativelanguage.googleapis.com
      let fetchUrl = apiUrl;
      const urlObj = new URL(apiUrl);
      const isGoogleGen = urlObj.hostname.includes(
         "generativelanguage.googleapis.com"
      );

      const headers: Record<string, string> = {
         "Content-Type": "application/json",
      };

      if (isGoogleGen && apiKey && apiKey.startsWith("AIza")) {
         // API keys for Google services often start with 'AIza'. Append as query param.
         urlObj.searchParams.set("key", apiKey);
         fetchUrl = urlObj.toString();
      } else if (apiKey) {
         // fallback: assume apiKey is an OAuth2 Bearer token
         headers["Authorization"] = `Bearer ${apiKey}`;
      }

      const res = await fetch(fetchUrl, {
         method: "POST",
         headers,
         body: JSON.stringify(providerBody),
      });

      const contentType = res.headers.get("content-type") || "";
      const text = await res.text();

      // Try to parse JSON and extract common fields
      if (contentType.includes("application/json")) {
         const json = JSON.parse(text);
         // If upstream returned UNAUTHENTICATED or 401, include a helpful message for developers
         if (res.status === 401 || res.status === 403) {
            return NextResponse.json(
               {
                  error: json,
                  hint: "Authentication failed. For Google endpoints, either provide a valid OAuth2 access token in GEMINI_API_KEY or a restricted API key (preferably passed via .env.local). If you posted a key publicly, rotate/revoke it immediately.",
               },
               { status: res.status }
            );
         }
         // Google responses can be in different shapes; try common paths.
            // Extract text from Gemini candidates
            const extractFromCandidate = (c: any): string | null => {
               if (!c) return null;
               if (c.output && typeof c.output === "string") return c.output;
               if (c.content?.parts?.length) {
                  return c.content.parts
                     .map((p: any) => p?.text)
                     .filter(Boolean)
                     .join("");
               }
               if (c.content?.text) return c.content.text;
               if (typeof c.content === "string") return c.content;
               return null;
            };

            let extracted: string | null = null;
            if (Array.isArray(json?.candidates)) {
               const parts = json.candidates
                  .map((c: any) => extractFromCandidate(c))
                  .filter(Boolean);
               if (parts.length) extracted = parts.join("\n\n");
            }
            if (!extracted && json?.generated_text) extracted = json.generated_text;
            if (!extracted && json?.data) extracted = String(json.data);

            if (extracted) return NextResponse.json({ text: extracted });
            return NextResponse.json({ raw: json });
      }

      // Fallback: return plain text
      return NextResponse.json({ text });
   } catch (err: any) {
      return NextResponse.json(
         { error: err?.message || String(err) },
         { status: 500 }
      );
   }
}
