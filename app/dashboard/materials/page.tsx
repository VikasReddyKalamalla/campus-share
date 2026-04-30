export default function MaterialsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Course Materials
          </h1>
          <p className="text-muted-foreground mt-2">Upload and manage learning resources</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          ⬆️ Upload Material
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { name: 'Lecture 1 - Introduction.pdf', course: 'Data Structures', size: '2.4 MB', date: 'Apr 20', icon: '📄', color: 'from-red-500 to-red-600' },
          { name: 'Assignment 3 - Trees.docx', course: 'Data Structures', size: '156 KB', date: 'Apr 18', icon: '📝', color: 'from-blue-500 to-blue-600' },
          { name: 'Lab Manual - Sorting.pdf', course: 'Algorithms', size: '3.1 MB', date: 'Apr 15', icon: '📄', color: 'from-red-500 to-red-600' },
          { name: 'Midterm Solutions.pdf', course: 'Database Systems', size: '890 KB', date: 'Apr 12', icon: '📄', color: 'from-red-500 to-red-600' },
        ].map((material, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-r ${material.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 flex items-center justify-between group`}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{material.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{material.name}</h3>
                <p className="text-sm opacity-90">{material.course} • {material.size} • {material.date}</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100">
              ⬇️ Download
            </button>
          </div>
        ))}
      </div>

      {/* Storage Stats */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Storage Usage</h2>
        <div className="space-y-4">
          {[
            { type: 'PDFs', used: 45, color: 'from-red-500 to-red-600' },
            { type: 'Documents', used: 30, color: 'from-blue-500 to-blue-600' },
            { type: 'Videos', used: 20, color: 'from-purple-500 to-purple-600' },
            { type: 'Others', used: 5, color: 'from-gray-500 to-gray-600' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{item.type}</span>
                <span className="text-muted-foreground">{item.used}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.used}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
