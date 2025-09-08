
import type { Market } from "@/types";

export function ok<T>(data: T, init: number = 200) {
  return Response.json({ ok: true, data }, { status: init });
}
export function bad(message = "Bad Request", init: number = 400) {
  return Response.json({ ok: false, error: message }, { status: init });
}
export function fail(e: any, code = 500) {
  console.error(e);
  return Response.json({ ok: false, error: String(e?.message || e) }, { status: code });
}
