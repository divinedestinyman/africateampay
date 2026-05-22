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

function fmtExpiry(isoStr) {
  if (!isoStr) return '?';
  try {
    return new Date(isoStr).toLocaleTimeString('en-UG', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Kampala',
    }) + ' EAT';
  } catch {
    return isoStr;
  }
}

export async function notifyNewOrder(order) {
  const isInbound = order.direction === 'inbound';
  const lines = [
    `🆕 <b>NEW ${isInbound ? 'INBOUND ↙' : 'OUTBOUND ↗'} ORDER</b>`,
    ``,
    `Ref: <code>${order.reference}</code>`,
    `Sender: ${order.sender_name || 'Anonymous'} | ${order.sender_email || '?'}`,
  ];

  if (order.sender_whatsapp) lines.push(`WhatsApp: ${order.sender_whatsapp}`);
  if (order.sender_telegram) lines.push(`Telegram: @${order.sender_telegram}`);
  lines.push(``);

  if (isInbound) {
    lines.push(`💸 SENDING: ${Number(order.sender_amount).toLocaleString()} ${order.sender_currency}`);
    lines.push(`   → USDT: <code>${Number(order.amount_usdt).toFixed(2)} USDT</code>`);
    lines.push(`   → UGX equivalent: ${Number(order.amount_ugx).toLocaleString()} UGX`);
    lines.push(``);
    lines.push(`📥 RECIPIENT: ${order.recipient_name || '?'}`);
    lines.push(`   Settlement: ${order.settlement_method || '?'}`);
    if (order.recipient_momo_number) {
      lines.push(`   MoMo: ${order.recipient_momo_number} (${order.recipient_momo_network || '?'})`);
    }
    if (order.recipient_bank_name) {
      lines.push(`   Bank: ${order.recipient_bank_name}`);
      if (order.recipient_bank_account) lines.push(`   Account: ${order.recipient_bank_account}`);
      if (order.recipient_bank_branch) lines.push(`   Branch: ${order.recipient_bank_branch}`);
    }
    if (order.recipient_wallet_address) {
      lines.push(`   Wallet: <code>${order.recipient_wallet_address}</code>`);
    }
    if (order.recipient_id_for_cash) {
      lines.push(`   ID: ${order.recipient_id_for_cash}`);
    }
  } else {
    lines.push(`💸 SENDING: ${Number(order.amount_ugx).toLocaleString()} UGX`);
    lines.push(`   → USDT: <code>${Number(order.amount_usdt).toFixed(2)} USDT</code>`);
    const dest = `${order.corridor_name || order.corridor_id || '?'} ${order.corridor_flag || ''}`.trim();
    lines.push(`   Destination: ${dest}`);
    lines.push(``);
    if (order.supplier_name) lines.push(`🏭 SUPPLIER: ${order.supplier_name}`);
    lines.push(`   Payment: ${order.supplier_payment_method || '?'}`);
    if (order.supplier_wallet) lines.push(`   Supplier wallet: <code>${order.supplier_wallet}</code>`);
    if (order.supplier_bank_name) {
      lines.push(`   Bank: ${order.supplier_bank_name}`);
      if (order.supplier_bank_account) lines.push(`   Account: ${order.supplier_bank_account}`);
      if (order.supplier_bank_swift) lines.push(`   SWIFT: ${order.supplier_bank_swift}`);
    }
    if (order.goods_description) lines.push(`   Goods: ${order.goods_description}`);
    if (order.payment_type && order.payment_type !== 'single') {
      lines.push(`   Payment type: ${order.payment_type}`);
    }
  }

  lines.push(``);
  lines.push(`⛓ Chain: ${(order.sending_chain || 'trc20').toUpperCase()}`);
  lines.push(`👛 WATCH WALLET: <code>${order.wallet_address || 'Not set'}</code>`);
  lines.push(`⏱ Rate locked until: ${fmtExpiry(order.rate_lock_expires_at)}`);
  if (order.notes) lines.push(`📝 Notes: ${order.notes}`);
  lines.push(``);
  lines.push(`<a href="${APP_URL}/admin">→ Open Admin Panel</a>`);
  lines.push(`<a href="${APP_URL}/track/${order.reference}">→ Track Order</a>`);

  await send(ADMIN_CHAT, lines.join('\n'));
}

