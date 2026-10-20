import "server-only";

/* Posts a message to the team's Telegram group through the site's bot.

   Two environment variables, read at run time (set them where the site is
   hosted; no rebuild needed, a restart is):
   - TELEGRAM_BOT_TOKEN – the bot's token from @BotFather;
   - TELEGRAM_CHAT_ID – the group's id, a negative number. To find it: add
     the bot to the group, send /start there, then open
     https://api.telegram.org/bot<token>/getUpdates and look for
     "chat":{"id":-100…}.

   Plain text, no parse mode: names and messages come from the public, and
   with HTML or Markdown on, a stray "<" or "_" would make Telegram refuse
   the whole message. */

const MAX_LENGTH = 4096;

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
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");

  const body = text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH - 1)}…` : text;
  let result = await send(token, chatId, body);

  // A group turned into a supergroup (it happens when it gets admins or
  // grows) gets a new id; Telegram says which. Deliver there, and say so.
  const moved = result.reply.parameters?.migrate_to_chat_id;
  if (!result.ok && moved) {
    console.warn(`[leads] the Telegram group has a new id: set TELEGRAM_CHAT_ID to ${moved}`);
    result = await send(token, moved, body);
  }
  if (!result.ok) throw new Error(`Telegram ${result.status}: ${result.reply.description ?? "no reply"}`);
}
