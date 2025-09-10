import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = process.env.GEMINI_API_URL;

  if (!apiKey || !apiUrl) {
    return NextResponse.json({ error: "Server not configured. Set GEMINI_API_KEY and GEMINI_API_URL." }, { status: 500 });
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.text();
    return new NextResponse(data, { status: res.status, headers: { "Content-Type": res.headers.get("content-type") || "application/json" } });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
