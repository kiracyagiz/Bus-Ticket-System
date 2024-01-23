// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1g9gQ2aJdW6UfaKdZNcQM9ejUQQNRQMo",
  authDomain: "bussystem-7fda8.firebaseapp.com",
  projectId: "bussystem-7fda8",
  storageBucket: "bussystem-7fda8.appspot.com",
  messagingSenderId: "678847650626",
  appId: "1:678847650626:web:cf4d4a4b8f81322fe946db",
  measurementId: "G-M897B9GJ3E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();