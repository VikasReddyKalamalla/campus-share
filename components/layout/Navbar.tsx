'use client'

import { Bell, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'

interface NavbarProps {
  userName?: string
  userRole?: string
}

export function Navbar({ userName = 'John Doe', userRole = 'Student' }: NavbarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center">
            CH
          </div>
          <div>
            <h1 className="font-bold text-lg">Campus Hub</h1>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-muted transition-smooth relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-muted transition-smooth">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                {userName.charAt(0)}
              </div>
              <span className="text-sm font-medium hidden sm:block">{userName}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border/50 bg-card shadow-lg animate-fade-in">
                <div className="p-3 border-b border-border/30">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-smooth text-sm">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-smooth text-sm">
                    Preferences
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-muted transition-smooth text-sm">
                    Help & Support
                  </button>
                </div>
                <button onClick={handleLogout} className="w-full px-3 py-2 text-left rounded-b hover:bg-muted/50 transition-smooth text-sm border-t border-border/30 flex items-center gap-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
