// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlq-C0DvAQHIBcSGXW5VdYvj0iF_2-yhs",
  authDomain: "depx13-15317.firebaseapp.com",
  projectId: "depx13-15317",
  storageBucket: "depx13-15317.appspot.com",
  messagingSenderId: "901350628759",
  appId: "1:901350628759:web:7758f692ecde14052cf8d2",
  measurementId: "G-HTYY6R1LYG"
  };
  
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };