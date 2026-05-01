'use client'

import { useState } from 'react'
import {
  FileText, Clock, CheckCircle2, XCircle, Search,
  Filter, ChevronRight, X, Building2, MapPin,
  Calendar, User, ArrowUpRight, Check, Loader2,
  TrendingUp, Eye, MoreHorizontal, Download,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type AppStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Interview'
type JobType   = 'Full-time' | 'Internship' | 'Contract'

interface Application {
  id: string
  student: string
  initials: string
  position: string
  company: string
  location: string
  type: JobType
  status: AppStatus
  date: string
  resume: string
  accent: string
}

// ── Config ─────────────────────────────────────────────────────────────────
const statusConfig: Record<AppStatus, {
  color: string; bg: string; border: string; dot: string; icon: React.ElementType
}> = {
  Pending:   { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   dot: 'bg-amber-500',   icon: Clock         },
  Accepted:  { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500', icon: CheckCircle2  },
  Rejected:  { color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     dot: 'bg-red-500',     icon: XCircle       },
  Interview: { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    dot: 'bg-blue-500',    icon: User          },
}

const typeConfig: Record<JobType, { color: string; bg: string; border: string }> = {
  'Full-time':  { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
  'Internship': { color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  'Contract':   { color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialApplications: Application[] = [
  { id: 'a1',  student: 'John Doe',       initials: 'JD', position: 'Software Engineer',  company: 'Google',    location: 'Bangalore', type: 'Full-time',  status: 'Pending',   date: 'Apr 25', resume: 'john_doe_resume.pdf',       accent: 'text-blue-400'    },
  { id: 'a2',  student: 'Jane Smith',     initials: 'JS', position: 'Data Analyst',       company: 'Microsoft', location: 'Hyderabad', type: 'Full-time',  status: 'Accepted',  date: 'Apr 24', resume: 'jane_smith_resume.pdf',     accent: 'text-violet-400'  },
  { id: 'a3',  student: 'Bob Johnson',    initials: 'BJ', position: 'Product Manager',    company: 'Amazon',    location: 'Mumbai',    type: 'Full-time',  status: 'Interview', date: 'Apr 23', resume: 'bob_johnson_resume.pdf',    accent: 'text-amber-400'   },
  { id: 'a4',  student: 'Alice Williams', initials: 'AW', position: 'UX Designer',        company: 'Meta',      location: 'Pune',      type: 'Full-time',  status: 'Rejected',  date: 'Apr 22', resume: 'alice_williams_resume.pdf', accent: 'text-rose-400'    },
  { id: 'a5',  student: 'Charlie Brown',  initials: 'CB', position: 'DevOps Engineer',    company: 'Netflix',   location: 'Bangalore', type: 'Full-time',  status: 'Accepted',  date: 'Apr 21', resume: 'charlie_brown_resume.pdf',  accent: 'text-emerald-400' },
  { id: 'a6',  student: 'Diana Prince',   initials: 'DP', position: 'ML Intern',          company: 'Swiggy',    location: 'Bangalore', type: 'Internship', status: 'Pending',   date: 'Apr 20', resume: 'diana_prince_resume.pdf',   accent: 'text-cyan-400'    },
  { id: 'a7',  student: 'Ethan Hunt',     initials: 'EH', position: 'Backend Engineer',   company: 'Flipkart',  location: 'Bangalore', type: 'Full-time',  status: 'Interview', date: 'Apr 19', resume: 'ethan_hunt_resume.pdf',     accent: 'text-blue-400'    },
  { id: 'a8',  student: 'Fiona Green',    initials: 'FG', position: 'Frontend Engineer',  company: 'Razorpay',  location: 'Bangalore', type: 'Full-time',  status: 'Pending',   date: 'Apr 18', resume: 'fiona_green_resume.pdf',    accent: 'text-violet-400'  },
  { id: 'a9',  student: 'George Miller',  initials: 'GM', position: 'Security Analyst',   company: 'Zomato',    location: 'Gurgaon',   type: 'Contract',   status: 'Rejected',  date: 'Apr 17', resume: 'george_miller_resume.pdf',  accent: 'text-amber-400'   },
  { id: 'a10', student: 'Hannah Lee',     initials: 'HL', position: 'Data Science Intern', company: 'Ola',      location: 'Bangalore', type: 'Internship', status: 'Accepted',  date: 'Apr 16', resume: 'hannah_lee_resume.pdf',     accent: 'text-emerald-400' },
]

// ── Detail Modal ───────────────────────────────────────────────────────────
function DetailModal({ app, onClose, onStatusChange }: {
  app: Application
  onClose: () => void
  onStatusChange: (id: string, status: AppStatus) => void
}) {
  const sc = statusConfig[app.status]
  const tc = typeConfig[app.type]
  const [updating, setUpdating] = useState(false)
  const [done, setDone]         = useState(false)
  const [newStatus, setNewStatus] = useState<AppStatus>(app.status)

  const handleUpdate = () => {
    if (newStatus === app.status) return
    setUpdating(true)
    setTimeout(() => {
      onStatusChange(app.id, newStatus)
      setUpdating(false)
      setDone(true)
      setTimeout(() => onClose(), 800)
    }, 900)
  }

  const statuses: AppStatus[] = ['Pending', 'Interview', 'Accepted', 'Rejected']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${app.accent}`}>
              {app.initials}
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-white/80">{app.student}</h3>
              <p className="text-[12px] text-white/35 mt-0.5">{app.position} · {app.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Company',  value: app.company,  icon: Building2 },
              { label: 'Location', value: app.location, icon: MapPin    },
              { label: 'Type',     value: app.type,     icon: FileText  },
              { label: 'Applied',  value: app.date,     icon: Calendar  },
            ].map((d) => {
              const DIcon = d.icon
              return (
                <div key={d.label} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <DIcon className="h-3.5 w-3.5 text-white/25 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-white/25 uppercase tracking-wide">{d.label}</p>
                    <p className="text-[12px] text-white/60 font-medium">{d.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Current status */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
            <p className="text-[12px] text-white/40">Current status:</p>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${sc.bg} ${sc.color} ${sc.border}`}>
              {app.status}
            </span>
          </div>

          {/* Update status */}
          <div className="space-y-2">
            <p className="text-[11px] text-white/35 uppercase tracking-wide">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => {
                const cfg = statusConfig[s]
                return (
                  <button
                    key={s}
                    onClick={() => setNewStatus(s)}
                    className={`flex items-center gap-2 h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${
                      newStatus === s
                        ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                        : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Resume */}
          <button className="w-full flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors">
            <Download className="h-3.5 w-3.5" />
            Download Resume — {app.resume}
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-white/[0.06]">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={newStatus === app.status || updating || done}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              done
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40'
            }`}
          >
            {updating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : null}
            {updating ? 'Updating…' : done ? 'Updated!' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
  const [apps, setApps]           = useState(initialApplications)
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilter] = useState<AppStatus | 'All'>('All')
  const [viewApp, setViewApp]     = useState<Application | null>(null)

  const handleStatusChange = (id: string, status: AppStatus) =>
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))

  const filtered = apps.filter((a) => {
    const matchSearch =
      a.student.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  const counts = {
    total:     apps.length,
    pending:   apps.filter((a) => a.status === 'Pending').length,
    interview: apps.filter((a) => a.status === 'Interview').length,
    accepted:  apps.filter((a) => a.status === 'Accepted').length,
    rejected:  apps.filter((a) => a.status === 'Rejected').length,
  }

  const acceptRate = Math.round((counts.accepted / counts.total) * 100)

  const filterButtons: { id: AppStatus | 'All'; label: string }[] = [
    { id: 'All',       label: 'All' },
    { id: 'Pending',   label: 'Pending' },
    { id: 'Interview', label: 'Interview' },
    { id: 'Accepted',  label: 'Accepted' },
    { id: 'Rejected',  label: 'Rejected' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Placement Cell</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Applications</h1>
        <p className="text-sm text-white/35 mt-1">Track and manage all student job applications.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total',      value: counts.total.toString(),     sub: 'All applications', icon: FileText,    accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
          { label: 'Pending',    value: counts.pending.toString(),   sub: 'Awaiting review',  icon: Clock,       accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
          { label: 'Interview',  value: counts.interview.toString(), sub: 'Scheduled',        icon: User,        accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
          { label: 'Accepted',   value: counts.accepted.toString(),  sub: 'Offers extended',  icon: CheckCircle2,accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Rejected',   value: counts.rejected.toString(),  sub: 'Not selected',     icon: XCircle,     accent: 'text-red-400',     bg: 'bg-red-500/10'     },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-white/35 font-medium uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-4 w-4 ${s.accent}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-white/30 mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Acceptance rate bar */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <p className="text-[13px] font-semibold text-white/70">Acceptance Rate</p>
          </div>
          <span className="text-[13px] font-bold text-emerald-400">{acceptRate}%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${acceptRate}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-white/25">{counts.accepted} accepted out of {counts.total} total</p>
          <p className="text-[11px] text-white/25">{counts.rejected} rejected</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, position, or company…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterButtons.map((f) => {
            const cfg = f.id !== 'All' ? statusConfig[f.id as AppStatus] : null
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${
                  filterStatus === f.id
                    ? cfg
                      ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                      : 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                    : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
                }`}
              >
                {cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                {f.label}
              </button>
            )
          })}
          {search && (
            <button onClick={() => setSearch('')} className="h-9 px-2 rounded-lg text-white/25 hover:text-white/60 transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-[12px] text-white/30">
        {filtered.length} application{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <FileText className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No applications match your search</p>
          <button
            onClick={() => { setSearch(''); setFilter('All') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
            {['Student', 'Position', 'Company', 'Type', 'Status', ''].map((h) => (
              <p key={h} className="text-[11px] font-semibold text-white/30 uppercase tracking-wide">{h}</p>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((app) => {
              const sc = statusConfig[app.status]
              const tc = typeConfig[app.type]
              const StatusIcon = sc.icon
              return (
                <div
                  key={app.id}
                  className="flex flex-col md:grid md:grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Student */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${app.accent}`}>
                      {app.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-white/75 truncate">{app.student}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">{app.date}</p>
                    </div>
                  </div>

                  {/* Position */}
                  <p className="text-[13px] text-white/55 truncate">{app.position}</p>

                  {/* Company */}
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-white/25 flex-shrink-0" />
                    <p className="text-[13px] text-white/55 truncate">{app.company}</p>
                  </div>

                  {/* Type */}
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border whitespace-nowrap ${tc.bg} ${tc.color} ${tc.border}`}>
                    {app.type}
                  </span>

                  {/* Status */}
                  <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${sc.bg} ${sc.color} ${sc.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                    {app.status}
                  </span>

                  {/* Action */}
                  <button
                    onClick={() => setViewApp(app)}
                    className="flex items-center gap-1 h-7 px-2.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors whitespace-nowrap"
                  >
                    <Eye className="h-3 w-3" /> Review
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Detail modal */}
      {viewApp && (
        <DetailModal
          app={viewApp}
          onClose={() => setViewApp(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
