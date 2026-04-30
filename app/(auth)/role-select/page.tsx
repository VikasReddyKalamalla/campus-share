'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { GraduationCap, Users, Shield, Briefcase, Building } from 'lucide-react'

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access academics, placements, and networking',
    icon: GraduationCap,
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    id: 'faculty',
    title: 'Faculty',
    description: 'Manage courses, students, and resources',
    icon: Users,
    gradient: 'from-teal-600 to-cyan-600'
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Platform management and analytics',
    icon: Shield,
    gradient: 'from-amber-600 to-orange-600'
  },
  {
    id: 'employee',
    title: 'Employee',
    description: 'Post jobs and manage recruitment',
    icon: Briefcase,
    gradient: 'from-emerald-600 to-green-700'
  },
  {
    id: 'placement',
    title: 'Placement Cell',
    description: 'Coordinate campus placements',
    icon: Building,
    gradient: 'from-lime-600 to-green-600'
  }
]

export default function RoleSelectPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { updateUserRole } = useAuth()

  const handleRoleSelect = async () => {
    if (!selectedRole) return

    setLoading(true)
    try {
      await updateUserRole(selectedRole)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-green-50/30 to-emerald-50/20 dark:from-background dark:via-green-950/20 dark:to-emerald-950/10 leaf-pattern">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-nature flex items-center justify-center shadow-lg">
              <span className="text-3xl">🎓</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient-nature">
            Choose Your Role
          </h1>
          <p className="text-muted-foreground">Select how you&apos;ll be using Campus Hub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`glass p-6 rounded-2xl text-left transition-all duration-300 hover:scale-105 ${
                  isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleRoleSelect}
            disabled={!selectedRole || loading}
            className="px-8"
          >
            {loading ? 'Continuing...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}
