export default function ResumePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        <p className="text-muted-foreground mt-2">Create and manage your professional resume</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Resumes', value: '3', icon: '📄', color: 'from-blue-500 to-blue-600' },
          { label: 'Views', value: '156', icon: '👁️', color: 'from-purple-500 to-purple-600' },
          { label: 'Downloads', value: '23', icon: '⬇️', color: 'from-green-500 to-green-600' },
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
        <h2 className="text-2xl font-bold mb-6">Your Resumes</h2>
        <div className="space-y-4">
          {[
            { name: 'Professional Resume', updated: '2 days ago', status: 'Active', icon: '✅' },
            { name: 'Internship Resume', updated: '1 week ago', status: 'Active', icon: '✅' },
            { name: 'Academic Resume', updated: '2 weeks ago', status: 'Archived', icon: '📦' },
          ].map((resume, i) => (
            <div key={i} className="p-4 border rounded-xl hover:bg-background/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{resume.icon}</span>
                  <div>
                    <h3 className="font-semibold">{resume.name}</h3>
                    <p className="text-sm text-muted-foreground">Updated {resume.updated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resume.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {resume.status}
                  </span>
                  <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
          ➕ Create New Resume
        </button>
      </div>
    </div>
  )
}
