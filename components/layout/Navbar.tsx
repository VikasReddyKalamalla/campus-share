'use client'

import { Bell, Settings, LogOut, ChevronDown, GraduationCap, CheckCheck, Loader2, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import Link from 'next/link'
import { useNotifications } from '@/contexts/NotificationContext'
import type { Notification } from '@/lib/notifications'

interface NavbarProps {
  userName?: string
  userRole?: string
}

// ── Notification type → accent ─────────────────────────────────────────────
const typeStyles: Record<
  Notification['type'],
  { dot: string; icon: string; bg: string }
> = {
  info:      { dot: 'bg-blue-500',    icon: 'text-blue-400',    bg: 'bg-blue-500/10' },
  success:   { dot: 'bg-emerald-500', icon: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  warning:   { dot: 'bg-amber-500',   icon: 'text-amber-400',   bg: 'bg-amber-500/10' },
  placement: { dot: 'bg-violet-500',  icon: 'text-violet-400',  bg: 'bg-violet-500/10' },
  academic:  { dot: 'bg-cyan-500',    icon: 'text-cyan-400',    bg: 'bg-cyan-500/10' },
  system:    { dot: 'bg-white/30',    icon: 'text-white/40',    bg: 'bg-white/5' },
}

function timeAgo(ts: Notification['createdAt']): string {
  const seconds = Math.floor((Date.now() - ts.toMillis()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export function Navbar({ userName = 'User', userRole = 'Student' }: NavbarProps) {
  const router = useRouter()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  const { notifications, unreadCount, loading, markRead, markAllRead, sendTestNotification } =
    useNotifications()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  // Close panels on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <nav className="sticky top-0 z-40 h-14 border-b border-[var(--theme-border)] backdrop-blur-sm flex items-center px-5" style={{ backgroundColor: 'var(--theme-bg)', borderBottomColor: 'var(--theme-border)' }}>
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-[14px] text-white tracking-tight hidden sm:block">
            Campus Hub
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">

          {/* ── Notification bell ── */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((v) => !v)
                setUserMenuOpen(false)
              }}
              className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors group"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white leading-none">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification panel */}
            {notifOpen && (
              <div className="absolute right-0 mt-1.5 w-80 rounded-xl border shadow-2xl shadow-black/60 overflow-hidden z-50" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-white/80">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-600/20 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Test button — sends a sample notification */}
                    <button
                      onClick={sendTestNotification}
                      title="Send test notification"
                      className="p-1 rounded hover:bg-white/[0.05] transition-colors text-white/20 hover:text-white/50"
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </button>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-[11px] text-blue-400/70 hover:text-blue-400 transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="max-h-[360px] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="w-5 h-5 text-white/20 animate-spin" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2">
                      <Bell className="w-8 h-8 text-white/10" />
                      <p className="text-[12px] text-white/25">No notifications yet</p>
                    </div>
                  ) : (
                    <div>
                      {notifications.map((n) => {
                        const style = typeStyles[n.type] ?? typeStyles.info
                        return (
                          <button
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0 transition-colors ${
                              n.read
                                ? 'hover:bg-white/[0.02]'
                                : 'bg-white/[0.03] hover:bg-white/[0.05]'
                            }`}
                          >
                            {/* Type dot / indicator */}
                            <div className={`mt-0.5 w-7 h-7 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0`}>
                              <span className={`w-2 h-2 rounded-full ${style.dot} ${!n.read ? 'animate-pulse' : ''}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-[12px] font-semibold leading-snug ${n.read ? 'text-white/40' : 'text-white/80'}`}>
                                  {n.title}
                                </p>
                                {!n.read && (
                                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${style.dot}`} />
                                )}
                              </div>
                              <p className={`text-[11px] mt-0.5 leading-relaxed ${n.read ? 'text-white/25' : 'text-white/45'}`}>
                                {n.body}
                              </p>
                              <p className="text-[10px] text-white/20 mt-1">{timeAgo(n.createdAt)}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="px-4 py-2.5 border-t border-white/[0.06]">
                    <button className="text-[11px] text-white/25 hover:text-white/50 transition-colors w-full text-center">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings */}
          <Link href="/dashboard/settings">
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors group">
              <Settings className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </button>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setUserMenuOpen((v) => !v)
                setNotifOpen(false)
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[11px] font-semibold text-blue-400">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-medium text-white/80 leading-none">{userName}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{userRole}</p>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-xl border shadow-2xl shadow-black/50 overflow-hidden z-50" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-surface)' }}>
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-[13px] font-medium text-white/80">{userName}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{userRole}</p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <Link href="/dashboard/settings?tab=profile">
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-[13px] text-white/50 hover:text-white/80"
                    >
                      Profile Settings
                    </button>
                  </Link>
                  <Link href="/dashboard/settings?tab=appearance">
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-[13px] text-white/50 hover:text-white/80"
                    >
                      Preferences
                    </button>
                  </Link>
                  <Link href="/dashboard/settings?tab=help">
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-[13px] text-white/50 hover:text-white/80"
                    >
                      Help & Support
                    </button>
                  </Link>
                </div>
                <div className="p-1.5 border-t border-white/[0.06]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-[13px] text-red-400/70 hover:text-red-400"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
