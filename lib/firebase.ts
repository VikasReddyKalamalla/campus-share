import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            'AIzaSyA_lTpagbLi9xaNHbFzBe4rbLt_Xpj1nXA',
  authDomain:        'campushub-ea6a7.firebaseapp.com',
  projectId:         'campushub-ea6a7',
  storageBucket:     'campushub-ea6a7.firebasestorage.app',
  messagingSenderId: '580007761573',
  appId:             '1:580007761573:web:60d78bc0258a0ff6ef5f4c',
  measurementId:     'G-T6CRZE1RY1',
}

// Singleton — reuse across hot reloads in dev
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth: Auth        = getAuth(app)
const db: Firestore     = getFirestore(app)

// Enable Firestore long-polling only in environments where WebChannel is unreliable
// (improves connection speed on some networks)
if (typeof window !== 'undefined') {
  // Lazy-load analytics only in production to avoid slowing down dev
  if (process.env.NODE_ENV === 'production') {
    import('firebase/analytics').then(({ getAnalytics }) => {
      try { getAnalytics(app) } catch (_) {}
    })
  }
}

export { app, auth, db }
