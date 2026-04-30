import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: 'student' | 'faculty' | 'admin' | 'employee' | 'placement'
  userName?: string
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const roleLabels: Record<string, string> = {
    student: 'Student',
    faculty: 'Faculty',
    admin: 'Administrator',
    employee: 'Employee',
    placement: 'Placement Cell',
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName={userName} userRole={roleLabels[role]} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={role} />
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
