
// import firebase from "firebase/compat/app";
// // authontication
// import { getAuth } from 'firebase/auth'

// // use store
// import "firebase/compat/firestore"
// // Your web app's Firebase configuration
// import "firebase/compat/auth"
// const firebaseConfig = {
//   apiKey: "AIzaSyBA1pHUYEPfcHXXPAQI4uikFz9UQAS9EJo",
//   authDomain: "clo-c1846.firebaseapp.com",
//   projectId: "clo-c1846",
//   storageBucket: "clo-c1846.appspot.com",
//   messagingSenderId: "235799146999",
//   appId: "1:235799146999:web:cb961d7037da6e7dce7ef2"
// };

// // Initialize Firebase
// const app =firebase.initializeApp(firebaseConfig);
// export const auth= getAuth(app)
// export const db=app.firestore()

// newly

// Import necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA1pHUYEPfcHXXPAQI4uikFz9UQAS9EJo",
  authDomain: "clo-c1846.firebaseapp.com",
  projectId: "clo-c1846",
  storageBucket: "clo-c1846.appspot.com",
  messagingSenderId: "235799146999",
  appId: "1:235799146999:web:cb961d7037da6e7dce7ef2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
