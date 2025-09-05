
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import { readMarketFromCookies } from "@/lib/api-helpers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 20);
    const devs = (searchParams.get("devs") || "").split(",").filter(Boolean);

    const { country, city } = readMarketFromCookies();

    let q = adminDb.collection("projects_catalog")
      .where("country", "==", country);

    const snap = await q.get();
    let all = snap.docs.map(d => ({ id: d.id, ...d.data() as any }))
      .filter(p => p.city === city);

    if (devs.length) all = all.filter((p: any) => devs.includes(p.developer));

    return ok(all.slice(0, limit));
  } catch (e) {
    return fail(e);
  }
}
