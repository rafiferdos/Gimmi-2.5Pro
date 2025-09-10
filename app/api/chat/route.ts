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
      const providerBody = {
         // Many provider endpoints accept prompts as "prompt" or "input". For Google's newer API, it's often:
         // { "instances": [{"content": "..."}] } or a generate request; we'll attempt a reasonable shape.
         // We'll include the simple text in a common field and let the provider reject if incorrect.
         input: body.prompt || "",
         // optional: other generation params
         maxOutputTokens: 512,
         temperature: 0.7,
      };

      const res = await fetch(apiUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
         },
         body: JSON.stringify(providerBody),
      });

      const contentType = res.headers.get("content-type") || "";
      const text = await res.text();

      // Try to parse JSON and extract common fields
      if (contentType.includes("application/json")) {
         const json = JSON.parse(text);
         // Google responses can be in different shapes; try common paths.
         const possibleText =
            json?.candidates
               ?.map((c: any) => c?.output ?? c?.content)
               ?.join("\n") ||
            json?.output?.[0]?.content ||
            json?.outputs?.map((o: any) => o?.content)?.join("\n") ||
            json?.generated_text ||
            json?.data ||
            null;

         if (possibleText) return NextResponse.json({ text: possibleText });
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
