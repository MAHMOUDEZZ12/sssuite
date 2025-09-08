// Server-side Firestore (Admin SDK). Safe for API routes & jobs.
import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (!getApps().length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  let credential;

  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      credential = cert(serviceAccount);
      console.log(
        'Initializing Firebase Admin with explicit service account credentials.'
      );
    } catch (e: any) {
      console.warn(
        `Could not parse or use FIREBASE_SERVICE_ACCOUNT. Falling back to default credentials. Error: ${e.message}`
      );
      credential = applicationDefault();
    }
  } else {
    console.log(
      'Initializing Firebase Admin with default credentials. This is expected for managed environments.'
    );
    credential = applicationDefault();
  }

  app = initializeApp({ credential });
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
