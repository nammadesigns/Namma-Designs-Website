import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBlSa5dhWAVKLElXz-a3hWWHHRDw2LSroA",
  authDomain: "namma-designs-c8d92.firebaseapp.com",
  projectId: "namma-designs-c8d92",
  storageBucket: "namma-designs-c8d92.firebasestorage.app",
  messagingSenderId: "259140547187",
  appId: "1:259140547187:web:3901051c0a662c0917f006",
  measurementId: "G-4XGSSQ3YFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;