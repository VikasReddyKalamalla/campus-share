export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-2">Performance insights and statistics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '156', change: '+12%', icon: '👨‍🎓', color: 'from-blue-500 to-blue-600' },
          { label: 'Avg Grade', value: 'B+', change: '+0.5', icon: '📊', color: 'from-green-500 to-green-600' },
          { label: 'Attendance', value: '89%', change: '+5%', icon: '✅', color: 'from-purple-500 to-purple-600' },
          { label: 'Pass Rate', value: '94%', change: '+3%', icon: '🎯', color: 'from-orange-500 to-orange-600' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:shadow-xl transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm opacity-90">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Course Performance</h2>
          <div className="space-y-6">
            {[
              { course: 'Data Structures', avg: 85, students: 45 },
              { course: 'Algorithms', avg: 78, students: 38 },
              { course: 'Database Systems', avg: 82, students: 42 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.course}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">{item.students} students</span>
                    <span className="font-bold text-primary">{item.avg}%</span>
                  </div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Grade Distribution</h2>
          <div className="space-y-4">
            {[
              { grade: 'A', count: 45, color: 'from-green-500 to-green-600' },
              { grade: 'B', count: 38, color: 'from-blue-500 to-blue-600' },
              { grade: 'C', count: 22, color: 'from-yellow-500 to-yellow-600' },
              { grade: 'D', count: 8, color: 'from-orange-500 to-orange-600' },
              { grade: 'F', count: 3, color: 'from-red-500 to-red-600' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Grade {item.grade}</span>
                  <span className="text-muted-foreground">{item.count} students</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(item.count / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Monthly Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { month: 'January', value: 72, trend: '↑' },
            { month: 'February', value: 78, trend: '↑' },
            { month: 'March', value: 85, trend: '↑' },
            { month: 'April', value: 82, trend: '↓' },
            { month: 'May', value: 88, trend: '↑' },
            { month: 'June', value: 92, trend: '↑' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-background/50 hover:bg-background transition-colors">
              <p className="text-sm text-muted-foreground mb-2">{item.month}</p>
              <div className="flex items-end gap-2">
                <div className="h-16 bg-gradient-to-t from-blue-500 to-purple-500 rounded-lg" style={{ width: `${item.value}%` }}></div>
                <span className="text-2xl font-bold">{item.value}%</span>
                <span className={`text-xl ${item.trend === '↑' ? 'text-green-500' : 'text-red-500'}`}>{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
