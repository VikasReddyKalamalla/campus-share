'use client'

import { useState, useEffect } from 'react'
import {
  Bell, Shield, Palette, Eye, Key, User,
  Save, ChevronRight, Check, Globe,
  Lock, Smartphone, Trash2,
  Copy, RefreshCw, X, AlertTriangle, HelpCircle,
  MessageSquare, BookOpen, ExternalLink, Loader2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme, THEMES, type ThemeId } from '@/contexts/ThemeContext'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ── Types ──────────────────────────────────────────────────────────────────
type Section = 'profile' | 'notifications' | 'security' | 'appearance' | 'privacy' | 'api' | 'help'

interface SettingCategory {
  id: Section
  label: string
  description: string
  icon: React.ElementType
  accent: string
  accentBg: string
}

const categories: SettingCategory[] = [
  { id: 'profile',       label: 'Profile',        description: 'Name, bio, contact info',      icon: User,         accent: 'text-blue-400',    accentBg: 'bg-blue-500/10' },
  { id: 'notifications', label: 'Notifications',  description: 'Email and push preferences',   icon: Bell,         accent: 'text-violet-400',  accentBg: 'bg-violet-500/10' },
  { id: 'security',      label: 'Security',       description: 'Password and authentication',  icon: Shield,       accent: 'text-emerald-400', accentBg: 'bg-emerald-500/10' },
  { id: 'appearance',    label: 'Appearance',     description: 'Theme and layout options',     icon: Palette,      accent: 'text-amber-400',   accentBg: 'bg-amber-500/10' },
  { id: 'privacy',       label: 'Privacy',        description: 'Data sharing and visibility',  icon: Eye,          accent: 'text-cyan-400',    accentBg: 'bg-cyan-500/10' },
  { id: 'api',           label: 'API Keys',       description: 'Manage API credentials',       icon: Key,          accent: 'text-rose-400',    accentBg: 'bg-rose-500/10' },
  { id: 'help',          label: 'Help & Support', description: 'Docs, contact, and feedback',  icon: HelpCircle,   accent: 'text-white/40',    accentBg: 'bg-white/5' },
]

