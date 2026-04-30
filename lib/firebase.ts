// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_lTpagbLi9xaNHbFzBe4rbLt_Xpj1nXA",
  authDomain: "campushub-ea6a7.firebaseapp.com",
  projectId: "campushub-ea6a7",
  storageBucket: "campushub-ea6a7.firebasestorage.app",
  messagingSenderId: "580007761573",
  appId: "1:580007761573:web:60d78bc0258a0ff6ef5f4c",
  measurementId: "G-T6CRZE1RY1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
