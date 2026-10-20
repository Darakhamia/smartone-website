import "server-only";

/* A small in-memory limiter: at most `limit` hits per `windowMs` for a key.
   Enough for a single-process site – it resets on restart, which only ever
   errs towards letting someone through. */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  const limited = recent.length >= limit;
  if (!limited) recent.push(now);
  hits.set(key, recent);
  // keep the map from growing without bound on a long-running server
  if (hits.size > 10_000) {
    for (const [k, ts] of hits) if (!ts.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return limited;
}

/* The visitor's address as the reverse proxy in front of the site reports
   it. Used only to key the limiter, never stored. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
