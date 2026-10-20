import "server-only";
import { randomUUID } from "node:crypto";
import { promises as fs, statSync } from "node:fs";
import type { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import type { LeadField, LeadSource } from "@/lib/leads";

/* Where the leads are kept: one JSON object per line in data/leads.jsonl.
   The site runs as a single Node process on one server (Coolify), and a few
   enquiries a day need no database – appending a line is enough, and the
   file can be opened by anyone with access to the server.

   The directory must be a persistent volume, or every redeploy starts with
   an empty inbox: in Coolify, a Volume Mount at /app/data (the image creates
   that directory owned by the app's user, and a new volume takes that
   ownership). LEADS_DIR overrides the location; `next dev` uses ./data.

   The turbopackIgnore comments on the file operations below keep the
   build's file tracer away from them: a path it can't work out at build
   time otherwise makes it copy the whole project into the standalone
   output. */
const DIR = process.env.LEADS_DIR || (process.env.NODE_ENV === "production" ? "/app/data" : "data");
const FILE = `${DIR}/leads.jsonl`;

/* Refuse new leads past this size rather than fill the server's disk. At a
   kilobyte a lead it is tens of thousands of enquiries. */
const MAX_FILE_BYTES = 50 * 1024 * 1024;

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];

export type Lead = {
  id: string;
  /** ISO time the lead arrived. */
  at: string;
  source: LeadSource;
  /** Page the form was sent from. */
  page: string;
  /** Country the visitor was browsing (so_country). */
  site_country: string;
  fields: Partial<Record<LeadField, string>>;
  /** First-touch campaign tags – present only with Marketing consent. */
  tags: Partial<Record<AttributionField, string>>;
};

/* Every write goes through one queue, so an append never lands in the middle
   of a delete rewriting the file. */
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

async function readLines(): Promise<string[]> {
  try {
    return (await fs.readFile(/* turbopackIgnore: true */ FILE, "utf8")).split("\n").filter((l) => l.trim());
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

function idOf(line: string): string | null {
  try {
    return (JSON.parse(line) as Lead).id;
  } catch {
    return null;
  }
}

export function addLead(lead: Omit<Lead, "id" | "at">): Promise<Lead> {
  return serial(async () => {
    await fs.mkdir(/* turbopackIgnore: true */ DIR, { recursive: true });
    const size = await fs.stat(/* turbopackIgnore: true */ FILE).then((s) => s.size, () => 0);
    if (size > MAX_FILE_BYTES) throw new Error("leads file is full");
    const full: Lead = { id: randomUUID(), at: new Date().toISOString(), ...lead };
    await fs.appendFile(/* turbopackIgnore: true */ FILE, `${JSON.stringify(full)}\n`, "utf8");
    return full;
  });
}

/** All leads, newest first. A line that can't be read is skipped, not fatal. */
export async function listLeads(): Promise<Lead[]> {
  const leads: Lead[] = [];
  for (const line of await readLines()) {
    try {
      leads.push(JSON.parse(line) as Lead);
    } catch {
      // a half-written line from a crash mid-append – leave it in the file
    }
  }
  return leads.reverse();
}

/** Remove one lead for good (a person asking to be forgotten, a test, spam). */
export function deleteLead(id: string): Promise<boolean> {
  return serial(async () => {
    const lines = await readLines();
    const keep = lines.filter((l) => idOf(l) !== id);
    if (keep.length === lines.length) return false;
    // write a new file and swap it in, so a crash can't leave half a file
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(/* turbopackIgnore: true */ tmp, keep.map((l) => `${l}\n`).join(""), "utf8");
    await fs.rename(/* turbopackIgnore: true */ tmp, /* turbopackIgnore: true */ FILE);
    return true;
  });
}

/* Whether the leads directory is a mount of its own (a volume) rather than
   part of the container's filesystem, which a redeploy throws away. A volume
   sits on a different device from its parent directory. null: the directory
   doesn't exist yet (nothing has been sent). */
export function storageIsPersistent(): boolean | null {
  try {
    return statSync(/* turbopackIgnore: true */ DIR).dev !== statSync(/* turbopackIgnore: true */ `${DIR}/..`).dev;
  } catch {
    return null;
  }
}
