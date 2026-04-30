export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-muted-foreground mt-2">Communicate with students and colleagues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50">
          <h2 className="text-xl font-bold mb-4">Conversations</h2>
          <div className="space-y-2">
            {[
              { name: 'John Doe', message: 'Question about assignment...', time: '2m', unread: true },
              { name: 'Jane Smith', message: 'Thank you for the feedback', time: '1h', unread: false },
              { name: 'CS201 Group', message: 'Class cancelled tomorrow', time: '3h', unread: false },
              { name: 'Bob Johnson', message: 'Can we reschedule?', time: '5h', unread: false },
            ].map((chat, i) => (
              <div key={i} className={`p-3 rounded-xl cursor-pointer transition-all ${chat.unread ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-background'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium text-sm ${chat.unread ? 'text-primary' : ''}`}>{chat.name}</span>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-border/50 flex flex-col">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h3 className="font-bold">John Doe</h3>
              <p className="text-xs text-muted-foreground">CS2021001 • Online</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">
                JD
              </div>
              <div className="bg-muted p-3 rounded-xl max-w-xs">
                <p className="text-sm">Hi Professor, I have a question about Assignment 3...</p>
                <span className="text-xs text-muted-foreground">2:30 PM</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl max-w-xs">
                <p className="text-sm">Sure, what would you like to know?</p>
                <span className="text-xs opacity-80">2:32 PM</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-border/50">
            <input type="text" placeholder="Type a message..." className="flex-1 p-3 border rounded-xl bg-background" />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
