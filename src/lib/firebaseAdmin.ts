
'use server';

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
    if (serviceAccountJson && serviceAccountJson.trim() !== '') {
      const serviceAccount = JSON.parse(serviceAccountJson);
      console.log('Initializing Firebase Admin with explicit service account credentials.');
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      // This will cause the catch block to run
      throw new Error('FIREBASE_SERVICE_ACCOUNT is not a valid JSON string or is empty.');
    }
  } catch (e: any) {
    console.warn(
        `Could not initialize with explicit credentials (Error: ${e.message}). Falling back to application default credentials. This is expected in a managed environment.`
    );
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
