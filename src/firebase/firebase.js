// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };