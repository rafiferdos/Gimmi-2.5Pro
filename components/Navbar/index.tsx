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
         className='bg-background/60 backdrop-blur-md'
      >
         <NavbarBrand>
            <p className='font-bold text-lg'>Gimmi</p>
         </NavbarBrand>

         <NavbarContent justify='end'>
            <NavbarItem>
               {mounted && (
                  <Switch
                     size='sm'
                     color='primary'
                     thumbIcon={({ isSelected, className }) =>
                        isSelected ?
                           <div className={className}>🌙</div>
                        :  <div className={className}>☀️</div>
                     }
                     isSelected={theme === "dark"}
                     onValueChange={(isSelected) =>
                        setTheme(isSelected ? "dark" : "light")
                     }
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
