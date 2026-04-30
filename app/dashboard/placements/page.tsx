export default function PlacementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Placements
        </h1>
        <p className="text-muted-foreground mt-2">Browse and apply for job opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Opportunities', value: '45', icon: '💼', color: 'from-blue-500 to-blue-600' },
          { label: 'Applications', value: '156', icon: '📝', color: 'from-purple-500 to-purple-600' },
          { label: 'Placed', value: '89', icon: '✅', color: 'from-green-500 to-green-600' },
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
          { title: 'Software Engineer', company: 'Google', location: 'Bangalore', salary: '₹15-20 LPA', icon: '🔵', color: 'from-blue-500 to-blue-600' },
          { title: 'Data Analyst', company: 'Microsoft', location: 'Hyderabad', salary: '₹50k/month', icon: '🟣', color: 'from-purple-500 to-purple-600' },
          { title: 'Product Manager', company: 'Amazon', location: 'Mumbai', salary: '₹25-30 LPA', icon: '🟠', color: 'from-orange-500 to-orange-600' },
          { title: 'UX Designer', company: 'Meta', location: 'Bangalore', salary: '₹18-22 LPA', icon: '🔴', color: 'from-red-500 to-red-600' },
        ].map((job, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-r ${job.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 group`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{job.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm opacity-90">{job.company} • {job.location}</p>
                  <p className="text-lg font-bold mt-1">{job.salary}</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Placement Stats */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">Placement Timeline</h2>
        <div className="space-y-4">
          {[
            { month: 'January', placed: 12, applications: 45, color: 'from-blue-500 to-blue-600' },
            { month: 'February', placed: 18, applications: 62, color: 'from-purple-500 to-purple-600' },
            { month: 'March', placed: 25, applications: 78, color: 'from-pink-500 to-pink-600' },
            { month: 'April', placed: 34, applications: 89, color: 'from-green-500 to-green-600' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{item.month}</span>
                <span className="text-muted-foreground">{item.placed} placed • {item.applications} applications</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(item.placed / 40) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
