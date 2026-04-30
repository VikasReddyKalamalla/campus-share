export default function FeedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Feed
        </h1>
        <p className="text-muted-foreground mt-2">Stay updated with campus activities</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { author: 'Placement Cell', time: '2 hours ago', content: 'Google is visiting campus next week for recruitment. Register now!', likes: 45, comments: 12, icon: '📢', color: 'from-blue-500 to-blue-600' },
          { author: 'Tech Club', time: '5 hours ago', content: 'Workshop on Machine Learning this Saturday. Limited seats available.', likes: 32, comments: 8, icon: '🎓', color: 'from-purple-500 to-purple-600' },
          { author: 'Student Council', time: '1 day ago', content: 'Annual fest registrations are now open. Don\'t miss out!', likes: 78, comments: 23, icon: '🎉', color: 'from-pink-500 to-pink-600' },
          { author: 'Sports Club', time: '2 days ago', content: 'Inter-college cricket tournament next month. Teams registration open!', likes: 56, comments: 15, icon: '🏏', color: 'from-green-500 to-green-600' },
        ].map((post, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-gradient-to-r ${post.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{post.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{post.author}</h3>
                <p className="text-sm opacity-90">{post.time}</p>
              </div>
            </div>
            
            <p className="mb-4 text-base leading-relaxed">{post.content}</p>
            
            <div className="flex items-center gap-6 pt-4 border-t border-white/20">
              <button className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-all">
                ❤️ {post.likes}
              </button>
              <button className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-all">
                💬 {post.comments}
              </button>
              <button className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-all">
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
