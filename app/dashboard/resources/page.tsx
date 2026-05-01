'use client'

import { useState, useRef } from 'react'
import {
  FileText, Film, Presentation, BookOpen, Code2, Link2,
  Download, Upload, Search, Filter, Eye, Bookmark,
  BookmarkCheck, Star, Clock, X, Plus, Check,
  FolderOpen, ChevronDown, Loader2, ExternalLink,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type FileType  = 'PDF' | 'PPT' | 'Video' | 'Code' | 'Link' | 'Doc'
type Category  = 'All' | 'CS Core' | 'Web Dev' | 'Interview Prep' | 'Mathematics' | 'Projects'

interface Resource {
  id: string
  name: string
  subject: string
  type: FileType
  size: string
  category: Category
  downloads: number
  views: number
  uploadedBy: string
  uploadedAt: string
  saved: boolean
  starred: boolean
  tags: string[]
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialResources: Resource[] = [
  { id: 'r1', name: 'Data Structures Notes',    subject: 'CS201', type: 'PDF',   size: '2.4 MB',  category: 'CS Core',       downloads: 234, views: 891,  uploadedBy: 'Dr. Sharma',  uploadedAt: '2 days ago',   saved: true,  starred: true,  tags: ['Trees', 'Graphs', 'Arrays'] },
  { id: 'r2', name: 'Algorithm Slides',          subject: 'CS202', type: 'PPT',   size: '1.8 MB',  category: 'CS Core',       downloads: 189, views: 654,  uploadedBy: 'Dr. Patel',   uploadedAt: '3 days ago',   saved: false, starred: false, tags: ['Sorting', 'DP', 'Greedy'] },
  { id: 'r3', name: 'Database Tutorial',         subject: 'CS301', type: 'PDF',   size: '3.2 MB',  category: 'CS Core',       downloads: 156, views: 502,  uploadedBy: 'Prof. Reddy', uploadedAt: '1 week ago',   saved: false, starred: false, tags: ['SQL', 'ER Diagrams'] },
  { id: 'r4', name: 'Web Dev Guide',             subject: 'CS302', type: 'PDF',   size: '1.5 MB',  category: 'Web Dev',       downloads: 201, views: 743,  uploadedBy: 'Prof. Kumar', uploadedAt: '1 week ago',   saved: true,  starred: false, tags: ['HTML', 'CSS', 'React'] },
  { id: 'r5', name: 'Python Basics',             subject: 'CS101', type: 'Video', size: '450 MB',  category: 'CS Core',       downloads: 312, views: 1204, uploadedBy: 'Dr. Singh',   uploadedAt: '2 weeks ago',  saved: false, starred: true,  tags: ['Python', 'Beginner'] },
  { id: 'r6', name: 'Interview Prep Guide',      subject: 'Misc',  type: 'PDF',   size: '2.1 MB',  category: 'Interview Prep',downloads: 278, views: 1089, uploadedBy: 'Placement Cell', uploadedAt: '3 days ago', saved: true, starred: true,  tags: ['DSA', 'HR', 'System Design'] },
  { id: 'r7', name: 'React Hooks Cheatsheet',    subject: 'CS302', type: 'PDF',   size: '0.8 MB',  category: 'Web Dev',       downloads: 445, views: 1567, uploadedBy: 'Prof. Kumar', uploadedAt: '5 days ago',   saved: false, starred: false, tags: ['React', 'Hooks'] },
  { id: 'r8', name: 'OS Concepts Notes',         subject: 'CS401', type: 'Doc',   size: '1.2 MB',  category: 'CS Core',       downloads: 98,  views: 321,  uploadedBy: 'Dr. Verma',   uploadedAt: '2 weeks ago',  saved: false, starred: false, tags: ['Processes', 'Memory'] },
  { id: 'r9', name: 'Linear Algebra Revision',   subject: 'MA201', type: 'PDF',   size: '4.1 MB',  category: 'Mathematics',   downloads: 67,  views: 234,  uploadedBy: 'Prof. Iyer',  uploadedAt: '1 month ago',  saved: false, starred: false, tags: ['Matrices', 'Vectors'] },
  { id: 'r10',name: 'System Design Primer',      subject: 'Misc',  type: 'Link',  size: '—',       category: 'Interview Prep',downloads: 512, views: 2341, uploadedBy: 'Placement Cell', uploadedAt: '1 week ago', saved: true, starred: true,  tags: ['Architecture', 'Scalability'] },
]

const categories: Category[] = ['All', 'CS Core', 'Web Dev', 'Interview Prep', 'Mathematics', 'Projects']

// ── File type config ───────────────────────────────────────────────────────
const typeConfig: Record<FileType, { icon: React.ElementType; color: string; bg: string; border: string; label: string }> = {
  PDF:   { icon: FileText,      color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    label: 'PDF' },
  PPT:   { icon: Presentation,  color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  label: 'PPT' },
  Video: { icon: Film,          color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', label: 'Video' },
  Code:  { icon: Code2,         color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   label: 'Code' },
  Link:  { icon: Link2,         color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   label: 'Link' },
  Doc:   { icon: BookOpen,      color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',label: 'Doc' },
}

// ── Upload Modal ───────────────────────────────────────────────────────────
function UploadModal({ onClose, onUpload }: { onClose: () => void; onUpload: (r: Resource) => void }) {
  const [name, setName]         = useState('')
  const [subject, setSubject]   = useState('')
  const [category, setCategory] = useState<Category>('CS Core')
  const [type, setType]         = useState<FileType>('PDF')
  const [tags, setTags]         = useState('')
  const [uploading, setUploading] = useState(false)
  const [done, setDone]         = useState(false)

  const handleUpload = () => {
    if (!name.trim()) return
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setDone(true)
      const newResource: Resource = {
        id: `r${Date.now()}`, name: name.trim(), subject: subject || 'General',
        type, size: '—', category, downloads: 0, views: 0,
        uploadedBy: 'You', uploadedAt: 'just now', saved: false, starred: false,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      }
      setTimeout(() => { onUpload(newResource); onClose() }, 800)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Upload Resource</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drop zone */}
        <div className="border-2 border-dashed border-white/[0.10] rounded-xl p-8 text-center mb-4 hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-white/15 mx-auto mb-2" />
          <p className="text-[13px] text-white/30">Drop file here or <span className="text-blue-400">browse</span></p>
          <p className="text-[11px] text-white/20 mt-1">PDF, PPT, DOCX, MP4 up to 500 MB</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Resource Name', value: name, set: setName, placeholder: 'e.g. Data Structures Notes' },
            { label: 'Subject Code',  value: subject, set: setSubject, placeholder: 'e.g. CS201' },
            { label: 'Tags',          value: tags, set: setTags, placeholder: 'Comma-separated: DSA, Trees' },
          ].map((f) => (
            <div key={f.label} className="space-y-1">
              <label className="text-[11px] text-white/35 uppercase tracking-wide">{f.label}</label>
              <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-white/35 uppercase tracking-wide">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as FileType)}
                className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
              >
                {(Object.keys(typeConfig) as FileType[]).map((t) => (
                  <option key={t} value={t} className="bg-[#111118]">{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-white/35 uppercase tracking-wide">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
              >
                {categories.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c} className="bg-[#111118]">{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleUpload} disabled={!name.trim() || uploading || done}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              done ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                   : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
            }`}
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? 'Uploading…' : done ? 'Uploaded!' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Resource Card ──────────────────────────────────────────────────────────
function ResourceCard({ resource, onSave, onStar, onDownload }: {
  resource: Resource
  onSave: () => void
  onStar: () => void
  onDownload: () => void
}) {
  const tc = typeConfig[resource.type]
  const Icon = tc.icon
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded]   = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      setDownloaded(true)
      onDownload()
      setTimeout(() => setDownloaded(false), 2500)
    }, 900)
  }

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-4.5 w-4.5 ${tc.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white/80 truncate">{resource.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>{tc.label}</span>
            <span className="text-[11px] text-white/25">{resource.subject}</span>
            {resource.size !== '—' && <span className="text-[11px] text-white/20">· {resource.size}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onStar} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
            <Star className={`h-3.5 w-3.5 ${resource.starred ? 'text-amber-400 fill-amber-400' : 'text-white/20 hover:text-white/50'}`} />
          </button>
          <button onClick={onSave} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors">
            {resource.saved
              ? <BookmarkCheck className="h-3.5 w-3.5 text-blue-400" />
              : <Bookmark className="h-3.5 w-3.5 text-white/20 hover:text-white/50" />
            }
          </button>
        </div>
      </div>

      {/* Tags */}
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-white/25">
            <Download className="h-3 w-3" /> {resource.downloads + (downloaded ? 1 : 0)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-white/25">
            <Eye className="h-3 w-3" /> {resource.views}
          </span>
          <span className="text-[10px] text-white/20">{resource.uploadedAt}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {resource.type === 'Link' ? (
            <button className="flex items-center gap-1 h-7 px-2.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors">
              <ExternalLink className="h-3 w-3" /> Open
            </button>
          ) : (
            <button onClick={handleDownload} disabled={downloading}
              className={`flex items-center gap-1 h-7 px-2.5 rounded-lg text-[11px] font-medium transition-colors ${
                downloaded
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-blue-600/15 border border-blue-500/20 text-blue-400 hover:bg-blue-600/25'
              }`}
            >
              {downloading ? <Loader2 className="h-3 w-3 animate-spin" /> : downloaded ? <Check className="h-3 w-3" /> : <Download className="h-3 w-3" />}
              {downloading ? 'Saving…' : downloaded ? 'Saved' : 'Download'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  const [resources, setResources]   = useState(initialResources)
  const [search, setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [activeType, setActiveType] = useState<FileType | 'All'>('All')
  const [showSavedOnly, setShowSavedOnly]   = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [sortBy, setSortBy]         = useState<'downloads' | 'views' | 'recent'>('downloads')

  const filtered = resources
    .filter((r) => {
      const matchSearch   = r.name.toLowerCase().includes(search.toLowerCase()) ||
                            r.subject.toLowerCase().includes(search.toLowerCase()) ||
                            r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCategory = activeCategory === 'All' || r.category === activeCategory
      const matchType     = activeType === 'All' || r.type === activeType
      const matchSaved    = !showSavedOnly || r.saved
      return matchSearch && matchCategory && matchType && matchSaved
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads
      if (sortBy === 'views')     return b.views - a.views
      return 0
    })

  const totalDownloads = resources.reduce((s, r) => s + r.downloads, 0)
  const savedCount     = resources.filter((r) => r.saved).length
  const starredCount   = resources.filter((r) => r.starred).length

  const handleSave     = (id: string) => setResources((p) => p.map((r) => r.id === id ? { ...r, saved: !r.saved } : r))
  const handleStar     = (id: string) => setResources((p) => p.map((r) => r.id === id ? { ...r, starred: !r.starred } : r))
  const handleDownload = (id: string) => setResources((p) => p.map((r) => r.id === id ? { ...r, downloads: r.downloads + 1 } : r))
  const handleUpload   = (r: Resource) => setResources((p) => [r, ...p])

  const fileTypes: (FileType | 'All')[] = ['All', 'PDF', 'PPT', 'Video', 'Code', 'Link', 'Doc']

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Study Materials</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Resources</h1>
          <p className="text-sm text-white/35 mt-1">Browse, download, and share learning materials.</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors flex-shrink-0"
        >
          <Upload className="h-4 w-4" /> Upload Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Resources', value: resources.length.toString(),  sub: 'Available',         icon: FolderOpen,    accent: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Total Downloads', value: totalDownloads.toLocaleString(), sub: 'All time',        icon: Download,      accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Saved',           value: savedCount.toString(),         sub: 'In your library',   icon: BookmarkCheck, accent: 'text-violet-400',  bg: 'bg-violet-500/10' },
          { label: 'Starred',         value: starredCount.toString(),       sub: 'Favourites',        icon: Star,          accent: 'text-amber-400',   bg: 'bg-amber-500/10' },
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

      {/* Filters */}
      <div className="space-y-3">
        {/* Search + sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, subject, or tag…"
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/50 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
          >
            <option value="downloads" className="bg-[#111118]">Most Downloaded</option>
            <option value="views"     className="bg-[#111118]">Most Viewed</option>
            <option value="recent"    className="bg-[#111118]">Most Recent</option>
          </select>
          <button
            onClick={() => setShowSavedOnly((v) => !v)}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${
              showSavedOnly
                ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" /> Saved
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors border ${
                activeCategory === cat
                  ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                  : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* File type filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {fileTypes.map((ft) => {
            const tc = ft !== 'All' ? typeConfig[ft] : null
            return (
              <button
                key={ft}
                onClick={() => setActiveType(ft)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors border ${
                  activeType === ft
                    ? 'bg-white/[0.08] border-white/[0.15] text-white/70'
                    : 'bg-white/[0.02] border-white/[0.06] text-white/25 hover:text-white/50'
                }`}
              >
                {tc && <tc.icon className={`h-3 w-3 ${activeType === ft ? tc.color : ''}`} />}
                {ft}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-white/30">
          {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <FolderOpen className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No resources match your filters</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); setActiveType('All'); setShowSavedOnly(false) }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onSave={() => handleSave(resource.id)}
              onStar={() => handleStar(resource.id)}
              onDownload={() => handleDownload(resource.id)}
            />
          ))}
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />
      )}
    </div>
  )
}
