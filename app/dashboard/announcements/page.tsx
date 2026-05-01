'use client'

import { useState } from 'react'
import {
  Bell, Plus, X, Edit3, Trash2, Eye, Check, Loader2,
  Calendar, Users, AlertTriangle, Info, ChevronDown,
  Search, Pin, Send,
} from 'lucide-react'

type Priority = 'High' | 'Medium' | 'Low'
type Audience = 'All Students' | 'Faculty' | 'All' | 'Admin' | 'Placement Cell'

interface Announcement {
  id: string; title: string; body: string; date: string
  audience: Audience; priority: Priority; pinned: boolean; published: boolean
}

const initialAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Campus Placement Drive — Google', body: 'Google will be visiting campus on May 15th for placements. All eligible students must register by May 10th. Bring your updated resume and be prepared for technical rounds.', date: 'May 15, 2026', audience: 'All Students', priority: 'High',   pinned: true,  published: true  },
  { id: 'a2', title: 'Mid-term Exam Schedule Released',  body: 'The mid-term examination schedule for Semester 4 has been published. Please check the academic portal for your individual timetable and hall ticket.', date: 'May 10, 2026', audience: 'All Students', priority: 'Medium', pinned: false, published: true  },
  { id: 'a3', title: 'Faculty Meeting — Curriculum Update', body: 'A mandatory faculty meeting will be held on May 8th at 3 PM in Conference Room A to discuss the updated curriculum for the upcoming academic year.', date: 'May 8, 2026',  audience: 'Faculty',      priority: 'Low',    pinned: false, published: true  },
  { id: 'a4', title: 'Library Extended Hours',           body: 'The central library will remain open until 10 PM from May 1st to May 31st to support students during the examination period.', date: 'May 5, 2026',  audience: 'All',          priority: 'Low',    pinned: false, published: true  },
  { id: 'a5', title: 'Hackathon 2025 — Registrations Open', body: 'Annual 24-hour hackathon registrations are now open. Form teams of 2–4 and register before May 12th. Prize pool of ₹1 lakh.', date: 'May 12, 2026', audience: 'All Students', priority: 'Medium', pinned: false, published: false },
]

const priorityConfig: Record<Priority, { color: string; bg: string; border: string; icon: React.ElementType; leftBorder: string }> = {
  High:   { color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    icon: AlertTriangle, leftBorder: 'border-l-red-500'    },
  Medium: { color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  icon: Bell,          leftBorder: 'border-l-amber-500'  },
  Low:    { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: Info,          leftBorder: 'border-l-blue-500'   },
}

