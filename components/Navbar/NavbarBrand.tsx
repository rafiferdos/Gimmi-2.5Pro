import { NavbarBrand as HeroUINavbarBrand } from "@heroui/navbar";
import NextLink from "next/link";

export const NavbarBrand = () => {
   return (
      <HeroUINavbarBrand as='li' className='gap-3 max-w-fit'>
         <NextLink className='flex justify-start items-center gap-1' href='/'>
            <div className='w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center'>
               <span className='text-white font-bold text-sm'>G</span>
            </div>
            <p className='font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
               Gimmi
            </p>
         </NextLink>
      </HeroUINavbarBrand>
   );
};
