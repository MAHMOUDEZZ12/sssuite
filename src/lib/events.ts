
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from './firebase'; // Ensure db is imported

export async function track(event: string, props: Record<string, any> = {}) {
  try {
    const auth = getAuth();
    const uid = auth.currentUser?.uid || "anon";
    await addDoc(collection(db, "events"), {
      event, uid, props, ts: serverTimestamp(), v: 1
    });
  } catch {
    // optional fallback to dataLayer
    if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event, ...props, ts: Date.now() });
    }
  }
}
