
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "leadbylead-b79ea.firebaseapp.com",
  projectId: "leadbylead-b79ea",
  storageBucket: "leadbylead-b79ea.appspot.com",
  messagingSenderId: "1035949656663",
  appId: "1:1035949656663:web:91c2718e2254f15d2a71cd"
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
