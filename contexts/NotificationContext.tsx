'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import { useAuth } from './AuthContext'
import {
  subscribeToNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createNotification,
  type Notification,
} from '@/lib/notifications'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  markRead: (id: string) => Promise<void>
  markAllRead: () => Promise<void>
  /** Utility to seed a test notification (dev/demo use) */
  sendTestNotification: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: true,
  markRead: async () => {},
  markAllRead: async () => {},
  sendTestNotification: async () => {},
})

export const useNotifications = () => useContext(NotificationContext)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Clean up previous listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
      unsubscribeRef.current = null
    }

    if (!user) {
      setNotifications([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsub = subscribeToNotifications(user.uid, (data) => {
      setNotifications(data)
      setLoading(false)
    })

    unsubscribeRef.current = unsub
    return () => {
      unsub()
      unsubscribeRef.current = null
    }
  }, [user])

  const markRead = useCallback(async (id: string) => {
    await markNotificationRead(id)
  }, [])

  const markAllRead = useCallback(async () => {
    if (!user) return
    await markAllNotificationsRead(user.uid)
  }, [user])

  const sendTestNotification = useCallback(async () => {
    if (!user) return
    const types: Notification['type'][] = ['info', 'success', 'placement', 'academic', 'warning']
    const samples = [
      { title: 'New placement drive', body: 'Google is visiting campus on May 10th. Register now.', type: 'placement' as const },
      { title: 'Assignment due soon', body: 'Data Structures assignment is due in 24 hours.', type: 'academic' as const },
      { title: 'Application shortlisted', body: 'You have been shortlisted for the Infosys drive.', type: 'success' as const },
      { title: 'New announcement', body: 'Semester exam schedule has been published.', type: 'info' as const },
      { title: 'Attendance warning', body: 'Your attendance in OS is below 75%.', type: 'warning' as const },
    ]
    const sample = samples[Math.floor(Math.random() * samples.length)]
    await createNotification({ ...sample, userId: user.uid, read: false })
  }, [user])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, loading, markRead, markAllRead, sendTestNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
