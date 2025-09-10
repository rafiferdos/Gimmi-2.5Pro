import { Button } from "@heroui/button";
import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";

export const NavbarMobileMenu = () => {
   const menuItems = [
      "Home",
      "Chat History",
      "Settings",
      "Help & Support",
      "About",
   ];

   return (
      <NavbarMenu className='backdrop-blur-md bg-background/90'>
         {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
               <Button
                  className='w-full justify-start'
                  variant='light'
                  size='lg'
               >
                  {item}
               </Button>
            </NavbarMenuItem>
         ))}
      </NavbarMenu>
   );
};
