import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

/* The /leads inbox is behind one shared password, LEADS_PASSWORD, set as a
   runtime environment variable in Coolify (it is read per request, so no
   rebuild is needed to set or change it). Without it – or with one shorter
   than 12 characters – the inbox stays locked for everyone; the forms keep
   saving leads either way.

   Signing in sets a cookie holding an expiry and an HMAC of it keyed by the
   password, so changing the password signs everyone out. */

const COOKIE = "so_leads";
const PATH = "/leads";
const TTL_S = 14 * 24 * 60 * 60;

function password(): string | null {
  const p = process.env.LEADS_PASSWORD ?? "";
  return p.length >= 12 ? p : null;
}

export function inboxConfigured(): boolean {
  return password() !== null;
}

function sign(expires: number, key: string): string {
  return createHmac("sha256", key).update(`leads-inbox:${expires}`).digest("base64url");
}

function same(a: string, b: string): boolean {
  // compare digests, so neither the content nor the length leaks through timing
  const da = createHash("sha256").update(a).digest();
  const db = createHash("sha256").update(b).digest();
  return timingSafeEqual(da, db);
}

export function passwordMatches(input: string): boolean {
  const key = password();
  return key !== null && same(input, key);
}

export async function signedIn(): Promise<boolean> {
  const key = password();
  if (!key) return false;
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const [exp, sig] = value.split(".");
  const expires = Number(exp);
  if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  return same(sig, sign(expires, key));
}

export async function startSession() {
  const key = password();
  if (!key) return;
  const expires = Date.now() + TTL_S * 1000;
  // Secure whenever the visitor reached us over HTTPS (the proxy terminates
  // TLS, so the request the app sees is plain HTTP either way).
  const https = (await headers()).get("x-forwarded-proto") === "https";
  (await cookies()).set(COOKIE, `${expires}.${sign(expires, key)}`, {
    httpOnly: true,
    // lax, not strict: the inbox link is opened from a chat app, and a strict
    // cookie isn't sent on that first visit
    sameSite: "lax",
    secure: https,
    path: PATH,
    maxAge: TTL_S,
  });
}

export async function endSession() {
  (await cookies()).set(COOKIE, "", { path: PATH, maxAge: 0 });
}
