"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "../icons";
import { Button } from "../ui/button";

export const Navbar = () => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

   return (
      <div className='fixed left-1/2 top-4 z-50 w-full max-w-3xl -translate-x-1/2 px-4'>
         <div className='rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40 shadow-lg'>
            <div className='flex items-center justify-between gap-4 px-3 py-2'>
               <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow'>
                     <span className='text-white font-bold text-sm'>G</span>
                  </div>
                  <div className='hidden sm:block'>
                     <p className='font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        Gimmi
                     </p>
                  </div>
               </div>

               <nav className='flex items-center gap-2'>
                  <Button
                     variant='ghost'
                     size='sm'
                     className='hidden sm:inline-flex'
                  >
                     Home
                  </Button>
                  <Button
                     variant='ghost'
                     size='sm'
                     className='hidden sm:inline-flex'
                  >
                     Features
                  </Button>
                  <Button
                     variant='ghost'
                     size='sm'
                     className='hidden sm:inline-flex'
                  >
                     Pricing
                  </Button>
               </nav>

               <div className='flex items-center gap-2'>
                  {mounted && (
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                     >
                        {theme === "light" ?
                           <SunFilledIcon size={18} />
                        :  <MoonFilledIcon size={18} />}
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};
