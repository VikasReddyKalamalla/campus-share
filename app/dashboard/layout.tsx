'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const roleLabels: Record<string, string> = {
    student: 'Student',
    faculty: 'Faculty',
    admin: 'Administrator',
    employee: 'Employee',
    placement: 'Placement Cell',
  }

  const validRole = (userRole && ['student', 'faculty', 'admin', 'employee', 'placement'].includes(userRole)) 
    ? userRole as 'student' | 'faculty' | 'admin' | 'employee' | 'placement'
    : 'student'

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName={user.displayName || user.email || 'User'} userRole={roleLabels[validRole]} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={validRole} />
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
