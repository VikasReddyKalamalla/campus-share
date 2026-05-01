'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, role: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (role: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; phone?: string; bio?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string, role: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    // Save user data to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    setUserRole(role);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      // User not registered - delete the auth account and throw error
      await result.user.delete();
      throw new Error('Account not found. Please register first before signing in with Google.');
    }
    
    // User exists, set their role
    setUserRole(userDoc.data().role);
  };

  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
  };

  const updateUserRole = async (role: string) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        role,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setUserRole(role);
    }
  };

  const updateUserProfile = async (data: { displayName?: string; phone?: string; bio?: string }) => {
    if (!user) return;
    if (data.displayName) {
      await updateProfile(user, { displayName: data.displayName });
    }
    await setDoc(doc(db, 'users', user.uid), {
      ...(data.displayName && { name: data.displayName }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.bio !== undefined && { bio: data.bio }),
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    // Force re-render with updated user
    setUser({ ...user } as User);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) throw new Error('No authenticated user');
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const deleteAccount = async (currentPassword: string) => {
    if (!user || !user.email) throw new Error('No authenticated user');
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteUser(user);
    setUserRole(null);
  };

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserRole,
    updateUserProfile,
    changePassword,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
