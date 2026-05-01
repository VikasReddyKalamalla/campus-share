'use client'

import { useState } from 'react'
import { FileText, BookOpen, Film, Search, Download, Trash2, Upload, X, HardDrive, Files, Loader2, CheckCircle2 } from 'lucide-react'

type FileType = 'PDF' | 'Doc' | 'Video' | 'PPT' | 'Code'
interface Material { id: string; name: string; course: string; type: FileType; size: string; date: string; downloads: number }

const initialMaterials: Material[] = [
  { id: 'm1', name: 'Lecture 1 - Introduction.pdf',   course: 'Data Structures', type: 'PDF',   size: '2.4 MB',  date: 'Apr 20', downloads: 34 },
  { id: 'm2', name: 'Assignment 3 - Trees.docx',      course: 'Data Structures', type: 'Doc',   size: '156 KB',  date: 'Apr 18', downloads: 28 },
  { id: 'm3', name: 'Lab Manual - Sorting.pdf',       course: 'Algorithms',      type: 'PDF',   size: '3.1 MB',  date: 'Apr 15', downloads: 41 },
  { id: 'm4', name: 'Midterm Solutions.pdf',          course: 'Database Systems',type: 'PDF',   size: '890 KB',  date: 'Apr 12', downloads: 67 },
  { id: 'm5', name: 'React Hooks Demo.mp4',           course: 'Web Development', type: 'Video', size: '145 MB',  date: 'Apr 10', downloads: 19 },
  { id: 'm6', name: 'Cloud Architecture Slides.pptx', course: 'Cloud Computing', type: 'PPT',   size: '4.2 MB',  date: 'Apr 8',  downloads: 23 },
]
const COURSES = ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development', 'Mobile Apps', 'Cloud Computing']
const typeConfig: Record<FileType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  PDF:   { icon: FileText, color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20'    },
  Doc:   { icon: BookOpen, color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20'},
  Video: { icon: Film,     color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  PPT:   { icon: FileText, color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  Code:  { icon: FileText, color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
}

function UploadModal({ onClose, onUpload }: { onClose: () => void; onUpload: (m: Material) => void }) {
  const [form, setForm] = useState({ name: '', course: COURSES[0], type: 'PDF' as FileType, description: '' })
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleUpload = () => {
    if (!form.name.trim()) return
    setLoading(true)
    setTimeout(() => { onUpload({ id: `m${Date.now()}`, name: form.name.trim(), course: form.course, type: form.type, size: '—', date: 'Just now', downloads: 0 }); setLoading(false); onClose() }, 1200)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Upload Material</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">File Name</label><input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Lecture 7 - Graphs.pdf" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Course</label><select value={form.course} onChange={(e) => set('course', e.target.value)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{COURSES.map((c) => <option key={c} value={c} className="bg-[#111118]">{c}</option>)}</select></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">File Type</label><select value={form.type} onChange={(e) => set('type', e.target.value as FileType)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{(['PDF','Doc','Video','PPT','Code'] as FileType[]).map((t) => <option key={t} value={t} className="bg-[#111118]">{t}</option>)}</select></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Description <span className="normal-case text-white/20">(optional)</span></label><textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Brief description…" rows={3} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" /></div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleUpload} disabled={loading} className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Uploading…</> : <><Upload className="h-3.5 w-3.5" />Upload</>}
          </button>
        </div>
      </div>
    </div>
  )
}

function MaterialRow({ material, onDelete }: { material: Material; onDelete: () => void }) {
  const [dlState, setDlState] = useState<'idle'|'loading'|'done'>('idle')
  const tc = typeConfig[material.type]
  const Icon = tc.icon
  const handleDownload = () => { if (dlState !== 'idle') return; setDlState('loading'); setTimeout(() => { setDlState('done'); setTimeout(() => setDlState('idle'), 2000) }, 1000) }
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
      <div className={`w-9 h-9 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}><Icon className={`h-4 w-4 ${tc.color}`} /></div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white/70 truncate">{material.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400">{material.course}</span>
          <span className="text-[11px] text-white/25">{material.size}</span>
          <span className="text-[11px] text-white/25">{material.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[12px] text-white/30 flex-shrink-0 w-16 justify-end"><Download className="h-3 w-3" />{material.downloads}</div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={handleDownload} className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${dlState === 'done' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-600/15 border-blue-500/20 text-blue-400 hover:bg-blue-600/25'}`}>
          {dlState === 'loading' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : dlState === 'done' ? <><CheckCircle2 className="h-3.5 w-3.5" />Downloaded</> : <><Download className="h-3.5 w-3.5" />Download</>}
        </button>
        <button onClick={onDelete} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.07] text-white/25 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  )
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials)
  const [search, setSearch] = useState('')
  const [activeCourse, setActiveCourse] = useState('All')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const totalDownloads = materials.reduce((s, m) => s + m.downloads, 0)
  const parseSize = (s: string) => { const n = parseFloat(s); if (s.includes('MB')) return n; if (s.includes('KB')) return n / 1024; return 0 }
  const storageUsed = materials.reduce((s, m) => s + parseSize(m.size), 0)
  const storageTotal = 500
  const storagePercent = Math.min((storageUsed / storageTotal) * 100, 100)
  const uniqueCourses = Array.from(new Set(materials.map((m) => m.course)))
  const filtered = materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.course.toLowerCase().includes(search.toLowerCase())
    const matchCourse = activeCourse === 'All' || m.course === activeCourse
    return matchSearch && matchCourse
  })
  const stats = [
    { label: 'Total Files',     value: `${materials.length}`,          sub: 'Uploaded materials',  icon: Files,      accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Total Downloads', value: `${totalDownloads}`,            sub: 'Across all files',    icon: Download,   accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Storage Used',    value: `${storageUsed.toFixed(0)} MB`, sub: `of ${storageTotal} MB`, icon: HardDrive, accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
    { label: 'Courses',         value: `${uniqueCourses.length}`,      sub: 'With materials',      icon: BookOpen,   accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Faculty</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Materials</h1>
          <p className="text-sm text-white/35 mt-1">Upload and manage course materials for your students.</p>
        </div>
        <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0"><Upload className="h-4 w-4" />Upload Material</button>
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
      <div className="space-y-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by file name or course…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', ...uniqueCourses]).map((c) => <button key={c} onClick={() => setActiveCourse(c)} className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${activeCourse === c ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{c}</button>)}
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
        {filtered.length === 0 ? <div className="py-12 text-center"><Files className="h-8 w-8 text-white/10 mx-auto mb-2" /><p className="text-[13px] text-white/25">No materials match your search</p></div>
          : filtered.map((m) => <MaterialRow key={m.id} material={m} onDelete={() => setMaterials((prev) => prev.filter((x) => x.id !== m.id))} />)}
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><HardDrive className="h-4 w-4 text-white/30" /><span className="text-[13px] font-medium text-white/60">Storage</span></div><span className="text-[12px] text-white/35">{storageUsed.toFixed(1)} MB / {storageTotal} MB used</span></div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${storagePercent > 80 ? 'bg-red-500' : storagePercent > 60 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${storagePercent}%` }} /></div>
        <p className="text-[11px] text-white/25 mt-2">{(storageTotal - storageUsed).toFixed(0)} MB remaining</p>
      </div>
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} onUpload={(m) => setMaterials((prev) => [m, ...prev])} />}
    </div>
  )
}
