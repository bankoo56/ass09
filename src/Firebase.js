// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxfnA588V5dEHzXosj0TF6DJYMY2xHaLo",
  authDomain: "ass09-9f039.firebaseapp.com",
  projectId: "ass09-9f039",
  storageBucket: "ass09-9f039.appspot.com",
  messagingSenderId: "883286982363",
  appId: "1:883286982363:web:b335a8d2bbef22820756fe",
  measurementId: "G-RTNR588LR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default {app, analytics,auth};





