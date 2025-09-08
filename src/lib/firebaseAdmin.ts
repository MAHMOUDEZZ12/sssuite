
// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  let credential;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  try {
    if (serviceAccountJson && serviceAccountJson.trim().startsWith('{')) {
      const serviceAccount = JSON.parse(serviceAccountJson);
      credential = cert(serviceAccount);
      console.log("Initializing Firebase Admin with explicit service account.");
    } else {
      throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable not found or invalid. Falling back to default credentials.");
    }
  } catch (error) {
    console.warn(
      `Warning: Could not initialize Firebase Admin with service account. ${(error as Error).message}. This is expected for managed environments.`
    );
    credential = applicationDefault();
  }

  initializeApp({ credential });
}

export const adminDb = getFirestore();
