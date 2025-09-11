"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonFilledIcon, SunFilledIcon } from "../icons";
import { Button } from "../ui/button";

export const Navbar = () => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
   };

   return (
      <nav className='bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-lg'>
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
               <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg'>
                     <span className='text-white font-bold text-sm'>G</span>
                  </div>
                  <p className='font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                     Gimmi
                  </p>
               </div>

               <div className='flex items-center'>
                  {mounted && (
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={toggleTheme}
                        className='p-2 transition-opacity hover:opacity-80 cursor-pointer'
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                     >
                        {theme === "light" ?
                           <SunFilledIcon size={22} />
                        :  <MoonFilledIcon size={22} />}
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};
