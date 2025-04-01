// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMKRDQxxGNSO-tuWUUFRYu6ERGdXXHzEo",
  authDomain: "nguyen-trong-quy-2de60.firebaseapp.com",
  projectId: "nguyen-trong-quy-2de60",
  storageBucket: "nguyen-trong-quy-2de60.firebasestorage.app",
  messagingSenderId: "595766721079",
  appId: "1:595766721079:web:6e5c538fa77ca59866ddb2",
  measurementId: "G-45CPGHY7V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);