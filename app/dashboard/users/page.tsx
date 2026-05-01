'use client'

import { useState } from 'react'
import {
  Users, GraduationCap, BookOpen, Clock, Plus, Search,
  MoreHorizontal, X, Check, Loader2, Shield, Briefcase,
  Mail, ChevronDown, Trash2, UserCheck, UserX, Edit3,
} from 'lucide-react'

type Role   = 'Student' | 'Faculty' | 'Admin' | 'Employee' | 'Placement'
type Status = 'Active' | 'Pending' | 'Suspended'

interface User {
  id: string; name: string; email: string; role: Role
  status: Status; joined: string; department: string
}

const initialUsers: User[] = [
  { id: 'u1', name: 'John Doe',       email: 'john@example.com',    role: 'Student',   status: 'Active',    joined: 'Jan 2024', department: 'CS'       },
  { id: 'u2', name: 'Jane Smith',     email: 'jane@example.com',    role: 'Faculty',   status: 'Active',    joined: 'Aug 2022', department: 'CS'       },
  { id: 'u3', name: 'Bob Johnson',    email: 'bob@example.com',     role: 'Student',   status: 'Pending',   joined: 'Jan 2024', department: 'ECE'      },
  { id: 'u4', name: 'Alice Williams', email: 'alice@example.com',   role: 'Employee',  status: 'Active',    joined: 'Mar 2023', department: 'HR'       },
  { id: 'u5', name: 'Charlie Brown',  email: 'charlie@example.com', role: 'Admin',     status: 'Active',    joined: 'Jun 2021', department: 'IT'       },
  { id: 'u6', name: 'Diana Prince',   email: 'diana@example.com',   role: 'Student',   status: 'Active',    joined: 'Jan 2024', department: 'MBA'      },
  { id: 'u7', name: 'Ethan Hunt',     email: 'ethan@example.com',   role: 'Faculty',   status: 'Active',    joined: 'Jul 2020', department: 'Maths'    },
  { id: 'u8', name: 'Fiona Green',    email: 'fiona@example.com',   role: 'Student',   status: 'Suspended', joined: 'Jan 2023', department: 'CS'       },
  { id: 'u9', name: 'George Miller',  email: 'george@example.com',  role: 'Placement', status: 'Active',    joined: 'Apr 2022', department: 'Placement'},
]

const roleConfig: Record<Role, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  Student:   { color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    icon: GraduationCap },
  Faculty:   { color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  icon: BookOpen      },
  Admin:     { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: Shield        },
  Employee:  { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: Briefcase     },
  Placement: { color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    icon: Users         },
}

