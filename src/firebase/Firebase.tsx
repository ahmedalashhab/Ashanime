// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW3Ze39DmD0-PmeKpZ2A8ybqqf5RB78UE",
  authDomain: "ashanime-8a8cb.firebaseapp.com",
  databaseURL: "https://ashanime-8a8cb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ashanime-8a8cb",
  storageBucket: "ashanime-8a8cb.appspot.com",
  messagingSenderId: "491225560921",
  appId: "1:491225560921:web:2fb93c896d8c2506813e48",
  measurementId: "G-PYK5J7STRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);