
// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();
if (!apps.length) {
  let credential;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  try {
    // Attempt to use the service account JSON if it exists and is valid.
    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson);
      credential = cert(serviceAccount);
      console.log("Initializing Firebase Admin with service account.");
    } else {
      throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable not found.");
    }
  } catch (error) {
    // If the service account is missing or invalid, fall back to default credentials.
    // This is the expected behavior for many managed environments.
    console.warn(
      `Warning: Could not initialize Firebase Admin with service account. Error: ${(error as Error).message}. Falling back to default credentials. This is normal for local development or if the environment variable is not set.`
    );
    credential = applicationDefault();
  }

  initializeApp({ credential });
}

export const adminDb = getFirestore();
