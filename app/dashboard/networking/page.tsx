export default function NetworkingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Networking
        </h1>
        <p className="text-muted-foreground mt-2">Connect with students and professionals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Connections', value: '234', icon: '🤝', color: 'from-blue-500 to-blue-600' },
          { label: 'Pending', value: '12', icon: '⏳', color: 'from-orange-500 to-orange-600' },
          { label: 'Messages', value: '45', icon: '💬', color: 'from-green-500 to-green-600' },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'John Doe', role: 'Software Engineer', company: 'Google', connections: 234, icon: '💼', color: 'from-blue-500 to-blue-600' },
          { name: 'Jane Smith', role: 'Data Scientist', company: 'Microsoft', connections: 189, icon: '📊', color: 'from-purple-500 to-purple-600' },
          { name: 'Bob Johnson', role: 'Product Manager', company: 'Amazon', connections: 312, icon: '🎯', color: 'from-orange-500 to-orange-600' },
          { name: 'Alice Williams', role: 'UX Designer', company: 'Meta', connections: 156, icon: '🎨', color: 'from-pink-500 to-pink-600' },
          { name: 'Charlie Brown', role: 'DevOps Engineer', company: 'Netflix', connections: 201, icon: '⚙️', color: 'from-red-500 to-red-600' },
          { name: 'Diana Prince', role: 'ML Engineer', company: 'Tesla', connections: 278, icon: '🤖', color: 'from-green-500 to-green-600' },
        ].map((person, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${person.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center`}>
            <div className="text-4xl mb-3">{person.icon}</div>
            <h3 className="font-bold text-lg">{person.name}</h3>
            <p className="text-sm opacity-90">{person.role}</p>
            <p className="text-sm opacity-90">{person.company}</p>
            <p className="text-xs opacity-75 mt-2">{person.connections} connections</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-sm">
                Connect
              </button>
              <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-sm">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
