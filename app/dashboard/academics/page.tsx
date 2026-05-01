'use client'

import { useState } from 'react'
import {
  BookOpen, TrendingUp, CheckCircle2, Clock, ChevronRight,
  BarChart3, Award, AlertTriangle, Calendar, FileText,
  ArrowUpRight, ArrowDownRight, Minus,
} from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────────────────
const courses = [
  { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'A',  gpa: 4.0, attendance: 94, instructor: 'Dr. Sharma',    status: 'on-track' as const },
  { code: 'CS202', name: 'Algorithms',      credits: 4, grade: 'A-', gpa: 3.7, attendance: 88, instructor: 'Dr. Patel',     status: 'on-track' as const },
  { code: 'CS301', name: 'Database Systems',credits: 3, grade: 'A',  gpa: 4.0, attendance: 96, instructor: 'Prof. Reddy',   status: 'on-track' as const },
  { code: 'CS302', name: 'Web Development', credits: 3, grade: 'B+', gpa: 3.3, attendance: 79, instructor: 'Prof. Kumar',   status: 'warning'  as const },
  { code: 'CS303', name: 'Mobile Apps',     credits: 3, grade: 'A',  gpa: 4.0, attendance: 91, instructor: 'Dr. Singh',     status: 'on-track' as const },
  { code: 'CS304', name: 'Cloud Computing', credits: 3, grade: 'A-', gpa: 3.7, attendance: 85, instructor: 'Prof. Verma',   status: 'on-track' as const },
]

const semesterHistory = [
  { sem: 'Sem 1', gpa: 3.50, credits: 18, rank: 42 },
  { sem: 'Sem 2', gpa: 3.65, credits: 20, rank: 35 },
  { sem: 'Sem 3', gpa: 3.75, credits: 19, rank: 28 },
  { sem: 'Sem 4', gpa: 3.85, credits: 20, rank: 21 },
]

const upcomingAssignments = [
  { course: 'CS201', title: 'Binary Tree Implementation', due: 'May 3', type: 'Lab',  urgent: true  },
  { course: 'CS202', title: 'Sorting Algorithm Analysis', due: 'May 5', type: 'Assignment', urgent: true  },
  { course: 'CS301', title: 'ER Diagram Submission',      due: 'May 8', type: 'Project', urgent: false },
  { course: 'CS304', title: 'AWS Deployment Report',      due: 'May 12',type: 'Report', urgent: false },
]

// ── Helpers ────────────────────────────────────────────────────────────────
const gradeColor: Record<string, string> = {
  'A':  'text-emerald-400',
  'A-': 'text-emerald-400',
  'B+': 'text-amber-400',
  'B':  'text-amber-400',
  'B-': 'text-orange-400',
  'C':  'text-red-400',
}

const attendanceColor = (pct: number) =>
  pct >= 90 ? 'text-emerald-400' : pct >= 75 ? 'text-amber-400' : 'text-red-400'

const attendanceBg = (pct: number) =>
  pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-500'

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon: Icon, accent, accentBg,
}: {
  label: string; value: string; sub?: string
  icon: React.ElementType; accent: string; accentBg: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-white/35 font-medium uppercase tracking-wide">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${accentBg} flex items-center justify-center`}>
          <Icon className={`h-4 w-4 ${accent}`} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      {sub && <p className="text-xs text-white/30 mt-1.5">{sub}</p>}
    </div>
  )
}

type Tab = 'courses' | 'performance' | 'assignments'