// ── Shared primitives ──────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-white/10'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
    </button>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-white/[0.05] last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-white/70">{label}</p>
        {hint && <p className="text-[11px] text-white/30 mt-0.5">{hint}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function TextInput({
  value, onChange, placeholder, type = 'text', className = '',
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-colors ${className}`}
    />
  )
}

function SettingSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none focus:border-blue-500/50 transition-colors w-52 appearance-none"
    >
      {options.map((o) => <option key={o} value={o} className="bg-[#111118]">{o}</option>)}
    </select>
  )
}

function SaveButton({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={`flex items-center gap-2 h-8 px-4 rounded-lg text-[13px] font-medium transition-colors ${
        saved ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400'
              : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
      }`}
    >
      {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
      {saving ? 'Saving…' : saved ? 'Saved' : 'Save changes'}
    </button>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Profile Panel ──────────────────────────────────────────────────────────
function ProfilePanel() {
  const { user, userRole, updateUserProfile } = useAuth()
  const [name, setName] = useState(user?.displayName || '')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      if (snap.exists()) {
        const d = snap.data()
        setPhone(d.phone || '')
        setBio(d.bio || '')
      }
    })
  }, [user])

  const handleSave = async () => {
    setError('')
    setSaving(true)
    try {
      await updateUserProfile({ displayName: name, phone, bio })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e: any) {
      setError(e.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div>
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.05]">
        <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-lg font-semibold text-blue-400">
          {initials}
        </div>
        <div>
          <p className="text-[13px] font-medium text-white/70">{name || 'Your Name'}</p>
          <p className="text-[11px] text-white/30 mt-0.5 capitalize">{userRole || 'Student'} · {user?.email}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400">{error}</div>
      )}

      <Field label="Full Name" hint="Shown across the platform">
        <TextInput value={name} onChange={setName} placeholder="Your full name" className="w-52" />
      </Field>
      <Field label="Email" hint="Your sign-in email address">
        <p className="text-[13px] text-white/30 font-mono">{user?.email}</p>
      </Field>
      <Field label="Phone" hint="Optional contact number">
        <TextInput value={phone} onChange={setPhone} placeholder="+91 00000 00000" type="tel" className="w-52" />
      </Field>
      <Field label="Bio" hint="Short description visible on your profile">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell others about yourself…"
          rows={3}
          className="w-52 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-colors resize-none"
        />
      </Field>
      <div className="pt-4">
        <SaveButton onClick={handleSave} saving={saving} saved={saved} />
      </div>
    </div>
  )
}

// ── Notifications Panel ────────────────────────────────────────────────────
function NotificationsPanel() {
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(true)
  const [placements, setPlacements] = useState(true)
  const [academics, setAcademics] = useState(true)
  const [announcements, setAnnouncements] = useState(false)
  const [digest, setDigest] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <Field label="Email notifications" hint="Receive updates via email"><Toggle checked={email} onChange={setEmail} /></Field>
      <Field label="Push notifications" hint="Browser and mobile push alerts"><Toggle checked={push} onChange={setPush} /></Field>
      <Field label="Placement alerts" hint="New drives, shortlists, and offers"><Toggle checked={placements} onChange={setPlacements} /></Field>
      <Field label="Academic updates" hint="Grades, attendance, and deadlines"><Toggle checked={academics} onChange={setAcademics} /></Field>
      <Field label="Announcements" hint="Campus-wide notices"><Toggle checked={announcements} onChange={setAnnouncements} /></Field>
      <Field label="Weekly digest" hint="Summary email every Monday"><Toggle checked={digest} onChange={setDigest} /></Field>
      <div className="pt-4">
        <SaveButton onClick={handleSave} saving={false} saved={saved} />
      </div>
    </div>
  )
}

// ── Security Panel ─────────────────────────────────────────────────────────
function SecurityPanel() {
  const { changePassword, deleteAccount, logout } = useAuth()
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionAlerts, setSessionAlerts] = useState(true)

  // Change password modal
  const [showPwModal, setShowPwModal] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSaving, setPwSaving] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)

  const handleChangePassword = async () => {
    setPwError('')
    if (newPw !== confirmPw) { setPwError('Passwords do not match'); return }
    if (newPw.length < 6) { setPwError('Password must be at least 6 characters'); return }
    setPwSaving(true)
    try {
      await changePassword(currentPw, newPw)
      setPwSaved(true)
      setTimeout(() => { setShowPwModal(false); setPwSaved(false); setCurrentPw(''); setNewPw(''); setConfirmPw('') }, 1500)
    } catch (e: any) {
      setPwError(e.message?.includes('wrong-password') ? 'Current password is incorrect' : e.message || 'Failed to update password')
    } finally {
      setPwSaving(false)
    }
  }

  // Delete account modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePw, setDeletePw] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setDeleteError('')
    setDeleting(true)
    try {
      await deleteAccount(deletePw)
      await logout()
    } catch (e: any) {
      setDeleteError(e.message?.includes('wrong-password') ? 'Incorrect password' : e.message || 'Failed to delete account')
      setDeleting(false)
    }
  }

  // Sessions modal
  const [showSessions, setShowSessions] = useState(false)
  const sessions = [
    { device: 'Chrome on Windows', location: 'Hyderabad, IN', time: 'Active now', current: true },
    { device: 'Safari on iPhone', location: 'Hyderabad, IN', time: '2 hours ago', current: false },
  ]

  return (
    <div>
      <Field label="Two-factor authentication" hint="Require a code on every sign-in">
        <Toggle checked={twoFactor} onChange={setTwoFactor} />
      </Field>
      <Field label="Login alerts" hint="Email me when a new session starts">
        <Toggle checked={sessionAlerts} onChange={setSessionAlerts} />
      </Field>
      <Field label="Change password" hint="Update your account password">
        <button
          onClick={() => setShowPwModal(true)}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
        >
          <Lock className="h-3.5 w-3.5" /> Update
        </button>
      </Field>
      <Field label="Active sessions" hint="Devices currently signed in">
        <button
          onClick={() => setShowSessions(true)}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
        >
          <Smartphone className="h-3.5 w-3.5" /> View
        </button>
      </Field>
      <Field label="Delete account" hint="Permanently remove your account and all data">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[13px] text-red-400/70 hover:text-red-400 hover:bg-red-500/15 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </Field>

      {/* Change password modal */}
      {showPwModal && (
        <Modal title="Change Password" onClose={() => { setShowPwModal(false); setPwError('') }}>
          <div className="space-y-3">
            {pwError && <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{pwError}</p>}
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">Current password</label>
              <TextInput value={currentPw} onChange={setCurrentPw} type="password" placeholder="••••••••" className="w-full" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">New password</label>
              <TextInput value={newPw} onChange={setNewPw} type="password" placeholder="Min. 6 characters" className="w-full" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">Confirm new password</label>
              <TextInput value={confirmPw} onChange={setConfirmPw} type="password" placeholder="Repeat new password" className="w-full" />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowPwModal(false)} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
              <button
                onClick={handleChangePassword}
                disabled={pwSaving || pwSaved}
                className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${pwSaved ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'}`}
              >
                {pwSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : pwSaved ? <Check className="h-3.5 w-3.5" /> : null}
                {pwSaving ? 'Updating…' : pwSaved ? 'Updated!' : 'Update password'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Sessions modal */}
      {showSessions && (
        <Modal title="Active Sessions" onClose={() => setShowSessions(false)}>
          <div className="space-y-2">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/[0.07] bg-white/[0.02]">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] text-white/70">{s.device}</p>
                    {s.current && <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">Current</span>}
                  </div>
                  <p className="text-[11px] text-white/30 mt-0.5">{s.location} · {s.time}</p>
                </div>
                {!s.current && (
                  <button className="text-[11px] text-red-400/60 hover:text-red-400 transition-colors">Revoke</button>
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Delete account modal */}
      {showDeleteModal && (
        <Modal title="Delete Account" onClose={() => { setShowDeleteModal(false); setDeleteError('') }}>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-red-400 leading-relaxed">This will permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            {deleteError && <p className="text-[12px] text-red-400">{deleteError}</p>}
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">Enter your password to confirm</label>
              <TextInput value={deletePw} onChange={setDeletePw} type="password" placeholder="••••••••" className="w-full" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || !deletePw}
                className="flex-1 h-9 rounded-lg bg-red-600 hover:bg-red-500 text-[13px] font-medium text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {deleting ? 'Deleting…' : 'Delete my account'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Appearance Panel ───────────────────────────────────────────────────────
function AppearancePanel() {
  const { themeId, setTheme } = useTheme()
  const [compact, setCompact] = useState(false)
  const [animations, setAnimations] = useState(true)
  const [saved, setSaved] = useState(false)

  // Include "system" as a special option
  const systemOption = {
    id: 'system' as const,
    name: 'System',
    description: 'Follows your OS setting',
    bg: '#1e293b',
    accent: '#94a3b8',
    text: '#f1f5f9',
  }

  return (
    <div className="space-y-6">
      {/* Theme grid */}
      <div>
        <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">Color Theme</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
          {THEMES.map((t) => {
            const isActive = themeId === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all text-left ${
                  isActive
                    ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-muted)] ring-1 ring-[var(--theme-accent)]/30'
                    : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]'
                }`}
              >
                {/* Swatch */}
                <div
                  className="w-full h-10 rounded-lg flex items-end justify-end p-1.5 relative overflow-hidden"
                  style={{ backgroundColor: t.bg }}
                >
                  {/* Mini surface preview */}
                  <div
                    className="absolute inset-x-2 top-2 h-3 rounded"
                    style={{ backgroundColor: t.vars['--theme-surface'] }}
                  />
                  {/* Accent dot */}
                  <div
                    className="w-3 h-3 rounded-full relative z-10"
                    style={{ backgroundColor: t.accent }}
                  />
                </div>

                {/* Label */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[12px] font-semibold text-white/70">{t.name}</p>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.accent }} />
                    )}
                  </div>
                  <p className="text-[10px] text-white/25 mt-0.5 leading-tight">{t.description}</p>
                </div>
              </button>
            )
          })}

          {/* System option */}
          {(() => {
            const isActive = themeId === 'system'
            return (
              <button
                onClick={() => setTheme('system')}
                className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all text-left ${
                  isActive
                    ? 'border-white/30 bg-white/[0.06] ring-1 ring-white/20'
                    : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]'
                }`}
              >
                <div className="w-full h-10 rounded-lg overflow-hidden flex">
                  <div className="flex-1" style={{ backgroundColor: '#0a0a0f' }} />
                  <div className="flex-1" style={{ backgroundColor: '#f8fafc' }} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[12px] font-semibold text-white/70">System</p>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-white/25 mt-0.5 leading-tight">Follows OS setting</p>
                </div>
              </button>
            )
          })()}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.05]" />

      {/* Other appearance settings */}
      <div>
        <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">Layout</p>
        <Field label="Compact mode" hint="Reduce spacing for more content density">
          <Toggle checked={compact} onChange={setCompact} />
        </Field>
        <Field label="Animations" hint="Enable UI transitions and motion">
          <Toggle checked={animations} onChange={setAnimations} />
        </Field>
      </div>

      <div>
        <SaveButton
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }}
          saving={false}
          saved={saved}
        />
      </div>
    </div>
  )
}

