
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "leadbylead-b79ea.firebaseapp.com",
  projectId: "leadbylead-b79ea",
  storageBucket: "leadbylead-b79ea.appspot.com",
  messagingSenderId: "103594965666387491434",
  appId: "1:103594965666387491434:web:e0586e30129c54e1f744e8"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
