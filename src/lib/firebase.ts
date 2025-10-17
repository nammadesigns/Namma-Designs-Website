// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApLszW7n9KcTBthOljztn2R7pRlY6YYv0",
  authDomain: "namma-designs-b018e.firebaseapp.com",
  projectId: "namma-designs-b018e",
  storageBucket: "namma-designs-b018e.firebasestorage.app",
  messagingSenderId: "260146839975",
  appId: "1:260146839975:web:2ccec868cc1b27b466b682",
  measurementId: "G-9WTP4G19FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);