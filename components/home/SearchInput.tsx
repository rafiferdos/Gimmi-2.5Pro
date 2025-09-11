"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SearchInput = () => {
   const [value, setValue] = useState("");

   return (
      <div className='max-w-3xl mx-auto mt-4 p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'>
         <div className='mb-6'>
            <h2 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
               Hello, Gimmi{" "}
               <span className='animate-bounce inline-block'>
                  👋
               </span>
            </h2>
            <p className='mt-2 text-base md:text-lg text-gray-600 dark:text-gray-400'>
               Ask anything — I'll help you draft, summarize, or brainstorm.
            </p>
         </div>
         <div className='flex flex-wrap gap-2 mb-4'>
            {[
               "Summarize my notes",
               "Write an email",
               "Generate product names",
            ].map((t) => (
               <Button
                  key={t}
                  size='sm'
                  variant='secondary'
                  className='hover:scale-105 transition-all'
                  onClick={() => setValue(t)}
               >
                  {t}
               </Button>
            ))}
         </div>
         <form
            onSubmit={(e) => {
               e.preventDefault(); /* future hook into search */
            }}
            className='flex gap-3 items-center'
         >
            <Input
               aria-label='Ask me anything'
               value={value}
               onChange={(e) => setValue(e.target.value)}
               className='flex-1'
               placeholder='Ask me anything...'
            />
            <Button
               type='submit'
               variant='default'
               className='px-6'
            >
               Go
            </Button>
            {value && (
               <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setValue("")}
               >
                  Clear
               </Button>
            )}
         </form>
      </div>
   );
};
