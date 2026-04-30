export default function CollaboratePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Collaborate
          </h1>
          <p className="text-muted-foreground mt-2">Connect with peers and study groups</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          ➕ Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Groups', value: '12', icon: '👥', color: 'from-blue-500 to-blue-600' },
          { label: 'Members', value: '234', icon: '👨‍👩‍👧‍👦', color: 'from-purple-500 to-purple-600' },
          { label: 'Projects', value: '8', icon: '📁', color: 'from-green-500 to-green-600' },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Study Group A', members: 12, topic: 'Data Structures', icon: '📚', color: 'from-blue-500 to-blue-600' },
          { name: 'Project Team B', members: 5, topic: 'Web Development', icon: '💻', color: 'from-purple-500 to-purple-600' },
          { name: 'Exam Prep C', members: 20, topic: 'Algorithms', icon: '🎯', color: 'from-green-500 to-green-600' },
          { name: 'Research Group D', members: 8, topic: 'AI/ML', icon: '🤖', color: 'from-orange-500 to-orange-600' },
          { name: 'Coding Club E', members: 15, topic: 'Competitive Programming', icon: '⚡', color: 'from-pink-500 to-pink-600' },
          { name: 'Design Team F', members: 6, topic: 'UI/UX Design', icon: '🎨', color: 'from-red-500 to-red-600' },
        ].map((group, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${group.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl">{group.icon}</span>
                <h3 className="text-xl font-bold mt-2">{group.name}</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-3">{group.topic}</p>
            <p className="text-sm opacity-90 mb-4">👥 {group.members} members</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all">
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
