export default function OpportunitiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Opportunities
          </h1>
          <p className="text-muted-foreground mt-2">Browse and manage job opportunities</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          + Post Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Postings', value: '12', icon: '📢', color: 'from-blue-500 to-blue-600' },
          { label: 'Applications', value: '234', icon: '📝', color: 'from-purple-500 to-purple-600' },
          { label: 'Interviews', value: '45', icon: '🎤', color: 'from-green-500 to-green-600' },
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
          { title: 'Software Engineer', company: 'Google', location: 'Bangalore', salary: '₹15-20 LPA', applicants: 45, icon: '🔵', color: 'from-blue-500 to-blue-600' },
          { title: 'Data Scientist', company: 'Microsoft', location: 'Hyderabad', salary: '₹18-25 LPA', applicants: 38, icon: '🟣', color: 'from-purple-500 to-purple-600' },
          { title: 'Product Manager', company: 'Amazon', location: 'Mumbai', salary: '₹25-30 LPA', applicants: 28, icon: '🟠', color: 'from-orange-500 to-orange-600' },
          { title: 'DevOps Engineer', company: 'Netflix', location: 'Bangalore', salary: '₹20-28 LPA', applicants: 32, icon: '🔴', color: 'from-red-500 to-red-600' },
        ].map((job, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-r ${job.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 group`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{job.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm opacity-90">{job.company} • {job.location}</p>
                  <p className="text-lg font-bold mt-1">{job.salary}</p>
                  <p className="text-xs opacity-75 mt-1">{job.applicants} applicants</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
