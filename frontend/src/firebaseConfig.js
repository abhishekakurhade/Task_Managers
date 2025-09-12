import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBCak2wns-Hth_2hstK64KevXXyFO9673Y",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "taskmanager-fc8fb.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "taskmanager-fc8fb",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "taskmanager-fc8fb.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1028730073115",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1028730073115:web:a9b1b4ea4b4fec702b08be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
