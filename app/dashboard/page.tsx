export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your campus overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '1,234', icon: '👥', gradient: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20' },
          { label: 'Active Sessions', value: '456', icon: '🟢', gradient: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' },
          { label: 'Pending Tasks', value: '23', icon: '⏳', gradient: 'from-orange-500 to-orange-600', bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20' },
          { label: 'Completed', value: '892', icon: '✅', gradient: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-border/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className={`text-4xl font-bold mt-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-5xl opacity-20">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Weekly Activity</h2>
          <div className="space-y-4">
            {[
              { day: 'Mon', value: 65, max: 100 },
              { day: 'Tue', value: 78, max: 100 },
              { day: 'Wed', value: 92, max: 100 },
              { day: 'Thu', value: 81, max: 100 },
              { day: 'Fri', value: 88, max: 100 },
              { day: 'Sat', value: 45, max: 100 },
              { day: 'Sun', value: 52, max: 100 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-primary font-bold">{item.value}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { activity: 'New user registration', time: '2 min ago', icon: '🆕', color: 'blue' },
              { activity: 'Course created', time: '15 min ago', icon: '📚', color: 'green' },
              { activity: 'Job posted', time: '1 hour ago', icon: '💼', color: 'purple' },
              { activity: 'Application submitted', time: '3 hours ago', icon: '📝', color: 'orange' },
              { activity: 'Placement confirmed', time: '5 hours ago', icon: '🎉', color: 'pink' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Placement Rate', value: '87%', subtitle: '+5% from last month', icon: '📈', color: 'from-green-500 to-emerald-500' },
          { title: 'Avg CGPA', value: '3.85', subtitle: 'Excellent performance', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
          { title: 'Active Courses', value: '24', subtitle: '12 new this semester', icon: '📖', color: 'from-blue-500 to-cyan-500' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-4xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-90 mt-2">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
