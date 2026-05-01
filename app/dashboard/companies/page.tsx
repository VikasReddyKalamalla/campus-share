'use client'

import { useState } from 'react'
import {
  Building2, Users, Briefcase, CheckCircle2, Plus,
  Search, X, ChevronRight, MapPin, Globe, Phone,
  Mail, TrendingUp, Check, Loader2, Edit3, Trash2,
  Eye, Calendar, Award,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type CompanyStatus = 'Active' | 'Scheduled' | 'Completed' | 'Inactive'
type DriveType     = 'Full-time' | 'Internship' | 'Both'

interface Company {
  id: string
  name: string
  initials: string
  industry: string
  location: string
  website: string
  contact: string
  email: string
  positions: number
  hired: number
  status: CompanyStatus
  driveType: DriveType
  driveDate: string
  accent: string
  accentBg: string
  accentBorder: string
  description: string
}

// ── Config ─────────────────────────────────────────────────────────────────
const statusConfig: Record<CompanyStatus, {
  color: string; bg: string; border: string; dot: string
}> = {
  Active:    { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  Scheduled: { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    dot: 'bg-blue-500'    },
  Completed: { color: 'text-white/40',    bg: 'bg-white/[0.05]',   border: 'border-white/[0.08]',   dot: 'bg-white/30'    },
  Inactive:  { color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     dot: 'bg-red-500'     },
}

const driveTypeConfig: Record<DriveType, { color: string; bg: string; border: string }> = {
  'Full-time':  { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
  'Internship': { color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  'Both':       { color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialCompanies: Company[] = [
  {
    id: 'c1', name: 'Google', initials: 'G', industry: 'Technology', location: 'Bangalore',
    website: 'google.com', contact: '+91 80 6721 8000', email: 'campus@google.com',
    positions: 15, hired: 12, status: 'Active', driveType: 'Full-time', driveDate: 'May 15',
    accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/20',
    description: 'Google is recruiting for software engineering and data roles across its Bangalore office.',
  },
  {
    id: 'c2', name: 'Microsoft', initials: 'MS', industry: 'Technology', location: 'Hyderabad',
    website: 'microsoft.com', contact: '+91 40 6726 0000', email: 'campus@microsoft.com',
    positions: 12, hired: 10, status: 'Active', driveType: 'Both', driveDate: 'May 18',
    accent: 'text-cyan-400', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-500/20',
    description: 'Microsoft is hiring for full-time and internship roles in Azure, M365, and AI divisions.',
  },
  {
    id: 'c3', name: 'Amazon', initials: 'A', industry: 'E-Commerce', location: 'Mumbai',
    website: 'amazon.in', contact: '+91 22 6121 8000', email: 'campus@amazon.com',
    positions: 18, hired: 14, status: 'Active', driveType: 'Full-time', driveDate: 'May 22',
    accent: 'text-amber-400', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-500/20',
    description: 'Amazon is recruiting for SDE, PM, and operations roles for its India headquarters.',
  },
  {
    id: 'c4', name: 'Meta', initials: 'M', industry: 'Social Media', location: 'Pune',
    website: 'meta.com', contact: '+91 20 6721 9000', email: 'campus@meta.com',
    positions: 8, hired: 6, status: 'Scheduled', driveType: 'Internship', driveDate: 'Jun 5',
    accent: 'text-blue-400', accentBg: 'bg-blue-500/10', accentBorder: 'border-blue-500/20',
    description: 'Meta is conducting an internship drive for frontend, backend, and ML roles.',
  },
  {
    id: 'c5', name: 'Netflix', initials: 'N', industry: 'Entertainment', location: 'Bangalore',
    website: 'netflix.com', contact: '+91 80 6721 7000', email: 'campus@netflix.com',
    positions: 5, hired: 4, status: 'Completed', driveType: 'Full-time', driveDate: 'Apr 20',
    accent: 'text-red-400', accentBg: 'bg-red-500/10', accentBorder: 'border-red-500/20',
    description: 'Netflix completed its campus drive for DevOps and streaming infrastructure roles.',
  },
  {
    id: 'c6', name: 'Tesla', initials: 'T', industry: 'Automotive / EV', location: 'Chennai',
    website: 'tesla.com', contact: '+91 44 6721 5000', email: 'campus@tesla.com',
    positions: 10, hired: 0, status: 'Scheduled', driveType: 'Both', driveDate: 'Jun 12',
    accent: 'text-rose-400', accentBg: 'bg-rose-500/10', accentBorder: 'border-rose-500/20',
    description: 'Tesla is planning a drive for embedded systems, ML, and manufacturing engineering roles.',
  },
]

// ── Add Company Modal ──────────────────────────────────────────────────────
function AddCompanyModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (c: Company) => void
}) {
  const [form, setForm] = useState({
    name: '', industry: '', location: '', website: '',
    contact: '', email: '', positions: '', driveDate: '',
    driveType: 'Full-time' as DriveType, description: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleAdd = () => {
    if (!form.name.trim() || !form.industry.trim()) return
    setLoading(true)
    setTimeout(() => {
      const initials = form.name.slice(0, 2).toUpperCase()
      const accents = [
        { accent: 'text-blue-400',    accentBg: 'bg-blue-500/10',    accentBorder: 'border-blue-500/20'    },
        { accent: 'text-violet-400',  accentBg: 'bg-violet-500/10',  accentBorder: 'border-violet-500/20'  },
        { accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-500/20' },
        { accent: 'text-amber-400',   accentBg: 'bg-amber-500/10',   accentBorder: 'border-amber-500/20'   },
      ]
      const pick = accents[Math.floor(Math.random() * accents.length)]
      const newCompany: Company = {
        id: `c${Date.now()}`, ...form, initials,
        positions: parseInt(form.positions) || 0,
        hired: 0, status: 'Scheduled', ...pick,
      }
      onAdd(newCompany)
      setLoading(false)
      setDone(true)
      setTimeout(() => onClose(), 800)
    }, 900)
  }

  const fields: { label: string; key: keyof typeof form; placeholder: string }[] = [
    { label: 'Company Name', key: 'name',      placeholder: 'e.g. Google'          },
    { label: 'Industry',     key: 'industry',  placeholder: 'e.g. Technology'       },
    { label: 'Location',     key: 'location',  placeholder: 'e.g. Bangalore'        },
    { label: 'Website',      key: 'website',   placeholder: 'e.g. google.com'       },
    { label: 'Contact',      key: 'contact',   placeholder: '+91 80 0000 0000'      },
    { label: 'Email',        key: 'email',     placeholder: 'campus@company.com'    },
    { label: 'Positions',    key: 'positions', placeholder: 'Number of openings'    },
    { label: 'Drive Date',   key: 'driveDate', placeholder: 'e.g. Jun 15'           },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Add Company</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {fields.slice(0, 4).map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label>
                <input
                  value={form[key] as string}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fields.slice(4, 8).map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label>
                <input
                  value={form[key] as string}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Drive Type</label>
            <div className="flex gap-2">
              {(['Full-time', 'Internship', 'Both'] as DriveType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => set('driveType', t)}
                  className={`flex-1 h-9 rounded-lg text-[12px] font-medium transition-colors border ${
                    form.driveType === t
                      ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                      : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Brief description of the drive…"
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!form.name.trim() || loading || done}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              done
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
            }`}
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {loading ? 'Adding…' : done ? 'Added!' : 'Add Company'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Detail Modal ───────────────────────────────────────────────────────────
function DetailModal({ company, onClose, onDelete }: {
  company: Company
  onClose: () => void
  onDelete: (id: string) => void
}) {
  const sc = statusConfig[company.status]
  const tc = driveTypeConfig[company.driveType]
  const hireRate = company.positions > 0
    ? Math.round((company.hired / company.positions) * 100)
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl ${company.accentBg} border ${company.accentBorder} flex items-center justify-center text-[15px] font-bold flex-shrink-0 ${company.accent}`}>
              {company.initials}
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-white/80">{company.name}</h3>
              <p className="text-[12px] text-white/35 mt-0.5">{company.industry}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color} ${sc.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {company.status}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>
                  {company.driveType}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {company.description && (
            <p className="text-[13px] text-white/45 leading-relaxed">{company.description}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Location',   value: company.location,  icon: MapPin    },
              { label: 'Drive Date', value: company.driveDate, icon: Calendar  },
              { label: 'Website',    value: company.website,   icon: Globe     },
              { label: 'Email',      value: company.email,     icon: Mail      },
            ].map((d) => {
              const DIcon = d.icon
              return (
                <div key={d.label} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <DIcon className="h-3.5 w-3.5 text-white/25 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/25 uppercase tracking-wide">{d.label}</p>
                    <p className="text-[12px] text-white/60 font-medium truncate">{d.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hire rate */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-white/60">Hiring Progress</p>
              <span className="text-[12px] font-bold text-emerald-400">{hireRate}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${hireRate}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-white/30">
              <span>{company.hired} hired</span>
              <span>{company.positions} positions</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-white/[0.06]">
          <button
            onClick={() => { onDelete(company.id); onClose() }}
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400/70 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
          <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 transition-colors">
            <Edit3 className="h-3.5 w-3.5" /> Edit
          </button>
          <button onClick={onClose} className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Company Card ───────────────────────────────────────────────────────────
function CompanyCard({ company, onView }: { company: Company; onView: () => void }) {
  const sc = statusConfig[company.status]
  const tc = driveTypeConfig[company.driveType]
  const hireRate = company.positions > 0
    ? Math.round((company.hired / company.positions) * 100)
    : 0

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-xl ${company.accentBg} border ${company.accentBorder} flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${company.accent}`}>
            {company.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-white/80 truncate">{company.name}</p>
            <p className="text-[12px] text-white/35 truncate">{company.industry}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border flex-shrink-0 ${sc.bg} ${sc.color} ${sc.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {company.status}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-1 text-[11px] text-white/30">
          <MapPin className="h-3 w-3" />{company.location}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-white/30">
          <Calendar className="h-3 w-3" />{company.driveDate}
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>
          {company.driveType}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white/25 uppercase tracking-wide mb-1">Positions</p>
          <p className="text-[20px] font-bold text-white/80">{company.positions}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white/25 uppercase tracking-wide mb-1">Hired</p>
          <p className="text-[20px] font-bold text-emerald-400">{company.hired}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-white/30">Hire rate</p>
          <p className="text-[11px] font-semibold text-white/50">{hireRate}%</p>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              hireRate >= 80 ? 'bg-emerald-500' : hireRate >= 50 ? 'bg-blue-500' : 'bg-amber-500'
            }`}
            style={{ width: `${hireRate}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <button
        onClick={onView}
        className="flex items-center justify-center gap-1.5 h-9 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors mt-auto"
      >
        <Eye className="h-3.5 w-3.5" /> View Details
      </button>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CompaniesPage() {
  const [companies, setCompanies]   = useState(initialCompanies)
  const [search, setSearch]         = useState('')
  const [filterStatus, setFilter]   = useState<CompanyStatus | 'All'>('All')
  const [showAdd, setShowAdd]       = useState(false)
  const [viewCompany, setView]      = useState<Company | null>(null)

  const filtered = companies.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalPositions = companies.reduce((s, c) => s + c.positions, 0)
  const totalHired     = companies.reduce((s, c) => s + c.hired, 0)
  const activeCount    = companies.filter((c) => c.status === 'Active').length
  const overallRate    = totalPositions > 0 ? Math.round((totalHired / totalPositions) * 100) : 0

  const filterButtons: { id: CompanyStatus | 'All'; label: string }[] = [
    { id: 'All',       label: 'All'       },
    { id: 'Active',    label: 'Active'    },
    { id: 'Scheduled', label: 'Scheduled' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Inactive',  label: 'Inactive'  },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Placement Cell</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Companies</h1>
          <p className="text-sm text-white/35 mt-1">Manage recruiting companies and campus drives.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> Add Company
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Companies', value: companies.length.toString(), sub: 'Registered',       icon: Building2,    accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
          { label: 'Active Drives',   value: activeCount.toString(),      sub: 'Ongoing',          icon: TrendingUp,   accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total Positions', value: totalPositions.toString(),   sub: 'Open roles',       icon: Briefcase,    accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
          { label: 'Total Hired',     value: totalHired.toString(),       sub: `${overallRate}% fill rate`, icon: Award, accent: 'text-amber-400', bg: 'bg-amber-500/10'  },
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

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, industry, or location…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {filterButtons.map((f) => {
            const cfg = f.id !== 'All' ? statusConfig[f.id as CompanyStatus] : null
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
        {filtered.length} compan{filtered.length !== 1 ? 'ies' : 'y'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <Building2 className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No companies match your search</p>
          <button
            onClick={() => { setSearch(''); setFilter('All') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onView={() => setView(company)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAdd && (
        <AddCompanyModal
          onClose={() => setShowAdd(false)}
          onAdd={(c) => setCompanies((p) => [c, ...p])}
        />
      )}
      {viewCompany && (
        <DetailModal
          company={viewCompany}
          onClose={() => setView(null)}
          onDelete={(id) => setCompanies((p) => p.filter((c) => c.id !== id))}
        />
      )}
    </div>
  )
}
