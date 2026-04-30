export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Companies
          </h1>
          <p className="text-muted-foreground mt-2">Manage recruiting companies</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
          🏢 Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Google', positions: 15, hired: 12, status: 'Active', icon: '🔵', color: 'from-blue-500 to-blue-600' },
          { name: 'Microsoft', positions: 12, hired: 10, status: 'Active', icon: '🟦', color: 'from-blue-600 to-blue-700' },
          { name: 'Amazon', positions: 18, hired: 14, status: 'Active', icon: '🟠', color: 'from-orange-500 to-orange-600' },
          { name: 'Meta', positions: 8, hired: 6, status: 'Scheduled', icon: '🔵', color: 'from-blue-500 to-blue-600' },
          { name: 'Netflix', positions: 5, hired: 4, status: 'Completed', icon: '🔴', color: 'from-red-500 to-red-600' },
          { name: 'Tesla', positions: 10, hired: 0, status: 'Scheduled', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
        ].map((company, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${company.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-3xl">{company.icon}</span>
                <h3 className="text-2xl font-bold mt-2">{company.name}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                company.status === 'Active' ? 'bg-green-200 text-green-700' :
                company.status === 'Scheduled' ? 'bg-blue-200 text-blue-700' :
                'bg-gray-200 text-gray-700'
              }`}>
                {company.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Positions</span>
                <span className="font-bold">{company.positions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Hired</span>
                <span className="font-bold">{company.hired}</span>
              </div>
            </div>

            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
