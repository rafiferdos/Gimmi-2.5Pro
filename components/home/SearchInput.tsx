"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

export const SearchInput = () => {
   const [value, setValue] = useState("");

   return (
      <div className='max-w-2xl mx-auto mt-8'>
         <div
            className='frosted frosted-input shadow-lg'
            role='search'
            aria-label='Ask the assistant'
         >
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
                  className='clear-btn'
               >
                  Clear
               </Button>
            :  <Button
                  onClick={() => {
                     /* submit action: integrate with search later */
                  }}
                  variant='flat'
                  size='sm'
                  className='min-w-8 w-8 h-8'
               >
                  ➤
               </Button>
            }
         </div>
      </div>
   );
};
