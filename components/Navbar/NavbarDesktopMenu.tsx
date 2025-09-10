import { NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { siteConfig } from "@/config/site";

export const NavbarDesktopMenu = () => {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Chat History", href: "/history" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <ul className="hidden sm:flex gap-4 justify-start ml-2">
      {menuItems.map((item) => (
        <NavbarItem key={item.href}>
          <Button 
            variant="light" 
            className="text-foreground hover:text-primary transition-colors"
          >
            {item.label}
          </Button>
        </NavbarItem>
      ))}
    </ul>
  );
};