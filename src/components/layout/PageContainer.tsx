"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({
  children,
  className = "",
}: PageContainerProps) => {
  return (
    <main className={`flex-1 container mx-auto px-4 pb-8 md:px-6 ${className}`}>
      {children}
    </main>
  );
};
