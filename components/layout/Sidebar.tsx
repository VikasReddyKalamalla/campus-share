'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, Users, Shield, Briefcase, Home, Menu, X,
  BarChart3, FileText, Zap, Award, MessageSquare, Settings,
  Layers,
} from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string
}

interface SidebarProps {
  role: 'student' | 'faculty' | 'admin' | 'employee' | 'placement'
}

const sidebarConfig: Record<string, SidebarItem[]> = {
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Academics', href: '/dashboard/academics', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Placements', href: '/dashboard/placements', icon: <Briefcase className="w-5 h-5" />, badge: '2' },
    { name: 'Resume', href: '/dashboard/resume', icon: <FileText className="w-5 h-5" /> },
    { name: 'Resources', href: '/dashboard/resources', icon: <Layers className="w-5 h-5" /> },
    { name: 'Collaborate', href: '/dashboard/collaborate', icon: <Users className="w-5 h-5" /> },
    { name: 'Explore', href: '/dashboard/explore', icon: <Zap className="w-5 h-5" /> },
  ],
  faculty: [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Courses', href: '/dashboard/courses', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Materials', href: '/dashboard/materials', icon: <FileText className="w-5 h-5" /> },
    { name: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Students', href: '/dashboard/students', icon: <Users className="w-5 h-5" /> },
    { name: 'Messages', href: '/dashboard/messages', icon: <MessageSquare className="w-5 h-5" /> },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Users', href: '/dashboard/users', icon: <Users className="w-5 h-5" />, badge: '5' },
    { name: 'Announcements', href: '/dashboard/announcements', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Reports', href: '/dashboard/reports', icon: <FileText className="w-5 h-5" /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ],
  employee: [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Opportunities', href: '/dashboard/opportunities', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Feed', href: '/dashboard/feed', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Networking', href: '/dashboard/networking', icon: <Users className="w-5 h-5" /> },
  ],
  placement: [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Opportunities', href: '/dashboard/opportunities', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Applications', href: '/dashboard/applications', icon: <Award className="w-5 h-5" /> },
    { name: 'Companies', href: '/dashboard/companies', icon: <Shield className="w-5 h-5" /> },
    { name: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const items = sidebarConfig[role] || sidebarConfig.student

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-40 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm transition-transform lg:translate-x-0 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="h-full p-4 space-y-2 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-smooth ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}>
                  {item.icon}
                </span>
                <span className="flex-1 font-medium text-sm">{item.name}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-xs text-destructive-foreground font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
