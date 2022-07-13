// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import * as firebase from "firebase";
// import "firebase/auth";

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
// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);

export default app;
