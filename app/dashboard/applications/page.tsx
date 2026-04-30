export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Applications
        </h1>
        <p className="text-muted-foreground mt-2">Track and manage job applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '156', icon: '📝', color: 'from-blue-500 to-blue-600' },
          { label: 'Pending', value: '45', icon: '⏳', color: 'from-orange-500 to-orange-600' },
          { label: 'Accepted', value: '89', icon: '✅', color: 'from-green-500 to-green-600' },
          { label: 'Rejected', value: '22', icon: '❌', color: 'from-red-500 to-red-600' },
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
        <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>
        <div className="space-y-3">
          {[
            { student: 'John Doe', position: 'Software Engineer', company: 'Google', status: 'Pending', date: 'Apr 25' },
            { student: 'Jane Smith', position: 'Data Analyst', company: 'Microsoft', status: 'Accepted', date: 'Apr 24' },
            { student: 'Bob Johnson', position: 'Product Manager', company: 'Amazon', status: 'Pending', date: 'Apr 23' },
            { student: 'Alice Williams', position: 'UX Designer', company: 'Meta', status: 'Rejected', date: 'Apr 22' },
            { student: 'Charlie Brown', position: 'DevOps Engineer', company: 'Netflix', status: 'Accepted', date: 'Apr 21' },
          ].map((app, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-background/50 transition-all">
              <div className="flex-1">
                <h3 className="font-semibold">{app.student}</h3>
                <p className="text-sm text-muted-foreground">
                  {app.position} at {app.company}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                app.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
