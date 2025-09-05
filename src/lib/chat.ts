
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// This is a placeholder since we don't have firebase initialized.
const db = {};

export type ChatAction =
  | { type: "createProject"; name: string; city: string; developer?: string }
  | { type: "addBrand"; name: string; primary: string; accent: string }
  | { type: "scanProjects"; city: string; developers: string[]; limit?: number }
  | { type: "savePaymentMethodStart" } // handled client->stripe then server
  | { type: "logMetric"; name: string; props?: Record<string, any> };

export type ChatEvent = {
  uid: string;
  eventId: string;           // uuid v4 (client-generated for idempotency)
  role: "user" | "assistant";
  text: string;
  action?: ChatAction | null;
  meta?: Record<string, any>;
  createdAt?: any;           // serverTimestamp
};

export async function ingestChat(e: Omit<ChatEvent, "createdAt">) {
  // Mock function since we don't have a real DB connection
  console.log("Ingesting chat event:", {
    ...e,
    createdAt: new Date().toISOString(),
    status: "queued",
  });
  return Promise.resolve();

  /*
  // Real implementation:
  await addDoc(collection(db, "chat_events"), {
    ...e,
    createdAt: serverTimestamp(),
    status: "queued",        // will be flipped by the processor
  });
  */
}
