'use client'

import { useState } from 'react'
import {
  Briefcase, MapPin, IndianRupee, Clock, Building2,
  Search, Filter, ChevronRight, CheckCircle2, XCircle,
  AlertCircle, TrendingUp, Users, ArrowUpRight, Star,
  BookmarkPlus, Bookmark, Send, X, Calendar, FileText,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type AppStatus = 'applied' | 'shortlisted' | 'interview' | 'offered' | 'rejected'
type JobType   = 'Full-time' | 'Internship' | 'Contract'
type Tab       = 'opportunities' | 'applications' | 'timeline'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: JobType
  deadline: string
  skills: string[]
  description: string
  openings: number
  applied: boolean
  saved: boolean
  logo: string   // initials
  accentColor: string
}

interface Application {
  id: string
  title: string
  company: string
  appliedOn: string
  status: AppStatus
  nextStep?: string
  logo: string
  accentColor: string
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialJobs: Job[] = [
  {
    id: 'j1', title: 'Software Engineer', company: 'Google', location: 'Bangalore',
    salary: '₹15–20 LPA', type: 'Full-time', deadline: 'May 10',
    skills: ['React', 'Node.js', 'System Design'],
    description: 'Join the core infrastructure team building scalable systems used by billions.',
    openings: 5, applied: false, saved: true, logo: 'G', accentColor: 'text-blue-400',
  },
  {
    id: 'j2', title: 'Data Analyst', company: 'Microsoft', location: 'Hyderabad',
    salary: '₹12–16 LPA', type: 'Full-time', deadline: 'May 14',
    skills: ['Python', 'SQL', 'Power BI'],
    description: 'Analyse large datasets to drive product decisions across Azure services.',
    openings: 3, applied: true, saved: false, logo: 'M', accentColor: 'text-cyan-400',
  },
  {
    id: 'j3', title: 'Product Manager', company: 'Amazon', location: 'Mumbai',
    salary: '₹25–30 LPA', type: 'Full-time', deadline: 'May 18',
    skills: ['Product Strategy', 'Agile', 'Analytics'],
    description: 'Own the roadmap for Amazon Pay features serving 100M+ customers.',
    openings: 2, applied: false, saved: false, logo: 'A', accentColor: 'text-amber-400',
  },
  {
    id: 'j4', title: 'UX Designer', company: 'Meta', location: 'Bangalore',
    salary: '₹18–22 LPA', type: 'Full-time', deadline: 'May 20',
    skills: ['Figma', 'User Research', 'Prototyping'],
    description: 'Design next-generation AR/VR experiences for the Metaverse platform.',
    openings: 4, applied: false, saved: false, logo: 'M', accentColor: 'text-violet-400',
  },
  {
    id: 'j5', title: 'Backend Engineer', company: 'Flipkart', location: 'Bangalore',
    salary: '₹14–18 LPA', type: 'Full-time', deadline: 'May 22',
    skills: ['Java', 'Kafka', 'Microservices'],
    description: 'Build high-throughput order management systems for India\'s largest e-commerce platform.',
    openings: 8, applied: false, saved: false, logo: 'F', accentColor: 'text-emerald-400',
  },
  {
    id: 'j6', title: 'ML Engineer Intern', company: 'Swiggy', location: 'Bangalore',
    salary: '₹60k/month', type: 'Internship', deadline: 'May 25',
    skills: ['Python', 'TensorFlow', 'MLOps'],
    description: 'Work on recommendation systems that personalise food discovery for 10M+ users.',
    openings: 2, applied: false, saved: true, logo: 'S', accentColor: 'text-rose-400',
  },
]

const applications: Application[] = [
  { id: 'a1', title: 'Data Analyst',       company: 'Microsoft', appliedOn: 'Apr 20', status: 'shortlisted', nextStep: 'Technical interview on May 5', logo: 'M', accentColor: 'text-cyan-400' },
  { id: 'a2', title: 'Software Engineer',  company: 'Infosys',   appliedOn: 'Apr 15', status: 'interview',   nextStep: 'HR round scheduled May 3',    logo: 'I', accentColor: 'text-blue-400' },
  { id: 'a3', title: 'Frontend Developer', company: 'Wipro',     appliedOn: 'Apr 10', status: 'offered',     nextStep: 'Offer letter received',        logo: 'W', accentColor: 'text-emerald-400' },
  { id: 'a4', title: 'Data Scientist',     company: 'TCS',       appliedOn: 'Apr 5',  status: 'rejected',    logo: 'T', accentColor: 'text-white/30' },
  { id: 'a5', title: 'DevOps Engineer',    company: 'HCL',       appliedOn: 'Mar 28', status: 'applied',     nextStep: 'Under review',                 logo: 'H', accentColor: 'text-amber-400' },
]

const timeline = [
  { month: 'January',  placed: 12, applications: 45 },
  { month: 'February', placed: 18, applications: 62 },
  { month: 'March',    placed: 25, applications: 78 },
  { month: 'April',    placed: 34, applications: 89 },
]

// ── Status config ──────────────────────────────────────────────────────────
const statusConfig: Record<AppStatus, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  applied:     { label: 'Applied',     color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    icon: Send },
  shortlisted: { label: 'Shortlisted', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: Star },
  interview:   { label: 'Interview',   color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  icon: Calendar },
  offered:     { label: 'Offered',     color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
  rejected:    { label: 'Rejected',    color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     icon: XCircle },
}

const typeConfig: Record<JobType, { color: string; bg: string; border: string }> = {
  'Full-time':  { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  'Internship': { color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20' },
  'Contract':   { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
}

// ── Apply Modal ────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose, onSubmit }: { job: Job; onClose: () => void; onSubmit: () => void }) {
  const [coverLetter, setCoverLetter] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { onSubmit(); onClose() }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-semibold text-white/80">{job.title}</h3>
            <p className="text-[12px] text-white/35 mt-0.5">{job.company} · {job.location}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Job summary */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-5">
          <div className={`w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center text-[13px] font-bold ${job.accentColor}`}>{job.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[12px] text-white/50">{job.salary}</span>
              <span className="text-white/20">·</span>
              <span className="text-[12px] text-white/50">{job.type}</span>
              <span className="text-white/20">·</span>
              <span className="text-[12px] text-white/50">Deadline: {job.deadline}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {job.skills.map((s) => (
                <span key={s} className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] text-white/35">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Resume</label>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <FileText className="h-3.5 w-3.5 text-white/30" />
              <span className="text-[12px] text-white/40">resume_vikasreddy_2025.pdf</span>
              <span className="ml-auto text-[10px] text-emerald-400">Attached</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Cover Letter <span className="normal-case text-white/20">(optional)</span></label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Briefly explain why you're a great fit…"
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              submitted ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {submitted ? <><CheckCircle2 className="h-3.5 w-3.5" /> Applied!</> : <><Send className="h-3.5 w-3.5" /> Submit Application</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Job Card ───────────────────────────────────────────────────────────────
function JobCard({ job, onApply, onSave, onExpand, expanded }: {
  job: Job
  onApply: () => void
  onSave: () => void
  onExpand: () => void
  expanded: boolean
}) {
  const tc = typeConfig[job.type]
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start gap-4 p-4 cursor-pointer" onClick={onExpand}>
        {/* Logo */}
        <div className={`w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${job.accentColor}`}>
          {job.logo}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[14px] font-semibold text-white/80">{job.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <Building2 className="h-3 w-3 text-white/25" />
                <span className="text-[12px] text-white/40">{job.company}</span>
                <span className="text-white/15">·</span>
                <MapPin className="h-3 w-3 text-white/25" />
                <span className="text-[12px] text-white/40">{job.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); onSave() }}
                className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                {job.saved
                  ? <Bookmark className="h-3.5 w-3.5 text-blue-400" />
                  : <BookmarkPlus className="h-3.5 w-3.5 text-white/25 hover:text-white/60" />
                }
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-[12px] text-white/50">
              <IndianRupee className="h-3 w-3" />{job.salary.replace('₹', '')}
            </span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>
              {job.type}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Clock className="h-3 w-3" /> Due {job.deadline}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Users className="h-3 w-3" /> {job.openings} openings
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills.map((s) => (
              <span key={s} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/35">{s}</span>
            ))}
          </div>
        </div>

        <ChevronRight className={`h-4 w-4 text-white/20 flex-shrink-0 mt-1 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/[0.05]">
          <p className="text-[13px] text-white/45 leading-relaxed mt-3">{job.description}</p>
          <div className="flex items-center gap-2 mt-4">
            {job.applied ? (
              <span className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Applied
              </span>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onApply() }}
                className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[12px] font-medium text-white transition-colors"
              >
                <Send className="h-3.5 w-3.5" /> Apply Now
              </button>
            )}
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 transition-colors">
              <ArrowUpRight className="h-3.5 w-3.5" /> Company Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PlacementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('opportunities')
  const [jobs, setJobs] = useState(initialJobs)
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [applyingJob, setApplyingJob] = useState<Job | null>(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<JobType | 'All'>('All')

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'opportunities', label: 'Opportunities', badge: jobs.filter((j) => !j.applied).length },
    { id: 'applications',  label: 'My Applications', badge: applications.length },
    { id: 'timeline',      label: 'Placement Stats' },
  ]

  const filteredJobs = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'All' || j.type === filterType
    return matchSearch && matchType
  })

  const handleApply = (jobId: string) => {
    setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, applied: true } : j))
  }

  const handleSave = (jobId: string) => {
    setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, saved: !j.saved } : j))
  }

  const totalApplied = jobs.filter((j) => j.applied).length
  const shortlisted  = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interview').length
  const offered      = applications.filter((a) => a.status === 'offered').length

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Campus Placements</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Placements</h1>
          <p className="text-sm text-white/35 mt-1">Browse opportunities and track your applications.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Roles',    value: `${jobs.filter((j) => !j.applied).length}`, sub: 'Active listings',       icon: Briefcase,    accent: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Applied',       value: `${totalApplied}`,                          sub: 'Submitted applications', icon: Send,         accent: 'text-violet-400',  bg: 'bg-violet-500/10' },
          { label: 'Shortlisted',   value: `${shortlisted}`,                           sub: 'In progress',            icon: AlertCircle,  accent: 'text-amber-400',   bg: 'bg-amber-500/10' },
          { label: 'Offers',        value: `${offered}`,                               sub: 'Received',               icon: CheckCircle2, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t.id ? 'border-blue-500 text-white/80' : 'border-transparent text-white/35 hover:text-white/60'
            }`}
          >
            {t.label}
            {t.badge !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                activeTab === t.id ? 'bg-blue-600/20 text-blue-400' : 'bg-white/[0.06] text-white/30'
              }`}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Opportunities ── */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          {/* Search + filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles or companies…"
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1">
              {(['All', 'Full-time', 'Internship'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${
                    filterType === f
                      ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                      : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-8 w-8 text-white/10 mx-auto mb-2" />
              <p className="text-[13px] text-white/25">No roles match your search</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  expanded={expandedJob === job.id}
                  onExpand={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  onApply={() => setApplyingJob(job)}
                  onSave={() => handleSave(job.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Applications ── */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          {applications.map((app) => {
            const sc = statusConfig[app.status]
            const StatusIcon = sc.icon
            return (
              <div key={app.id} className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                <div className={`w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${app.accentColor}`}>
                  {app.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">{app.title}</p>
                      <p className="text-[12px] text-white/35 mt-0.5">{app.company} · Applied {app.appliedOn}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border flex-shrink-0 ${sc.bg} ${sc.color} ${sc.border}`}>
                      <StatusIcon className="h-3 w-3" />
                      {sc.label}
                    </span>
                  </div>
                  {app.nextStep && (
                    <p className="text-[11px] text-white/30 mt-2 flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3" />
                      {app.nextStep}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Timeline / Stats ── */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {/* Placement rate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Placement Rate', value: '87%', sub: '+5% vs last year', accent: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: TrendingUp },
              { label: 'Avg Package',    value: '₹14.2 LPA', sub: 'Median offer',    accent: 'text-blue-400',    bg: 'bg-blue-500/10',    icon: IndianRupee },
              { label: 'Top Recruiter',  value: 'Google',    sub: '12 offers made',  accent: 'text-amber-400',   bg: 'bg-amber-500/10',   icon: Star },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-white/35 uppercase tracking-wide">{s.label}</p>
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`h-4 w-4 ${s.accent}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/30 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Monthly chart */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-white/70">Monthly Placement Activity</h2>
              <span className="text-xs text-white/25">2025</span>
            </div>
            <div className="space-y-4">
              {timeline.map((t) => (
                <div key={t.month} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/50 w-20">{t.month}</span>
                    <span className="text-white/30">{t.placed} placed · {t.applications} applied</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(t.applications / 100) * 100}%` }} />
                    </div>
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(t.placed / 40) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-[11px] text-white/30"><span className="w-2.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Applications</span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/30"><span className="w-2.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Placed</span>
            </div>
          </div>

          {/* Top companies */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05]">
              <h2 className="text-[14px] font-semibold text-white/70">Top Recruiting Companies</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['Company', 'Offers', 'Avg Package', 'Role'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { company: 'Google',    offers: 12, pkg: '₹22 LPA',  role: 'SWE' },
                  { company: 'Microsoft', offers: 9,  pkg: '₹18 LPA',  role: 'Data Analyst' },
                  { company: 'Amazon',    offers: 8,  pkg: '₹20 LPA',  role: 'SDE' },
                  { company: 'Flipkart',  offers: 11, pkg: '₹16 LPA',  role: 'Backend Eng.' },
                  { company: 'Infosys',   offers: 24, pkg: '₹8 LPA',   role: 'Systems Eng.' },
                ].map((r) => (
                  <tr key={r.company} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 text-[13px] font-medium text-white/60">{r.company}</td>
                    <td className="px-5 py-3.5 text-[13px] text-emerald-400 font-semibold">{r.offers}</td>
                    <td className="px-5 py-3.5 text-[13px] text-white/50">{r.pkg}</td>
                    <td className="px-5 py-3.5 text-[13px] text-white/40">{r.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Apply modal */}
      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
          onSubmit={() => handleApply(applyingJob.id)}
        />
      )}
    </div>
  )
}