// ── Privacy Panel ──────────────────────────────────────────────────────────
function PrivacyPanel() {
  const { user } = useAuth()
  const [profileVisible, setProfileVisible] = useState(true)
  const [activityVisible, setActivityVisible] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [saved, setSaved] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!user) return
    setExporting(true)
    try {
      const snap = await getDoc(doc(db, 'users', user.uid))
      const data = { uid: user.uid, email: user.email, displayName: user.displayName, ...snap.data() }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'campushub-data.json'; a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div>
      <Field label="Public profile" hint="Allow others to view your profile">
        <Toggle checked={profileVisible} onChange={setProfileVisible} />
      </Field>
      <Field label="Activity status" hint="Show when you were last active">
        <Toggle checked={activityVisible} onChange={setActivityVisible} />
      </Field>
      <Field label="Usage analytics" hint="Help improve Campus Hub with anonymous data">
        <Toggle checked={analytics} onChange={setAnalytics} />
      </Field>
      <Field label="Download my data" hint="Export all your account data as JSON">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors disabled:opacity-50"
        >
          {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {exporting ? 'Exporting…' : 'Export'}
        </button>
      </Field>
      <div className="pt-4">
        <SaveButton onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500) }} saving={false} saved={saved} />
      </div>
    </div>
  )
}

