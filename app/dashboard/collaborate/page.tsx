'use client'

import { useState } from 'react'
import {
  Users, FolderOpen, MessageSquare, Plus, Search,
  Lock, Globe, ChevronRight, Check, X, Loader2,
  BookOpen, Code2, Brain, Palette, Zap, Target,
  Hash, Crown, UserPlus, LogOut, Send, Paperclip,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type GroupType    = 'study' | 'project' | 'research' | 'club'
type GroupPrivacy = 'public' | 'private'
type Tab          = 'groups' | 'my-groups' | 'messages'

interface Member {
  name: string
  initials: string
  role: 'admin' | 'member'
  accent: string
}

interface Group {
  id: string
  name: string
  topic: string
  type: GroupType
  privacy: GroupPrivacy
  members: Member[]
  maxMembers: number
  description: string
  tags: string[]
  lastActive: string
  joined: boolean
  unread?: number
}

interface Message {
  id: string
  sender: string
  initials: string
  accent: string
  text: string
  time: string
  isMe: boolean
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialGroups: Group[] = [
  {
    id: 'g1', name: 'Data Structures Study', topic: 'CS Core', type: 'study', privacy: 'public',
    members: [
      { name: 'Vikas Reddy', initials: 'VR', role: 'member', accent: 'text-blue-400' },
      { name: 'Priya S',     initials: 'PS', role: 'admin',  accent: 'text-violet-400' },
      { name: 'Arjun K',     initials: 'AK', role: 'member', accent: 'text-emerald-400' },
    ],
    maxMembers: 20, description: 'Weekly sessions on trees, graphs, and dynamic programming.',
    tags: ['DSA', 'Algorithms', 'CS201'], lastActive: '2 hours ago', joined: true, unread: 3,
  },
  {
    id: 'g2', name: 'Web Dev Project Team', topic: 'Web Development', type: 'project', privacy: 'private',
    members: [
      { name: 'Rahul M',  initials: 'RM', role: 'admin',  accent: 'text-amber-400' },
      { name: 'Sneha P',  initials: 'SP', role: 'member', accent: 'text-cyan-400' },
    ],
    maxMembers: 8, description: 'Building a full-stack campus portal using Next.js and Firebase.',
    tags: ['React', 'Next.js', 'Firebase'], lastActive: '30 min ago', joined: true, unread: 1,
  },
  {
    id: 'g3', name: 'Exam Prep — Algorithms', topic: 'CS Core', type: 'study', privacy: 'public',
    members: [
      { name: 'Kiran T',  initials: 'KT', role: 'admin',  accent: 'text-rose-400' },
      { name: 'Divya R',  initials: 'DR', role: 'member', accent: 'text-blue-400' },
      { name: 'Anil B',   initials: 'AB', role: 'member', accent: 'text-emerald-400' },
      { name: 'Meena S',  initials: 'MS', role: 'member', accent: 'text-amber-400' },
    ],
    maxMembers: 30, description: 'Intensive exam prep with mock tests and problem-solving sessions.',
    tags: ['Algorithms', 'Exam', 'CS202'], lastActive: '1 day ago', joined: false,
  },
  {
    id: 'g4', name: 'AI/ML Research Group', topic: 'Research', type: 'research', privacy: 'private',
    members: [
      { name: 'Dr. Patel', initials: 'DP', role: 'admin',  accent: 'text-violet-400' },
      { name: 'Ravi K',    initials: 'RK', role: 'member', accent: 'text-cyan-400' },
      { name: 'Nisha V',   initials: 'NV', role: 'member', accent: 'text-rose-400' },
    ],
    maxMembers: 10, description: 'Exploring LLMs, computer vision, and ML deployment pipelines.',
    tags: ['ML', 'Python', 'Research'], lastActive: '3 hours ago', joined: false,
  },
  {
    id: 'g5', name: 'Competitive Programming', topic: 'Coding Club', type: 'club', privacy: 'public',
    members: [
      { name: 'Suresh N',  initials: 'SN', role: 'admin',  accent: 'text-amber-400' },
      { name: 'Pooja L',   initials: 'PL', role: 'member', accent: 'text-blue-400' },
      { name: 'Vikram S',  initials: 'VS', role: 'member', accent: 'text-emerald-400' },
      { name: 'Ananya R',  initials: 'AR', role: 'member', accent: 'text-rose-400' },
      { name: 'Deepak M',  initials: 'DM', role: 'member', accent: 'text-cyan-400' },
    ],
    maxMembers: 50, description: 'Weekly Codeforces/LeetCode contests and editorial discussions.',
    tags: ['CP', 'LeetCode', 'Codeforces'], lastActive: '5 hours ago', joined: false,
  },
  {
    id: 'g6', name: 'UI/UX Design Circle', topic: 'Design', type: 'club', privacy: 'public',
    members: [
      { name: 'Lavanya K', initials: 'LK', role: 'admin',  accent: 'text-violet-400' },
      { name: 'Rohit P',   initials: 'RP', role: 'member', accent: 'text-blue-400' },
    ],
    maxMembers: 15, description: 'Figma workshops, design critiques, and portfolio building.',
    tags: ['Figma', 'UX', 'Design'], lastActive: '2 days ago', joined: false,
  },
]

const groupTypeConfig: Record<GroupType, { icon: React.ElementType; color: string; bg: string; border: string; label: string }> = {
  study:    { icon: BookOpen, color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    label: 'Study' },
  project:  { icon: FolderOpen, color: 'text-amber-400', bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   label: 'Project' },
  research: { icon: Brain,    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  label: 'Research' },
  club:     { icon: Zap,      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Club' },
}

const initialMessages: Record<string, Message[]> = {
  g1: [
    { id: 'm1', sender: 'Priya S',  initials: 'PS', accent: 'text-violet-400', text: 'Hey everyone! Sharing the notes from today\'s session on AVL trees.', time: '10:30 AM', isMe: false },
    { id: 'm2', sender: 'Arjun K',  initials: 'AK', accent: 'text-emerald-400', text: 'Thanks Priya! The rotation diagrams were really helpful.', time: '10:32 AM', isMe: false },
    { id: 'm3', sender: 'You',       initials: 'VR', accent: 'text-blue-400', text: 'Can we also cover Red-Black trees next session?', time: '10:35 AM', isMe: true },
    { id: 'm4', sender: 'Priya S',  initials: 'PS', accent: 'text-violet-400', text: 'Sure! I\'ll add it to the agenda for Saturday.', time: '10:36 AM', isMe: false },
  ],
  g2: [
    { id: 'm1', sender: 'Rahul M',  initials: 'RM', accent: 'text-amber-400', text: 'PR #12 is ready for review — added the auth middleware.', time: '9:15 AM', isMe: false },
    { id: 'm2', sender: 'You',       initials: 'VR', accent: 'text-blue-400', text: 'On it! Will review by EOD.', time: '9:20 AM', isMe: true },
  ],
}

// ── Create Group Modal ─────────────────────────────────────────────────────
function CreateGroupModal({ onClose, onCreate }: { onClose: () => void; onCreate: (g: Group) => void }) {
  const [name, setName]           = useState('')
  const [description, setDesc]    = useState('')
  const [topic, setTopic]         = useState('')
  const [type, setType]           = useState<GroupType>('study')
  const [privacy, setPrivacy]     = useState<GroupPrivacy>('public')
  const [tags, setTags]           = useState('')
  const [creating, setCreating]   = useState(false)
  const [done, setDone]           = useState(false)

  const handleCreate = () => {
    if (!name.trim()) return
    setCreating(true)
    setTimeout(() => {
      setCreating(false); setDone(true)
      const g: Group = {
        id: `g${Date.now()}`, name: name.trim(), topic: topic || 'General',
        type, privacy, description, tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        members: [{ name: 'You', initials: 'VR', role: 'admin', accent: 'text-blue-400' }],
        maxMembers: 20, lastActive: 'just now', joined: true,
      }
      setTimeout(() => { onCreate(g); onClose() }, 700)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Create Group</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Group Name',   value: name,        set: setName,  placeholder: 'e.g. DSA Study Circle' },
            { label: 'Topic',        value: topic,       set: setTopic, placeholder: 'e.g. Data Structures' },
            { label: 'Description',  value: description, set: setDesc,  placeholder: 'What is this group about?' },
            { label: 'Tags',         value: tags,        set: setTags,  placeholder: 'DSA, Trees, CS201' },
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
              <select value={type} onChange={(e) => setType(e.target.value as GroupType)}
                className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none"
              >
                {(Object.keys(groupTypeConfig) as GroupType[]).map((t) => (
                  <option key={t} value={t} className="bg-[#111118] capitalize">{groupTypeConfig[t].label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-white/35 uppercase tracking-wide">Privacy</label>
              <div className="flex gap-1.5">
                {(['public', 'private'] as const).map((p) => (
                  <button key={p} onClick={() => setPrivacy(p)}
                    className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-[12px] font-medium transition-colors border ${
                      privacy === p ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35'
                    }`}
                  >
                    {p === 'public' ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleCreate} disabled={!name.trim() || creating || done}
            className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${
              done ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
            }`}
          >
            {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {creating ? 'Creating…' : done ? 'Created!' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Group Card ─────────────────────────────────────────────────────────────
function GroupCard({ group, onJoin, onLeave, onOpenChat }: {
  group: Group
  onJoin: () => void
  onLeave: () => void
  onOpenChat: () => void
}) {
  const tc = groupTypeConfig[group.type]
  const Icon = tc.icon
  const fillPct = Math.round((group.members.length / group.maxMembers) * 100)

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-lg ${tc.bg} border ${tc.border} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-4.5 w-4.5 ${tc.color}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[14px] font-semibold text-white/80 truncate">{group.name}</p>
              {group.privacy === 'private' && <Lock className="h-3 w-3 text-white/25 flex-shrink-0" />}
              {group.joined && group.unread && group.unread > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-blue-600/20 border border-blue-500/20 text-[10px] text-blue-400 font-semibold">{group.unread}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${tc.bg} ${tc.color} ${tc.border}`}>{tc.label}</span>
              <span className="text-[11px] text-white/30">{group.topic}</span>
            </div>
          </div>
        </div>
        <span className="text-[10px] text-white/20 flex-shrink-0 mt-1">{group.lastActive}</span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-white/40 leading-relaxed line-clamp-2">{group.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {group.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/30">
            <Hash className="h-2.5 w-2.5" />{tag}
          </span>
        ))}
      </div>

      {/* Members */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {group.members.slice(0, 5).map((m, i) => (
              <div key={i} title={m.name}
                className={`w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-[9px] font-semibold ${m.accent}`}
              >
                {m.initials}
              </div>
            ))}
            {group.members.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center text-[9px] text-white/30">
                +{group.members.length - 5}
              </div>
            )}
          </div>
          <span className="text-[11px] text-white/30">{group.members.length}/{group.maxMembers}</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${fillPct > 80 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${fillPct}%` }} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-white/[0.05]">
        {group.joined ? (
          <>
            <button onClick={onOpenChat}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[12px] text-blue-400 hover:bg-blue-600/25 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Open Chat
            </button>
            <button onClick={onLeave}
              className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/35 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button onClick={onJoin}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5" />
            {group.privacy === 'private' ? 'Request to Join' : 'Join Group'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Chat Panel ─────────────────────────────────────────────────────────────
function ChatPanel({ group, messages, onClose, onSend }: {
  group: Group
  messages: Message[]
  onClose: () => void
  onSend: (text: string) => void
}) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm flex flex-col border-l border-white/[0.08] shadow-2xl" style={{ backgroundColor: 'var(--theme-surface, #111118)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg ${groupTypeConfig[group.type].bg} border ${groupTypeConfig[group.type].border} flex items-center justify-center`}>
              {(() => { const Icon = groupTypeConfig[group.type].icon; return <Icon className={`h-4 w-4 ${groupTypeConfig[group.type].color}`} /> })()}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/80">{group.name}</p>
              <p className="text-[10px] text-white/30">{group.members.length} members</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full bg-white/[0.07] border border-white/[0.10] flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${msg.accent}`}>
                {msg.initials}
              </div>
              <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!msg.isMe && <p className="text-[10px] text-white/30 px-1">{msg.sender}</p>}
                <div className={`px-3 py-2 rounded-xl text-[12px] leading-relaxed ${
                  msg.isMe
                    ? 'bg-blue-600/25 border border-blue-500/20 text-white/80 rounded-tr-sm'
                    : 'bg-white/[0.05] border border-white/[0.07] text-white/65 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-white/20 px-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/50 transition-colors flex-shrink-0">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type a message…"
              className="flex-1 h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-40 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CollaboratePage() {
  const [groups, setGroups]         = useState(initialGroups)
  const [messages, setMessages]     = useState(initialMessages)
  const [activeTab, setActiveTab]   = useState<Tab>('groups')
  const [search, setSearch]         = useState('')
  const [filterType, setFilterType] = useState<GroupType | 'All'>('All')
  const [showCreate, setShowCreate] = useState(false)
  const [chatGroup, setChatGroup]   = useState<Group | null>(null)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'groups',    label: 'All Groups' },
    { id: 'my-groups', label: 'My Groups' },
  ]

  const filtered = groups.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.topic.toLowerCase().includes(search.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchType = filterType === 'All' || g.type === filterType
    const matchTab  = activeTab === 'groups' || (activeTab === 'my-groups' && g.joined)
    return matchSearch && matchType && matchTab
  })

  const totalMembers = groups.reduce((s, g) => s + g.members.length, 0)
  const myGroups     = groups.filter((g) => g.joined).length
  const totalUnread  = groups.reduce((s, g) => s + (g.unread || 0), 0)

  const handleJoin  = (id: string) => setGroups((p) => p.map((g) => g.id === id ? { ...g, joined: true } : g))
  const handleLeave = (id: string) => setGroups((p) => p.map((g) => g.id === id ? { ...g, joined: false, unread: 0 } : g))
  const handleCreate = (g: Group) => setGroups((p) => [g, ...p])

  const handleSendMessage = (groupId: string, text: string) => {
    const newMsg: Message = {
      id: `m${Date.now()}`, sender: 'You', initials: 'VR', accent: 'text-blue-400',
      text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), isMe: true,
    }
    setMessages((p) => ({ ...p, [groupId]: [...(p[groupId] || []), newMsg] }))
    // Clear unread when chatting
    setGroups((p) => p.map((g) => g.id === groupId ? { ...g, unread: 0 } : g))
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Campus Network</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Collaborate</h1>
          <p className="text-sm text-white/35 mt-1">Join study groups, project teams, and clubs.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> Create Group
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Groups',  value: groups.length.toString(),  sub: 'Active groups',    icon: Users,          accent: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'My Groups',     value: myGroups.toString(),        sub: 'Joined',           icon: Target,         accent: 'text-violet-400',  bg: 'bg-violet-500/10' },
          { label: 'Total Members', value: totalMembers.toString(),    sub: 'Across all groups',icon: Users,          accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Unread',        value: totalUnread.toString(),     sub: 'New messages',     icon: MessageSquare,  accent: 'text-amber-400',   bg: 'bg-amber-500/10' },
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

      {/* Tabs + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-1 border-b border-white/[0.06] w-full sm:w-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
                activeTab === t.id ? 'border-blue-500 text-white/80' : 'border-transparent text-white/35 hover:text-white/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search groups…"
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1">
            {(['All', 'study', 'project', 'research', 'club'] as const).map((f) => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`h-9 px-3 rounded-lg text-[11px] font-medium transition-colors border capitalize ${
                  filterType === f
                    ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                    : 'bg-white/[0.03] border-white/[0.07] text-white/30 hover:text-white/60'
                }`}
              >
                {f === 'All' ? 'All' : groupTypeConfig[f].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <Users className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No groups found</p>
          <button onClick={() => { setSearch(''); setFilterType('All') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoin={() => handleJoin(group.id)}
              onLeave={() => handleLeave(group.id)}
              onOpenChat={() => setChatGroup(group)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateGroupModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
      {chatGroup && (
        <ChatPanel
          group={chatGroup}
          messages={messages[chatGroup.id] || []}
          onClose={() => setChatGroup(null)}
          onSend={(text) => handleSendMessage(chatGroup.id, text)}
        />
      )}
    </div>
  )
}
