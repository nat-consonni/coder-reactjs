// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAmALZwvfoeVAs0eedhM3EMxyYBeO38toU",
  authDomain: "divino-ecommerce.firebaseapp.com",
  projectId: "divino-ecommerce",
  storageBucket: "divino-ecommerce.firebasestorage.app",
  messagingSenderId: "571926151268",
  appId: "1:571926151268:web:86afb188a02328f39e1f71",
  measurementId: "G-4XWESXJ43L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);