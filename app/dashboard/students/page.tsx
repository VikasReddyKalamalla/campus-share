export default function StudentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Students
        </h1>
        <p className="text-muted-foreground mt-2">Manage and communicate with your students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '156', icon: '👨‍🎓', color: 'from-blue-500 to-blue-600' },
          { label: 'Avg Grade', value: 'A-', icon: '📊', color: 'from-green-500 to-green-600' },
          { label: 'Attendance', value: '92%', icon: '✅', color: 'from-purple-500 to-purple-600' },
          { label: 'Pass Rate', value: '96%', icon: '🎯', color: 'from-orange-500 to-orange-600' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:shadow-xl transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-sm opacity-90">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { name: 'John Doe', id: 'CS2021001', grade: 'A', attendance: '95%', status: 'Excellent', color: 'from-green-500 to-green-600' },
          { name: 'Jane Smith', id: 'CS2021002', grade: 'A-', attendance: '92%', status: 'Very Good', color: 'from-blue-500 to-blue-600' },
          { name: 'Bob Johnson', id: 'CS2021003', grade: 'B+', attendance: '88%', status: 'Good', color: 'from-purple-500 to-purple-600' },
          { name: 'Alice Williams', id: 'CS2021004', grade: 'A', attendance: '97%', status: 'Excellent', color: 'from-pink-500 to-pink-600' },
        ].map((student, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-r ${student.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 flex items-center justify-between group`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-lg">{student.name}</h3>
                <p className="text-sm opacity-90">{student.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{student.status}</p>
              <p className="text-xs opacity-90">Grade: {student.grade} • Attendance: {student.attendance}</p>
            </div>
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100">
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Class Performance Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { grade: 'A', count: 45, color: 'from-green-500 to-green-600' },
            { grade: 'B', count: 38, color: 'from-blue-500 to-blue-600' },
            { grade: 'C', count: 22, color: 'from-yellow-500 to-yellow-600' },
            { grade: 'D', count: 8, color: 'from-orange-500 to-orange-600' },
            { grade: 'F', count: 3, color: 'from-red-500 to-red-600' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className={`h-32 rounded-xl bg-gradient-to-t ${item.color} mb-3 flex items-end justify-center pb-2`}>
                <span className="text-white font-bold text-lg">{item.count}</span>
              </div>
              <p className="font-bold text-lg">Grade {item.grade}</p>
              <p className="text-sm text-muted-foreground">{item.count} students</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
