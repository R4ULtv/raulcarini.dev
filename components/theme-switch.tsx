"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

const ThemeSwitch = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "l"
      ) {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("size-8 group", className)}
      aria-label="Toggle theme between light and dark mode"
      onClick={toggleTheme}
      {...props}
    >
      <MoonIcon
        className="hidden dark:block fill-transparent group-hover:fill-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-250 ease-out"
        aria-hidden="true"
      />
      <SunIcon
        className="dark:hidden fill-transparent group-hover:fill-foreground group-hover:rotate-12 group-hover:scale-110 transition-all duration-250 ease-out"
        aria-hidden="true"
      />
    </Button>
  );
};

export default ThemeSwitch;
