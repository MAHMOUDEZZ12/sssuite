
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;
let adminDb: ReturnType<typeof getFirestore>;

if (getApps().length === 0) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    // Ensure the variable is a non-empty string and looks like a JSON object.
    if (serviceAccountString && serviceAccountString.startsWith('{')) {
      const serviceAccount = JSON.parse(serviceAccountString);
      app = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully with service account credentials.');
    } else {
      // Throw an error to be caught by the catch block, ensuring fallback.
      throw new Error("FIREBASE_SERVICE_ACCOUNT env variable is missing, empty, or not a valid JSON object.");
    }
  } catch (error: any) {
    console.warn(`CRITICAL: Firebase Admin SDK initialization failed with service account. Falling back to default. ${error.message}`);
    // Fallback to application default credentials, which works in managed environments like Cloud Run.
    app = initializeApp({
      credential: applicationDefault(),
    });
  }
} else {
  app = getApps()[0];
}

adminDb = getFirestore(app);

export { adminDb };
