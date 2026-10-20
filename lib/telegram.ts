import "server-only";

/* Posts a message to the team's Telegram group, "SmartOne Leads Web",
   through the site's bot, @s1lead_bot ("SmartOne Lead Manager").

   The bot's token and the group's id are written into the code: the site's
   hosting has no environment variables we can set. This repository is
   public, so the token is kept scrambled (reversed, then base64, in three
   pieces). That keeps it away from the scanners that harvest tokens from
   GitHub – not from a person reading this file. If it ever leaks: /revoke
   it in @BotFather and put the new one here, scrambled with
     node -e "console.log(Buffer.from([...process.argv[1]].reverse().join('')).toString('base64'))" '<token>'
   TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID, if a host ever sets them, win
   over both.

   To find a group's id: add the bot, send /start@s1lead_bot in the group,
   open https://api.telegram.org/bot<token>/getUpdates and look for
   "chat":{"id":-…}.

   Plain text, no parse mode: names and messages come from the public, and
   with HTML or Markdown on, a stray "<" or "_" would make Telegram refuse
   the whole message. */

const SCRAMBLED_TOKEN = ["Y1dDaU9rVW1nNDlrVERR", "cnBHU0NvbThuSUNKTUNT", "VmVIQUE6ODY4NjU5OTk3OA=="];
const GROUP_ID = "-5333859377";

const MAX_LENGTH = 4096;

function unscramble(pieces: string[]): string {
  return [...Buffer.from(pieces.join(""), "base64").toString("utf8")].reverse().join("");
}

// TELEGRAM_API_URL points the bot elsewhere – a local stand-in for testing.
const API = process.env.TELEGRAM_API_URL || "https://api.telegram.org";

type TelegramReply = { ok?: boolean; description?: string; parameters?: { migrate_to_chat_id?: number } };

async function send(token: string, chatId: string | number, text: string) {
  const res = await fetch(`${API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, link_preview_options: { is_disabled: true } }),
    signal: AbortSignal.timeout(10_000),
  });
  const reply = (await res.json().catch(() => ({}))) as TelegramReply;
  return { ok: res.ok && reply.ok !== false, status: res.status, reply };
}

export async function postToTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN || unscramble(SCRAMBLED_TOKEN);
  const chatId = process.env.TELEGRAM_CHAT_ID || GROUP_ID;

  const body = text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH - 1)}…` : text;
  let result = await send(token, chatId, body);

  // A group turned into a supergroup (it happens when it gets admins or
  // grows) gets a new id; Telegram says which. Deliver there, and say so.
  const moved = result.reply.parameters?.migrate_to_chat_id;
  if (!result.ok && moved) {
    console.warn(`[leads] the Telegram group has a new id: change GROUP_ID in lib/telegram.ts to ${moved}`);
    result = await send(token, moved, body);
  }
  if (!result.ok) throw new Error(`Telegram ${result.status}: ${result.reply.description ?? "no reply"}`);
}
