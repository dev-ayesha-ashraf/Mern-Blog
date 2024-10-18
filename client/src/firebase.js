// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Log to check if the variable is defined
console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8ca45.firebaseapp.com",
  projectId: "mern-blog-8ca45",
  storageBucket: "mern-blog-8ca45.appspot.com",
  messagingSenderId: "574207427587",
  appId: "1:574207427587:web:5f118274be017bedefba36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log('Firebase App Initialized:', app);
