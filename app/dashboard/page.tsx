'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import {
  BookOpen, Briefcase, Users, Layers, FileText, Zap,
  BarChart3, MessageSquare, Bell, Settings, Shield, Award,
  TrendingUp, TrendingDown, ArrowRight, Clock, CheckCircle2,
  UserPlus, BookMarked,
} from 'lucide-react'

// ── Stat card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaUp?: boolean
  sub?: string
}

function StatCard({ label, value, delta, deltaUp, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
      <p className="text-xs text-white/35 font-medium uppercase tracking-wide mb-3">{label}</p>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      {delta && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${deltaUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {deltaUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta}
        </div>
      )}
      {sub && <p className="text-xs text-white/25 mt-2">{sub}</p>}
    </div>
  )
}

// ── Quick action card ──────────────────────────────────────────────────────
interface QuickActionProps {
  icon: React.ElementType
  label: string
  description: string
  href: string
  accent: string
  accentBg: string
  accentBorder: string
}

function QuickAction({ icon: Icon, label, description, href, accent, accentBg, accentBorder }: QuickActionProps) {
  return (
    <Link href={href}>
      <div className={`group rounded-xl border ${accentBorder} bg-white/[0.02] p-5 hover:bg-white/[0.05] transition-colors cursor-pointer`}>
        <div className={`w-9 h-9 rounded-lg ${accentBg} flex items-center justify-center mb-3`}>
          <Icon className={`h-4.5 w-4.5 ${accent}`} />
        </div>
        <p className="text-[13px] font-semibold text-white/80 mb-1">{label}</p>
        <p className="text-xs text-white/30 leading-relaxed">{description}</p>
        <div className={`mt-3 flex items-center gap-1 text-xs ${accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
          Open <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  )
}

// ── Activity item ──────────────────────────────────────────────────────────
interface ActivityItemProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  time: string
  dot: string
}

function ActivityItem({ icon: Icon, iconBg, iconColor, title, time, dot }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0">
      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-white/70 font-medium truncate">{title}</p>
        <p className="text-[11px] text-white/25 mt-0.5">{time}</p>
      </div>
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
    </div>
  )
}

// ── Weekly bar ─────────────────────────────────────────────────────────────
function WeeklyBar({ day, value, max = 100 }: { day: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-white/30 w-7 flex-shrink-0">{day}</span>
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-white/30 w-8 text-right">{value}%</span>
    </div>
  )
}

// ── Role-specific quick actions ────────────────────────────────────────────
const quickActionsByRole: Record<string, QuickActionProps[]> = {
  student: [
    { icon: BookOpen, label: 'Academics', description: 'View courses, grades & attendance', href: '/dashboard/academics', accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/15' },
    { icon: Briefcase, label: 'Placements', description: 'Browse jobs & track applications', href: '/dashboard/placements', accent: 'text-violet-400', accentBg: 'bg-violet-500/10', accentBorder: 'border-violet-500/15' },
    { icon: FileText, label: 'Resume', description: 'Build & manage your resume', href: '/dashboard/resume', accent: 'text-amber-400', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-500/15' },
    { icon: Layers, label: 'Resources', description: 'Study materials & notes', href: '/dashboard/resources', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/15' },
    { icon: Users, label: 'Collaborate', description: 'Connect with peers & faculty', href: '/dashboard/collaborate', accent: 'text-cyan-400', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-500/15' },
    { icon: Zap, label: 'Explore', description: 'Discover events & opportunities', href: '/dashboard/explore', accent: 'text-rose-400', accentBg: 'bg-rose-500/10', accentBorder: 'border-rose-500/15' },
  ],
  faculty: [
    { icon: BookOpen, label: 'Courses', description: 'Manage your courses', href: '/dashboard/courses', accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/15' },
    { icon: FileText, label: 'Materials', description: 'Upload & organise materials', href: '/dashboard/materials', accent: 'text-violet-400', accentBg: 'bg-violet-500/10', accentBorder: 'border-violet-500/15' },
    { icon: BarChart3, label: 'Analytics', description: 'Student performance insights', href: '/dashboard/analytics', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/15' },
    { icon: Users, label: 'Students', description: 'View & manage students', href: '/dashboard/students', accent: 'text-amber-400', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-500/15' },
    { icon: MessageSquare, label: 'Messages', description: 'Communicate with students', href: '/dashboard/messages', accent: 'text-cyan-400', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-500/15' },
  ],
  admin: [
    { icon: Users, label: 'Users', description: 'Manage all platform users', href: '/dashboard/users', accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/15' },
    { icon: Bell, label: 'Announcements', description: 'Post campus-wide notices', href: '/dashboard/announcements', accent: 'text-violet-400', accentBg: 'bg-violet-500/10', accentBorder: 'border-violet-500/15' },
    { icon: BarChart3, label: 'Analytics', description: 'Platform-wide statistics', href: '/dashboard/analytics', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/15' },
    { icon: FileText, label: 'Reports', description: 'Generate & export reports', href: '/dashboard/reports', accent: 'text-amber-400', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-500/15' },
    { icon: Settings, label: 'Settings', description: 'Platform configuration', href: '/dashboard/settings', accent: 'text-rose-400', accentBg: 'bg-rose-500/10', accentBorder: 'border-rose-500/15' },
  ],
  employee: [
    { icon: Briefcase, label: 'Opportunities', description: 'Post & manage job listings', href: '/dashboard/opportunities', accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/15' },
    { icon: MessageSquare, label: 'Feed', description: 'Campus activity feed', href: '/dashboard/feed', accent: 'text-violet-400', accentBg: 'bg-violet-500/10', accentBorder: 'border-violet-500/15' },
    { icon: Users, label: 'Networking', description: 'Connect with talent', href: '/dashboard/networking', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/15' },
    { icon: MessageSquare, label: 'Messages', description: 'Direct conversations', href: '/dashboard/messages', accent: 'text-cyan-400', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-500/15' },
  ],
  placement: [
    { icon: Briefcase, label: 'Opportunities', description: 'Manage placement drives', href: '/dashboard/opportunities', accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/15' },
    { icon: Award, label: 'Applications', description: 'Review student applications', href: '/dashboard/applications', accent: 'text-violet-400', accentBg: 'bg-violet-500/10', accentBorder: 'border-violet-500/15' },
    { icon: Shield, label: 'Companies', description: 'Manage company profiles', href: '/dashboard/companies', accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/15' },
    { icon: BarChart3, label: 'Analytics', description: 'Placement statistics', href: '/dashboard/analytics', accent: 'text-amber-400', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-500/15' },
  ],
}

const statsByRole: Record<string, StatCardProps[]> = {
  student: [
    { label: 'Active Courses', value: '6', sub: 'This semester' },
    { label: 'Attendance', value: '87%', delta: '+3% this week', deltaUp: true },
    { label: 'Applications', value: '4', sub: '2 under review' },
    { label: 'CGPA', value: '8.4', delta: '+0.2 from last sem', deltaUp: true },
  ],
  faculty: [
    { label: 'Active Courses', value: '4', sub: 'This semester' },
    { label: 'Total Students', value: '186', delta: '+12 this month', deltaUp: true },
    { label: 'Materials Uploaded', value: '34', sub: 'Across all courses' },
    { label: 'Avg Attendance', value: '82%', delta: '-2% this week', deltaUp: false },
  ],
  admin: [
    { label: 'Total Users', value: '1,234', delta: '+18 this week', deltaUp: true },
    { label: 'Active Sessions', value: '456', sub: 'Right now' },
    { label: 'Pending Tasks', value: '23', delta: '-5 from yesterday', deltaUp: true },
    { label: 'Completed', value: '892', sub: 'All time' },
  ],
  employee: [
    { label: 'Jobs Posted', value: '8', sub: 'Active listings' },
    { label: 'Applications', value: '143', delta: '+22 this week', deltaUp: true },
    { label: 'Shortlisted', value: '31', sub: 'Awaiting interview' },
    { label: 'Hired', value: '12', delta: '+3 this month', deltaUp: true },
  ],
  placement: [
    { label: 'Active Drives', value: '7', sub: 'Ongoing' },
    { label: 'Applications', value: '512', delta: '+48 this week', deltaUp: true },
    { label: 'Offers Made', value: '89', delta: '+11 this month', deltaUp: true },
    { label: 'Placement Rate', value: '87%', delta: '+5% vs last year', deltaUp: true },
  ],
}

const recentActivity = [
  { icon: UserPlus, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', title: 'New user registration', time: '2 min ago', dot: 'bg-blue-500' },
  { icon: BookMarked, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', title: 'Course material uploaded', time: '15 min ago', dot: 'bg-emerald-500' },
  { icon: Briefcase, iconBg: 'bg-violet-500/10', iconColor: 'text-violet-400', title: 'New job posted', time: '1 hour ago', dot: 'bg-violet-500' },
  { icon: FileText, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400', title: 'Application submitted', time: '3 hours ago', dot: 'bg-amber-500' },
  { icon: CheckCircle2, iconBg: 'bg-rose-500/10', iconColor: 'text-rose-400', title: 'Placement confirmed', time: '5 hours ago', dot: 'bg-rose-500' },
]

const weeklyData = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 92 },
  { day: 'Thu', value: 81 },
  { day: 'Fri', value: 88 },
  { day: 'Sat', value: 45 },
  { day: 'Sun', value: 52 },
]

export default function DashboardPage() {
  const { user, userRole } = useAuth()

  const role = (
    userRole && ['student', 'faculty', 'admin', 'employee', 'placement'].includes(userRole)
      ? userRole
      : 'student'
  ) as keyof typeof quickActionsByRole

  const firstName = user?.displayName?.split(' ')[0] || 'there'
  const stats = statsByRole[role] ?? statsByRole.student
  const actions = quickActionsByRole[role] ?? quickActionsByRole.student

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{greeting}</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">{firstName}</h1>
          <p className="text-sm text-white/35 mt-1">
            Here's what's happening on your campus today.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] text-xs text-white/35">
            <Clock className="h-3 w-3" />
            {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Quick actions ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide">Quick Access</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {actions.map((a) => (
            <QuickAction key={a.label} {...a} />
          ))}
        </div>
      </div>

      {/* ── Activity + Weekly ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly activity */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white/70">Weekly Activity</h2>
            <span className="text-xs text-white/25">This week</span>
          </div>
          <div className="space-y-3">
            {weeklyData.map((d) => (
              <WeeklyBar key={d.day} {...d} />
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white/70">Recent Activity</h2>
            <button className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors">
              View all
            </button>
          </div>
          <div>
            {recentActivity.map((a) => (
              <ActivityItem key={a.title} {...a} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
