import { NextResponse } from 'next/server';
import { createOrder, getWalletForChain } from '@/lib/db';
import { generateReference } from '@/lib/utils';
import { sendBulkOrderNotification } from '@/lib/telegram';

export async function POST(request) {
  try {
    const { recipients, submitter_name, submitter_email, submitter_whatsapp, sending_chain } = await request.json();

    if (!Array.isArray(recipients) || recipients.length < 3) {
      return NextResponse.json({ error: 'Minimum 3 recipients required for bulk orders' }, { status: 400 });
    }
    if (!submitter_email) {
      return NextResponse.json({ error: 'Submitter email is required' }, { status: 400 });
    }

    const chain = sending_chain || 'trc20';
    const wallet_address = await getWalletForChain(chain);
    const BULK_FEE = 0.008; // 0.8%

    const created = [];
    for (const r of recipients) {
      if (!r.recipient_name || !r.amount_ugx) continue;
      const ref = generateReference();
      // Use rate from request if provided, else 0 (Coach will fill)
      const usdt_rate = r.usdt_rate || 0;
      const amount_ugx = Number(r.amount_ugx);
      const amount_usdt = usdt_rate > 0 ? parseFloat((amount_ugx / usdt_rate).toFixed(6)) : null;
      const fee_usdt = amount_usdt ? parseFloat((amount_usdt * BULK_FEE).toFixed(6)) : null;

      const order = await createOrder({
        reference: ref,
        direction: 'inbound',
        sender_name: submitter_name,
        sender_email: submitter_email,
        sender_whatsapp: submitter_whatsapp,
        sender_currency: 'UGX',
        sender_amount: amount_ugx,
        amount_ugx,
        amount_usdt,
        fee_usdt,
        usdt_rate,
        sending_chain: chain,
        wallet_address,
        recipient_name: r.recipient_name,
        recipient_whatsapp: r.contact,
        settlement_method: r.network || 'mtn_momo',
        recipient_momo_number: r.contact,
        recipient_momo_network: r.network || 'mtn',
        notes: `Bulk order — ${r.goods_description || ''}`,
        rate_lock_expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        status: 'rate_locked',
      });
      created.push({ ...order, amount_usdt });
    }

    await sendBulkOrderNotification(created, submitter_email);

    return NextResponse.json({ ok: true, orders: created.length, wallet_address, chain });
  } catch (err) {
    console.error('Bulk order error:', err);
    return NextResponse.json({ error: 'Bulk order failed' }, { status: 500 });
  }
}
