// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyCMcfINTYmB3dePEFL1oyyYbcwbdNd3TJo",

  authDomain: "purchase-forms-c2052.firebaseapp.com",

  projectId: "purchase-forms-c2052",

  storageBucket: "purchase-forms-c2052.appspot.com",

  messagingSenderId: "171116287567",

  appId: "1:171116287567:web:9f484fa95c8cd62a1efc3a",

  measurementId: "G-2XXFKHBW6M"

};

  
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };