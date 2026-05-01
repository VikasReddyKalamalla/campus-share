'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Users,
  BookOpen,
  BarChart3,
  Bell,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Academic Tracking',
    description:
      'Monitor courses, grades, attendance, and academic milestones in one unified view.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Briefcase,
    title: 'Placement Portal',
    description:
      'Browse opportunities, submit applications, and track every stage of your hiring pipeline.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: Users,
    title: 'Campus Network',
    description:
      'Build meaningful connections with peers, faculty, and industry professionals.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Institutional dashboards with real-time data on placements, performance, and engagement.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Bell,
    title: 'Announcements',
    description:
      'Stay informed with targeted notifications for events, deadlines, and campus updates.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: GraduationCap,
    title: 'Resource Library',
    description:
      'Access lecture notes, study materials, and curated resources organised by subject.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
]

const stats = [
  { value: '10,000+', label: 'Active Students' },
  { value: '500+', label: 'Hiring Partners' },
  { value: '95%', label: 'Placement Rate' },
  { value: '1,200+', label: 'Study Resources' },
]

const highlights = [
  'Role-based dashboards for students, faculty, and admins',
  'End-to-end placement workflow management',
  'Real-time collaboration and messaging',
  'Secure, institution-grade data handling',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-blue-500/30">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial glow — top center */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-blue-600/10 blur-[120px] -translate-y-1/3" />
      </div>

      <div className="relative z-10">
        {/* ── Navbar ── */}
        <header className="border-b border-white/[0.06] backdrop-blur-sm bg-[#0a0a0f]/80 sticky top-0 z-50">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <GraduationCap className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-semibold text-[15px] tracking-tight">Campus Hub</span>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-sm text-white/50">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#stats" className="hover:text-white transition-colors">About</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/5 text-sm"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 h-8 rounded-md font-medium transition-colors"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="container mx-auto px-6 pt-28 pb-24 max-w-6xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/60 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Trusted by 10,000+ students across institutions
          </div>

          <h1 className="text-5xl md:text-[68px] font-bold tracking-tight leading-[1.08] mb-6">
            The campus platform
            <br />
            <span className="text-white/30">built for outcomes.</span>
          </h1>

          <p className="text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-10">
            Campus Hub unifies academics, placements, collaboration, and
            institutional analytics into a single, cohesive workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/register">
              <Button className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="h-11 px-6 border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium rounded-lg text-sm transition-colors"
              >
                Sign in to your account
              </Button>
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-1.5 text-xs text-white/35">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/70" />
                {h}
              </span>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section id="stats" className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="container mx-auto px-6 py-14 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-white tracking-tight">{s.value}</div>
                  <div className="text-sm text-white/35 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-3">
              Platform capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Everything your campus needs,
              <br />
              <span className="text-white/30">in one place.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className={`group relative rounded-xl border ${f.border} bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors duration-200`}
                >
                  <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-white text-[15px] mb-1.5">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-white/25 group-hover:text-white/50 transition-colors">
                    Learn more <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="container mx-auto px-6 pb-24 max-w-6xl">
          <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-600/15 via-transparent to-violet-600/10 p-12 text-center overflow-hidden">
            {/* inner glow */}
            <div className="pointer-events-none absolute inset-0 flex justify-center items-end">
              <div className="h-48 w-96 rounded-full bg-blue-500/10 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to transform your campus experience?
              </h2>
              <p className="text-white/40 text-base mb-8 max-w-md mx-auto">
                Join thousands of students and institutions already using Campus Hub.
              </p>
              <Link href="/register">
                <Button className="h-11 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition-colors inline-flex items-center gap-2">
                  Create your account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <div className="w-5 h-5 rounded bg-blue-600/60 flex items-center justify-center">
                <GraduationCap className="h-3 w-3 text-white" />
              </div>
              Campus Hub
            </div>
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} Campus Hub. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-white/25">
              <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/50 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
