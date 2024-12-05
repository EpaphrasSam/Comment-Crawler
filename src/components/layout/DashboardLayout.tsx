"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { PageContainer } from "./PageContainer";
import { useUIStore } from "@/store/useUIStore";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <PageContainer>
          <main className="p-6">{children}</main>
        </PageContainer>
      </div>
    </div>
  );
};
