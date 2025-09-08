
// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  let credential;
  // Check if the service account environment variable exists and is valid JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      // Attempt to parse the service account JSON
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      credential = cert(serviceAccount);
    } catch (e) {
      console.warn("Could not parse FIREBASE_SERVICE_ACCOUNT, falling back to default.", e);
      credential = applicationDefault();
    }
  } else {
    // Fallback for environments where the variable isn't set (like local dev without the env var)
    console.warn("FIREBASE_SERVICE_ACCOUNT not found, falling back to default credentials.");
    credential = applicationDefault();
  }

  initializeApp({ credential });
}

export const adminDb = getFirestore();
