'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, Plus, ArrowLeft } from 'lucide-react'

interface Message { id: string; sender: string; initials: string; isMe: boolean; text: string; time: string }
interface Conversation { id: string; name: string; sub: string; preview: string; time: string; unread: number; online: boolean; messages: Message[] }

const initialConversations: Conversation[] = [
  { id: 'c1', name: 'John Doe',    sub: 'CS2021001',  preview: 'Question about assignment...', time: '2m',  unread: 2, online: true,
    messages: [
      { id: 'm1', sender: 'John Doe', initials: 'JD', isMe: false, text: 'Hi Professor, I have a question about Assignment 3...', time: '2:30 PM' },
      { id: 'm2', sender: 'You',      initials: 'VP', isMe: true,  text: 'Sure, what would you like to know?', time: '2:32 PM' },
      { id: 'm3', sender: 'John Doe', initials: 'JD', isMe: false, text: 'The problem says to implement a balanced BST. Should we use AVL or Red-Black?', time: '2:33 PM' },
    ] },
  { id: 'c2', name: 'Jane Smith',  sub: 'CS2021002',  preview: 'Thank you for the feedback',   time: '1h',  unread: 0, online: true,
    messages: [
      { id: 'm1', sender: 'Jane Smith', initials: 'JS', isMe: false, text: 'Thank you for the detailed feedback on my project!', time: 'Yesterday' },
      { id: 'm2', sender: 'You',        initials: 'VP', isMe: true,  text: 'You are welcome! Keep up the good work.', time: 'Yesterday' },
    ] },
  { id: 'c3', name: 'CS201 Group', sub: '45 members', preview: 'Class cancelled tomorrow',    time: '3h',  unread: 1, online: false,
    messages: [{ id: 'm1', sender: 'You', initials: 'VP', isMe: true, text: 'Class cancelled tomorrow due to faculty meeting. Will reschedule.', time: '10:00 AM' }] },
  { id: 'c4', name: 'Bob Johnson', sub: 'CS2021003',  preview: 'Can we reschedule?',           time: '5h',  unread: 0, online: false,
    messages: [{ id: 'm1', sender: 'Bob Johnson', initials: 'BJ', isMe: false, text: 'Can we reschedule the office hours to Thursday?', time: '9:15 AM' }] },
  { id: 'c5', name: 'Alice W.',    sub: 'CS2021004',  preview: 'Submitted the assignment',     time: '1d',  unread: 0, online: false,
    messages: [{ id: 'm1', sender: 'Alice W.', initials: 'AW', isMe: false, text: 'Submitted the assignment. Please let me know if there are any issues.', time: 'Yesterday' }] },
]

function NewMessageModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ to: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleSend = () => { if (!form.to.trim() || !form.message.trim()) return; setSent(true); setTimeout(() => onClose(), 1500) }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">New Message</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          {[{ label: 'To', key: 'to', placeholder: 'Student name or ID' }, { label: 'Subject', key: 'subject', placeholder: 'Message subject' }].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label><input value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
          ))}
          <div className="space-y-1.5"><label className="text-[11px] text-white/40 uppercase tracking-wide">Message</label><textarea value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Write your message…" rows={4} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" /></div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleSend} disabled={sent} className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${sent ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
            {sent ? 'Sent!' : <><Send className="h-3.5 w-3.5" />Send</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeId, setActiveId] = useState('c1')
  const [inputText, setInputText] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)
  const [mobileView, setMobileView] = useState<'list'|'chat'>('list')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeConv = conversations.find((c) => c.id === activeId) ?? conversations[0]

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [activeConv?.messages.length])

  const selectConversation = (id: string) => {
    setActiveId(id)
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c))
    setMobileView('chat')
  }
  const sendMessage = () => {
    const text = inputText.trim(); if (!text) return
    const newMsg: Message = { id: `m${Date.now()}`, sender: 'You', initials: 'VP', isMe: true, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setConversations((prev) => prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, newMsg], preview: text } : c))
    setInputText('')
  }

  return (
    <div className="animate-fade-in flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      <div className="mb-4 flex items-start justify-between gap-4 flex-shrink-0">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Communication</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Messages</h1>
        </div>
        <button onClick={() => setShowNewModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0"><Plus className="h-4 w-4" />New Message</button>
      </div>
      <div className="flex-1 flex rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden min-h-0">
        {/* Conversation list */}
        <div className={`w-full md:w-72 flex-shrink-0 border-r border-white/[0.06] flex flex-col ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
          <div className="px-4 py-3 border-b border-white/[0.05]"><p className="text-[12px] font-semibold text-white/40 uppercase tracking-wide">Conversations</p></div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button key={c.id} onClick={() => selectConversation(c.id)} className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-white/[0.04] last:border-0 text-left transition-colors ${activeId === c.id ? 'bg-blue-500/10' : 'hover:bg-white/[0.03]'}`}>
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-bold text-white/60">{c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</div>
                  {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1"><p className="text-[13px] font-medium text-white/70 truncate">{c.name}</p><span className="text-[10px] text-white/25 flex-shrink-0">{c.time}</span></div>
                  <p className="text-[11px] text-white/30 truncate mt-0.5">{c.preview}</p>
                </div>
                {c.unread > 0 && <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Chat area */}
        <div className={`flex-1 flex flex-col min-w-0 ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.05]">
            <button onClick={() => setMobileView('list')} className="md:hidden p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><ArrowLeft className="h-4 w-4" /></button>
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-bold text-white/60">{activeConv.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</div>
              {activeConv.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-white/80">{activeConv.name}</p>
              <p className="text-[11px] text-white/30">{activeConv.sub}{activeConv.online && <span className="ml-2 text-emerald-400">Online</span>}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {activeConv.messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white/50 flex-shrink-0">{msg.initials}</div>
                <div className={`max-w-[70%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed ${msg.isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white/[0.06] border border-white/[0.07] text-white/70 rounded-bl-sm'}`}>
                  {msg.text}
                  <p className={`text-[10px] mt-1 ${msg.isMe ? 'text-blue-200/60' : 'text-white/25'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-5 py-3.5 border-t border-white/[0.05] flex items-center gap-2">
            <input value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }} placeholder="Type a message…" className="flex-1 h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" />
            <button onClick={sendMessage} disabled={!inputText.trim()} className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
      {showNewModal && <NewMessageModal onClose={() => setShowNewModal(false)} />}
    </div>
  )
}
