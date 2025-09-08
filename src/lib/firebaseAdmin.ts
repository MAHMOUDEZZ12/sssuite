
// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

if (!apps.length) {
  let credential;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      credential = cert(serviceAccount);
      console.log("Initializing Firebase Admin with explicit service account.");
    } catch (error) {
      console.warn(`Warning: Could not parse FIREBASE_SERVICE_ACCOUNT. Falling back to default credentials. Error: ${(error as Error).message}`);
      credential = applicationDefault();
    }
  } else {
    console.log("Initializing Firebase Admin with default credentials. This is expected for managed environments.");
    credential = applicationDefault();
  }

  initializeApp({ credential });
}

export const adminDb = getFirestore();
