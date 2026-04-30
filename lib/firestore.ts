import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// User operations
export const createUser = async (userId: string, userData: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...userData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null;
};

export const updateUser = async (userId: string, userData: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: Timestamp.now()
  });
};

// Job operations
export const createJob = async (jobData: any) => {
  const jobsRef = collection(db, 'jobs');
  const docRef = await addDoc(jobsRef, {
    ...jobData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getJobs = async (filters?: any) => {
  const jobsRef = collection(db, 'jobs');
  let q = query(jobsRef, orderBy('createdAt', 'desc'));
  
  if (filters?.limit) {
    q = query(q, limit(filters.limit));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getJob = async (jobId: string) => {
  const jobRef = doc(db, 'jobs', jobId);
  const jobSnap = await getDoc(jobRef);
  return jobSnap.exists() ? { id: jobSnap.id, ...jobSnap.data() } : null;
};

// Application operations
export const createApplication = async (applicationData: any) => {
  const applicationsRef = collection(db, 'applications');
  const docRef = await addDoc(applicationsRef, {
    ...applicationData,
    status: 'pending',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getUserApplications = async (userId: string) => {
  const applicationsRef = collection(db, 'applications');
  const q = query(applicationsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Resume operations
export const saveResume = async (userId: string, resumeData: any) => {
  const resumeRef = doc(db, 'resumes', userId);
  await updateDoc(resumeRef, {
    ...resumeData,
    updatedAt: Timestamp.now()
  });
};

export const getResume = async (userId: string) => {
  const resumeRef = doc(db, 'resumes', userId);
  const resumeSnap = await getDoc(resumeRef);
  return resumeSnap.exists() ? { id: resumeSnap.id, ...resumeSnap.data() } : null;
};

// Resource operations
export const getResources = async (filters?: any) => {
  const resourcesRef = collection(db, 'resources');
  let q = query(resourcesRef, orderBy('createdAt', 'desc'));
  
  if (filters?.category) {
    q = query(q, where('category', '==', filters.category));
  }
  
  if (filters?.limit) {
    q = query(q, limit(filters.limit));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createResource = async (resourceData: any) => {
  const resourcesRef = collection(db, 'resources');
  const docRef = await addDoc(resourcesRef, {
    ...resourceData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};
