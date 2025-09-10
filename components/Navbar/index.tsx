"use client";

import {
   Navbar as HeroUINavbar,
   NavbarContent,
   NavbarItem,
   NavbarMenuToggle,
} from "@heroui/navbar";
import { useState } from "react";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarThemeSwitch } from "./NavbarThemeSwitch";
import { UserDropdown } from "./UserDropdown";

export const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <HeroUINavbar
         isMenuOpen={isMenuOpen}
         onMenuOpenChange={setIsMenuOpen}
         className='backdrop-blur-md bg-background/70 border-b border-divider/50'
         maxWidth='full'
         isBordered
      >
         <NavbarContent>
            <NavbarMenuToggle
               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               className='sm:hidden'
            />
            <NavbarBrand />
         </NavbarContent>

         <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            <NavbarDesktopMenu />
         </NavbarContent>

         <NavbarContent justify='end'>
            <NavbarItem>
               <NavbarThemeSwitch />
            </NavbarItem>
            <NavbarItem>
               <UserDropdown />
            </NavbarItem>
         </NavbarContent>

         <NavbarMobileMenu />
      </HeroUINavbar>
   );
};

export * from "./NavbarBrand";
export * from "./NavbarDesktopMenu";
export * from "./NavbarMobileMenu";
export * from "./NavbarThemeSwitch";
export * from "./UserDropdown";
