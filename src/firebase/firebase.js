// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBS6a6HgF3PlnKqs2Ay2MnGAPMCABQHGGw",
  authDomain: "blogwebsite-f55aa.firebaseapp.com",
  databaseURL: "https://blogwebsite-f55aa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blogwebsite-f55aa",
  storageBucket: "blogwebsite-f55aa.firebasestorage.app",
  messagingSenderId: "116297432486",
  appId: "1:116297432486:web:662e50bdcc4e219bac6367",
  measurementId: "G-C9VEJ58FET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export { db, storage };