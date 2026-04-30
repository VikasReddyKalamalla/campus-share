export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage system configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Notifications', desc: 'Configure email and push notifications', icon: '🔔', color: 'from-blue-500 to-blue-600' },
          { title: 'Security', desc: 'Manage authentication and access', icon: '🔒', color: 'from-green-500 to-green-600' },
          { title: 'Database', desc: 'Backup and maintenance settings', icon: '💾', color: 'from-purple-500 to-purple-600' },
          { title: 'Appearance', desc: 'Customize theme and layout', icon: '🎨', color: 'from-pink-500 to-pink-600' },
          { title: 'Privacy', desc: 'Control data sharing and privacy', icon: '👁️', color: 'from-orange-500 to-orange-600' },
          { title: 'API Keys', desc: 'Manage API credentials', icon: '🔑', color: 'from-red-500 to-red-600' },
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            <p className="text-sm opacity-90">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* General Settings */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
        <h2 className="text-2xl font-bold mb-6">General Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Site Name</label>
            <input type="text" defaultValue="Campus Hub" className="w-full p-3 border rounded-xl bg-background" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Admin Email</label>
            <input type="email" defaultValue="admin@campushub.com" className="w-full p-3 border rounded-xl bg-background" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Timezone</label>
            <select className="w-full p-3 border rounded-xl bg-background">
              <option>UTC+5:30 (IST)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC-5 (EST)</option>
            </select>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
