'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';

import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <Button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`px-2 transition-opacity hover:opacity-80 cursor-pointer ${className}`}
      size="sm"
      variant="ghost"
      onClick={onChange}
    >
      {theme === 'light' ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </Button>
  );
};
