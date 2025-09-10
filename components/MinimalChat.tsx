"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Spinner } from "@heroui/spinner";
import { useEffect, useRef, useState } from "react";

interface Message {
   id: string;
   role: "user" | "assistant";
   content: string;
   timestamp: Date;
}

export function MinimalChat() {
   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const scrollRef = useRef<HTMLDivElement>(null);

   const quickActions = [
      "Explain this concept",
      "Write a summary",
      "Generate ideas",
      "Help me learn",
   ];

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages]);

   const handleSend = async () => {
      if (!input.trim() || isLoading) return;

      const userMessage: Message = {
         id: crypto.randomUUID(),
         role: "user",
         content: input.trim(),
         timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
         const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               messages: [...messages, userMessage].map((m) => ({
                  role: m.role,
                  content: m.content,
               })),
            }),
         });

         let data: any;
         try {
            data = await response.json();
         } catch {
            data = { text: await response.text() };
         }

         const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
               data?.text ||
               data?.content ||
               "Sorry, I couldn't process that request.",
            timestamp: new Date(),
         };

         setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
         const errorMessage: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, there was an error processing your request.",
            timestamp: new Date(),
         };
         setMessages((prev) => [...prev, errorMessage]);
      } finally {
         setIsLoading(false);
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSend();
      }
   };

   return (
      <div className='space-y-8'>
         {/* Header */}
         <div className='text-center space-y-3'>
            <h1 className='text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
               Gimmi
            </h1>
            <p className='text-default-500 text-base font-medium'>Your intelligent AI companion</p>
         </div>

         {/* Quick Actions */}
         {messages.length === 0 && (
            <div className='flex flex-wrap gap-3 justify-center'>
               {quickActions.map((action) => (
                  <Chip
                     key={action}
                     variant='shadow'
                     size='md'
                     color='secondary'
                     className='cursor-pointer hover:scale-110 transition-all duration-300 font-medium px-4 py-2'
                     onClick={() => setInput(action)}
                  >
                     ✨ {action}
                  </Chip>
               ))}
            </div>
         )}

         {/* Chat Container */}
         <Card className='w-full shadow-2xl border border-primary/20'>
            <CardHeader className='pb-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10'>
               <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-2'>
                     <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                     <span className='text-base font-semibold text-foreground'>Live Conversation</span>
                  </div>
                  {messages.length > 0 && (
                     <Button
                        size='sm'
                        variant='flat'
                        color='danger'
                        onPress={() => setMessages([])}
                        className='font-medium'
                     >
                        🗑️ Clear
                     </Button>
                  )}
               </div>
            </CardHeader>
            <Divider className='bg-gradient-to-r from-transparent via-primary/30 to-transparent' />
            <CardBody className='p-0'>
               <div className='flex flex-col h-[600px]'>
                  {/* Messages */}
                  <ScrollShadow className='flex-1 p-6 custom-scroll'>
                     <div ref={scrollRef} className='space-y-6'>
                        {messages.length === 0 ? (
                           <div className='text-center text-default-400 py-20'>
                              <div className='text-6xl mb-4'>💭</div>
                              <p className='text-lg font-medium'>Ready to chat? Start the conversation...</p>
                           </div>
                        ) : (
                           messages.map((message) => (
                              <div
                                 key={message.id}
                                 className={`flex ${
                                    message.role === "user" ? "justify-end" : "justify-start"
                                 } animate-in slide-in-from-bottom-2 duration-300`}
                              >
                                 <div
                                    className={`max-w-[85%] p-4 rounded-2xl shadow-lg font-medium text-base leading-relaxed ${
                                       message.role === "user"
                                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/20"
                                          : "bg-gradient-to-r from-default-100 to-default-50 text-foreground border border-default-200"
                                    }`}
                                 >
                                    <div className='flex items-start gap-2'>
                                       <span className='text-lg'>
                                          {message.role === "user" ? "🧑‍💻" : "🤖"}
                                       </span>
                                       <p className='whitespace-pre-wrap flex-1'>
                                          {message.content}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))
                        )}
                        {isLoading && (
                           <div className='flex justify-start animate-in slide-in-from-left-2 duration-300'>
                              <div className='bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 p-4 rounded-2xl flex items-center gap-3 shadow-lg'>
                                 <Spinner size='md' color='secondary' />
                                 <span className='text-base font-medium text-secondary'>
                                    🧠 Thinking deeply...
                                 </span>
                              </div>
                           </div>
                        )}
                     </div>
                  </ScrollShadow>

                  {/* Input */}
                  <div className='p-6 border-t border-default-200 bg-gradient-to-r from-background to-default-50/30'>
                     <div className='flex gap-3'>
                        <Input
                           value={input}
                           onValueChange={setInput}
                           onKeyDown={handleKeyPress}
                           placeholder='✍️ Type your message here...'
                           variant='bordered'
                           size='lg'
                           className='flex-1 font-medium'
                           classNames={{
                              input: "text-base",
                              inputWrapper: "border-primary/30 hover:border-primary/60 focus-within:border-primary group-data-[focus=true]:border-primary shadow-lg"
                           }}
                           isDisabled={isLoading}
                           startContent={<span className='text-primary/60'>💬</span>}
                        />
                        <Button
                           color='primary'
                           size='lg'
                           variant='shadow'
                           onPress={handleSend}
                           isDisabled={!input.trim() || isLoading}
                           isLoading={isLoading}
                           className='px-8 font-semibold text-base'
                        >
                           {isLoading ? "⏳" : "🚀"} Send
                        </Button>
                     </div>
                  </div>
               </div>
            </CardBody>
         </Card>
      </div>
   );
}
