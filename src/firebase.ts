// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
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
export const db = getFirestore(app);