export default function AnnouncementsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Announcements
          </h1>
          <p className="text-muted-foreground mt-2">Create and manage campus-wide announcements</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          📢 New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Campus Placement Drive - Google', date: 'May 15, 2026', audience: 'All Students', priority: 'High', icon: '🔴' },
          { title: 'Mid-term Exam Schedule Released', date: 'May 10, 2026', audience: 'All Students', priority: 'Medium', icon: '🟠' },
          { title: 'Faculty Meeting - Curriculum Update', date: 'May 8, 2026', audience: 'Faculty', priority: 'Low', icon: '🟡' },
          { title: 'Library Extended Hours', date: 'May 5, 2026', audience: 'All', priority: 'Low', icon: '🟡' },
        ].map((announcement, i) => (
          <div key={i} className={`p-6 rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 ${
            announcement.priority === 'High' ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-red-500' :
            announcement.priority === 'Medium' ? 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-orange-500' :
            'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-blue-500'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{announcement.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>📅 {announcement.date}</span>
                    <span>👥 {announcement.audience}</span>
                  </div>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                announcement.priority === 'High' ? 'bg-red-200 text-red-700' :
                announcement.priority === 'Medium' ? 'bg-orange-200 text-orange-700' :
                'bg-blue-200 text-blue-700'
              }`}>
                {announcement.priority} Priority
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-all">
                Edit
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