export async function notifyStatusUpdate(order) {
  const lines = [
    `🔄 <b>ORDER STATUS UPDATE</b>`,
    ``,
    `Ref: <code>${order.reference}</code>`,
    `Status: <b>${order.status}</b>`,
  ];
  if (order.blockchain_tx_hash) {
    lines.push(`TX: <code>${order.blockchain_tx_hash}</code>`);
  }
  lines.push(`<a href="${APP_URL}/admin">→ Admin Panel</a>`);
  await send(ADMIN_CHAT, lines.join('\n'));
}

export async function sendDisputeResolved(dispute) {
  const lines = [
    `✅ <b>DISPUTE ${dispute.status === 'refunded' ? 'REFUNDED' : 'RESOLVED'}</b>`,
    ``,
    `Ref: <code>${dispute.order_reference || '?'}</code>`,
    `Issue: ${dispute.issue_type || '?'}`,
    `Status: <b>${dispute.status}</b>`,
  ];
  if (dispute.refund_amount) {
    lines.push(`Refund: ${dispute.refund_amount} USDT`);
  }
  if (dispute.admin_response) {
    lines.push(`Response: ${dispute.admin_response}`);
  }
  lines.push(`<a href="${APP_URL}/admin">→ Admin Panel</a>`);
  await send(ADMIN_CHAT, lines.join('\n'));
}

export async function notifyUsdtSent(order) {
  const txHash = order.blockchain_tx_hash || order.tron_tx_hash;
  const lines = [
    `✅ <b>USDT SENT — ORDER COMPLETE</b>`,
    ``,
    `Ref: <code>${order.reference}</code>`,
    `Amount: ${Number(order.amount_usdt).toFixed(2)} USDT`,
  ];
  if (txHash) {
    lines.push(`TX Hash: <code>${txHash}</code>`);
    lines.push(`Verify: https://tronscan.org/#/transaction/${txHash}`);
  }
  await send(ADMIN_CHAT, lines.join('\n'));
}

export async function sendMonthlyReminder(template) {
  const chatId = template.user_telegram_chat_id || ADMIN_CHAT;
  const link = `${APP_URL}/send?template=${template.id}`;
  const lines = [
    `🔔 <b>Monthly Transfer Reminder</b>`,
    ``,
    `Hi ${template.user_name || 'there'}! Time for your regular transfer.`,
    `Template: <b>${template.template_name}</b>`,
    template.corridor_id ? `Corridor: ${template.corridor_id.toUpperCase()}` : '',
    template.typical_amount_usdt ? `Typical amount: ~${template.typical_amount_usdt} USDT` : '',
    ``,
    `<a href="${link}">→ Start transfer now</a>`,
  ].filter(Boolean);
  await send(chatId, lines.join('\n'));
}

export async function sendBulkOrderNotification(orders, submitterEmail) {
  const lines = [
    `📦 <b>BULK ORDER RECEIVED</b>`,
    ``,
    `From: ${submitterEmail}`,
    `Recipients: ${orders.length}`,
    `Total USDT: ${orders.reduce((s, o) => s + (Number(o.amount_usdt) || 0), 0).toFixed(2)}`,
    ``,
    ...orders.slice(0, 10).map((o, i) =>
      `${i + 1}. ${o.recipient_name} — ${o.amount_usdt} USDT — ${o.settlement_method || 'mtn_momo'} ${o.recipient_momo_number || ''}`
    ),
    orders.length > 10 ? `…and ${orders.length - 10} more` : '',
    ``,
    `<a href="${APP_URL}/admin">→ Admin Panel</a>`,
  ].filter(l => l !== '');
  await send(ADMIN_CHAT, lines.join('\n'));
}
