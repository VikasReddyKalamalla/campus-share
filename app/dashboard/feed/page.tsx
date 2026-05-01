'use client'

import { useState } from 'react'
import {
  Heart, MessageSquare, Share2, Bookmark, BookmarkCheck,
  Plus, Search, X, Megaphone, GraduationCap, Users,
  Trophy, Briefcase, Bell, TrendingUp, Filter,
  MoreHorizontal, Send, Check,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type PostCategory = 'placement' | 'academic' | 'event' | 'sports' | 'announcement' | 'general'

interface Post {
  id: string
  author: string
  authorInitials: string
  category: PostCategory
  time: string
  content: string
  likes: number
  comments: number
  liked: boolean
  saved: boolean
  pinned?: boolean
}

// ── Category config ────────────────────────────────────────────────────────
const categoryConfig: Record<PostCategory, {
  icon: React.ElementType
  label: string
  color: string
  bg: string
  border: string
}> = {
  placement:    { icon: Briefcase,    label: 'Placement',    color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  academic:     { icon: GraduationCap,label: 'Academic',     color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
  event:        { icon: Trophy,       label: 'Event',        color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  sports:       { icon: Users,        label: 'Sports',       color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  announcement: { icon: Megaphone,    label: 'Announcement', color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'    },
  general:      { icon: Bell,         label: 'General',      color: 'text-white/40',    bg: 'bg-white/[0.05]',   border: 'border-white/[0.08]'   },
}

// ── Data ───────────────────────────────────────────────────────────────────
const initialPosts: Post[] = [
  {
    id: 'f1', author: 'Placement Cell', authorInitials: 'PC', category: 'placement',
    time: '2 hours ago', pinned: true,
    content: 'Google is visiting campus next week for recruitment. Eligible students from CSE, ECE, and IT branches can register via the placement portal by May 5th. Don\'t miss this opportunity!',
    likes: 45, comments: 12, liked: false, saved: false,
  },
  {
    id: 'f2', author: 'Tech Club', authorInitials: 'TC', category: 'academic',
    time: '5 hours ago',
    content: 'Workshop on Machine Learning this Saturday, 10 AM – 1 PM in Hall B. Topics: data preprocessing, model training, and deployment. Limited seats — register now on the club portal.',
    likes: 32, comments: 8, liked: true, saved: true,
  },
  {
    id: 'f3', author: 'Student Council', authorInitials: 'SC', category: 'event',
    time: '1 day ago',
    content: 'Annual Tech Fest registrations are now open! This year\'s theme is "Future Forward". Register your team for hackathons, coding contests, and design challenges. Last date: May 10.',
    likes: 78, comments: 23, liked: false, saved: false,
  },
  {
    id: 'f4', author: 'Sports Committee', authorInitials: 'SP', category: 'sports',
    time: '2 days ago',
    content: 'Inter-college cricket tournament next month. Team registrations are open until May 8. Each team must have 11 players + 4 substitutes. Contact the sports office for details.',
    likes: 56, comments: 15, liked: false, saved: false,
  },
  {
    id: 'f5', author: 'Admin Office', authorInitials: 'AO', category: 'announcement',
    time: '3 days ago',
    content: 'Semester exam timetable has been released. Please check the academic portal for your schedule. Any clashes must be reported to the exam cell within 48 hours.',
    likes: 112, comments: 34, liked: true, saved: true,
  },
  {
    id: 'f6', author: 'Research Cell', authorInitials: 'RC', category: 'academic',
    time: '4 days ago',
    content: 'Call for papers: Annual Research Symposium 2025. Submit your abstracts by May 20. Topics include AI/ML, IoT, Cybersecurity, and Sustainable Tech. Best paper wins ₹25,000.',
    likes: 29, comments: 7, liked: false, saved: false,
  },
]

// ── Post Card ──────────────────────────────────────────────────────────────
function PostCard({ post, onLike, onSave, onComment }: {
  post: Post
  onLike: () => void
  onSave: () => void
  onComment: () => void
}) {
  const cc = categoryConfig[post.category]
  const Icon = cc.icon

  return (
    <div className={`rounded-xl border bg-white/[0.03] hover:bg-white/[0.04] transition-colors p-5 flex flex-col gap-4 ${
      post.pinned ? 'border-blue-500/20' : 'border-white/[0.07]'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl ${cc.bg} border ${cc.border} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-4.5 w-4.5 ${cc.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[14px] font-semibold text-white/80">{post.author}</p>
              {post.pinned && (
                <span className="px-1.5 py-0.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-[9px] font-semibold text-blue-400">
                  Pinned
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium border ${cc.bg} ${cc.color} ${cc.border}`}>
                {cc.label}
              </span>
              <span className="text-[11px] text-white/25">{post.time}</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/20 hover:text-white/50 transition-colors flex-shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <p className="text-[13px] text-white/60 leading-relaxed">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-white/[0.05]">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-colors ${
            post.liked
              ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${post.liked ? 'fill-rose-400' : ''}`} />
          {post.likes}
        </button>
        <button
          onClick={onComment}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-colors">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <button
          onClick={onSave}
          className={`ml-auto flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-medium transition-colors ${
            post.saved
              ? 'bg-blue-600/15 border border-blue-500/20 text-blue-400'
              : 'text-white/25 hover:text-white/60 hover:bg-white/[0.04]'
          }`}
        >
          {post.saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}

// ── Comment Modal ──────────────────────────────────────────────────────────
function CommentModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const cc = categoryConfig[post.category]
  const Icon = cc.icon

  const handleSend = () => {
    if (!text.trim()) return
    setSent(true)
    setTimeout(() => onClose(), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg ${cc.bg} border ${cc.border} flex items-center justify-center`}>
              <Icon className={`h-3.5 w-3.5 ${cc.color}`} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/80">{post.author}</p>
              <p className="text-[11px] text-white/30">{post.time}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-[12px] text-white/45 leading-relaxed mb-4 pb-4 border-b border-white/[0.06] line-clamp-3">
          {post.content}
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment…"
          rows={3}
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
            {sent ? <><Check className="h-3.5 w-3.5" /> Posted!</> : <><Send className="h-3.5 w-3.5" /> Comment</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function FeedPage() {
  const [posts, setPosts]           = useState(initialPosts)
  const [search, setSearch]         = useState('')
  const [activeCategory, setActive] = useState<PostCategory | 'all'>('all')
  const [savedOnly, setSavedOnly]   = useState(false)
  const [commentPost, setComment]   = useState<Post | null>(null)

  const filtered = posts.filter((p) => {
    const matchSearch = p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
    const matchCat  = activeCategory === 'all' || p.category === activeCategory
    const matchSaved = !savedOnly || p.saved
    return matchSearch && matchCat && matchSaved
  })

  const handleLike = (id: string) =>
    setPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))

  const handleSave = (id: string) =>
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, saved: !p.saved } : p))

  const categories: { id: PostCategory | 'all'; label: string }[] = [
    { id: 'all',          label: 'All' },
    { id: 'placement',    label: 'Placement' },
    { id: 'academic',     label: 'Academic' },
    { id: 'event',        label: 'Events' },
    { id: 'announcement', label: 'Announcements' },
    { id: 'sports',       label: 'Sports' },
  ]

  const totalLikes = posts.reduce((s, p) => s + p.likes, 0)
  const savedCount = posts.filter((p) => p.saved).length

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Employee</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Feed</h1>
        <p className="text-sm text-white/35 mt-1">Stay updated with campus activities and announcements.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts',  value: posts.length.toString(),  sub: 'In your feed',    icon: Bell,        accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
          { label: 'Engagement',   value: totalLikes.toString(),    sub: 'Total likes',     icon: TrendingUp,  accent: 'text-rose-400',    bg: 'bg-rose-500/10'    },
          { label: 'Saved',        value: savedCount.toString(),    sub: 'Bookmarked',      icon: Bookmark,    accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
          { label: 'Categories',   value: '5',                      sub: 'Active channels', icon: Filter,      accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-white/[0.06] w-full sm:w-auto pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex-shrink-0 px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
                activeCategory === c.id
                  ? 'border-blue-500 text-white/80'
                  : 'border-transparent text-white/35 hover:text-white/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts…"
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <button
            onClick={() => setSavedOnly((v) => !v)}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium transition-colors border flex-shrink-0 ${
              savedOnly
                ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" /> Saved
          </button>
          {(search || savedOnly) && (
            <button
              onClick={() => { setSearch(''); setSavedOnly(false) }}
              className="h-9 px-2 rounded-lg text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <p className="text-[12px] text-white/30">
        {filtered.length} post{filtered.length !== 1 ? 's' : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-dashed border-white/[0.07]">
          <Bell className="h-10 w-10 text-white/10" />
          <p className="text-[14px] text-white/25">No posts match your filters</p>
          <button
            onClick={() => { setSearch(''); setSavedOnly(false); setActive('all') }}
            className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onSave={() => handleSave(post.id)}
              onComment={() => setComment(post)}
            />
          ))}
        </div>
      )}

      {/* Comment modal */}
      {commentPost && (
        <CommentModal post={commentPost} onClose={() => setComment(null)} />
      )}
    </div>
  )
}
