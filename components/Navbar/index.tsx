"use client";

import { useState, useEffect } from 'react';
import { 
  Navbar as HeroUINavbar, 
  NavbarContent, 
  NavbarItem,
  NavbarMenuToggle,
  NavbarBrand as HeroUINavbarBrand,
  NavbarMenu,
  NavbarMenuItem
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Switch } from '@heroui/switch';
import { Avatar } from '@heroui/avatar';
import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/dropdown';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only render theme-dependent UI after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    "Home",
    "Chat History", 
    "Settings",
    "Help & Support",
    "About"
  ];

  return (
    <HeroUINavbar 
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="backdrop-blur-md bg-background/70 border-b border-divider/50"
      maxWidth="full"
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <HeroUINavbarBrand>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <p className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Gimmi
            </p>
          </div>
        </HeroUINavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button 
            variant="light" 
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button 
            variant="light"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            Chat History
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button 
            variant="light"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            Settings
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {mounted ? (
            <Switch
              size="sm"
              color="primary"
              thumbIcon={({ isSelected, className }: { isSelected: boolean; className?: string }) =>
                isSelected ? (
                  <div className={className}>🌙</div>
                ) : (
                  <div className={className}>☀️</div>
                )
              }
              isSelected={theme === 'dark'}
              onValueChange={(isSelected: boolean) => setTheme(isSelected ? 'dark' : 'light')}
            />
          ) : (
            // placeholder to keep markup stable during SSR
            <div className="w-10 h-6 rounded-full bg-background/40" aria-hidden />
          )}
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hover:scale-110"
                color="primary"
                name="User"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions" 
              variant="flat"
              className="backdrop-blur-md"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">user@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="backdrop-blur-md bg-background/90">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              className="w-full justify-start"
              variant="light"
              size="lg"
            >
              {item}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export * from "./NavbarBrand";
export * from "./NavbarDesktopMenu";
export * from "./NavbarMobileMenu";
export * from "./NavbarThemeSwitch";
export * from "./UserDropdown";
