export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Explore
        </h1>
        <p className="text-muted-foreground mt-2">Discover opportunities, events, and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Job Openings', count: 45, icon: '💼', color: 'from-blue-500 to-blue-600' },
          { title: 'Workshops', count: 12, icon: '🎓', color: 'from-purple-500 to-purple-600' },
          { title: 'Communities', count: 8, icon: '👥', color: 'from-green-500 to-green-600' },
          { title: 'Events', count: 23, icon: '🎉', color: 'from-orange-500 to-orange-600' },
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-3xl font-bold mt-2">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Featured Opportunities</h2>
        <div className="space-y-4">
          {[
            { title: 'Software Engineer Intern', company: 'Google', type: 'Internship', icon: '🔵' },
            { title: 'Data Science Workshop', company: 'Tech Club', type: 'Event', icon: '🎓' },
            { title: 'Full Stack Developer', company: 'Microsoft', type: 'Full-time', icon: '💼' },
            { title: 'UI/UX Design Course', company: 'Design Academy', type: 'Course', icon: '🎨' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-background/50 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.company} • {item.type}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-all">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
