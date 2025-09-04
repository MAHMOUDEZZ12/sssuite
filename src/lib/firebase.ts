
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiA6-YXtXlD4sy0soqPG6QdTcZTz36Aoc",
  authDomain: "leadbylead-b79ea.firebaseapp.com",
  projectId: "leadbylead-b79ea",
  storageBucket: "leadbylead-b79ea.appspot.com",
  messagingSenderId: "1035949656663",
  appId: "1:1035949656663:web:9614a7e7297e28b105d15a",
  measurementId: "G-K72V5223GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