const statusConfig: Record<Status, { color: string; bg: string; border: string; dot: string }> = {
  Active:    { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  Pending:   { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   dot: 'bg-amber-500'   },
  Suspended: { color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     dot: 'bg-red-500'     },
}

const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

// ── Add User Modal ─────────────────────────────────────────────────────────
function AddUserModal({ onClose, onAdd }: { onClose: () => void; onAdd: (u: User) => void }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Student' as Role, department: '' })
  const [loading, setLoading] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return
    setLoading(true)
    setTimeout(() => {
      onAdd({ id: `u${Date.now()}`, name: form.name.trim(), email: form.email.trim(), role: form.role, status: 'Pending', joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), department: form.department || 'General' })
      setLoading(false); onClose()
    }, 900)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Add New User</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          {[{ label: 'Full Name', key: 'name', placeholder: 'e.g. Vikas Reddy', type: 'text' }, { label: 'Email', key: 'email', placeholder: 'user@example.com', type: 'email' }, { label: 'Department', key: 'department', placeholder: 'e.g. Computer Science', type: 'text' }].map(({ label, key, placeholder, type }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Role</label>
            <select value={form.role} onChange={(e) => set('role', e.target.value as Role)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">
              {(['Student', 'Faculty', 'Admin', 'Employee', 'Placement'] as Role[]).map((r) => <option key={r} value={r} className="bg-[#111118]">{r}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={loading} className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Adding…</> : <><Plus className="h-3.5 w-3.5" />Add User</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Manage User Modal ──────────────────────────────────────────────────────
function ManageUserModal({ user, onClose, onUpdate, onDelete }: { user: User; onClose: () => void; onUpdate: (u: User) => void; onDelete: (id: string) => void }) {
  const [role, setRole] = useState<Role>(user.role)
  const [status, setStatus] = useState<Status>(user.status)
  const [saved, setSaved] = useState(false)
  const handleSave = () => { onUpdate({ ...user, role, status }); setSaved(true); setTimeout(() => { setSaved(false); onClose() }, 1200) }
  const handleDelete = () => { onDelete(user.id); onClose() }
  const rc = roleConfig[role]; const sc = statusConfig[status]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[14px] font-bold text-blue-400">{initials(user.name)}</div>
            <div><p className="text-[14px] font-semibold text-white/80">{user.name}</p><p className="text-[12px] text-white/35">{user.email}</p></div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[{ label: 'Joined', value: user.joined }, { label: 'Department', value: user.department }].map((d) => (
            <div key={d.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3"><p className="text-[10px] text-white/30 uppercase tracking-wide">{d.label}</p><p className="text-[13px] text-white/60 mt-1">{d.value}</p></div>
          ))}
        </div>
        <div className="space-y-3 mb-5">
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">
              {(['Student', 'Faculty', 'Admin', 'Employee', 'Placement'] as Role[]).map((r) => <option key={r} value={r} className="bg-[#111118]">{r}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">
              {(['Active', 'Pending', 'Suspended'] as Status[]).map((s) => <option key={s} value={s} className="bg-[#111118]">{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDelete} className="h-9 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[12px] text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-1.5"><Trash2 className="h-3.5 w-3.5" />Delete</button>
          <button onClick={handleSave} className={`flex-1 h-9 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 ${saved ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
            {saved ? <><Check className="h-3.5 w-3.5" />Saved</> : <><Edit3 className="h-3.5 w-3.5" />Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<Role | 'All'>('All')
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [managingUser, setManagingUser] = useState<User | null>(null)

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = filterRole === 'All' || u.role === filterRole
    const matchStatus = filterStatus === 'All' || u.status === filterStatus
    return matchSearch && matchRole && matchStatus
  })

  const stats = [
    { label: 'Total Users', value: users.length.toString(),                                    sub: 'All roles',       icon: Users,        accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Students',    value: users.filter((u) => u.role === 'Student').length.toString(), sub: 'Enrolled',        icon: GraduationCap,accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Faculty',     value: users.filter((u) => u.role === 'Faculty').length.toString(), sub: 'Teaching staff',  icon: BookOpen,     accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending',     value: users.filter((u) => u.status === 'Pending').length.toString(),sub: 'Awaiting approval',icon: Clock,       accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-sm text-white/35 mt-1">Manage all platform users, roles, and access.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" />Add User
        </button>
      </div>

      {/* Stats */}
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
      <div className="space-y-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Student', 'Faculty', 'Admin', 'Employee', 'Placement'] as (Role | 'All')[]).map((r) => (
            <button key={r} onClick={() => setFilterRole(r)} className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${filterRole === r ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{r}</button>
          ))}
          <div className="w-px h-5 bg-white/[0.08] mx-1" />
          {(['All', 'Active', 'Pending', 'Suspended'] as (Status | 'All')[]).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${filterStatus === s ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{s}</button>
          ))}
        </div>
        <p className="text-[12px] text-white/30">{filtered.length} user{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['User', 'Role', 'Department', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-[13px] text-white/25">No users match your filters</td></tr>
              ) : filtered.map((u) => {
                const rc = roleConfig[u.role]; const sc = statusConfig[u.status]; const RoleIcon = rc.icon
                return (
                  <tr key={u.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[11px] font-bold text-blue-400 flex-shrink-0">{initials(u.name)}</div>
                        <div><p className="text-[13px] font-medium text-white/70">{u.name}</p><p className="text-[11px] text-white/30">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border w-fit ${rc.bg} ${rc.color} ${rc.border}`}>
                        <RoleIcon className="h-3 w-3" />{u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-white/40">{u.department}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border w-fit ${sc.bg} ${sc.color} ${sc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-white/40">{u.joined}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setManagingUser(u)} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors">
                        <Edit3 className="h-3.5 w-3.5" />Manage
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onAdd={(u) => setUsers((p) => [u, ...p])} />}
      {managingUser && <ManageUserModal user={managingUser} onClose={() => setManagingUser(null)} onUpdate={(u) => setUsers((p) => p.map((x) => x.id === u.id ? u : x))} onDelete={(id) => setUsers((p) => p.filter((x) => x.id !== id))} />}
    </div>
  )
}
