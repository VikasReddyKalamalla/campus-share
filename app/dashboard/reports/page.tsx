'use client'

import { useState } from 'react'
import {
  BarChart3, Briefcase, BookOpen, Settings, FileText,
  IndianRupee, Download, Plus, X, Check, Loader2,
  Calendar, HardDrive, Clock, RefreshCw, Filter,
  TrendingUp, Users, Search,
} from 'lucide-react'

type ReportType = 'User Activity' | 'Placement' | 'Academic' | 'System' | 'Summary' | 'Financial'
type ReportStatus = 'Completed' | 'Generating' | 'Failed'

interface Report {
  id: string; title: string; type: ReportType; date: string
  size: string; status: ReportStatus; downloads: number
}

const initialReports: Report[] = [
  { id: 'r1', title: 'User Activity Report',    type: 'User Activity', date: 'Apr 27, 2026', size: '2.4 MB',  status: 'Completed', downloads: 12 },
  { id: 'r2', title: 'Placement Statistics',    type: 'Placement',     date: 'Apr 25, 2026', size: '1.8 MB',  status: 'Completed', downloads: 8  },
  { id: 'r3', title: 'Academic Performance',    type: 'Academic',      date: 'Apr 20, 2026', size: '3.2 MB',  status: 'Completed', downloads: 15 },
  { id: 'r4', title: 'System Usage Report',     type: 'System',        date: 'Apr 15, 2026', size: '890 KB',  status: 'Completed', downloads: 5  },
  { id: 'r5', title: 'Monthly Summary',         type: 'Summary',       date: 'Apr 1, 2026',  size: '1.5 MB',  status: 'Completed', downloads: 21 },
  { id: 'r6', title: 'Financial Report',        type: 'Financial',     date: 'Mar 31, 2026', size: '2.1 MB',  status: 'Completed', downloads: 7  },
]