// ── API Keys Panel ─────────────────────────────────────────────────────────
function ApiPanel() {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production Key', key: 'ch_live_3f9a8b2c4d5e6f7a', masked: true, created: 'Jan 12, 2025', last: '2 hours ago' },
    { id: '2', name: 'Development Key', key: 'ch_test_8b2c4d5e6f7a3f9a', masked: true, created: 'Mar 3, 2025', last: '5 days ago' },
  ])
  const [copied, setCopied] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const toggleReveal = (id: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, masked: !k.masked } : k))
  }

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id))
  }

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      const newKey = 'ch_live_' + Math.random().toString(36).slice(2, 18)
      setKeys((prev) => [...prev, {
        id: Date.now().toString(), name: 'New Key', key: newKey, masked: false,
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        last: 'Never',
      }])
      setGenerating(false)
    }, 800)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {keys.map((k) => (
          <div key={k.id} className="p-4 rounded-lg border border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/70">{k.name}</p>
                <p className="text-[11px] font-mono text-white/30 mt-1 break-all">
                  {k.masked ? k.key.slice(0, 10) + '••••••••••••' : k.key}
                </p>
                <p className="text-[10px] text-white/20 mt-1">Created {k.created} · Last used {k.last}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => toggleReveal(k.id)} className="h-7 px-2.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/40 hover:text-white/70 transition-colors">
                  {k.masked ? 'Reveal' : 'Hide'}
                </button>
                <button onClick={() => handleCopy(k.id, k.key)} className="h-7 px-2.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                  {copied === k.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied === k.id ? 'Copied' : 'Copy'}
                </button>
                <button onClick={() => handleRevoke(k.id)} className="h-7 px-2.5 rounded-md bg-red-500/10 border border-red-500/20 text-[11px] text-red-400/60 hover:text-red-400 transition-colors">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        ))}
        {keys.length === 0 && (
          <p className="text-[13px] text-white/25 text-center py-6">No API keys. Generate one below.</p>
        )}
      </div>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="flex items-center gap-2 h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors disabled:opacity-50"
      >
        {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
        {generating ? 'Generating…' : 'Generate new key'}
      </button>
    </div>
  )
}

