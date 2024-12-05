'use client'

import { useUIStore } from '@/store/useUIStore'
import { SidebarMenu } from '../navigation/SidebarMenu'
import { ReactNode } from 'react'

interface SidebarProps {
  children?: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { isSidebarOpen } = useUIStore()

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => useUIStore.setState({ isSidebarOpen: false })}
      />
      
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background shadow-lg border-r border-divider transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <nav className="h-full flex flex-col">
          <SidebarMenu />
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {children}
          </div>
        </nav>
      </aside>
    </>
  )
}
