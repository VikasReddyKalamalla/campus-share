export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-muted-foreground mt-2">Generate and download system reports</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          📊 Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'User Activity Report', date: 'Apr 27, 2026', size: '2.4 MB', icon: '📈', color: 'from-blue-500 to-blue-600' },
          { title: 'Placement Statistics', date: 'Apr 25, 2026', size: '1.8 MB', icon: '💼', color: 'from-green-500 to-green-600' },
          { title: 'Academic Performance', date: 'Apr 20, 2026', size: '3.2 MB', icon: '📚', color: 'from-purple-500 to-purple-600' },
          { title: 'System Usage Report', date: 'Apr 15, 2026', size: '890 KB', icon: '⚙️', color: 'from-orange-500 to-orange-600' },
          { title: 'Monthly Summary', date: 'Apr 1, 2026', size: '1.5 MB', icon: '📋', color: 'from-pink-500 to-pink-600' },
          { title: 'Financial Report', date: 'Mar 31, 2026', size: '2.1 MB', icon: '💰', color: 'from-yellow-500 to-yellow-600' },
        ].map((report, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${report.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{report.icon}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{report.title}</h3>
            <div className="flex items-center justify-between text-sm opacity-90 mb-4">
              <span>📅 {report.date}</span>
              <span>💾 {report.size}</span>
            </div>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all">
              ⬇️ Download
            </button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Report History</h2>
        <div className="space-y-3">
          {[
            { name: 'Weekly Summary', generated: '2 days ago', status: 'Completed' },
            { name: 'Monthly Analytics', generated: '5 days ago', status: 'Completed' },
            { name: 'Quarterly Review', generated: '1 week ago', status: 'Completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-background/50 transition-all">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Generated {item.generated}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
