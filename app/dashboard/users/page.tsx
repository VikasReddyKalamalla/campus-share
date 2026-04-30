export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage all platform users</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          ➕ Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '1,234', icon: '👥', color: 'from-blue-500 to-blue-600' },
          { label: 'Students', value: '892', icon: '👨‍🎓', color: 'from-green-500 to-green-600' },
          { label: 'Faculty', value: '45', icon: '👨‍🏫', color: 'from-purple-500 to-purple-600' },
          { label: 'Pending', value: '5', icon: '⏳', color: 'from-orange-500 to-orange-600' },
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

      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">User Directory</h2>
        <div className="space-y-3">
          {[
            { name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', icon: '🟢' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'Faculty', status: 'Active', icon: '🟢' },
            { name: 'Bob Johnson', email: 'bob@example.com', role: 'Student', status: 'Pending', icon: '🟡' },
            { name: 'Alice Williams', email: 'alice@example.com', role: 'Employee', status: 'Active', icon: '🟢' },
            { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Active', icon: '🟢' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-background/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {user.role}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  {user.icon} {user.status}
                </span>
                <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-all">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
