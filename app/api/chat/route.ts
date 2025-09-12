import { NextResponse } from 'next/server';

import { ChatMessage, generate } from '@/lib/ai/service';

interface ClientBody {
  prompt?: string;
  messages?: ChatMessage[];
  temperature?: number;
  maxOutputTokens?: number;
}

export async function POST(req: Request) {
  let body: ClientBody = {};

  try {
    body = (await req.json()) as ClientBody;
  } catch {
    // ignore malformed JSON; handled below
  }

  try {
    const messages: ChatMessage[] = body.messages?.length
      ? body.messages
      : body.prompt
        ? [{ role: 'user', content: body.prompt }]
        : [{ role: 'user', content: 'Hello' }];

    const result = await generate(messages, {
      temperature: body.temperature,
      maxOutputTokens: body.maxOutputTokens,
    });

    return NextResponse.json({ text: result.text });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
