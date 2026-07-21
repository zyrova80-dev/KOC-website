
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl3cj6e1WDHriH9J4Dlu9IROVHcHGFtEU",
  authDomain: "koc-website-1eb76.firebaseapp.com",
  projectId: "koc-website-1eb76",
  storageBucket: "koc-website-1eb76.firebasestorage.app",
  messagingSenderId: "539340842802",
  appId: "1:539340842802:web:b5a16e438f2dfbf419192b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);