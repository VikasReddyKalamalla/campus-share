import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  updateDoc,
  writeBatch,
  doc,
  Timestamp,
  getDocs,
} from 'firebase/firestore'
import { db } from './firebase'

export interface Notification {
  id: string
  userId: string
  title: string
  body: string
  type: 'info' | 'success' | 'warning' | 'placement' | 'academic' | 'system'
  read: boolean
  createdAt: Timestamp
  link?: string
}

/** Subscribe to the latest 20 notifications for a user in real time. */
export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(20)
  )

  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Notification, 'id'>),
    }))
    callback(notifications)
  })
}

/** Mark a single notification as read. */
export async function markNotificationRead(notificationId: string) {
  await updateDoc(doc(db, 'notifications', notificationId), { read: true })
}

/** Mark all unread notifications for a user as read. */
export async function markAllNotificationsRead(userId: string) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return

  const batch = writeBatch(db)
  snapshot.docs.forEach((d) => batch.update(d.ref, { read: true }))
  await batch.commit()
}

/** Create a notification (used server-side or for testing). */
export async function createNotification(
  data: Omit<Notification, 'id' | 'createdAt'>
) {
  await addDoc(collection(db, 'notifications'), {
    ...data,
    createdAt: Timestamp.now(),
  })
}