// ── Compose Modal ──────────────────────────────────────────────────────────
function ComposeModal({ announcement, onClose, onSave }: { announcement?: Announcement; onClose: () => void; onSave: (a: Announcement) => void }) {
  const [form, setForm] = useState({
    title:    announcement?.title    ?? '',
    body:     announcement?.body     ?? '',
    date:     announcement?.date     ?? '',
    audience: announcement?.audience ?? 'All Students' as Audience,
    priority: announcement?.priority ?? 'Medium' as Priority,
    pinned:   announcement?.pinned   ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const set = (k: keyof typeof form, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }))

  const handleSave = (publish: boolean) => {
    if (!form.title.trim()) return
    setSaving(true)
    setTimeout(() => {
      setSaving(false); setSaved(true)
      onSave({ id: announcement?.id ?? `a${Date.now()}`, ...form, published: publish })
      setTimeout(() => { setSaved(false); onClose() }, 800)
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">{announcement ? 'Edit Announcement' : 'New Announcement'}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Title</label><input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Announcement title…" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Body</label><textarea value={form.body} onChange={(e) => set('body', e.target.value)} placeholder="Write the full announcement…" rows={4} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Date</label><input value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="e.g. May 15, 2026" className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
            <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Priority</label><select value={form.priority} onChange={(e) => set('priority', e.target.value as Priority)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{(['High','Medium','Low'] as Priority[]).map((p) => <option key={p} value={p} className="bg-[#111118]">{p}</option>)}</select></div>
          </div>
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Audience</label><select value={form.audience} onChange={(e) => set('audience', e.target.value as Audience)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">{(['All Students','Faculty','All','Admin','Placement Cell'] as Audience[]).map((a) => <option key={a} value={a} className="bg-[#111118]">{a}</option>)}</select></div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.pinned} onChange={(e) => set('pinned', e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
            <span className="text-[13px] text-white/50">Pin this announcement to the top</span>
          </label>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={() => handleSave(false)} disabled={saving} className="flex-1 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white/50 hover:text-white/80 transition-colors">Save Draft</button>
          <button onClick={() => handleSave(true)} disabled={saving || saved} className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${saved ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60'}`}>
            {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Publishing…</> : saved ? <><Check className="h-3.5 w-3.5" />Published!</> : <><Send className="h-3.5 w-3.5" />Publish</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Detail Modal ───────────────────────────────────────────────────────────
function DetailModal({ announcement, onClose }: { announcement: Announcement; onClose: () => void }) {
  const pc = priorityConfig[announcement.priority]; const PIcon = pc.icon
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2"><span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${pc.bg} ${pc.color} ${pc.border}`}><PIcon className="h-3 w-3" />{announcement.priority} Priority</span></div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <h3 className="text-[16px] font-semibold text-white/85 mb-3">{announcement.title}</h3>
        <p className="text-[13px] text-white/50 leading-relaxed mb-4">{announcement.body}</p>
        <div className="flex items-center gap-4 text-[12px] text-white/30">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{announcement.date}</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{announcement.audience}</span>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All')
  const [showCompose, setShowCompose] = useState(false)
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null)
  const [viewingAnn, setViewingAnn] = useState<Announcement | null>(null)

  const filtered = announcements.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.audience.toLowerCase().includes(search.toLowerCase())
    const matchPriority = filterPriority === 'All' || a.priority === filterPriority
    return matchSearch && matchPriority
  }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  const handleSave = (a: Announcement) => {
    setAnnouncements((prev) => prev.some((x) => x.id === a.id) ? prev.map((x) => x.id === a.id ? a : x) : [a, ...prev])
    setEditingAnn(null)
  }
  const handleDelete = (id: string) => setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  const togglePin = (id: string) => setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, pinned: !a.pinned } : a))

  const stats = [
    { label: 'Total',     value: announcements.length.toString(),                                    sub: 'All announcements', icon: Bell,          accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Published', value: announcements.filter((a) => a.published).length.toString(),         sub: 'Live',              icon: Send,          accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'High',      value: announcements.filter((a) => a.priority === 'High').length.toString(),sub: 'Priority',         icon: AlertTriangle, accent: 'text-red-400',     bg: 'bg-red-500/10'     },
    { label: 'Pinned',    value: announcements.filter((a) => a.pinned).length.toString(),            sub: 'At the top',        icon: Pin,           accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Announcements</h1>
          <p className="text-sm text-white/35 mt-1">Create and manage campus-wide announcements.</p>
        </div>
        <button onClick={() => setShowCompose(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" />New Announcement
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
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search announcements…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        {(['All', 'High', 'Medium', 'Low'] as (Priority | 'All')[]).map((p) => (
          <button key={p} onClick={() => setFilterPriority(p)} className={`h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${filterPriority === p ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{p === 'All' ? 'All' : `${p} Priority`}</button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-white/[0.07]"><Bell className="h-8 w-8 text-white/10 mx-auto mb-2" /><p className="text-[13px] text-white/25">No announcements found</p></div>
        ) : filtered.map((a) => {
          const pc = priorityConfig[a.priority]; const PIcon = pc.icon
          return (
            <div key={a.id} className={`rounded-xl border border-white/[0.07] bg-white/[0.03] border-l-2 ${pc.leftBorder} p-5 hover:bg-white/[0.05] transition-colors`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg ${pc.bg} border ${pc.border} flex items-center justify-center flex-shrink-0`}><PIcon className={`h-4 w-4 ${pc.color}`} /></div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[14px] font-semibold text-white/80">{a.title}</p>
                      {a.pinned && <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-400 font-semibold">PINNED</span>}
                      {!a.published && <span className="px-1.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.10] text-[9px] text-white/30 font-semibold">DRAFT</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] text-white/30"><Calendar className="h-3 w-3" />{a.date}</span>
                      <span className="flex items-center gap-1 text-[11px] text-white/30"><Users className="h-3 w-3" />{a.audience}</span>
                    </div>
                    <p className="text-[12px] text-white/35 mt-2 line-clamp-2 leading-relaxed">{a.body}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border flex-shrink-0 ${pc.bg} ${pc.color} ${pc.border}`}><PIcon className="h-2.5 w-2.5" />{a.priority}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.05]">
                <button onClick={() => setEditingAnn(a)} className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors"><Edit3 className="h-3 w-3" />Edit</button>
                <button onClick={() => setViewingAnn(a)} className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/40 hover:text-white/70 transition-colors"><Eye className="h-3 w-3" />View</button>
                <button onClick={() => togglePin(a.id)} className={`flex items-center gap-1.5 h-7 px-3 rounded-lg border text-[11px] transition-colors ${a.pinned ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/[0.04] border-white/[0.07] text-white/40 hover:text-white/70'}`}><Pin className="h-3 w-3" />{a.pinned ? 'Unpin' : 'Pin'}</button>
                <button onClick={() => handleDelete(a.id)} className="ml-auto flex items-center gap-1.5 h-7 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-400/60 hover:text-red-400 transition-colors"><Trash2 className="h-3 w-3" />Delete</button>
              </div>
            </div>
          )
        })}
      </div>

      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onSave={handleSave} />}
      {editingAnn && <ComposeModal announcement={editingAnn} onClose={() => setEditingAnn(null)} onSave={handleSave} />}
      {viewingAnn && <DetailModal announcement={viewingAnn} onClose={() => setViewingAnn(null)} />}
    </div>
  )
}
