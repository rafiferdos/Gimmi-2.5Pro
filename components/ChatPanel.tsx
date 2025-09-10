"use client";

import { useState } from "react";

export default function ChatPanel() {
   const [messages, setMessages] = useState<{ role: string; text: string }[]>(
      []
   );
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   async function send() {
      if (!input.trim()) return;
      const userText = input.trim();
      setMessages((m) => [...m, { role: "user", text: userText }]);
      setInput("");
      setLoading(true);

      try {
         const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userText }),
         });

         const text = await res.text();
         setMessages((m) => [...m, { role: "assistant", text }]);
      } catch (err: any) {
         setMessages((m) => [
            ...m,
            {
               role: "assistant",
               text: `Error: ${err?.message || String(err)}`,
            },
         ]);
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className='max-w-2xl mx-auto mt-6'>
         <div className='space-y-3'>
            {messages.map((m, i) => (
               <div
                  key={i}
                  className={m.role === "user" ? "text-right" : "text-left"}
               >
                  <div
                     className={`inline-block px-3 py-2 rounded-md ${m.role === "user" ? "bg-primary/20" : "bg-white/6"}`}
                  >
                     <pre className='whitespace-pre-wrap'>{m.text}</pre>
                  </div>
               </div>
            ))}
         </div>

         <div className='mt-4 flex gap-2'>
            <input
               className='flex-1 rounded-md p-2'
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />
            <button
               disabled={loading}
               onClick={send}
               className='px-4 py-2 rounded-md bg-primary text-white'
            >
               {loading ? "Sending..." : "Send"}
            </button>
         </div>
      </div>
   );
}
