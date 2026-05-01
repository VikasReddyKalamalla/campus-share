'use client'

import { useState } from 'react'
import {
  Users, MessageSquare, UserPlus, Search, Check,
  Building2, MapPin, Link2, Filter, X, UserCheck,
  TrendingUp, Globe, Briefcase, ChevronRight,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type ConnectionStatus = 'none' | 'pending' | 'connected'

interface Professional {
  id: string
  name: string
  initials: string
  role: string
  company: string
  location: string
  connections: number
  status: ConnectionStatus
  accent: string
  tags: string[]
  mutual: number
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialProfessionals: Professional[] = [
  { id: 'p1', name: 'John Doe',       initials: 'JD', role: 'Software Engineer',  company: 'Google',    location: 'Bangalore', connections: 234, status: 'connected', accent: 'text-blue-400',    tags: ['React', 'Go', 'Cloud'],       mutual: 12 },
  { id: 'p2', name: 'Jane Smith',     initials: 'JS', role: 'Data Scientist',     company: 'Microsoft', location: 'Hyderabad', connections: 189, status: 'pending',   accent: 'text-violet-400',  tags: ['Python', 'ML', 'Azure'],      mutual: 8  },
  { id: 'p3', name: 'Bob Johnson',    initials: 'BJ', role: 'Product Manager',    company: 'Amazon',    location: 'Mumbai',    connections: 312, status: 'none',      accent: 'text-amber-400',   tags: ['Strategy', 'Agile', 'B2B'],   mutual: 5  },
  { id: 'p4', name: 'Alice Williams', initials: 'AW', role: 'UX Designer',        company: 'Meta',      location: 'Pune',      connections: 156, status: 'none',      accent: 'text-rose-400',    tags: ['Figma', 'UX Research'],       mutual: 3  },
  { id: 'p5', name: 'Charlie Brown',  initials: 'CB', role: 'DevOps Engineer',    company: 'Netflix',   location: 'Bangalore', connections: 201, status: 'connected', accent: 'text-emerald-400', tags: ['Docker', 'K8s', 'AWS'],       mutual: 9  },
  { id: 'p6', name: 'Diana Prince',   initials: 'DP', role: 'ML Engineer',        company: 'Tesla',     location: 'Chennai',   connections: 278, status: 'none',      accent: 'text-cyan-400',    tags: ['PyTorch', 'MLOps', 'CV'],     mutual: 6  },
  { id: 'p7', name: 'Ethan Hunt',     initials: 'EH', role: 'Backend Engineer',   company: 'Flipkart',  location: 'Bangalore', connections: 143, status: 'none',      accent: 'text-blue-400',    tags: ['Java', 'Kafka', 'Microservices'], mutual: 4 },
  { id: 'p8', name: 'Fiona Green',    initials: 'FG', role: 'Frontend Engineer',  company: 'Razorpay',  location: 'Bangalore', connections: 167, status: 'pending',   accent: 'text-violet-400',  tags: ['React', 'TypeScript', 'CSS'], mutual: 7  },
  { id: 'p9', name: 'George Miller',  initials: 'GM', role: 'Security Engineer',  company: 'Zomato',    location: 'Gurgaon',   connections: 98,  status: 'none',      accent: 'text-amber-400',   tags: ['Pentesting', 'SIEM', 'IAM'],  mutual: 2  },
]

// ── Profile Card ───────────────────────────────────────────────────────────
function ProfileCard({ person, onConnect, onMessage }: {
  person: Professional
  onConnect: () => void
  onMessage: () => void
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-5 flex flex-col gap-4">
      {/* Avatar + info */}
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[14px] font-bold flex-shrink-0 ${person.accent}`}>
          {person.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-white/80 truncate">{person.name}</p>
          <p className="text-[12px] text-white/40 truncate">{person.role}</p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <Building2 className="h-3 w-3" />{person.company}
            </span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1 text-[11px] text-white/30">
              <MapPin className="h-3 w-3" />{person.location}
            </span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {person.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30">
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-[11px] text-white/25 border-t border-white/[0.05] pt-3">
        <span className="flex items-center gap-1">
          <Link2 className="h-3 w-3" />{person.connections} connections
        </span>
        {person.mutual > 0 && (
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />{person.mutual} mutual
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {person.status === 'connected' ? (
          <>
            <button
              onClick={onMessage}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Message
            </button>
            <div className="flex items-center justify-center h-8 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[12px] text-emerald-400">
              <UserCheck className="h-3.5 w-3.5" />
            </div>
          </>
        ) : person.status === 'pending' ? (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/30 cursor-not-allowed"
          >
            <Check className="h-3.5 w-3.5" /> Pending
          </button>
        ) : (
          <>
            <button
              onClick={onConnect}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
            >
              <UserPlus className="h-3.5 w-3.5" /> Connect
            </button>
            <button
              onClick={onMessage}
              className="flex items-center justify-center h-8 px-3 rounded-lg bg-white/[0.03] border border-white/[0.07] text-[12px] text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Message Modal ──────────────────────────────────────────────────────────
function MessageModal({ person, onClose }: { person: Professional; onClose: () => void }) {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!text.trim()) return
    setSent(true)
    setTimeout(() => onClose(), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[13px] font-bold ${person.accent}`}>
            {person.initials}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white/80">{person.name}</p>
            <p className="text-[12px] text-white/35">{person.role} · {person.company}</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Write a message to ${person.name.split(' ')[0]}…`}
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
        />
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!text.trim() || sent}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              sent
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
            }`}
          >
            {sent ? <><Check className="h-3.5 w-3.5" /> Sent!</> : <><MessageSquare className="h-3.5 w-3.5" /> Send</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function NetworkingPage() {
  const [people, setPeople]         = useState(initialProfessionals)
  const [search, setSearch]         = useState('')
  const [filterStatus, setFilter]   = useState<'all' | 'connected' | 'pending'>('all')
  const [msgTarget, setMsgTarget]   = useState<Professional | null>(null)

  const connected = people.filter((p) => p.status === 'connected').length
  const pending   = people.filter((p) => p.status === 'pending').length
  const messages  = 45

  const filtered = people.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchFilter =
      filterStatus === 'all' ||
      (filterStatus === 'connected' && p.status === 'connected') ||
      (filterStatus === 'pending'   && p.status === 'pending')
    return matchSearch && matchFilter
  })

  const handleConnect = (id: string) =>
    setPeople((prev) => prev.map((p) => p.id === id ? { ...p, status: 'pending' } : p))

  const filters: { id: 'all' | 'connected' | 'pending'; label: string }[] = [
    { id: 'all',       label: 'All' },
    { id: 'connected', label: 'Connected' },
    { id: 'pending',   label: 'Pending' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Employee</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Networking</h1>
        <p className="text-sm text-white/35 mt-1">Connect with campus talent and industry professionals.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Connections',  value: connected.toString(), sub: 'Active',          icon: UserCheck,   accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
          { label: 'Pending',      value: pending.toString(),   sub: 'Awaiting reply',  icon: UserPlus,    accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
          { label: 'Messages',     value: messages.toString(),  sub: 'Conversations',   icon: MessageSquare, accent: 'text-violet-400', bg: 'bg-violet-500/10' },
          { label: 'Professionals',value: people.length.toString(), sub: 'In network',  icon: Globe,       accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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
            placeholder="Search by name, role, company, or skill…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border ${
                filterStatus === f.id
                  ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                  : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
              }`}
            >
              {f.label}
            </button>
          ))}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="h-9 px-2 rounded-lg text-white/25 hover:text-white/60 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-[12px] text-white/30">
        {filtered.length} professional{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <Users className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No professionals match your search</p>
          <button
            onClick={() => { setSearch(''); setFilter('all') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((person) => (
            <ProfileCard
              key={person.id}
              person={person}
              onConnect={() => handleConnect(person.id)}
              onMessage={() => setMsgTarget(person)}
            />
          ))}
        </div>
      )}

      {/* Message modal */}
      {msgTarget && (
        <MessageModal person={msgTarget} onClose={() => setMsgTarget(null)} />
      )}
    </div>
  )
}