// ── Page ───────────────────────────────────────────────────────────────────
export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('courses')
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null)

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0)
  const cgpa = (courses.reduce((s, c) => s + c.gpa * c.credits, 0) / totalCredits).toFixed(2)
  const avgAttendance = Math.round(courses.reduce((s, c) => s + c.attendance, 0) / courses.length)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'courses',     label: 'Current Courses' },
    { id: 'performance', label: 'Performance' },
    { id: 'assignments', label: 'Assignments' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Academic Year 2024–25</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Academics</h1>
          <p className="text-sm text-white/35 mt-1">Semester 4 · B.Tech Computer Science</p>
        </div>
        <button className="flex items-center gap-2 h-8 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors">
          <FileText className="h-3.5 w-3.5" />
          Download Transcript
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current CGPA"   value={cgpa}              sub="+0.10 from last sem"  icon={Award}        accent="text-amber-400"   accentBg="bg-amber-500/10" />
        <StatCard label="Active Courses" value={`${courses.length}`} sub={`${totalCredits} credits`} icon={BookOpen}     accent="text-blue-400"    accentBg="bg-blue-500/10" />
        <StatCard label="Avg Attendance" value={`${avgAttendance}%`} sub="Above 75% threshold" icon={CheckCircle2}  accent="text-emerald-400" accentBg="bg-emerald-500/10" />
        <StatCard label="Class Rank"     value="21 / 120"          sub="Top 18 percentile"   icon={TrendingUp}   accent="text-violet-400"  accentBg="bg-violet-500/10" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t.id
                ? 'border-blue-500 text-white/80'
                : 'border-transparent text-white/35 hover:text-white/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Courses ── */}
      {activeTab === 'courses' && (
        <div className="space-y-3">
          {courses.map((course) => (
            <div
              key={course.code}
              onClick={() => setSelectedCourse(selectedCourse?.code === course.code ? null : course)}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              {/* Row */}
              <div className="flex items-center gap-4 p-4">
                {/* Code badge */}
                <div className="w-14 h-14 rounded-lg bg-white/[0.04] border border-white/[0.07] flex flex-col items-center justify-center flex-shrink-0">
                  <p className="text-[9px] text-white/30 font-mono">{course.code}</p>
                  <p className={`text-lg font-bold leading-none mt-0.5 ${gradeColor[course.grade] ?? 'text-white/70'}`}>
                    {course.grade}
                  </p>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-white/80 truncate">{course.name}</p>
                    {course.status === 'warning' && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 flex-shrink-0">
                        <AlertTriangle className="h-2.5 w-2.5" /> Low attendance
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-white/30 mt-0.5">{course.instructor} · {course.credits} credits</p>

                  {/* Attendance bar */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${attendanceBg(course.attendance)}`}
                        style={{ width: `${course.attendance}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-medium flex-shrink-0 ${attendanceColor(course.attendance)}`}>
                      {course.attendance}%
                    </span>
                  </div>
                </div>

                <ChevronRight className={`h-4 w-4 text-white/20 flex-shrink-0 transition-transform ${selectedCourse?.code === course.code ? 'rotate-90' : ''}`} />
              </div>

              {/* Expanded detail */}
              {selectedCourse?.code === course.code && (
                <div className="px-4 pb-4 pt-0 border-t border-white/[0.05]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    {[
                      { label: 'Grade',      value: course.grade },
                      { label: 'GPA Points', value: course.gpa.toFixed(1) },
                      { label: 'Credits',    value: course.credits.toString() },
                      { label: 'Attendance', value: `${course.attendance}%` },
                    ].map((d) => (
                      <div key={d.label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-3">
                        <p className="text-[10px] text-white/30 uppercase tracking-wide">{d.label}</p>
                        <p className="text-[15px] font-semibold text-white/70 mt-1">{d.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors">
                      <BookOpen className="h-3 w-3" /> View Materials
                    </button>
                    <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[11px] text-white/40 hover:text-white/70 transition-colors">
                      <Calendar className="h-3 w-3" /> Schedule
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Performance ── */}
      {activeTab === 'performance' && (
        <div className="space-y-4">
          {/* GPA trend */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-white/70">GPA Trend</h2>
              <span className="text-xs text-white/25">4.0 scale</span>
            </div>
            <div className="space-y-4">
              {semesterHistory.map((s, i) => {
                const prev = semesterHistory[i - 1]
                const delta = prev ? s.gpa - prev.gpa : null
                return (
                  <div key={s.sem} className="flex items-center gap-4">
                    <span className="text-[12px] text-white/40 w-12 flex-shrink-0">{s.sem}</span>
                    <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${(s.gpa / 4) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 w-24 justify-end flex-shrink-0">
                      <span className="text-[13px] font-semibold text-white/70">{s.gpa.toFixed(2)}</span>
                      {delta !== null && (
                        <span className={`flex items-center text-[10px] font-medium ${delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-white/30'}`}>
                          {delta > 0 ? <ArrowUpRight className="h-3 w-3" /> : delta < 0 ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                          {Math.abs(delta).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Semester history table */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05]">
              <h2 className="text-[14px] font-semibold text-white/70">Semester History</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['Semester', 'GPA', 'Credits', 'Class Rank'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {semesterHistory.map((s, i) => (
                  <tr key={s.sem} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 text-[13px] text-white/60">{s.sem}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[13px] font-semibold ${s.gpa >= 3.7 ? 'text-emerald-400' : s.gpa >= 3.3 ? 'text-amber-400' : 'text-white/60'}`}>
                        {s.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-white/50">{s.credits}</td>
                    <td className="px-5 py-3.5 text-[13px] text-white/50">#{s.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grade distribution */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <h2 className="text-[14px] font-semibold text-white/70 mb-5">Current Semester Grade Distribution</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {courses.map((c) => (
                <div key={c.code} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[10px] text-white/30 font-mono">{c.code}</p>
                  <p className={`text-xl font-bold ${gradeColor[c.grade] ?? 'text-white/70'}`}>{c.grade}</p>
                  <p className="text-[10px] text-white/25">{c.gpa.toFixed(1)} pts</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Assignments ── */}
      {activeTab === 'assignments' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[12px] text-white/30">{upcomingAssignments.length} upcoming deadlines</p>
            <button className="text-[12px] text-blue-400/70 hover:text-blue-400 transition-colors">View all</button>
          </div>
          {upcomingAssignments.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${a.urgent ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/[0.04] border border-white/[0.07]'}`}>
                <Clock className={`h-4 w-4 ${a.urgent ? 'text-amber-400' : 'text-white/30'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white/70 truncate">{a.title}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{a.course} · {a.type}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {a.urgent && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400">
                    Due soon
                  </span>
                )}
                <span className="text-[12px] text-white/35">{a.due}</span>
                <button className="h-7 px-2.5 rounded-lg bg-blue-600/15 border border-blue-500/20 text-[11px] text-blue-400 hover:bg-blue-600/25 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          ))}

          {/* Empty state for completed */}
          <div className="mt-6 rounded-xl border border-white/[0.05] bg-white/[0.01] p-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-white/10 mx-auto mb-2" />
            <p className="text-[13px] text-white/25">No overdue assignments</p>
            <p className="text-[11px] text-white/15 mt-1">You're all caught up</p>
          </div>
        </div>
      )}

    </div>
  )
}
