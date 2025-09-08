
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

if (getApps().length === 0) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountString && serviceAccountString.trim().startsWith('{')) {
      console.log('Initializing Firebase Admin with explicit service account credentials.');
      const serviceAccount = JSON.parse(serviceAccountString);
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      console.log('Service account environment variable not found or invalid. Using application default credentials. This is expected in a managed cloud environment.');
      app = initializeApp({
        credential: applicationDefault(),
      });
    }
  } catch (error) {
    console.error('CRITICAL: Firebase Admin SDK initialization failed with service account. Falling back to default.', error);
    // Fallback to application default credentials if parsing or initial initialization fails
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
