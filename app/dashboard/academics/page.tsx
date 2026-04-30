export default function AcademicsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Academics
        </h1>
        <p className="text-muted-foreground mt-2">View your courses and academic performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Current CGPA', value: '3.85', icon: '⭐', color: 'from-yellow-500 to-yellow-600' },
          { label: 'Courses', value: '6', icon: '📚', color: 'from-blue-500 to-blue-600' },
          { label: 'Attendance', value: '92%', icon: '✅', color: 'from-green-500 to-green-600' },
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

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Current Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Data Structures', code: 'CS201', grade: 'A', credits: 4, color: 'from-blue-500 to-blue-600' },
            { name: 'Algorithms', code: 'CS202', grade: 'A-', credits: 4, color: 'from-purple-500 to-purple-600' },
            { name: 'Database Systems', code: 'CS301', grade: 'A', credits: 3, color: 'from-green-500 to-green-600' },
            { name: 'Web Development', code: 'CS302', grade: 'B+', credits: 3, color: 'from-orange-500 to-orange-600' },
            { name: 'Mobile Apps', code: 'CS303', grade: 'A', credits: 3, color: 'from-pink-500 to-pink-600' },
            { name: 'Cloud Computing', code: 'CS304', grade: 'A-', credits: 3, color: 'from-cyan-500 to-cyan-600' },
          ].map((course, i) => (
            <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90">{course.code}</p>
                  <h3 className="text-xl font-bold mt-1">{course.name}</h3>
                </div>
                <span className="text-3xl font-bold opacity-20">{course.credits}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-sm opacity-90">Grade</span>
                <span className="text-2xl font-bold">{course.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GPA Trend */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">GPA Trend</h2>
        <div className="space-y-4">
          {[
            { semester: 'Sem 1', gpa: 3.5, color: 'from-blue-500 to-blue-600' },
            { semester: 'Sem 2', gpa: 3.65, color: 'from-purple-500 to-purple-600' },
            { semester: 'Sem 3', gpa: 3.75, color: 'from-pink-500 to-pink-600' },
            { semester: 'Sem 4', gpa: 3.85, color: 'from-green-500 to-green-600' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{item.semester}</span>
                <span className="text-muted-foreground font-bold">{item.gpa}</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(item.gpa / 4) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
