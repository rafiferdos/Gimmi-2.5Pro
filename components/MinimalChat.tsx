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
   isStreaming?: boolean;
}

// Enhanced markdown renderer component
function MarkdownRenderer({
   content,
   isStreaming = false,
}: {
   content: string;
   isStreaming?: boolean;
}) {
   const [displayedContent, setDisplayedContent] = useState("");

   useEffect(() => {
      if (isStreaming) {
         let index = 0;
         const timer = setInterval(() => {
            if (index < content.length) {
               setDisplayedContent(content.slice(0, index + 1));
               index++;
            } else {
               clearInterval(timer);
            }
         }, 20); // Smooth typing speed
         return () => clearInterval(timer);
      } else {
         setDisplayedContent(content);
      }
   }, [content, isStreaming]);

   const renderContent = (text: string) => {
      // Split by lines first
      const lines = text.split("\n");
      const elements: JSX.Element[] = [];
      let listItems: string[] = [];
      let inList = false;

      lines.forEach((line, index) => {
         const trimmedLine = line.trim();

         // Handle bullet points
         if (trimmedLine.match(/^[\*\-\+]\s/)) {
            const listContent = trimmedLine.replace(/^[\*\-\+]\s/, "");
            listItems.push(listContent);
            inList = true;
         } else if (inList && trimmedLine === "") {
            // End of list, render it
            if (listItems.length > 0) {
               elements.push(
                  <div key={`list-${elements.length}`} className='my-4'>
                     <ul className='space-y-2'>
                        {listItems.map((item, i) => (
                           <li
                              key={i}
                              className='flex items-start gap-3 p-3 rounded-lg bg-primary/5 border-l-4 border-primary/30'
                           >
                              <span className='text-primary font-bold mt-0.5'>
                                 •
                              </span>
                              <span
                                 className='flex-1 leading-relaxed'
                                 dangerouslySetInnerHTML={{
                                    __html: formatInlineMarkdown(item),
                                 }}
                              />
                           </li>
                        ))}
                     </ul>
                  </div>
               );
            }
            listItems = [];
            inList = false;
         } else if (!inList && trimmedLine) {
            // Regular paragraph
            elements.push(
               <p
                  key={`p-${elements.length}`}
                  className='mb-3 leading-relaxed'
                  dangerouslySetInnerHTML={{
                     __html: formatInlineMarkdown(trimmedLine),
                  }}
               />
            );
         } else if (!inList && trimmedLine === "") {
            elements.push(
               <div key={`br-${elements.length}`} className='my-2' />
            );
         }
      });

      // Handle remaining list items
      if (inList && listItems.length > 0) {
         elements.push(
            <div key={`list-final`} className='my-4'>
               <ul className='space-y-2'>
                  {listItems.map((item, i) => (
                     <li
                        key={i}
                        className='flex items-start gap-3 p-3 rounded-lg bg-primary/5 border-l-4 border-primary/30'
                     >
                        <span className='text-primary font-bold mt-0.5'>•</span>
                        <span
                           className='flex-1 leading-relaxed'
                           dangerouslySetInnerHTML={{
                              __html: formatInlineMarkdown(item),
                           }}
                        />
                     </li>
                  ))}
               </ul>
            </div>
         );
      }

      return elements;
   };

   const formatInlineMarkdown = (text: string) => {
      return text
         .replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="font-bold text-primary">$1</strong>'
         )
         .replace(/\*(.*?)\*/g, '<em class="italic text-secondary">$1</em>')
         .replace(
            /`(.*?)`/g,
            '<code class="px-2 py-1 bg-default-200 rounded text-sm font-mono">$1</code>'
         );
   };

   return (
      <div className='prose prose-sm max-w-none'>
         {renderContent(displayedContent)}
         {isStreaming && <span className='animate-pulse text-primary'>|</span>}
      </div>
   );
}

