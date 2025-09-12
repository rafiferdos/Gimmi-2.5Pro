'use client';
import { useState } from 'react';

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from '@/components/ui/resizable-navbar';

export default function TopNavbar() {
  const navItems = [
    {
      name: 'Home',
      link: '#home',
    },
    {
      name: 'Features',
      link: '#features',
    },
    {
      name: 'Pricing',
      link: '#pricing',
    },
    {
      name: 'Contact',
      link: '#contact',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                className="relative text-neutral-600 dark:text-neutral-300"
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                className="w-full"
                variant="primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavbarButton>
              <NavbarButton
                className="w-full"
                variant="primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
