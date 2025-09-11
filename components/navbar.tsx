"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <nav className='fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg'>
         <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
               <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>G</span>
               </div>
               <h1 className='text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                  Gimmi
               </h1>
            </div>

            {mounted && (
               <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className='rounded-full'
               >
                  {theme === "dark" ?
                     <Sun className='h-5 w-5' />
                  :  <Moon className='h-5 w-5' />}
               </Button>
            )}
         </div>
      </nav>
   );
}
