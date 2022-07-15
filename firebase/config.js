import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDZI5wn6qv3m1yE8DowcaHwGHrAQ08QKU",
  authDomain: "rn-cocial-posts.firebaseapp.com",
  projectId: "rn-cocial-posts",
  storageBucket: "rn-cocial-posts.appspot.com",
  messagingSenderId: "800525774113",
  appId: "1:800525774113:web:0f84367ed99471ada7e260",
  measurementId: "G-K97W5JD244",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

// const analytics = getAnalytics(app);
