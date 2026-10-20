"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, passwordMatches, signedIn, startSession } from "@/lib/leads-auth";
import { deleteLead } from "@/lib/leads-store";
import { clientIp, rateLimited } from "@/lib/rate-limit";

/* Server functions of the /leads inbox. Each can be called with a plain POST
   from anywhere, so each checks for itself – none trusts that the page around
   it was shown only to someone signed in. */

export async function signIn(_prev: string | null, form: FormData): Promise<string | null> {
  // ten tries per quarter of an hour per address, wrong or right
  if (rateLimited(`login:${clientIp(await headers())}`, 10, 15 * 60_000)) {
    return "Too many attempts. Try again in 15 minutes.";
  }
  const input = form.get("password");
  if (typeof input !== "string" || !passwordMatches(input)) {
    await new Promise((r) => setTimeout(r, 600));
    return "Wrong password.";
  }
  await startSession();
  redirect("/leads");
}

export async function signOut() {
  await endSession();
  redirect("/leads");
}

export async function removeLead(form: FormData) {
  if (!(await signedIn())) return;
  const id = form.get("id");
  if (typeof id === "string" && id) await deleteLead(id);
  revalidatePath("/leads");
}
