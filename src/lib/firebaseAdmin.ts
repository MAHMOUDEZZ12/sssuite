
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
  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    console.log('Initializing Firebase Admin with explicit service account credentials.');
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (e: any) {
    console.warn(
      `Could not initialize with explicit credentials, falling back to default. Error: ${e.message}`
    );
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
