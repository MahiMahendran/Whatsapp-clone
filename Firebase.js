// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYsYAOZ-zGvuGqvmeFQniioc2p1clrMBk",
  authDomain: "whats-app---clone-23823.firebaseapp.com",
  projectId: "whats-app---clone-23823",
  storageBucket: "whats-app---clone-23823.appspot.com",
  messagingSenderId: "1088489190728",
  appId: "1:1088489190728:web:ef7c30ad00969731d52f7d"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,provider} ;