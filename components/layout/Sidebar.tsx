'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen, Users, Shield, Briefcase, Home, Menu, X,
  BarChart3, FileText, Zap, MessageSquare, Settings,
  Layers, Award, Bell, Rss,
} from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: string
}

interface SidebarProps {
  role: 'student' | 'faculty' | 'admin' | 'employee' | 'placement'
}

const sidebarConfig: Record<string, SidebarItem[]> = {
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Academics', href: '/dashboard/academics', icon: BookOpen },
    { name: 'Placements', href: '/dashboard/placements', icon: Briefcase, badge: '2' },
    { name: 'Resume', href: '/dashboard/resume', icon: FileText },
    { name: 'Resources', href: '/dashboard/resources', icon: Layers },
    { name: 'Collaborate', href: '/dashboard/collaborate', icon: Users },
    { name: 'Explore', href: '/dashboard/explore', icon: Zap },
  ],
  faculty: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Materials', href: '/dashboard/materials', icon: FileText },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Students', href: '/dashboard/students', icon: Users },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Users', href: '/dashboard/users', icon: Users, badge: '5' },
    { name: 'Announcements', href: '/dashboard/announcements', icon: Bell },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  employee: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Opportunities', href: '/dashboard/opportunities', icon: Briefcase },
    { name: 'Feed', href: '/dashboard/feed', icon: Rss },
    { name: 'Networking', href: '/dashboard/networking', icon: Users },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ],
  placement: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Opportunities', href: '/dashboard/opportunities', icon: Briefcase },
    { name: 'Applications', href: '/dashboard/applications', icon: Award },
    { name: 'Companies', href: '/dashboard/companies', icon: Shield },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const items = sidebarConfig[role] ?? sidebarConfig.student

  const NavItems = () => (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
        return (
          <Link
            key={item.name}
            href={item.href}
            prefetch={true}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-[13px] font-medium group ${
              isActive
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent'
            }`}
          >
            <Icon
              className={`w-4 h-4 flex-shrink-0 ${
                isActive ? 'text-blue-400' : 'text-white/30 group-hover:text-white/60'
              }`}
            />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600/20 text-[10px] text-blue-400 font-semibold border border-blue-500/20">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3.5 left-4 z-50 lg:hidden p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-56 border-r" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)' }}>
        <NavItems />
        <div className="px-3 py-3 border-t border-white/[0.06]">
          <Link href="/dashboard/settings">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors border border-transparent">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-56 border-r flex flex-col z-40 transition-transform duration-200 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)' }}
      >
        <NavItems />
        <div className="px-3 py-3 border-t border-white/[0.06]">
          <Link href="/dashboard/settings">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors border border-transparent"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
