// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI360drCB44hg6WVrtxmARRttBbVzQKCk",
  authDomain: "cue-app-b37b3.firebaseapp.com",
  projectId: "cue-app-b37b3",
  storageBucket: "cue-app-b37b3.firebasestorage.app",
  messagingSenderId: "398719887618",
  appId: "1:398719887618:web:b7b39f5324e89604277a1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
