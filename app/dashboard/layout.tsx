'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

// Prefetch all dashboard routes so navigation is instant
const DASHBOARD_ROUTES = [
  '/dashboard',
  '/dashboard/academics',
  '/dashboard/placements',
  '/dashboard/resume',
  '/dashboard/resources',
  '/dashboard/collaborate',
  '/dashboard/explore',
  '/dashboard/settings',
]

// Lightweight skeleton — shown only during the brief Firebase auth check
function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--theme-bg)' }}>
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-56 border-r border-white/[0.06] p-3 gap-1.5">
        <div className="h-8 w-28 rounded-lg bg-white/[0.04] mb-4 mt-1" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 rounded-lg bg-white/[0.03]" style={{ width: `${70 + (i % 3) * 10}%` }} />
        ))}
      </div>
      {/* Main skeleton */}
      <div className="flex-1 p-6 lg:p-8 space-y-6">
        <div className="h-7 w-40 rounded-lg bg-white/[0.04]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.05]" />
          ))}
        </div>
        <div className="h-48 rounded-xl bg-white/[0.03] border border-white/[0.05]" />
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Prefetch all dashboard routes on mount for instant navigation
  useEffect(() => {
    DASHBOARD_ROUTES.forEach((route) => router.prefetch(route))
  }, [router])

  // Show skeleton while Firebase resolves (usually < 300ms)
  if (loading) return <DashboardSkeleton />

  // Redirect in progress
  if (!user) return <DashboardSkeleton />

  const roleLabels: Record<string, string> = {
    student:   'Student',
    faculty:   'Faculty',
    admin:     'Administrator',
    employee:  'Employee',
    placement: 'Placement Cell',
  }

  const validRole = (
    userRole && ['student', 'faculty', 'admin', 'employee', 'placement'].includes(userRole)
      ? userRole
      : 'student'
  ) as 'student' | 'faculty' | 'admin' | 'employee' | 'placement'

  return (
    <NotificationProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg)' }}>
        {/* Subtle grid — pointer-events none so it never blocks clicks */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            userName={user.displayName || user.email || 'User'}
            userRole={roleLabels[validRole]}
          />
          <div className="flex flex-1">
            <Sidebar role={validRole} />
            <main className="flex-1 lg:ml-56">
              <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </NotificationProvider>
  )
}
