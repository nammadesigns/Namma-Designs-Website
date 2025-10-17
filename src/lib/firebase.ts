// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);