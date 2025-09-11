"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
}) => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onChange}
      className={`px-2 transition-opacity hover:opacity-80 cursor-pointer ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <SunFilledIcon size={22} />
      ) : (
        <MoonFilledIcon size={22} />
      )}
    </Button>
  );
};
