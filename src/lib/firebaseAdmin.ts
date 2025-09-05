
// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  let credential;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
    } catch (e) {
      console.warn("Could not parse FIREBASE_SERVICE_ACCOUNT, falling back to default.", e);
      credential = applicationDefault();
    }
  } else {
    credential = applicationDefault();
  }

  initializeApp({ credential });
}

export const adminDb = getFirestore();
