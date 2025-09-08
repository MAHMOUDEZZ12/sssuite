
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
let adminDb: ReturnType<typeof getFirestore>;

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
            // This case handles when the variable is missing, empty, or only whitespace.
            throw new Error('FIREBASE_SERVICE_ACCOUNT is not a valid JSON string.');
        }
    } catch (e: any) {
        console.warn(
            `Could not initialize with explicit credentials (Error: ${e.message}). Falling back to application default credentials.`
        );
        app = initializeApp({
            credential: applicationDefault(),
        });
    }
} else {
  app = getApps()[0];
}

adminDb = getFirestore(app);

export { adminDb };
