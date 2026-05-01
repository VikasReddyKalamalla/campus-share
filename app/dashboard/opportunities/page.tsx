'use client'

import { useState } from 'react'
import {
  Briefcase, Users, Calendar, MapPin, IndianRupee,
  Plus, Search, ChevronRight, X, Check, Loader2,
  Building2, Clock, TrendingUp, Eye, Edit3, Trash2,
  Send, CheckCircle2,
} from 'lucide-react'

type JobType   = 'Full-time' | 'Internship' | 'Contract'
type JobStatus = 'Active' | 'Closed' | 'Draft'

interface Job {
  id: string; title: string; company: string; location: string
  salary: string; type: JobType; status: JobStatus
  applicants: number; deadline: string; description: string
  skills: string[]
}

const initialJobs: Job[] = [
  { id: 'j1', title: 'Software Engineer',  company: 'Google',    location: 'Bangalore', salary: '₹15–20 LPA', type: 'Full-time',  status: 'Active', applicants: 45, deadline: 'May 15', description: 'Join the core infrastructure team building scalable systems.', skills: ['React', 'Node.js', 'Go'] },
  { id: 'j2', title: 'Data Scientist',     company: 'Microsoft', location: 'Hyderabad', salary: '₹18–25 LPA', type: 'Full-time',  status: 'Active', applicants: 38, deadline: 'May 18', description: 'Analyse large datasets to drive product decisions across Azure.', skills: ['Python', 'SQL', 'ML'] },
  { id: 'j3', title: 'Product Manager',    company: 'Amazon',    location: 'Mumbai',    salary: '₹25–30 LPA', type: 'Full-time',  status: 'Active', applicants: 28, deadline: 'May 22', description: 'Own the roadmap for Amazon Pay features serving 100M+ customers.', skills: ['Strategy', 'Agile', 'Analytics'] },
  { id: 'j4', title: 'DevOps Engineer',    company: 'Netflix',   location: 'Bangalore', salary: '₹20–28 LPA', type: 'Full-time',  status: 'Active', applicants: 32, deadline: 'May 25', description: 'Build and maintain CI/CD pipelines for streaming infrastructure.', skills: ['Docker', 'Kubernetes', 'AWS'] },
  { id: 'j5', title: 'ML Intern',          company: 'Swiggy',    location: 'Bangalore', salary: '₹60k/month', type: 'Internship', status: 'Active', applicants: 61, deadline: 'May 10', description: 'Work on recommendation systems for food discovery.', skills: ['Python', 'TensorFlow', 'MLOps'] },
]

const typeConfig: Record<JobType, { color: string; bg: string; border: string }> = {
  'Full-time':  { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  'Internship': { color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
  'Contract':   { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
}
const statusConfig: Record<JobStatus, { color: string; bg: string; border: string; dot: string }> = {
  Active: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  Closed: { color: 'text-white/30',    bg: 'bg-white/[0.04]',   border: 'border-white/[0.08]',   dot: 'bg-white/20'    },
  Draft:  { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   dot: 'bg-amber-500'   },
}

function PostModal({ onClose, onPost }: { onClose: () => void; onPost: (j: Job) => void }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', salary: '', type: 'Full-time' as JobType, deadline: '', description: '', skills: '' })
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handlePost = () => {
    if (!form.title.trim() || !form.company.trim()) return
    setLoading(true)
    setTimeout(() => {
      onPost({ id: `j${Date.now()}`, ...form, status: 'Active', applicants: 0, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) })
      setLoading(false); onClose()
    }, 900)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Post Opportunity</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[{ label: 'Job Title', key: 'title', placeholder: 'e.g. Software Engineer' }, { label: 'Company', key: 'company', placeholder: 'e.g. Google' }].map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label><input value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: 'Location', key: 'location', placeholder: 'e.g. Bangalore' }, { label: 'Salary', key: 'salary', placeholder: 'e.g. ₹15–20 LPA' }].map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label><input value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Type</label><select value={form.type} onChange={(e) => set('type', e.target.value as JobType)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{(['Full-time','Internship','Contract'] as JobType[]).map((t) => <option key={t} value={t} className="bg-[#111118]">{t}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Deadline</label><input value={form.deadline} onChange={(e) => set('deadline', e.target.value)} placeholder="e.g. May 30" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          </div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Skills <span className="normal-case text-white/20">(comma-separated)</span></label><input value={form.skills} onChange={(e) => set('skills', e.target.value)} placeholder="React, Node.js, TypeScript" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Description</label><textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief job description…" rows={3} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" /></div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handlePost} disabled={loading} className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Posting…</> : <><Send className="h-3.5 w-3.5" />Post Job</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<JobType | 'All'>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showPost, setShowPost] = useState(false)

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchType   = filterType === 'All' || j.type === filterType
    return matchSearch && matchType
  })

  const totalApplicants = jobs.reduce((s, j) => s + j.applicants, 0)
  const activeJobs = jobs.filter((j) => j.status === 'Active').length

  const stats = [
    { label: 'Active Postings', value: activeJobs.toString(),          sub: 'Live listings',      icon: Briefcase,  accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Applications',    value: totalApplicants.toString(),      sub: 'Total received',     icon: Users,      accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Interviews',      value: '45',                            sub: 'Scheduled',          icon: Calendar,   accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Hired',           value: '12',                            sub: 'This quarter',       icon: CheckCircle2,accent: 'text-amber-400',  bg: 'bg-amber-500/10'   },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Employee</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Opportunities</h1>
          <p className="text-sm text-white/35 mt-1">Post and manage job opportunities for campus talent.</p>
        </div>
        <button onClick={() => setShowPost(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" />Post Opportunity
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

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or company…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        {(['All', 'Full-time', 'Internship', 'Contract'] as (JobType | 'All')[]).map((t) => (
          <button key={t} onClick={() => setFilterType(t)} className={`h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${filterType === t ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((job) => {
          const tc = typeConfig[job.type]; const sc = statusConfig[job.status]; const isExpanded = expandedId === job.id
          return (
            <div key={job.id} className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : job.id)}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-4.5 w-4.5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[14px] font-semibold text-white/80">{job.title}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>{job.type}</span>
                    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium border ${sc.bg} ${sc.color} ${sc.border}`}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{job.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-white/35"><Building2 className="h-3 w-3" />{job.company}</span>
                    <span className="flex items-center gap-1 text-[11px] text-white/35"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1 text-[11px] text-white/35"><IndianRupee className="h-3 w-3" />{job.salary.replace('₹','')}</span>
                    <span className="flex items-center gap-1 text-[11px] text-white/35"><Users className="h-3 w-3" />{job.applicants} applicants</span>
                    <span className="flex items-center gap-1 text-[11px] text-white/35"><Clock className="h-3 w-3" />Due {job.deadline}</span>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 text-white/20 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/[0.05]">
                  <p className="text-[13px] text-white/45 leading-relaxed mt-3 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.map((s) => <span key={s} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/40">{s}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors"><Eye className="h-3.5 w-3.5" />View Applications</button>
                    <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 transition-colors"><Edit3 className="h-3.5 w-3.5" />Edit</button>
                    <button onClick={() => setJobs((p) => p.filter((j) => j.id !== job.id))} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400/60 hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" />Delete</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && <div className="py-12 text-center rounded-xl border border-dashed border-white/[0.07]"><Briefcase className="h-8 w-8 text-white/10 mx-auto mb-2" /><p className="text-[13px] text-white/25">No opportunities match your search</p></div>}
      </div>

      {showPost && <PostModal onClose={() => setShowPost(false)} onPost={(j) => setJobs((p) => [j, ...p])} />}
    </div>
  )
}
