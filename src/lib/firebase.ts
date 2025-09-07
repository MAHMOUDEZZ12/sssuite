
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required environment variables are set
const isFirebaseConfigValid = firebaseConfig.apiKey &&
                              firebaseConfig.authDomain &&
                              firebaseConfig.projectId &&
                              firebaseConfig.storageBucket &&
                              firebaseConfig.messagingSenderId &&
                              firebaseConfig.appId;

// Initialize Firebase only if the config is valid
const app = isFirebaseConfigValid && !getApps().length ? initializeApp(firebaseConfig) : (getApps().length ? getApp() : null);

// Export the instances only if the app was initialized
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

if (!app) {
    console.error("Firebase initialization failed: Missing environment variables. Please check your .env file.");
}