export function MinimalChat() {
   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
      null
   );
   const scrollRef = useRef<HTMLDivElement>(null);

   const quickActions = [
      "Explain quantum entanglement",
      "Write a summary",
      "Generate creative ideas",
      "Help me understand concepts",
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

         const assistantMessageId = crypto.randomUUID();
         const assistantContent =
            data?.text ||
            data?.content ||
            "Sorry, I couldn't process that request.";

         setStreamingMessageId(assistantMessageId);

         const assistantMessage: Message = {
            id: assistantMessageId,
            role: "assistant",
            content: assistantContent,
            timestamp: new Date(),
            isStreaming: true,
         };

         setMessages((prev) => [...prev, assistantMessage]);

         // Simulate streaming complete after animation
         setTimeout(
            () => {
               setStreamingMessageId(null);
               setMessages((prev) =>
                  prev.map((msg) =>
                     msg.id === assistantMessageId ?
                        { ...msg, isStreaming: false }
                     :  msg
                  )
               );
            },
            assistantContent.length * 20 + 1000
         );
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
      <div className='h-screen flex flex-col'>
         {/* Header */}
         <div className='text-center py-8 space-y-3'>
            <h1 className='text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
               Gimmi
            </h1>
            <p className='text-default-500 text-base font-medium'>
               Your intelligent AI companion
            </p>
         </div>

         {/* Chat Container - Takes remaining height */}
         <Card className='flex-1 mx-4 mb-4 shadow-2xl border border-primary/20 overflow-hidden'>
            <CardHeader className='pb-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10 shrink-0'>
               <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-2'>
                     <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                     <span className='text-base font-semibold text-foreground'>
                        Live Conversation
                     </span>
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
            <CardBody className='p-0 flex flex-col flex-1 overflow-hidden'>
               {/* Messages Area - Flexible height */}
               <ScrollShadow className='flex-1 p-6 custom-scroll overflow-y-auto'>
                  <div ref={scrollRef} className='space-y-6 min-h-0'>
                     {messages.length === 0 ?
                        <div className='text-center text-default-400 py-20'>
                           <div className='text-6xl mb-4'>💭</div>
                           <p className='text-lg font-medium'>
                              Ready to chat? Start the conversation...
                           </p>
                           {/* Quick Actions moved here */}
                           <div className='flex flex-wrap gap-3 justify-center mt-8'>
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
                        </div>
                     :  messages.map((message) => (
                           <div
                              key={message.id}
                              className={`flex ${
                                 message.role === "user" ?
                                    "justify-end"
                                 :  "justify-start"
                              } animate-in slide-in-from-bottom-2 duration-300`}
                           >
                              <div
                                 className={`max-w-[90%] p-5 rounded-2xl shadow-lg font-medium text-base leading-relaxed ${
                                    message.role === "user" ?
                                       "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/20"
                                    :  "bg-gradient-to-r from-default-100 to-default-50 text-foreground border border-default-200"
                                 }`}
                              >
                                 <div className='flex items-start gap-3'>
                                    <span className='text-xl mt-1 shrink-0'>
                                       {message.role === "user" ? "🧑‍💻" : "🤖"}
                                    </span>
                                    <div className='flex-1 min-w-0'>
                                       {message.role === "assistant" ?
                                          <MarkdownRenderer
                                             content={message.content}
                                             isStreaming={
                                                message.isStreaming || false
                                             }
                                          />
                                       :  <p className='whitespace-pre-wrap'>
                                             {message.content}
                                          </p>
                                       }
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     }
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

               {/* Input - Fixed at bottom */}
               <div className='p-6 border-t border-default-200 bg-gradient-to-r from-background to-default-50/30 shrink-0'>
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
                           inputWrapper:
                              "border-primary/30 hover:border-primary/60 focus-within:border-primary group-data-[focus=true]:border-primary shadow-lg",
                        }}
                        isDisabled={isLoading}
                        startContent={
                           <span className='text-primary/60'>💬</span>
                        }
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
            </CardBody>
         </Card>
      </div>
   );
}
