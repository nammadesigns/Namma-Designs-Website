import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Work interface
export interface Work {
  id: string;
  image: string;
  title: string;
  createdAt?: any;
}

// Feedback interface
export interface Feedback {
  id: string;
  customer_name: string;
  feedback_text: string;
  rating: number;
  date: string;
  isPinned?: boolean;
  createdAt?: any;
}

// Works functions
export const addWork = async (title: string, imageFile: File): Promise<void> => {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `works/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Add work to Firestore
    await addDoc(collection(db, 'works'), {
      title,
      image: imageUrl,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding work:', error);
    throw error;
  }
};

export const getWorks = async (): Promise<Work[]> => {
  try {
    const q = query(collection(db, 'works'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Work));
  } catch (error) {
    console.error('Error getting works:', error);
    return [];
  }
};

export const deleteWork = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'works', id));
  } catch (error) {
    console.error('Error deleting work:', error);
    throw error;
  }
};

// Feedback functions
export const addFeedback = async (feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'feedbacks'), {
      ...feedback,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Feedback));
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    return [];
  }
};

export const deleteFeedback = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'feedbacks', id));
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

export const updateFeedback = async (id: string, updates: Partial<Feedback>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'feedbacks', id), updates);
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};