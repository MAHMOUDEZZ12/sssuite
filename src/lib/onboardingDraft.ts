
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function loadDraft() {
  const uid = getAuth().currentUser?.uid; if (!uid) return null;
  const ref = doc(db as any, "users", uid, "private", "onboardingDraft");
  const s = await getDoc(ref); return s.exists() ? s.data() : null;
}
export async function saveDraft(patch: any) {
  const uid = getAuth().currentUser?.uid; if (!uid) return;
  const ref = doc(db as any, "users", uid, "private", "onboardingDraft");
  await setDoc(ref, patch, { merge: true });
}
