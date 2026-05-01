'use client'

import { useState } from 'react'
import { Users, TrendingUp, Calendar, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react'

type Tab = 'overview' | 'course-performance' | 'grade-distribution' | 'trends'
type SortKey = 'course' | 'students' | 'avgScore' | 'attendance' | 'passRate'
type SortDir = 'asc' | 'desc'

const coursePerformance = [
  { course: 'Data Structures',  students: 45, avgScore: 82, attendance: 91, passRate: 96 },
  { course: 'Algorithms',       students: 38, avgScore: 76, attendance: 87, passRate: 92 },
  { course: 'Database Systems', students: 42, avgScore: 88, attendance: 94, passRate: 98 },
  { course: 'Web Development',  students: 51, avgScore: 71, attendance: 83, passRate: 88 },
  { course: 'Mobile Apps',      students: 35, avgScore: 79, attendance: 89, passRate: 94 },
  { course: 'Cloud Computing',  students: 28, avgScore: 74, attendance: 85, passRate: 90 },
]
const gradeDistribution = [
  { grade: 'A', count: 42, color: 'bg-emerald-500' },
  { grade: 'B', count: 58, color: 'bg-blue-500'    },
  { grade: 'C', count: 31, color: 'bg-amber-500'   },
  { grade: 'D', count: 16, color: 'bg-orange-500'  },
  { grade: 'F', count: 9,  color: 'bg-red-500'     },
]
const monthlyTrends = [
  { month: 'Jan', value: 72 }, { month: 'Feb', value: 78 }, { month: 'Mar', value: 75 },
  { month: 'Apr', value: 83 }, { month: 'May', value: 80 }, { month: 'Jun', value: 87 },
]
const totalGradeStudents = gradeDistribution.reduce((s, g) => s + g.count, 0)
const maxTrend = Math.max(...monthlyTrends.map((m) => m.value))

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sortKey, setSortKey] = useState<SortKey>('course')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' }, { id: 'course-performance', label: 'Course Performance' },
    { id: 'grade-distribution', label: 'Grade Distribution' }, { id: 'trends', label: 'Trends' },
  ]
  const stats = [
    { label: 'Total Students', value: '156', delta: '+12%', icon: Users,        accent: 'text-blue-400',    bg: 'bg-blue-500/10'    },
    { label: 'Avg Grade',      value: 'B+',  delta: '+0.5', icon: CheckCircle2, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Attendance',     value: '89%', delta: '+5%',  icon: Calendar,     accent: 'text-violet-400',  bg: 'bg-violet-500/10'  },
    { label: 'Pass Rate',      value: '94%', delta: '+3%',  icon: TrendingUp,   accent: 'text-amber-400',   bg: 'bg-amber-500/10'   },
  ]
  const handleSort = (key: SortKey) => { if (sortKey === key) { setSortDir((d) => d === 'asc' ? 'desc' : 'asc') } else { setSortKey(key); setSortDir('asc') } }
  const sortedCourses = [...coursePerformance].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey]
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
    return sortDir === 'asc' ? cmp : -cmp
  })
  const SortIcon = ({ col }: { col: SortKey }) => sortKey === col ? (sortDir === 'asc' ? <ChevronUp className="h-3 w-3 text-blue-400" /> : <ChevronDown className="h-3 w-3 text-blue-400" />) : <ChevronDown className="h-3 w-3 text-white/20" />
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Insights</p>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-sm text-white/35 mt-1">Performance insights across your courses and platform.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-3"><p className="text-xs text-white/35 font-medium uppercase tracking-wide">{s.label}</p><div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon className={`h-4 w-4 ${s.accent}`} /></div></div>
            <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1"><TrendingUp className="h-3 w-3" />{s.delta} from last semester</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 border-b border-white/[0.06] overflow-x-auto">
        {tabs.map((t) => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab === t.id ? 'border-blue-500 text-white/80' : 'border-transparent text-white/35 hover:text-white/60'}`}>{t.label}</button>)}
      </div>
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <h2 className="text-[14px] font-semibold text-white/70 mb-5">Course Performance</h2>
            <div className="space-y-4">
              {coursePerformance.map((c) => (
                <div key={c.course} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px]"><span className="text-white/50 truncate pr-2">{c.course}</span><span className="text-white/40 flex-shrink-0">{c.avgScore}%</span></div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.avgScore}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
            <h2 className="text-[14px] font-semibold text-white/70 mb-5">Grade Distribution</h2>
            <div className="space-y-3">
              {gradeDistribution.map((g) => (
                <div key={g.grade} className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-white/60 w-4">{g.grade}</span>
                  <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden"><div className={`h-full rounded-full ${g.color}`} style={{ width: `${(g.count / totalGradeStudents) * 100}%` }} /></div>
                  <span className="text-[12px] text-white/35 w-8 text-right">{g.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'course-performance' && (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {([{ key: 'course', label: 'Course' }, { key: 'students', label: 'Students' }, { key: 'avgScore', label: 'Avg Score' }, { key: 'attendance', label: 'Attendance' }, { key: 'passRate', label: 'Pass Rate' }] as { key: SortKey; label: string }[]).map(({ key, label }) => (
                  <th key={key} onClick={() => handleSort(key)} className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wide cursor-pointer hover:text-white/60 transition-colors select-none">
                    <span className="flex items-center gap-1">{label}<SortIcon col={key} /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCourses.map((c) => (
                <tr key={c.course} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 text-[13px] font-medium text-white/70">{c.course}</td>
                  <td className="px-5 py-3.5 text-[13px] text-white/50">{c.students}</td>
                  <td className="px-5 py-3.5"><span className={`text-[13px] font-semibold ${c.avgScore >= 80 ? 'text-emerald-400' : c.avgScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{c.avgScore}%</span></td>
                  <td className="px-5 py-3.5 text-[13px] text-white/50">{c.attendance}%</td>
                  <td className="px-5 py-3.5"><span className={`text-[13px] font-semibold ${c.passRate >= 95 ? 'text-emerald-400' : c.passRate >= 85 ? 'text-amber-400' : 'text-red-400'}`}>{c.passRate}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'grade-distribution' && (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
          <h2 className="text-[14px] font-semibold text-white/70 mb-6">Grade Distribution — All Courses</h2>
          <div className="space-y-4">
            {gradeDistribution.map((g) => {
              const pct = Math.round((g.count / totalGradeStudents) * 100)
              return (
                <div key={g.grade} className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-white/70 w-6">{g.grade}</span>
                  <div className="flex-1 h-6 bg-white/[0.04] rounded-lg overflow-hidden">
                    <div className={`h-full rounded-lg flex items-center px-2 transition-all ${g.color}`} style={{ width: `${pct}%` }}>
                      {pct > 8 && <span className="text-[11px] font-semibold text-white/90">{pct}%</span>}
                    </div>
                  </div>
                  <span className="text-[12px] text-white/40 w-20 text-right">{g.count} students</span>
                </div>
              )
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[12px] text-white/30">
            <span>Total: {totalGradeStudents} students</span>
            <span>Pass rate: {Math.round(((gradeDistribution[0].count + gradeDistribution[1].count + gradeDistribution[2].count) / totalGradeStudents) * 100)}%</span>
          </div>
        </div>
      )}
      {activeTab === 'trends' && (
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-6"><h2 className="text-[14px] font-semibold text-white/70">Monthly Avg Score Trend</h2><span className="text-xs text-white/25">Jan – Jun 2025</span></div>
          <div className="flex items-end gap-3 h-48">
            {monthlyTrends.map((m) => {
              const heightPct = (m.value / maxTrend) * 100
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] text-white/50 font-medium">{m.value}%</span>
                  <div className="w-full flex items-end" style={{ height: '160px' }}>
                    <div className="w-full rounded-t-lg bg-blue-500 transition-all" style={{ height: `${heightPct}%` }} />
                  </div>
                  <span className="text-[11px] text-white/35">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.05] grid grid-cols-3 gap-4">
            {[{ label: 'Highest', value: `${Math.max(...monthlyTrends.map((m) => m.value))}%` }, { label: 'Lowest', value: `${Math.min(...monthlyTrends.map((m) => m.value))}%` }, { label: 'Average', value: `${Math.round(monthlyTrends.reduce((s, m) => s + m.value, 0) / monthlyTrends.length)}%` }].map((s) => (
              <div key={s.label} className="text-center"><p className="text-[11px] text-white/30 uppercase tracking-wide">{s.label}</p><p className="text-[18px] font-bold text-white/70 mt-1">{s.value}</p></div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
