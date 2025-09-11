"use client";

import {
   Navbar as HeroUINavbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
} from "@heroui/navbar";
import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Navbar = () => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <HeroUINavbar
         maxWidth='full'
         className='bg-background/80 backdrop-blur-lg border-b border-primary/10 shadow-lg shadow-primary/5'
      >
         <NavbarBrand>
            <div className='flex items-center gap-2'>
               <div className='w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg'>
                  <span className='text-white font-bold text-sm'>G</span>
               </div>
               <p className='font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  Gimmi
               </p>
            </div>
         </NavbarBrand>

         <NavbarContent justify='end'>
            <NavbarItem>
               {mounted && (
                  <Switch
                     size='md'
                     color='secondary'
                     thumbIcon={({ isSelected, className }) =>
                        isSelected ?
                           <div className={className}>🌙</div>
                        :  <div className={className}>☀️</div>
                     }
                     isSelected={theme === "dark"}
                     onValueChange={(isSelected) =>
                        setTheme(isSelected ? "dark" : "light")
                     }
                     classNames={{
                        wrapper: "group-data-[selected=true]:bg-secondary",
                     }}
                  />
               )}
            </NavbarItem>
         </NavbarContent>
      </HeroUINavbar>
   );
};

export * from "./NavbarBrand";
export * from "./NavbarDesktopMenu";
export * from "./NavbarMobileMenu";
export * from "./NavbarThemeSwitch";
export * from "./UserDropdown";
