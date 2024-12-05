'use client'

import { Button } from '@nextui-org/react'
import { 
  BarChart3, 
  FileText, 
  Globe,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    name: 'Dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    path: '/'
  },
  {
    name: 'Articles',
    icon: <FileText className="w-5 h-5" />,
    path: '/articles'
  },
  {
    name: 'Sources',
    icon: <Globe className="w-5 h-5" />,
    path: '/sources'
  },
  {
    name: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings'
  }
]

export const SidebarMenu = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-4">
      {menuItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link key={item.path} href={item.path} className="w-full">
            <Button
              fullWidth
              radius="sm"
              variant={isActive ? "flat" : "light"}
              className={`justify-start h-11 ${
                isActive 
                  ? "bg-primary-500/20 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 font-medium"
                  : "bg-transparent text-default-700 dark:text-default-500 hover:bg-default-100 dark:hover:bg-default-100/20"
              }`}
              startContent={
                <span className={`${
                  isActive 
                    ? "text-primary-600 dark:text-primary-400" 
                    : "text-default-500 dark:text-default-400"
                }`}
                >
                  {item.icon}
                </span>
              }
            >
              {item.name}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
