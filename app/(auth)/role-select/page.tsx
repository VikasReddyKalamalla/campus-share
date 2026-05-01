'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import {
  GraduationCap, Users, Shield, Briefcase, Building2,
  ArrowRight, Check, Loader2,
} from 'lucide-react'

const roles = [
  {
    id: 'student',
    title: 'Student',
    tagline: 'Academics, placements & networking',
    icon: GraduationCap,
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/25',
    ring: 'ring-blue-500/30',
    dot: 'bg-blue-500',
  },
  {
    id: 'faculty',
    title: 'Faculty',
    tagline: 'Courses, students & materials',
    icon: Users,
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    accentBorder: 'border-violet-500/25',
    ring: 'ring-violet-500/30',
    dot: 'bg-violet-500',
  },
  {
    id: 'admin',
    title: 'Administrator',
    tagline: 'Users, reports & platform control',
    icon: Shield,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/25',
    ring: 'ring-amber-500/30',
    dot: 'bg-amber-500',
  },
  {
    id: 'employee',
    title: 'Employee',
    tagline: 'Post jobs & manage recruitment',
    icon: Briefcase,
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/25',
    ring: 'ring-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  {
    id: 'placement',
    title: 'Placement Cell',
    tagline: 'Drives, companies & offer tracking',
    icon: Building2,
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/25',
    ring: 'ring-cyan-500/30',
    dot: 'bg-cyan-500',
  },
]

export default function RoleSelectPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { updateUserRole } = useAuth()

  const handleContinue = async () => {
    if (!selectedRole) return
    setLoading(true)
    setError('')
    try {
      await updateUserRole(selectedRole)
      router.push('/dashboard')
    } catch (e: any) {
      setError(e.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-white/50 text-sm font-medium group-hover:text-white/80 transition-colors">
            Campus Hub
          </span>
        </Link>
      </div>

      {/* Heading */}
      <div className="text-center mb-7">
        <h1 className="text-[22px] font-bold text-white tracking-tight">
          Choose your role
        </h1>
        <p className="text-[13px] text-white/35 mt-1.5">
          We'll set up your workspace accordingly.
        </p>
      </div>

      {/* Role list — compact rows */}
      <div className="space-y-2 mb-5">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                isSelected
                  ? `${role.accentBg} ${role.accentBorder} ring-1 ${role.ring}`
                  : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]'
              }`}
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg ${role.accentBg} border ${role.accentBorder} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${role.accent}`} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-semibold leading-none ${isSelected ? role.accent : 'text-white/75'}`}>
                  {role.title}
                </p>
                <p className="text-[11px] text-white/30 mt-1 leading-none">{role.tagline}</p>
              </div>

              {/* Check */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected
                  ? `${role.accentBg} ${role.accentBorder}`
                  : 'border-white/[0.10] bg-transparent'
              }`}>
                {isSelected && <Check className={`h-3 w-3 ${role.accent}`} />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400">
          {error}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={!selectedRole || loading}
        className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-35 disabled:cursor-not-allowed text-white font-medium text-[13px] transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" />Setting up…</>
        ) : (
          <>Continue<ArrowRight className="h-4 w-4" /></>
        )}
      </button>

      <p className="text-center text-[11px] text-white/20 mt-4">
        You can change this later in Settings.
      </p>
    </div>
  )
}
