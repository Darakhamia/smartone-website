/* The look of a text field in the site's forms (/contact, the call-back forms). */
export const fieldCls =
  "w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand focus:ring-2 focus:ring-brand/15";

/* A <select> in the same look, with its own chevron in place of the browser's. */
export const selectCls = `${fieldCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%2386868b%22 stroke-width=%221.6%22 stroke-linecap=%22round%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`;