// ── Help Panel ─────────────────────────────────────────────────────────────
function HelpPanel() {
  const [showContact, setShowContact] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!subject || !message) return
    setSent(true)
    setTimeout(() => { setSent(false); setSubject(''); setMessage(''); setShowContact(false) }, 2000)
  }

  const resources = [
    { icon: BookOpen, label: 'Documentation', desc: 'Guides and API reference', href: '#' },
    { icon: MessageSquare, label: 'Community Forum', desc: 'Ask questions and share tips', href: '#' },
    { icon: ExternalLink, label: 'Status Page', desc: 'Platform uptime and incidents', href: '#' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {resources.map((r) => {
          const Icon = r.icon
          return (
            <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col gap-2 p-4 rounded-lg border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
            >
              <Icon className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
              <p className="text-[13px] font-medium text-white/60 group-hover:text-white/80 transition-colors">{r.label}</p>
              <p className="text-[11px] text-white/25">{r.desc}</p>
            </a>
          )
        })}
      </div>

      <div className="border-t border-white/[0.05] pt-5">
        <p className="text-[13px] font-medium text-white/60 mb-3">Contact Support</p>
        {!showContact ? (
          <button
            onClick={() => setShowContact(true)}
            className="flex items-center gap-2 h-8 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" /> Send a message
          </button>
        ) : (
          <div className="space-y-3">
            {sent && <p className="text-[12px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">Message sent! We'll get back to you within 24 hours.</p>}
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">Subject</label>
              <TextInput value={subject} onChange={setSubject} placeholder="What do you need help with?" className="w-full" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue in detail…"
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowContact(false)} className="h-8 px-3 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
              <button
                onClick={handleSend}
                disabled={!subject || !message || sent}
                className="flex items-center gap-2 h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[13px] font-medium text-white transition-colors disabled:opacity-50"
              >
                {sent ? <Check className="h-3.5 w-3.5" /> : null}
                {sent ? 'Sent!' : 'Send message'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.05] pt-5 flex items-center justify-between">
        <p className="text-[11px] text-white/20">Campus Hub v1.0.0</p>
        <div className="flex gap-4 text-[11px] text-white/25">
          <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [active, setActive] = useState<Section>('profile')

  // Read ?tab= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab') as Section | null
    if (tab && categories.find((c) => c.id === tab)) {
      setActive(tab)
    }
  }, [])

  const current = categories.find((c) => c.id === active)!

  const panels: Record<Section, React.ReactNode> = {
    profile:       <ProfilePanel />,
    notifications: <NotificationsPanel />,
    security:      <SecurityPanel />,
    appearance:    <AppearancePanel />,
    privacy:       <PrivacyPanel />,
    api:           <ApiPanel />,
    help:          <HelpPanel />,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Account</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-white/35 mt-1">Manage your profile, security, and platform preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <nav className="lg:w-52 flex-shrink-0">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-white/[0.04] last:border-0 ${
                    isActive ? `${cat.accentBg} ${cat.accent}` : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? cat.accent : 'text-white/25'}`} />
                  <span className="text-[13px] font-medium">{cat.label}</span>
                  {isActive && <ChevronRight className={`h-3.5 w-3.5 ml-auto ${cat.accent}`} />}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Panel */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.05]">
              <div className={`w-9 h-9 rounded-lg ${current.accentBg} flex items-center justify-center`}>
                <current.icon className={`h-4 w-4 ${current.accent}`} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-white/80">{current.label}</h2>
                <p className="text-[12px] text-white/30">{current.description}</p>
              </div>
            </div>
            {panels[active]}
          </div>
        </div>
      </div>
    </div>
  )
}
