// Firebase SDK'laridan kerakli funksiyalarni import qilamiz
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"


// .env.local faylidan o'qiladigan Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Next.js'da bir necha marta ishga tushishining oldini olish uchun
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore ma'lumotlar bazasini ishga tushiramiz
const db = getFirestore(app);

// Boshqa fayllarda ishlatish uchun `db` obyektini eksport qilamiz
export { app, db };
export const auth = getAuth(app)   // ✅ qo‘shildi
