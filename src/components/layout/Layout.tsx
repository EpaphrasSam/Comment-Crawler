"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--secondary-200))",
          },
          success: {
            iconTheme: {
              primary: "hsl(var(--success))",
              secondary: "hsl(var(--background))",
            },
          },
          error: {
            iconTheme: {
              primary: "hsl(var(--error))",
              secondary: "hsl(var(--background))",
            },
          },
        }}
      />
    </div>
  );
};
