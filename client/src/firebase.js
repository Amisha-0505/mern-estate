// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ea802.firebaseapp.com",
  projectId: "mern-estate-ea802",
  storageBucket: "mern-estate-ea802.appspot.com",
  messagingSenderId: "30719244592",
  appId: "1:30719244592:web:c6fe55e452f9ae3d3470f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);