// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR5rJrthAp-q0ZX9H8zzlkkwCDrhJbKrA",
  authDomain: "monch-63774.firebaseapp.com",
  projectId: "monch-63774",
  storageBucket: "monch-63774.appspot.com",
  messagingSenderId: "1012992268586",
  appId: "1:1012992268586:web:2931c528eddd9352182653"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();