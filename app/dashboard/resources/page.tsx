export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            Resources
          </h1>
          <p className="text-muted-foreground mt-2">Learning materials and documents</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          ⬆️ Upload Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Data Structures Notes', type: 'PDF', size: '2.4 MB', icon: '📄', color: 'from-red-500 to-red-600', downloads: 234 },
          { name: 'Algorithm Slides', type: 'PPT', size: '1.8 MB', icon: '🎬', color: 'from-orange-500 to-orange-600', downloads: 189 },
          { name: 'Database Tutorial', type: 'PDF', size: '3.2 MB', icon: '📄', color: 'from-red-500 to-red-600', downloads: 156 },
          { name: 'Web Dev Guide', type: 'PDF', size: '1.5 MB', icon: '📄', color: 'from-red-500 to-red-600', downloads: 201 },
          { name: 'Python Basics', type: 'Video', size: '450 MB', icon: '🎥', color: 'from-purple-500 to-purple-600', downloads: 312 },
          { name: 'Interview Prep', type: 'PDF', size: '2.1 MB', icon: '📄', color: 'from-red-500 to-red-600', downloads: 278 },
        ].map((resource, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${resource.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{resource.icon}</span>
                <div>
                  <h3 className="font-bold">{resource.name}</h3>
                  <p className="text-sm opacity-90">{resource.type} • {resource.size}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <span className="text-sm opacity-90">📥 {resource.downloads} downloads</span>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-sm">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
