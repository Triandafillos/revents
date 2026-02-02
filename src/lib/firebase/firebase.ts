// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-tester.firebaseapp.com",
  projectId: "revents-tester",
  storageBucket: "revents-tester.firebasestorage.app",
  messagingSenderId: "265355503693",
  appId: "1:265355503693:web:8fc499959c32ab5c745404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);