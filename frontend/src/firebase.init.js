// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4xQgSeCa-_QCfBw1rmyIohJK_jleo0f4",
  authDomain: "create-a-website-like-tw-f749c.firebaseapp.com",
  projectId: "create-a-website-like-tw-f749c",
  storageBucket: "create-a-website-like-tw-f749c.appspot.com",
  messagingSenderId: "312468711060",
  appId: "1:312468711060:web:ee3dd1b26093df4053f681",
  measurementId: "G-DGLCGEFWQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
export default auth;