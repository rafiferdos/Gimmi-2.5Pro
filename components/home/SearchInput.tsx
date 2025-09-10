"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

export const SearchInput = () => {
   const [value, setValue] = useState("");

   return (
      <div className='max-w-2xl mx-auto mt-8'>
         <div
            className='frosted p-6 shadow-lg'
            role='search'
            aria-label='Ask the assistant'
         >
            <div className='mb-4'>
               <h2 className='text-2xl font-semibold'>Hello, Gimmi 👋</h2>
               <p className='mt-1 text-sm text-foreground/70'>
                  Ask anything — I'll help you draft, summarize, or brainstorm.
               </p>
            </div>

            <div className='mb-4 flex flex-wrap gap-2'>
               {[
                  "Summarize my notes",
                  "Write an email",
                  "Generate ideas for product names",
               ].map((t) => (
                  <button
                     key={t}
                     type='button'
                     onClick={() => setValue(t)}
                     className='chip'
                  >
                     {t}
                  </button>
               ))}
            </div>

            <div className='frosted-input items-center'>
               <input
                  aria-label='Ask me anything'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className='frosted-input-field text-foreground placeholder:text-foreground/50'
                  placeholder='Ask me anything...'
               />

               <div className='icon' aria-hidden>
                  <svg
                     width='18'
                     height='18'
                     viewBox='0 0 24 24'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        d='M21 21l-4.35-4.35'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     />
                     <path
                        d='M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     />
                  </svg>
               </div>

               {value ?
                  <Button
                     onClick={() => setValue("")}
                     variant='flat'
                     size='sm'
                     className='clear-btn submit-btn'
                  >
                     Clear
                  </Button>
               :  <Button
                     onClick={() => {
                        /* submit action: integrate with search later */
                     }}
                     variant='flat'
                     size='sm'
                     className='submit-btn'
                  >
                     ➤
                  </Button>
               }
            </div>
         </div>
      </div>
   );
};
