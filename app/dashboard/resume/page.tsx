'use client'

import { useState } from 'react'
import {
  FileText, Eye, Download, Plus, Edit3, Trash2, Copy,
  CheckCircle2, Archive, MoreHorizontal, X, Save,
  User, Briefcase, GraduationCap, Code2, Award, Link,
  ChevronDown, ChevronUp, Loader2, Check,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type ResumeStatus = 'active' | 'archived' | 'draft'

interface Resume {
  id: string
  name: string
  updatedAt: string
  status: ResumeStatus
  views: number
  downloads: number
  sections: string[]
}

interface ResumeSection {
  id: string
  label: string
  icon: React.ElementType
  filled: boolean
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialResumes: Resume[] = [
  {
    id: 'r1', name: 'Professional Resume', updatedAt: '2 days ago',
    status: 'active', views: 98, downloads: 14,
    sections: ['Personal Info', 'Experience', 'Education', 'Skills', 'Projects'],
  },
  {
    id: 'r2', name: 'Internship Resume', updatedAt: '1 week ago',
    status: 'active', views: 42, downloads: 7,
    sections: ['Personal Info', 'Education', 'Skills', 'Projects'],
  },
  {
    id: 'r3', name: 'Academic Resume', updatedAt: '2 weeks ago',
    status: 'archived', views: 16, downloads: 2,
    sections: ['Personal Info', 'Education', 'Publications'],
  },
]

const statusConfig: Record<ResumeStatus, { label: string; color: string; bg: string; border: string }> = {
  active:   { label: 'Active',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  draft:    { label: 'Draft',    color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  archived: { label: 'Archived', color: 'text-white/30',    bg: 'bg-white/[0.04]',   border: 'border-white/[0.08]' },
}

// ── Resume Editor ──────────────────────────────────────────────────────────
const editorSections: ResumeSection[] = [
  { id: 'personal',     label: 'Personal Info',  icon: User,          filled: true  },
  { id: 'experience',   label: 'Experience',     icon: Briefcase,     filled: true  },
  { id: 'education',    label: 'Education',      icon: GraduationCap, filled: true  },
  { id: 'skills',       label: 'Skills',         icon: Code2,         filled: true  },
  { id: 'projects',     label: 'Projects',       icon: Award,         filled: false },
  { id: 'links',        label: 'Links & Socials',icon: Link,          filled: false },
]

function ResumeEditor({ resume, onClose, onSave }: {
  resume: Resume
  onClose: () => void
  onSave: (name: string) => void
}) {
  const [name, setName] = useState(resume.name)
  const [activeSection, setActiveSection] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Personal info state
  const [fullName, setFullName]   = useState('Vikas Reddy')
  const [email, setEmail]         = useState('vikas@example.com')
  const [phone, setPhone]         = useState('+91 98765 43210')
  const [location, setLocation]   = useState('Hyderabad, India')
  const [summary, setSummary]     = useState('Final year B.Tech CS student with strong fundamentals in full-stack development and data structures.')

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      onSave(name)
      setTimeout(() => setSaved(false), 2000)
    }, 900)
  }

  const currentSection = editorSections.find((s) => s.id === activeSection)!

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl mx-auto my-6 rounded-xl border border-white/[0.08] bg-[#0e0e16] shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-blue-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent text-[14px] font-semibold text-white/80 focus:outline-none border-b border-transparent focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-1.5 h-8 px-4 rounded-lg text-[12px] font-medium transition-colors ${
                saved ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                      : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
              }`}
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
              {saving ? 'Saving…' : saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Section nav */}
          <div className="w-44 flex-shrink-0 border-r border-white/[0.06] py-3 overflow-y-auto">
            {editorSections.map((s) => {
              const Icon = s.icon
              const isActive = activeSection === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${
                    isActive ? 'bg-blue-600/15 text-blue-400' : 'text-white/35 hover:text-white/60 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-white/25'}`} />
                  <span className="text-[12px] font-medium">{s.label}</span>
                  {s.filled && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Section content */}
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-[11px] text-white/30 uppercase tracking-widest mb-4">{currentSection.label}</p>

            {activeSection === 'personal' && (
              <div className="space-y-3">
                {[
                  { label: 'Full Name',  value: fullName,  set: setFullName,  placeholder: 'Your full name' },
                  { label: 'Email',      value: email,     set: setEmail,     placeholder: 'you@example.com', type: 'email' },
                  { label: 'Phone',      value: phone,     set: setPhone,     placeholder: '+91 00000 00000', type: 'tel' },
                  { label: 'Location',   value: location,  set: setLocation,  placeholder: 'City, Country' },
                ].map((f) => (
                  <div key={f.label} className="space-y-1">
                    <label className="text-[11px] text-white/35 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-[11px] text-white/35 uppercase tracking-wide">Professional Summary</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-3">
                {[
                  { role: 'Frontend Intern', company: 'TechCorp', period: 'Jun–Aug 2024', desc: 'Built React components and improved page load by 30%.' },
                  { role: 'Web Dev Intern',  company: 'StartupXYZ', period: 'Dec–Jan 2024', desc: 'Developed REST APIs using Node.js and Express.' },
                ].map((exp, i) => (
                  <div key={i} className="p-4 rounded-lg border border-white/[0.07] bg-white/[0.02] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-semibold text-white/70">{exp.role}</p>
                        <p className="text-[11px] text-white/35">{exp.company} · {exp.period}</p>
                      </div>
                      <button className="p-1 rounded hover:bg-white/[0.05] text-white/20 hover:text-white/50 transition-colors">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-[12px] text-white/40 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
                <button className="flex items-center gap-2 h-8 px-3 rounded-lg border border-dashed border-white/[0.12] text-[12px] text-white/30 hover:text-white/60 hover:border-white/25 transition-colors w-full justify-center">
                  <Plus className="h-3.5 w-3.5" /> Add Experience
                </button>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-white/[0.07] bg-white/[0.02]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-white/70">B.Tech Computer Science</p>
                      <p className="text-[11px] text-white/35">JNTU Hyderabad · 2021–2025</p>
                      <p className="text-[11px] text-white/30 mt-1">CGPA: 8.4 / 10</p>
                    </div>
                    <button className="p-1 rounded hover:bg-white/[0.05] text-white/20 hover:text-white/50 transition-colors">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 h-8 px-3 rounded-lg border border-dashed border-white/[0.12] text-[12px] text-white/30 hover:text-white/60 hover:border-white/25 transition-colors w-full justify-center">
                  <Plus className="h-3.5 w-3.5" /> Add Education
                </button>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-3">
                {[
                  { category: 'Languages',   skills: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
                  { category: 'Frameworks',  skills: ['React', 'Next.js', 'Node.js', 'Express'] },
                  { category: 'Tools',       skills: ['Git', 'Docker', 'Figma', 'VS Code'] },
                ].map((g) => (
                  <div key={g.category} className="p-4 rounded-lg border border-white/[0.07] bg-white/[0.02]">
                    <p className="text-[11px] text-white/35 uppercase tracking-wide mb-2">{g.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.skills.map((s) => (
                        <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/50">
                          {s}
                          <button className="text-white/20 hover:text-white/60 transition-colors"><X className="h-2.5 w-2.5" /></button>
                        </span>
                      ))}
                      <button className="px-2 py-1 rounded-md border border-dashed border-white/[0.12] text-[11px] text-white/25 hover:text-white/50 transition-colors">+ Add</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeSection === 'projects' || activeSection === 'links') && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <currentSection.icon className="h-8 w-8 text-white/10" />
                <p className="text-[13px] text-white/25">No {currentSection.label.toLowerCase()} added yet</p>
                <button className="flex items-center gap-2 h-8 px-4 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Add {currentSection.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Create Resume Modal ────────────────────────────────────────────────────
function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string) => void }) {
  const [name, setName] = useState('')
  const templates = ['Professional', 'Internship', 'Academic', 'Creative', 'Minimal']
  const [selected, setSelected] = useState('Professional')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">New Resume</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Resume Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Software Engineer Resume"
              className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Template</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelected(t)}
                  className={`py-2.5 rounded-lg text-[12px] font-medium transition-colors border ${
                    selected === t
                      ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                      : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button
            onClick={() => { if (name.trim()) { onCreate(name.trim()); onClose() } }}
            disabled={!name.trim()}
            className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Plus className="h-3.5 w-3.5" /> Create Resume
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Resume Card ────────────────────────────────────────────────────────────
function ResumeCard({ resume, onEdit, onDuplicate, onArchive, onDelete }: {
  resume: Resume
  onEdit: () => void
  onDuplicate: () => void
  onArchive: () => void
  onDelete: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sc = statusConfig[resume.status]
  const completeness = Math.round((resume.sections.length / 6) * 100)

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-5">
      <div className="flex items-start justify-between gap-3">
        {/* Icon + info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <FileText className="h-4.5 w-4.5 text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-white/80 truncate">{resume.name}</p>
            <p className="text-[11px] text-white/30 mt-0.5">Updated {resume.updatedAt}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Eye className="h-3 w-3" /> {resume.views}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Download className="h-3 w-3" /> {resume.downloads}
              </span>
            </div>
          </div>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>
            {sc.label}
          </span>
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/60 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-40 rounded-xl border border-white/[0.08] bg-[#111118] shadow-xl z-20 overflow-hidden">
                {[
                  { label: 'Edit',      icon: Edit3,    action: () => { onEdit(); setMenuOpen(false) } },
                  { label: 'Duplicate', icon: Copy,     action: () => { onDuplicate(); setMenuOpen(false) } },
                  { label: resume.status === 'archived' ? 'Restore' : 'Archive', icon: Archive, action: () => { onArchive(); setMenuOpen(false) } },
                  { label: 'Download',  icon: Download, action: () => setMenuOpen(false) },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button key={item.label} onClick={item.action}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-white/45 hover:text-white/80 hover:bg-white/[0.04] transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5" /> {item.label}
                    </button>
                  )
                })}
                <button onClick={() => { onDelete(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/[0.05]"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completeness bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-white/25 uppercase tracking-wide">Completeness</span>
          <span className="text-[10px] text-white/35">{completeness}%</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${completeness >= 80 ? 'bg-emerald-500' : completeness >= 50 ? 'bg-amber-500' : 'bg-blue-500'}`}
            style={{ width: `${completeness}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {resume.sections.map((s) => (
            <span key={s} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] text-[9px] text-white/30">
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500/60" /> {s}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.05]">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" /> Edit
        </button>
        <button className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 transition-colors">
          <Download className="h-3.5 w-3.5" /> PDF
        </button>
        <button className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/40 hover:text-white/70 transition-colors">
          <Eye className="h-3.5 w-3.5" /> Preview
        </button>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const [resumes, setResumes] = useState(initialResumes)
  const [editingResume, setEditingResume] = useState<Resume | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const totalViews     = resumes.reduce((s, r) => s + r.views, 0)
  const totalDownloads = resumes.reduce((s, r) => s + r.downloads, 0)
  const activeCount    = resumes.filter((r) => r.status === 'active').length

  const handleCreate = (name: string) => {
    const newResume: Resume = {
      id: `r${Date.now()}`, name, updatedAt: 'just now',
      status: 'draft', views: 0, downloads: 0,
      sections: ['Personal Info'],
    }
    setResumes((prev) => [newResume, ...prev])
  }

  const handleDuplicate = (id: string) => {
    const original = resumes.find((r) => r.id === id)
    if (!original) return
    setResumes((prev) => [
      { ...original, id: `r${Date.now()}`, name: `${original.name} (Copy)`, updatedAt: 'just now', views: 0, downloads: 0 },
      ...prev,
    ])
  }

  const handleArchive = (id: string) => {
    setResumes((prev) => prev.map((r) =>
      r.id === id ? { ...r, status: r.status === 'archived' ? 'active' : 'archived' } : r
    ))
  }

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSaveName = (id: string, name: string) => {
    setResumes((prev) => prev.map((r) => r.id === id ? { ...r, name, updatedAt: 'just now' } : r))
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Career Tools</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Resume Builder</h1>
          <p className="text-sm text-white/35 mt-1">Create, manage, and share your professional resumes.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> New Resume
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Resumes',   value: resumes.length.toString(),  sub: `${activeCount} active`,    icon: FileText,  accent: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Views',     value: totalViews.toString(),       sub: 'Total profile views',      icon: Eye,       accent: 'text-violet-400',  bg: 'bg-violet-500/10' },
          { label: 'Downloads', value: totalDownloads.toString(),   sub: 'PDF downloads',            icon: Download,  accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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

      {/* Resume list */}
      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.08]">
          <FileText className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No resumes yet</p>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 h-8 px-4 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={() => setEditingResume(resume)}
              onDuplicate={() => handleDuplicate(resume.id)}
              onArchive={() => handleArchive(resume.id)}
              onDelete={() => handleDelete(resume.id)}
            />
          ))}
          {/* Add card */}
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.15] transition-colors flex flex-col items-center justify-center gap-2 p-8 min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <Plus className="h-5 w-5 text-white/25" />
            </div>
            <p className="text-[13px] text-white/25">New Resume</p>
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
      {editingResume && (
        <ResumeEditor
          resume={editingResume}
          onClose={() => setEditingResume(null)}
          onSave={(name) => handleSaveName(editingResume.id, name)}
        />
      )}
    </div>
  )
}
