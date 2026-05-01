'use client'

import { useState } from 'react'
import {
  Briefcase, GraduationCap, Users, Calendar, Search,
  MapPin, Clock, ArrowUpRight, Bookmark, BookmarkCheck,
  Star, ChevronRight, Zap, TrendingUp, Award, Code2,
  Palette, Brain, Globe, Filter, X, Check, ExternalLink,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type ItemType = 'Job' | 'Workshop' | 'Event' | 'Course' | 'Community' | 'Hackathon'
type Tab      = 'all' | 'jobs' | 'events' | 'courses' | 'communities'

interface ExploreItem {
  id: string
  title: string
  organiser: string
  type: ItemType
  location: string
  date?: string
  deadline?: string
  tags: string[]
  description: string
  saved: boolean
  featured: boolean
  badge?: string
  meta?: string          // salary / duration / prize
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialItems: ExploreItem[] = [
  {
    id: 'e1', title: 'Software Engineer Intern', organiser: 'Google', type: 'Job',
    location: 'Bangalore', deadline: 'May 10', tags: ['React', 'Node.js', 'Go'],
    description: 'Join the core infrastructure team for a 6-month internship building scalable systems.',
    saved: true, featured: true, badge: 'Hot', meta: '₹60k/month',
  },
  {
    id: 'e2', title: 'Full Stack Developer', organiser: 'Microsoft', type: 'Job',
    location: 'Hyderabad', deadline: 'May 18', tags: ['TypeScript', 'Azure', 'React'],
    description: 'Build enterprise-grade web applications for Microsoft 365 suite.',
    saved: false, featured: true, meta: '₹18–22 LPA',
  },
  {
    id: 'e3', title: 'Data Science Workshop', organiser: 'Tech Club', type: 'Workshop',
    location: 'Campus — Hall B', date: 'May 6', tags: ['Python', 'ML', 'Pandas'],
    description: 'Hands-on 3-hour workshop covering data cleaning, EDA, and model building.',
    saved: false, featured: true, badge: 'Free', meta: '3 hours',
  },
  {
    id: 'e4', title: 'System Design Bootcamp', organiser: 'Placement Cell', type: 'Workshop',
    location: 'Online', date: 'May 9', tags: ['Architecture', 'Scalability', 'Interviews'],
    description: 'Intensive bootcamp on designing large-scale distributed systems for top tech interviews.',
    saved: true, featured: false, meta: '2 days',
  },
  {
    id: 'e5', title: 'HackCampus 2025', organiser: 'CSE Dept.', type: 'Hackathon',
    location: 'Campus', date: 'May 15–16', tags: ['Open Theme', '24hr', 'Prizes'],
    description: 'Annual 24-hour hackathon with ₹1L prize pool. Open to all branches.',
    saved: false, featured: true, badge: 'New', meta: '₹1L prize',
  },
  {
    id: 'e6', title: 'React & Next.js Masterclass', organiser: 'Web Dev Club', type: 'Course',
    location: 'Online', date: 'Starts May 12', tags: ['React', 'Next.js', 'Tailwind'],
    description: '4-week self-paced course covering modern React patterns and full-stack Next.js.',
    saved: false, featured: false, meta: '4 weeks',
  },
  {
    id: 'e7', title: 'UI/UX Design Fundamentals', organiser: 'Design Academy', type: 'Course',
    location: 'Online', date: 'Starts May 20', tags: ['Figma', 'UX Research', 'Prototyping'],
    description: 'Learn user-centred design from scratch with real project briefs.',
    saved: true, featured: false, meta: '6 weeks',
  },
  {
    id: 'e8', title: 'Open Source Contributors', organiser: 'GitHub Campus', type: 'Community',
    location: 'Online', tags: ['Open Source', 'Git', 'Collaboration'],
    description: 'Community of 200+ students contributing to open-source projects together.',
    saved: false, featured: false, meta: '214 members',
  },
  {
    id: 'e9', title: 'AI/ML Enthusiasts', organiser: 'Research Cell', type: 'Community',
    location: 'Campus + Online', tags: ['ML', 'Deep Learning', 'Papers'],
    description: 'Weekly paper reading sessions and project showcases on AI/ML topics.',
    saved: false, featured: false, meta: '89 members',
  },
  {
    id: 'e10', title: 'Campus Tech Fest', organiser: 'Student Council', type: 'Event',
    location: 'Campus', date: 'May 22–24', tags: ['Tech', 'Competitions', 'Networking'],
    description: 'Three-day annual tech festival with competitions, talks, and company stalls.',
    saved: false, featured: true, badge: 'Upcoming', meta: '3 days',
  },
]

// ── Type config ────────────────────────────────────────────────────────────
const typeConfig: Record<ItemType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  Job:       { icon: Briefcase,     color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  Workshop:  { icon: GraduationCap, color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20' },
  Event:     { icon: Calendar,      color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  Course:    { icon: Code2,         color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20' },
  Community: { icon: Users,         color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Hackathon: { icon: Zap,           color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
}

const badgeConfig: Record<string, { color: string; bg: string; border: string }> = {
  Hot:      { color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
  New:      { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Free:     { color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20' },
  Upcoming: { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
}

// ── Item Card ──────────────────────────────────────────────────────────────
function ExploreCard({ item, onSave, onView }: {
  item: ExploreItem
  onSave: () => void
  onView: () => void
}) {
  const tc = typeConfig[item.type]
  const Icon = tc.icon

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-4 w-4 ${tc.color}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[13px] font-semibold text-white/80 truncate">{item.title}</p>
              {item.badge && (() => {
                const bc = badgeConfig[item.badge!] ?? badgeConfig.New
                return (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${bc.bg} ${bc.color} ${bc.border}`}>
                    {item.badge}
                  </span>
                )
              })()}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>{item.type}</span>
              <span className="text-[11px] text-white/30">{item.organiser}</span>
            </div>
          </div>
        </div>
        <button onClick={onSave} className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors flex-shrink-0">
          {item.saved
            ? <BookmarkCheck className="h-3.5 w-3.5 text-blue-400" />
            : <Bookmark className="h-3.5 w-3.5 text-white/20 hover:text-white/50" />
          }
        </button>
      </div>

      {/* Description */}
      <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">{item.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30">{tag}</span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 flex-wrap">
          {item.meta && (
            <span className="text-[11px] font-medium text-white/50">{item.meta}</span>
          )}
          {(item.date || item.deadline) && (
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Clock className="h-3 w-3" />
              {item.date ? item.date : `Due ${item.deadline}`}
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-white/25">
            <MapPin className="h-3 w-3" />{item.location}
          </span>
        </div>
        <button
          onClick={onView}
          className="flex items-center gap-1 h-7 px-2.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors flex-shrink-0"
        >
          View <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

// ── Detail Modal ───────────────────────────────────────────────────────────
function DetailModal({ item, onClose, onSave }: { item: ExploreItem; onClose: () => void; onSave: () => void }) {
  const tc = typeConfig[item.type]
  const Icon = tc.icon
  const [registered, setRegistered] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${tc.color}`} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-white/80">{item.title}</h3>
              <p className="text-[12px] text-white/35 mt-0.5">{item.organiser} · {item.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-[13px] text-white/55 leading-relaxed">{item.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Location', value: item.location, icon: MapPin },
              ...(item.meta ? [{ label: item.type === 'Job' ? 'Package' : 'Duration', value: item.meta, icon: Award }] : []),
              ...(item.date ? [{ label: 'Date', value: item.date, icon: Calendar }] : []),
              ...(item.deadline ? [{ label: 'Deadline', value: item.deadline, icon: Clock }] : []),
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

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/40">{tag}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-white/[0.06]">
          <button onClick={onSave}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-lg border text-[12px] font-medium transition-colors ${
              item.saved ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/70'
            }`}
          >
            {item.saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            {item.saved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() => setRegistered(true)}
            disabled={registered}
            className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-[13px] font-medium transition-colors ${
              registered
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {registered ? <><Check className="h-3.5 w-3.5" /> Registered!</> : (
              item.type === 'Job' ? <><ExternalLink className="h-3.5 w-3.5" /> Apply Now</> :
              item.type === 'Community' ? <><Users className="h-3.5 w-3.5" /> Join Community</> :
              <><Calendar className="h-3.5 w-3.5" /> Register</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [items, setItems]           = useState(initialItems)
  const [search, setSearch]         = useState('')
  const [activeTab, setActiveTab]   = useState<Tab>('all')
  const [savedOnly, setSavedOnly]   = useState(false)
  const [viewItem, setViewItem]     = useState<ExploreItem | null>(null)

  const tabMap: Record<Tab, ItemType[]> = {
    all:         [],
    jobs:        ['Job'],
    events:      ['Workshop', 'Event', 'Hackathon'],
    courses:     ['Course'],
    communities: ['Community'],
  }

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.organiser.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchTab    = activeTab === 'all' || tabMap[activeTab].includes(item.type)
    const matchSaved  = !savedOnly || item.saved
    return matchSearch && matchTab && matchSaved
  })

  const featured = items.filter((i) => i.featured)

  const handleSave = (id: string) => setItems((p) => p.map((i) => i.id === id ? { ...i, saved: !i.saved } : i))

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all',         label: 'All',         count: items.length },
    { id: 'jobs',        label: 'Jobs',         count: items.filter((i) => i.type === 'Job').length },
    { id: 'events',      label: 'Events',       count: items.filter((i) => ['Workshop','Event','Hackathon'].includes(i.type)).length },
    { id: 'courses',     label: 'Courses',      count: items.filter((i) => i.type === 'Course').length },
    { id: 'communities', label: 'Communities',  count: items.filter((i) => i.type === 'Community').length },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Discovery</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Explore</h1>
        <p className="text-sm text-white/35 mt-1">Discover jobs, events, courses, and communities.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Job Openings',  value: items.filter((i) => i.type === 'Job').length,                              icon: Briefcase,     accent: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Workshops',     value: items.filter((i) => i.type === 'Workshop' || i.type === 'Hackathon').length, icon: GraduationCap, accent: 'text-violet-400',  bg: 'bg-violet-500/10' },
          { label: 'Communities',   value: items.filter((i) => i.type === 'Community').length,                         icon: Users,         accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Events',        value: items.filter((i) => i.type === 'Event').length,                             icon: Calendar,      accent: 'text-amber-400',   bg: 'bg-amber-500/10' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-white/35 font-medium uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-4 w-4 ${s.accent}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Featured strip */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-3.5 w-3.5 text-amber-400" />
          <p className="text-[12px] font-semibold text-white/50 uppercase tracking-wide">Featured</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {featured.map((item) => {
            const tc = typeConfig[item.type]
            const Icon = tc.icon
            return (
              <button
                key={item.id}
                onClick={() => setViewItem(item)}
                className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left min-w-[220px]"
              >
                <div className={`w-8 h-8 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-3.5 w-3.5 ${tc.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-white/70 truncate">{item.title}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{item.organiser}</p>
                </div>
                {item.badge && (() => {
                  const bc = badgeConfig[item.badge!] ?? badgeConfig.New
                  return <span className={`ml-auto flex-shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${bc.bg} ${bc.color} ${bc.border}`}>{item.badge}</span>
                })()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabs + search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1 border-b border-white/[0.06] w-full sm:w-auto overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t.id ? 'border-blue-500 text-white/80' : 'border-transparent text-white/35 hover:text-white/60'
                }`}
              >
                {t.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  activeTab === t.id ? 'bg-blue-600/20 text-blue-400' : 'bg-white/[0.06] text-white/25'
                }`}>{t.count}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, organiser, or tag…"
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <button onClick={() => setSavedOnly((v) => !v)}
              className={`flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border flex-shrink-0 ${
                savedOnly ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" /> Saved
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-white/30">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        {(search || savedOnly) && (
          <button onClick={() => { setSearch(''); setSavedOnly(false) }} className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors flex items-center gap-1">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <Search className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No results found</p>
          <button onClick={() => { setSearch(''); setSavedOnly(false); setActiveTab('all') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >Clear all filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ExploreCard
              key={item.id}
              item={item}
              onSave={() => handleSave(item.id)}
              onView={() => setViewItem(item)}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {viewItem && (
        <DetailModal
          item={viewItem}
          onClose={() => setViewItem(null)}
          onSave={() => handleSave(viewItem.id)}
        />
      )}
    </div>
  )
}
