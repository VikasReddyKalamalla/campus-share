'use client'

import { useState } from 'react'
import { Users, TrendingUp, Calendar, Award, Search, X, Send, CheckCircle2 } from 'lucide-react'

type Status = 'Excellent' | 'Very Good' | 'Good' | 'Average'
interface Student { id: string; name: string; grade: string; gpa: number; attendance: number; status: Status; course: string }

const initialStudents: Student[] = [
  { id: 'CS2021001', name: 'John Doe',       grade: 'A',  gpa: 4.0, attendance: 95, status: 'Excellent', course: 'CS201' },
  { id: 'CS2021002', name: 'Jane Smith',     grade: 'A-', gpa: 3.7, attendance: 92, status: 'Very Good', course: 'CS201' },
  { id: 'CS2021003', name: 'Bob Johnson',    grade: 'B+', gpa: 3.3, attendance: 88, status: 'Good',      course: 'CS202' },
  { id: 'CS2021004', name: 'Alice Williams', grade: 'A',  gpa: 4.0, attendance: 97, status: 'Excellent', course: 'CS301' },
  { id: 'CS2021005', name: 'Charlie Brown',  grade: 'B',  gpa: 3.0, attendance: 79, status: 'Average',   course: 'CS302' },
  { id: 'CS2021006', name: 'Diana Prince',   grade: 'A-', gpa: 3.7, attendance: 91, status: 'Very Good', course: 'CS303' },
]
const statusConfig: Record<Status, { color: string; bg: string; border: string }> = {
  Excellent:  { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'Very Good':{ color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  Good:       { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  Average:    { color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20'  },
}
const attendanceColor = (pct: number) => pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-500'
const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
const gradeDistribution = [
  { grade: 'A', color: 'bg-emerald-500' }, { grade: 'B', color: 'bg-blue-500' },
  { grade: 'C', color: 'bg-amber-500' },   { grade: 'D', color: 'bg-orange-500' }, { grade: 'F', color: 'bg-red-500' },
]

function StudentModal({ student, onClose }: { student: Student; onClose: () => void }) {
  const [composing, setComposing] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const sc = statusConfig[student.status]
  const handleSend = () => {
    if (!message.trim()) return
    setSent(true); setMessage('')
    setTimeout(() => { setSent(false); setComposing(false) }, 2000)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-[15px] font-bold text-blue-400">{initials(student.name)}</div>
            <div><h3 className="text-[15px] font-semibold text-white/80">{student.name}</h3><p className="text-[12px] text-white/35 mt-0.5">{student.id} · {student.course}</p></div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[{ label: 'Grade', value: student.grade }, { label: 'GPA', value: student.gpa.toFixed(1) }, { label: 'Attendance', value: `${student.attendance}%` }, { label: 'Course', value: student.course }].map((d) => (
            <div key={d.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3"><p className="text-[10px] text-white/30 uppercase tracking-wide">{d.label}</p><p className="text-[15px] font-semibold text-white/70 mt-1">{d.value}</p></div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-4"><span className={`px-2.5 py-1 rounded-full text-[12px] font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>{student.status}</span></div>
        {composing ? (
          <div className="space-y-2">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message to ${student.name}…`} rows={3} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
            <div className="flex gap-2">
              <button onClick={() => setComposing(false)} className="flex-1 h-8 rounded-lg border border-white/[0.08] text-[12px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
              <button onClick={handleSend} className={`flex-1 h-8 rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 ${sent ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {sent ? <><CheckCircle2 className="h-3.5 w-3.5" />Sent!</> : <><Send className="h-3.5 w-3.5" />Send</>}
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setComposing(true)} className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors"><Send className="h-3.5 w-3.5" />Send Message</button>
        )}
      </div>
    </div>
  )
}

export default function StudentsPage() {
  const [students] = useState<Student[]>(initialStudents)
  const [search, setSearch] = useState('')
  const [activeCourse, setActiveCourse] = useState('All')
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const avgGpa = (students.reduce((s, st) => s + st.gpa, 0) / students.length).toFixed(2)
  const avgAttendance = Math.round(students.reduce((s, st) => s + st.attendance, 0) / students.length)
  const excellentCount = students.filter((s) => s.status === 'Excellent').length
  const uniqueCourses = Array.from(new Set(students.map((s) => s.course)))
  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
    const matchCourse = activeCourse === 'All' || s.course === activeCourse
    return matchSearch && matchCourse
  })
  const gradeCounts = gradeDistribution.map((g) => ({ ...g, count: students.filter((s) => s.grade.startsWith(g.grade)).length }))
  const maxGradeCount = Math.max(...gradeCounts.map((g) => g.count), 1)
  const stats = [
    { label: 'Total Students', value: `${students.length}`, sub: 'Enrolled',           icon: Users,      accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Avg GPA',        value: avgGpa,               sub: 'Across all courses',  icon: TrendingUp, accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Avg Attendance', value: `${avgAttendance}%`,  sub: 'This semester',       icon: Calendar,   accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Excellent',      value: `${excellentCount}`,  sub: 'Top performers',      icon: Award,      accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Faculty</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Students</h1>
        <p className="text-sm text-white/35 mt-1">Monitor student performance and attendance.</p>
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
      <div className="space-y-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or student ID…" className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" /></div>
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', ...uniqueCourses]).map((c) => <button key={c} onClick={() => setActiveCourse(c)} className={`h-8 px-3 rounded-lg text-[12px] font-medium transition-colors border ${activeCourse === c ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/[0.03] border-white/[0.07] text-white/35 hover:text-white/60'}`}>{c}</button>)}
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['Student', 'Course', 'Grade', 'GPA', 'Attendance', 'Status', 'Actions'].map((h) => <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <tr><td colSpan={7} className="px-5 py-10 text-center text-[13px] text-white/25">No students match your search</td></tr>
                : filtered.map((s) => {
                  const sc = statusConfig[s.status]
                  return (
                    <tr key={s.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[11px] font-bold text-blue-400 flex-shrink-0">{initials(s.name)}</div><div><p className="text-[13px] font-medium text-white/70">{s.name}</p><p className="text-[11px] text-white/30">{s.id}</p></div></div></td>
                      <td className="px-5 py-3.5"><span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono text-white/40">{s.course}</span></td>
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-white/70">{s.grade}</td>
                      <td className="px-5 py-3.5 text-[13px] text-white/50">{s.gpa.toFixed(1)}</td>
                      <td className="px-5 py-3.5"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className={`h-full rounded-full ${attendanceColor(s.attendance)}`} style={{ width: `${s.attendance}%` }} /></div><span className="text-[12px] text-white/40">{s.attendance}%</span></div></td>
                      <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${sc.bg} ${sc.color} ${sc.border}`}>{s.status}</span></td>
                      <td className="px-5 py-3.5"><button onClick={() => setViewingStudent(s)} className="bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors">View</button></td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
        <h2 className="text-[14px] font-semibold text-white/70 mb-5">Grade Distribution</h2>
        <div className="flex items-end gap-4 h-32">
          {gradeCounts.map((g) => {
            const heightPct = (g.count / maxGradeCount) * 100
            return (
              <div key={g.grade} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[12px] text-white/50">{g.count}</span>
                <div className="w-full flex items-end" style={{ height: '80px' }}><div className={`w-full rounded-t-lg ${g.color} transition-all`} style={{ height: `${heightPct}%` }} /></div>
                <span className="text-[12px] font-semibold text-white/50">{g.grade}</span>
              </div>
            )
          })}
        </div>
      </div>
      {viewingStudent && <StudentModal student={viewingStudent} onClose={() => setViewingStudent(null)} />}
    </div>
  )
}
