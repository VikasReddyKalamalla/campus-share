export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-muted-foreground mt-2">Manage your teaching courses</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          + Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { code: 'CS201', name: 'Data Structures', students: 45, progress: 75, color: 'from-blue-500 to-blue-600' },
          { code: 'CS202', name: 'Algorithms', students: 38, progress: 60, color: 'from-purple-500 to-purple-600' },
          { code: 'CS301', name: 'Database Systems', students: 42, progress: 85, color: 'from-green-500 to-green-600' },
          { code: 'CS302', name: 'Web Development', students: 51, progress: 45, color: 'from-orange-500 to-orange-600' },
          { code: 'CS303', name: 'Mobile Apps', students: 35, progress: 70, color: 'from-pink-500 to-pink-600' },
          { code: 'CS304', name: 'Cloud Computing', students: 28, progress: 55, color: 'from-cyan-500 to-cyan-600' },
        ].map((course, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden relative`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold opacity-90">{course.code}</span>
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
              <p className="text-sm opacity-90 mb-4">{course.students} students enrolled</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span>Course Progress</span>
                  <span className="font-bold">{course.progress}%</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 text-sm">
                Manage Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
