
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
    // This will succeed in local development if the service account is set
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
     console.log('Initializing Firebase Admin with explicit service account credentials.');
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (e: any) {
    // This will happen in the cloud environment where the variable is not set
    console.warn(
        `Could not initialize with explicit credentials. Falling back to application default credentials. This is expected in a managed cloud environment.`
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
