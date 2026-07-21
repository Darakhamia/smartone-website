<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Product rules (business — do not break)

- **One terminal model per country, always.** Malta shows ONLY the SmartOne
  **Bank Pro S** (dual-screen) — nothing else. Every other country shows ONLY
  the SmartOne **Bank Pro**. Never mix the two on one market. This is enforced
  by `terminalModel()` in `lib/countries.ts`; change it only with explicit
  sign-off.
- **Cash register is promoted only where it's live (Malta today).** Gate every
  cash-register mention on `promotesRegister()` in `lib/countries.ts`. Other
  fiscal markets (e.g. Spain's Verifactu) keep their compliance messaging, but
  the register itself stays out of their UI.