const typeConfig: Record<ReportType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  'User Activity': { icon: Users,        color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  'Placement':     { icon: Briefcase,    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
  'Academic':      { icon: BookOpen,     color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'System':        { icon: Settings,     color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  'Summary':       { icon: FileText,     color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20'    },
  'Financial':     { icon: IndianRupee,  color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'    },
}

const statusConfig: Record<ReportStatus, { color: string; bg: string; border: string; dot: string }> = {
  Completed:  { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  Generating: { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   dot: 'bg-amber-500'   },
  Failed:     { color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     dot: 'bg-red-500'     },
}

// ── Generate Modal ─────────────────────────────────────────────────────────
function GenerateModal({ onClose, onGenerate }: { onClose: () => void; onGenerate: (r: Report) => void }) {
  const [form, setForm] = useState({ title: '', type: 'User Activity' as ReportType, dateFrom: '', dateTo: '' })
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleGenerate = () => {
    if (!form.title.trim()) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false); setDone(true)
      onGenerate({ id: `r${Date.now()}`, title: form.title.trim(), type: form.type, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), size: '—', status: 'Completed', downloads: 0 })
      setTimeout(() => { setDone(false); onClose() }, 800)
    }, 1500)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Generate Report</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Report Title</label><input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Q2 Placement Report" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Report Type</label><select value={form.type} onChange={(e) => set('type', e.target.value as ReportType)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{(Object.keys(typeConfig) as ReportType[]).map((t) => <option key={t} value={t} className="bg-[#111118]">{t}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">From</label><input value={form.dateFrom} onChange={(e) => set('dateFrom', e.target.value)} placeholder="e.g. Jan 1, 2026" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">To</label><input value={form.dateTo} onChange={(e) => set('dateTo', e.target.value)} placeholder="e.g. Mar 31, 2026" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleGenerate} disabled={!form.title.trim() || generating || done} className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${done ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'}`}>
            {generating ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Generating…</> : done ? <><Check className="h-3.5 w-3.5" />Generated!</> : <><BarChart3 className="h-3.5 w-3.5" />Generate</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Report Card ────────────────────────────────────────────────────────────
function ReportCard({ report, onDownload }: { report: Report; onDownload: () => void }) {
  const [dlState, setDlState] = useState<'idle'|'loading'|'done'>('idle')
  const tc = typeConfig[report.type]; const sc = statusConfig[report.status]; const Icon = tc.icon
  const handleDownload = () => {
    if (dlState !== 'idle') return
    setDlState('loading')
    setTimeout(() => { setDlState('done'); onDownload(); setTimeout(() => setDlState('idle'), 2500) }, 1000)
  }
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className={`w-10 h-10 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}><Icon className={`h-5 w-5 ${tc.color}`} /></div>
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${sc.bg} ${sc.color} ${sc.border}`}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{report.status}</span>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white/80">{report.title}</p>
        <p className="text-[11px] text-white/30 mt-0.5">{report.type}</p>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-white/30">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{report.date}</span>
        {report.size !== '—' && <span className="flex items-center gap-1"><HardDrive className="h-3 w-3" />{report.size}</span>}
        <span className="flex items-center gap-1"><Download className="h-3 w-3" />{report.downloads}</span>
      </div>
      <button onClick={handleDownload} disabled={report.status !== 'Completed'} className={`w-full flex items-center justify-center gap-2 h-8 rounded-lg text-[12px] font-medium transition-colors border ${dlState === 'done' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-600/15 border-blue-500/20 text-blue-400 hover:bg-blue-600/25 disabled:opacity-40 disabled:cursor-not-allowed'}`}>
        {dlState === 'loading' ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Downloading…</> : dlState === 'done' ? <><Check className="h-3.5 w-3.5" />Downloaded</> : <><Download className="h-3.5 w-3.5" />Download PDF</>}
      </button>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<ReportType | 'All'>('All')
  const [showGenerate, setShowGenerate] = useState(false)

  const filtered = reports.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase())
    const matchType   = filterType === 'All' || r.type === filterType
    return matchSearch && matchType
  })

  const totalDownloads = reports.reduce((s, r) => s + r.downloads, 0)
  const handleDownload = (id: string) => setReports((p) => p.map((r) => r.id === id ? { ...r, downloads: r.downloads + 1 } : r))
  const handleGenerate = (r: Report) => setReports((p) => [r, ...p])

  const stats = [
    { label: 'Total Reports',    value: reports.length.toString(),                                          sub: 'Generated',       icon: FileText,  accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Total Downloads',  value: totalDownloads.toString(),                                          sub: 'All time',        icon: Download,  accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Completed',        value: reports.filter((r) => r.status === 'Completed').length.toString(),  sub: 'Ready to export', icon: Check,     accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Report Types',     value: new Set(reports.map((r) => r.type)).size.toString(),                sub: 'Categories',      icon: BarChart3, accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reports</h1>
          <p className="text-sm text-white/35 mt-1">Generate, download, and manage system reports.</p>
        </div>
        <button onClick={() => setShowGenerate(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" />Generate Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-3"><p className="text-xs text-white/35 font-medium uppercase tracking-wide">{s.label}</p><div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.accent}`} /></div></div>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-white/30 mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', ...Object.keys(typeConfig)] as (ReportType | 'All')[]).map((t) => (
            <button key={t} onClick={() => setFilterType(t)} className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${filterType === t ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Report grid */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center rounded-xl border border-dashed border-white/[0.07]"><FileText className="h-8 w-8 text-white/10 mx-auto mb-2" /><p className="text-[13px] text-white/25">No reports match your search</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => <ReportCard key={r.id} report={r} onDownload={() => handleDownload(r.id)} />)}
        </div>
      )}

      {/* Report history table */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white/70">Report History</h2>
          <span className="text-[12px] text-white/30">{reports.length} total</span>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-white/[0.05]">{['Report', 'Type', 'Date', 'Size', 'Downloads', 'Status'].map((h) => <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody>
            {reports.map((r) => {
              const tc = typeConfig[r.type]; const sc = statusConfig[r.status]; const Icon = tc.icon
              return (
                <tr key={r.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5"><div className="flex items-center gap-2.5"><div className={`w-7 h-7 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}><Icon className={`h-3.5 w-3.5 ${tc.color}`} /></div><p className="text-[13px] font-medium text-white/70">{r.title}</p></div></td>
                  <td className="px-5 py-3.5 text-[12px] text-white/40">{r.type}</td>
                  <td className="px-5 py-3.5 text-[12px] text-white/40">{r.date}</td>
                  <td className="px-5 py-3.5 text-[12px] text-white/40">{r.size}</td>
                  <td className="px-5 py-3.5 text-[12px] text-white/40">{r.downloads}</td>
                  <td className="px-5 py-3.5"><span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border w-fit ${sc.bg} ${sc.color} ${sc.border}`}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{r.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showGenerate && <GenerateModal onClose={() => setShowGenerate(false)} onGenerate={handleGenerate} />}
    </div>
  )
}
