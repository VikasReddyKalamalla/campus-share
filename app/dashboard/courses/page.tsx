'use client'

import { useState } from 'react'
import {
  BookOpen, Users, TrendingUp, Calendar, Plus, X,
  Clock, ChevronDown, ChevronUp, Eye, Upload,
} from 'lucide-react'

interface Course {
  code: string; name: string; students: number; progress: number
  credits: number; semester: string; schedule: string
}

const initialCourses: Course[] = [
  { code: 'CS201', name: 'Data Structures',  students: 45, progress: 75, credits: 4, semester: 'Sem 4', schedule: 'Mon/Wed 10–11:30 AM' },
  { code: 'CS202', name: 'Algorithms',       students: 38, progress: 60, credits: 4, semester: 'Sem 4', schedule: 'Tue/Thu 2–3:30 PM'   },
  { code: 'CS301', name: 'Database Systems', students: 42, progress: 85, credits: 3, semester: 'Sem 5', schedule: 'Mon/Fri 9–10 AM'     },
  { code: 'CS302', name: 'Web Development',  students: 51, progress: 45, credits: 3, semester: 'Sem 5', schedule: 'Wed/Fri 11–12 PM'    },
  { code: 'CS303', name: 'Mobile Apps',      students: 35, progress: 70, credits: 3, semester: 'Sem 6', schedule: 'Tue/Thu 10–11 AM'    },
  { code: 'CS304', name: 'Cloud Computing',  students: 28, progress: 55, credits: 3, semester: 'Sem 6', schedule: 'Mon/Wed 3–4 PM'      },
]

function AddCourseModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: Course) => void }) {
  const [form, setForm] = useState({ name: '', code: '', credits: '3', semester: '', schedule: '' })
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleCreate = () => {
    if (!form.name.trim() || !form.code.trim()) return
    onAdd({ code: form.code.trim().toUpperCase(), name: form.name.trim(), credits: Number(form.credits), semester: form.semester || 'Sem 1', schedule: form.schedule || 'TBD', students: 0, progress: 0 })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white/80">Add New Course</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.05] text-white/30 hover:text-white/60 transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          {[{ label: 'Course Name', key: 'name', placeholder: 'e.g. Operating Systems' }, { label: 'Course Code', key: 'code', placeholder: 'e.g. CS401' }, { label: 'Semester', key: 'semester', placeholder: 'e.g. Sem 4' }, { label: 'Schedule', key: 'schedule', placeholder: 'e.g. Mon/Wed 10–11 AM' }].map(({ label, key, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-[11px] text-white/40 uppercase tracking-wide">{label}</label>
              <input value={form[key as keyof typeof form]} onChange={(e) => set(key as keyof typeof form, e.target.value)} placeholder={placeholder} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Credits</label>
            <select value={form.credits} onChange={(e) => set('credits', e.target.value)} className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 focus:outline-none appearance-none">
              {[1,2,3,4,5].map((n) => <option key={n} value={n} className="bg-[#111118]">{n} Credit{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 h-9 rounded-lg border border-white/[0.08] text-[13px] text-white/40 hover:text-white/70 transition-colors">Cancel</button>
          <button onClick={handleCreate} className="flex-1 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium transition-colors">Create Course</button>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course, expanded, onToggle }: { course: Course; expanded: boolean; onToggle: () => void }) {
  const progressColor = course.progress >= 75 ? 'bg-emerald-500' : course.progress >= 50 ? 'bg-blue-500' : 'bg-amber-500'
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-medium text-blue-400">{course.code}</span>
          <span className="text-[11px] text-white/30">{course.semester}</span>
        </div>
        <h3 className="text-[14px] font-semibold text-white/80 mb-1">{course.name}</h3>
        <div className="flex items-center gap-1.5 text-[12px] text-white/35 mb-3"><Clock className="h-3 w-3" /><span>{course.schedule}</span></div>
        <div className="flex items-center gap-4 text-[12px] text-white/40 mb-4">
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.students} students</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.credits} credits</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/30">Progress</span>
            <span className="text-white/50 font-medium">{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${progressColor}`} style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>
      <div className="px-5 pb-4">
        <button onClick={onToggle} className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors">
          Manage {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>
      {expanded && (
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3"><p className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Schedule</p><p className="text-[12px] text-white/60">{course.schedule}</p></div>
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3"><p className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Credits</p><p className="text-[12px] text-white/60">{course.credits}</p></div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"><Eye className="h-3.5 w-3.5" />View Students</button>
            <button className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-white/50 hover:text-white/80 hover:bg-white/[0.07] transition-colors"><Upload className="h-3.5 w-3.5" />Upload Material</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [expandedCode, setExpandedCode] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const totalStudents = courses.reduce((s, c) => s + c.students, 0)
  const avgProgress = Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)
  const activeSemesters = new Set(courses.map((c) => c.semester)).size
  const stats = [
    { label: 'Total Courses',    value: `${courses.length}`, sub: 'Active this term',    icon: BookOpen,   accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Total Students',   value: `${totalStudents}`,  sub: 'Across all courses',  icon: Users,      accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Avg Progress',     value: `${avgProgress}%`,   sub: 'Curriculum covered',  icon: TrendingUp, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Active Semesters', value: `${activeSemesters}`,sub: 'Running in parallel', icon: Calendar,   accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Faculty</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Courses</h1>
          <p className="text-sm text-white/35 mt-1">Manage your assigned courses and track progress.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium rounded-lg h-9 px-4 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" />Add Course
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-white/35 font-medium uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.accent}`} /></div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-white/30 mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.code} course={course} expanded={expandedCode === course.code} onToggle={() => setExpandedCode(expandedCode === course.code ? null : course.code)} />
        ))}
      </div>
      {showAddModal && <AddCourseModal onClose={() => setShowAddModal(false)} onAdd={(c) => setCourses((prev) => [...prev, c])} />}
    </div>
  )
}
