"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";

export const SearchInput = () => {
   const [value, setValue] = useState("");

   return (
      <div className='max-w-3xl mx-auto mt-4 neon-section'>
         <div className='mb-6'>
            <h2 className='text-4xl font-extrabold tracking-tight neon-text-gradient'>Hello, Gimmi <span className='animate-wave inline-block origin-bottom'>👋</span></h2>
            <p className='mt-2 text-base md:text-lg text-foreground/70'>Ask anything — I'll help you draft, summarize, or brainstorm.</p>
         </div>
         <div className='flex flex-wrap gap-2 mb-4'>
            {["Summarize my notes","Write an email","Generate product names"].map((t)=>(
               <Button key={t} size='sm' variant='faded' className='prompt-chip-neon' onPress={()=>setValue(t)}>{t}</Button>
            ))}
         </div>
         <form
            onSubmit={(e)=>{e.preventDefault(); /* future hook into search */}}
            className='flex gap-3 items-center'
         >
            <Input
               aria-label='Ask me anything'
               value={value}
               onChange={(e)=>setValue(e.target.value)}
               variant='flat'
               className='flex-1 neon-input'
               placeholder='Ask me anything...'
            />
            <Button
               type='submit'
               variant='faded'
               color='primary'
               radius='sm'
               className='send-btn-neon'
            >
               Go
            </Button>
            {value && (
               <Button variant='faded' size='sm' radius='sm' className='clear-btn-neon' onPress={()=>setValue("")}>Clear</Button>
            )}
         </form>
      </div>
   );
};
