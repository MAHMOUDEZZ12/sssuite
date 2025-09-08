
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
    // This is the robust way to handle service account credentials.
    // It will only attempt to parse if the variable exists and is a valid JSON string.
    // If it fails at any point, it will fall back to applicationDefault().
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountString) {
      console.log('Service account environment variable found. Attempting to initialize with explicit credentials.');
      const serviceAccount = JSON.parse(serviceAccountString);
       app = initializeApp({
        credential: cert(serviceAccount),
      });
       console.log('Firebase Admin SDK initialized successfully with service account credentials.');
    } else {
        throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable not set.");
    }
  } catch (error: any) {
    console.warn(`Firebase Admin SDK initialization with service account failed: ${error.message}. Falling back to application default credentials. This is expected in a managed cloud environment.`);
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

const adminDb = getFirestore(app);

export { adminDb };
