"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Sparkles, Trash2 } from "lucide-react";
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

      lines.forEach((line, lineIndex) => {
         if (line.trim().startsWith("* ")) {
            // Handle bullet points
            const listItem = line.trim().slice(2);
            const processedItem = listItem.replace(
               /\*\*(.*?)\*\*/g,
               '<strong class="font-semibold text-primary">$1</strong>'
            );
            elements.push(
               <li
                  key={`li-${lineIndex}`}
                  className='ml-4 list-disc text-sm leading-relaxed py-1'
                  dangerouslySetInnerHTML={{ __html: processedItem }}
               />
            );
         } else if (line.trim().startsWith("- ")) {
            // Handle dash points
            const listItem = line.trim().slice(2);
            const processedItem = listItem.replace(
               /\*\*(.*?)\*\*/g,
               '<strong class="font-semibold text-primary">$1</strong>'
            );
            elements.push(
               <li
                  key={`dash-${lineIndex}`}
                  className='ml-4 list-disc text-sm leading-relaxed py-1'
                  dangerouslySetInnerHTML={{ __html: processedItem }}
               />
            );
         } else if (line.trim()) {
            // Regular paragraph
            const processedLine = line.replace(
               /\*\*(.*?)\*\*/g,
               '<strong class="font-semibold text-primary">$1</strong>'
            );
            elements.push(
               <p
                  key={`p-${lineIndex}`}
                  className='text-sm leading-relaxed py-1'
                  dangerouslySetInnerHTML={{ __html: processedLine }}
               />
            );
         } else if (line === "") {
            // Empty line for spacing
            elements.push(<br key={`br-${lineIndex}`} />);
         }
      });

      return elements;
   };

   return (
      <div className='prose prose-sm max-w-none'>
         {renderContent(displayedContent)}
         {isStreaming && <span className='animate-pulse'>|</span>}
      </div>
   );
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

      // Add streaming message placeholder
      const assistantMessageId = crypto.randomUUID();
      setMessages((prev) => [
         ...prev,
         {
            id: assistantMessageId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
            isStreaming: true,
         },
      ]);

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

         const responseText =
            data?.text ||
            data?.content ||
            "Sorry, I couldn't process that request.";

         // Simulate streaming by updating the message content
         setMessages((prev) =>
            prev.map((msg) =>
               msg.id === assistantMessageId ?
                  { ...msg, content: responseText, isStreaming: true }
               :  msg
            )
         );

         // After a delay, stop streaming
         setTimeout(
            () => {
               setMessages((prev) =>
                  prev.map((msg) =>
                     msg.id === assistantMessageId ?
                        { ...msg, isStreaming: false }
                     :  msg
                  )
               );
            },
            responseText.length * 20 + 500
         );
      } catch (error) {
         setMessages((prev) =>
            prev.map((msg) =>
               msg.id === assistantMessageId ?
                  {
                     ...msg,
                     content:
                        "Sorry, there was an error processing your request.",
                     isStreaming: false,
                  }
               :  msg
            )
         );
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
      <div className='flex flex-col h-screen max-h-screen pt-20 pb-6'>
         {/* Header */}
         <div className='text-center space-y-4 mb-8 px-6'>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
               Gimmi
            </h1>
            <p className='text-muted-foreground text-lg font-medium'>
               Your intelligent AI companion
            </p>
         </div>

         {/* Quick Actions */}
         {messages.length === 0 && (
            <div className='flex flex-wrap gap-3 justify-center mb-8 px-6'>
               {quickActions.map((action) => (
                  <Badge
                     key={action}
                     variant='secondary'
                     className='cursor-pointer hover:scale-110 transition-all duration-300 font-medium px-4 py-2 text-sm'
                     onClick={() => setInput(action)}
                  >
                     <Sparkles className='w-3 h-3 mr-1' />
                     {action}
                  </Badge>
               ))}
            </div>
         )}

         {/* Chat Container */}
         <Card className='flex-1 mx-6 shadow-2xl border-primary/20 flex flex-col overflow-hidden'>
            <CardHeader className='pb-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10 flex-shrink-0'>
               <CardTitle className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                     <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                     <span className='text-base font-semibold'>
                        Live Conversation
                     </span>
                  </div>
                  {messages.length > 0 && (
                     <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setMessages([])}
                        className='font-medium'
                     >
                        <Trash2 className='w-4 h-4 mr-1' />
                        Clear
                     </Button>
                  )}
               </CardTitle>
            </CardHeader>

            <CardContent className='flex-1 p-0 flex flex-col overflow-hidden'>
               {/* Messages */}
               <ScrollArea className='flex-1 p-6 custom-scroll'>
                  <div ref={scrollRef} className='space-y-6 min-h-full'>
                     {messages.length === 0 ?
                        <div className='text-center text-muted-foreground py-20'>
                           <div className='text-6xl mb-4'>💭</div>
                           <p className='text-lg font-medium'>
                              Ready to chat? Start the conversation...
                           </p>
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
                                 className={`max-w-[85%] p-4 rounded-2xl shadow-lg font-medium text-base leading-relaxed ${
                                    message.role === "user" ?
                                       "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/20"
                                    :  "bg-gradient-to-r from-muted/50 to-muted/30 text-foreground border border-border"
                                 }`}
                              >
                                 <div className='flex items-start gap-2'>
                                    <span className='text-lg flex-shrink-0'>
                                       {message.role === "user" ? "🧑‍💻" : "🤖"}
                                    </span>
                                    <div className='flex-1'>
                                       {message.role === "assistant" ?
                                          <MarkdownRenderer
                                             content={message.content}
                                             isStreaming={message.isStreaming}
                                          />
                                       :  <p className='whitespace-pre-wrap text-sm leading-relaxed'>
                                             {message.content}
                                          </p>
                                       }
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     }
                     {isLoading &&
                        messages[messages.length - 1]?.role === "user" && (
                           <div className='flex justify-start animate-in slide-in-from-left-2 duration-300'>
                              <div className='bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 p-4 rounded-2xl flex items-center gap-3 shadow-lg'>
                                 <Loader2 className='w-4 h-4 animate-spin text-primary' />
                                 <span className='text-base font-medium text-primary'>
                                    🧠 Thinking deeply...
                                 </span>
                              </div>
                           </div>
                        )}
                  </div>
               </ScrollArea>

               {/* Input */}
               <div className='p-6 border-t border-border bg-gradient-to-r from-background to-muted/30 flex-shrink-0'>
                  <div className='flex gap-3'>
                     <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder='✍️ Type your message here...'
                        className='flex-1 font-medium text-base border-primary/30 focus:border-primary shadow-lg'
                        disabled={isLoading}
                     />
                     <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className='px-6 font-semibold text-base'
                        size='default'
                     >
                        {isLoading ?
                           <Loader2 className='w-4 h-4 animate-spin mr-1' />
                        :  <Send className='w-4 h-4 mr-1' />}
                        Send
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
