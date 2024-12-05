"use client";

import { Button, Navbar as NextUINavbar } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import Image from "next/image";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useUIStore();

  return (
    <NextUINavbar 
      maxWidth="full" 
      position="sticky"
      className="bg-background/70 backdrop-blur-md backdrop-saturate-150 border-b border-divider"
    >
      <div className="flex items-center gap-4">
        <Button 
          isIconOnly 
          variant="light" 
          onClick={toggleSidebar}
          className="text-default-600 hover:text-primary transition-colors"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden ring-2 ring-primary/20">
            <Image
              src="/logo.png"
              alt="Comment Crawler"
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Comment Crawler
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          isIconOnly
          variant="light"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-default-600 hover:text-primary transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </NextUINavbar>
  );
};
