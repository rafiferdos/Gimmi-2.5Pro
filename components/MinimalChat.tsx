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
      <div className='space-y-6'>
         {/* Header */}
         <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-foreground'>Gimmi</h1>
            <p className='text-default-500 text-sm'>Your AI assistant</p>
         </div>

         {/* Quick Actions */}
         {messages.length === 0 && (
            <div className='flex flex-wrap gap-2 justify-center'>
               {quickActions.map((action) => (
                  <Chip
                     key={action}
                     variant='flat'
                     size='sm'
                     className='cursor-pointer hover:scale-105 transition-transform'
                     onClick={() => setInput(action)}
                  >
                     {action}
                  </Chip>
               ))}
            </div>
         )}

         {/* Chat Container */}
         <Card className='w-full'>
            <CardHeader className='pb-3'>
               <div className='flex justify-between items-center w-full'>
                  <span className='text-sm text-default-500'>Conversation</span>
                  {messages.length > 0 && (
                     <Button
                        size='sm'
                        variant='light'
                        onPress={() => setMessages([])}
                     >
                        Clear
                     </Button>
                  )}
               </div>
            </CardHeader>
            <Divider />
            <CardBody className='p-0'>
               <div className='flex flex-col h-96'>
                  {/* Messages */}
                  <ScrollShadow className='flex-1 p-4'>
                     <div ref={scrollRef} className='space-y-4'>
                        {messages.length === 0 ?
                           <div className='text-center text-default-400 py-12'>
                              <p>Start a conversation...</p>
                           </div>
                        :  messages.map((message) => (
                              <div
                                 key={message.id}
                                 className={`flex ${
                                    message.role === "user" ?
                                       "justify-end"
                                    :  "justify-start"
                                 }`}
                              >
                                 <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                       message.role === "user" ?
                                          "bg-primary text-primary-foreground"
                                       :  "bg-default-100 text-foreground"
                                    }`}
                                 >
                                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                                       {message.content}
                                    </p>
                                 </div>
                              </div>
                           ))
                        }
                        {isLoading && (
                           <div className='flex justify-start'>
                              <div className='bg-default-100 p-3 rounded-lg flex items-center gap-2'>
                                 <Spinner size='sm' />
                                 <span className='text-sm text-default-500'>
                                    Thinking...
                                 </span>
                              </div>
                           </div>
                        )}
                     </div>
                  </ScrollShadow>

                  {/* Input */}
                  <div className='p-4 border-t border-default-200'>
                     <div className='flex gap-2'>
                        <Input
                           value={input}
                           onValueChange={setInput}
                           onKeyDown={handleKeyPress}
                           placeholder='Type your message...'
                           variant='flat'
                           className='flex-1'
                           isDisabled={isLoading}
                        />
                        <Button
                           color='primary'
                           onPress={handleSend}
                           isDisabled={!input.trim() || isLoading}
                           isLoading={isLoading}
                        >
                           Send
                        </Button>
                     </div>
                  </div>
               </div>
            </CardBody>
         </Card>
      </div>
   );
}
