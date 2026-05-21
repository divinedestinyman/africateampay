import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '378061184';

async function sendTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN) return;
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_ADMIN_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );
  } catch (_) {}
}

const ISSUE_LABELS = {
  wrong_amount:       'Wrong amount received by supplier',
  not_received:       'Payment not received by supplier',
  supplier_not_paid:  'Supplier claims not paid',
  delayed:            'Payment significantly delayed',
  other:              'Other issue',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      reference,
      tx_hash,
      issue_type,
      expected_amount,
      received_amount,
      details,
      contact_email,
    } = body;

    if (!reference || !issue_type || !contact_email) {
      return NextResponse.json(
        { error: 'reference, issue_type and contact_email are required' },
        { status: 400 }
      );
    }

    const issueLabel = ISSUE_LABELS[issue_type] || issue_type;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

    const amountLine = expected_amount || received_amount
      ? `\n💰 Expected: ${expected_amount || 'N/A'} | Received: ${received_amount || 'N/A'}`
      : '';

    const telegramMsg =
      `🚨 <b>DISPUTE FILED</b>\n` +
      `\n📋 Reference: <code>${reference}</code>` +
      `\n🔗 TX Hash: <code>${tx_hash || 'Not provided'}</code>` +
      `\n❗ Issue: ${issueLabel}` +
      amountLine +
      `\n📧 Contact: ${contact_email}` +
      (details ? `\n\n📝 Details:\n${details}` : '') +
      `\n\n⏰ Filed: ${now}` +
      `\n⏳ SLA: 48-hour resolution required`;

    await sendTelegram(telegramMsg);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Dispute API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
