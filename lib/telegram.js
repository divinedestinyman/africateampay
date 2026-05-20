const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT = process.env.TELEGRAM_ADMIN_CHAT_ID;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://africateampay.vercel.app';

async function send(chatId, text) {
  if (!BOT_TOKEN || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
  } catch (err) {
    console.error('[Telegram]', err.message);
  }
}

export async function notifyNewOrder(order) {
  const corridorName = order.corridor_name || order.corridor_id || '?';
  const corridorFlag = order.corridor_flag || '';

  const text = [
    `🆕 <b>NEW CORRIDOR ORDER</b>`,
    ``,
    `Reference: <code>${order.reference}</code>`,
    `Customer: ${order.customer_name || 'Anonymous'}`,
    `WhatsApp: ${order.customer_whatsapp || 'Not provided'}`,
    `Corridor: Uganda → ${corridorName} ${corridorFlag}`,
    `Amount: UGX ${Number(order.amount_ugx).toLocaleString()}`,
    `USDT: ~$${Number(order.amount_usdt).toFixed(2)}`,
    `Wallet: <code>${order.customer_wallet || 'Not provided'}</code>`,
    `Notes: ${order.notes || 'None'}`,
    ``,
    `<a href="${APP_URL}/admin">Open Admin Panel →</a>`,
  ].join('\n');

  await send(ADMIN_CHAT, text);
}

export async function notifyUsdtSent(order) {
  const text = [
    `✅ <b>USDT SENT</b>`,
    ``,
    `Reference: <code>${order.reference}</code>`,
    `Amount: ${Number(order.amount_usdt).toFixed(2)} USDT`,
    `TX Hash: <code>${order.tron_tx_hash}</code>`,
    `Verify: https://tronscan.org/#/transaction/${order.tron_tx_hash}`,
  ].join('\n');

  await send(ADMIN_CHAT, text);
}
