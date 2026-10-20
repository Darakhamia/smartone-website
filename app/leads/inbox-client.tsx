"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { removeLead, signIn } from "@/app/leads/actions";

export function SignInForm() {
  const [error, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="mt-8 grid gap-3">
      <label className="block">
        <span className="mb-1.5 block text-[13.5px] font-medium text-ink-2">Password</span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>
      {error && <p className="rounded-xl bg-[#fbeaea] px-4 py-3 text-[13.5px] text-[#b4231f]">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary mt-2 justify-center disabled:opacity-70">
        {pending ? "Checking…" : "Open the inbox"}
      </button>
    </form>
  );
}

export function DeleteLead({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={removeLead}
      onSubmit={(e) => {
        if (!window.confirm(`Delete the lead from ${name || "this person"} for good?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Delete this lead"
        title="Delete"
        className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors hover:bg-[#fbeaea] hover:text-[#b4231f]"
      >
        <Trash2 className="size-4.5" strokeWidth={1.8} aria-hidden />
      </button>
    </form>
  );
}
