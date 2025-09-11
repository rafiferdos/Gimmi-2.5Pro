"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useRef, useState } from "react";

interface ChatMessage {
   role: "user" | "assistant" | "system";
   text: string;
   id: string;
}

export default function ChatPanel() {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);
   const listRef = useRef<HTMLDivElement | null>(null);

   const scrollToBottom = useCallback(() => {
      requestAnimationFrame(() => {
         if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
         }
      });
   }, []);

   async function send() {
      if (!input.trim() || loading) return;
      const userText = input.trim();
      const userMsg: ChatMessage = {
         role: "user",
         text: userText,
         id: crypto.randomUUID(),
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);
      scrollToBottom();

      try {
         const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messages.concat(userMsg) }),
         });
         let data: any = null;
         try {
            data = await res.json();
         } catch {
            // fallback to text if not json
            const fallbackText = await res.text();
            data = { text: fallbackText };
         }
         const text: string =
            data?.text || data?.output || JSON.stringify(data);
         setMessages((m) => [
            ...m,
            {
               role: "assistant",
               text: text,
               id: crypto.randomUUID(),
            },
         ]);
      } catch (err: any) {
         setMessages((m) => [
            ...m,
            {
               role: "assistant",
               text: `⚠️ Error: ${err?.message || String(err)}`,
               id: crypto.randomUUID(),
            },
         ]);
      } finally {
         setLoading(false);
         scrollToBottom();
      }
   }

   const quickPrompts = [
      "Summarize this paragraph",
      "Brainstorm startup ideas",
      "Explain quantum tunneling",
      "Create a study plan",
   ];

   return (
      <Card className='neon-panel mt-12 border-none shadow-none'>
         <CardContent className='p-0'>
            <div className='flex flex-col h-[480px]'>
               <div className='px-5 pt-4 pb-2 flex flex-wrap gap-2'>
                  {quickPrompts.map((p) => (
                     <Badge
                        key={p}
                        variant='secondary'
                        className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        onClick={() => setInput(p)}
                     >
                        {p}
                     </Badge>
                  ))}
               </div>
               <ScrollArea className='flex-1 px-5'>
                  <div
                     ref={listRef}
                     className='space-y-4 py-2 overflow-y-auto h-full pr-1 custom-scroll'
                  >
                     {messages.length === 0 && (
                        <div className='text-center mt-12 opacity-60 text-sm tracking-wide animate-fade-in'>
                           Start the conversation ✨
                        </div>
                     )}
                     {messages.map((m) => (
                        <MessageBubble key={m.id} message={m} />
                     ))}
                     {loading && (
                        <div className='flex items-center gap-2 text-xs text-primary/80 animate-pulse'>
                           <Spinner size='sm' color='primary' /> Generating...
                        </div>
                     )}
                  </div>
               </ScrollArea>
               <div className='p-4 border-t border-white/5 neon-divider'>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        send();
                     }}
                     className='flex gap-2 items-end'
                  >
                     <Input
                        aria-label='Chat input'
                        className='flex-1 neon-input'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Type a message...'
                        onKeyDown={(e) => {
                           if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              send();
                           }
                        }}
                     />
                     <Button
                        disabled={loading || !input.trim()}
                        variant='secondary'
                        className='send-btn-neon'
                        onClick={send}
                     >
                        {loading ? "..." : "Send"}
                     </Button>
                  </form>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}

function MessageBubble({ message }: { message: ChatMessage }) {
   const isUser = message.role === "user";
   return (
      <div
         className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      >
         <div
            className={`message-bubble ${isUser ? "bubble-user" : "bubble-assistant"} animate-message-in`}
         >
            {isUser ? "🧑‍💻" : "🤖"} <span>{message.text}</span>
         </div>
      </div>
   );
}
