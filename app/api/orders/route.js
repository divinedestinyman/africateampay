import { createOrder, getOrders, getCorridorById, getOrderByReference } from '@/lib/db';
import { getRates } from '@/lib/rates';
import { generateReference, generateId } from '@/lib/utils';
import { notifyNewOrder } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const ref = searchParams.get('ref');

  if (ref) {
    const order = await getOrderByReference(ref);
    return Response.json({ orders: order ? [order] : [] });
  }

  const orders = await getOrders({ status: status || undefined });
  return Response.json({ orders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_whatsapp,
      customer_wallet,
      corridor_id,
      amount_ugx,
      notes,
      // new v2 fields
      direction,
      sender_email,
      sending_chain,
      settlement_method,
      recipient_name,
      recipient_account,
      recipient_bank,
      amount_foreign,
      foreign_currency,
    } = body;

    if (!corridor_id || !amount_ugx || amount_ugx < 500000) {
      return Response.json(
        { error: 'corridor_id and amount_ugx (min 500,000) are required' },
        { status: 400 }
      );
    }

    const [rates, corridor] = await Promise.all([
      getRates(),
      getCorridorById(corridor_id),
    ]);

    if (!corridor) {
      return Response.json({ error: 'Invalid corridor' }, { status: 400 });
    }

    const usdt_rate = rates.usdt_ugx;
    const fee_pct = parseFloat(corridor.fee_percent) / 100;
    const fee_ugx = Math.round(amount_ugx * fee_pct);
    const net_ugx = amount_ugx - fee_ugx;
    const amount_usdt = parseFloat((net_ugx / usdt_rate).toFixed(6));

    const order = await createOrder({
      id: generateId(),
      reference: generateReference(),
      customer_name: customer_name || null,
      customer_whatsapp: customer_whatsapp || null,
      customer_wallet: customer_wallet || null,
      corridor_id,
      direction: direction || corridor.direction || 'outbound',
      amount_ugx: parseInt(amount_ugx),
      amount_usdt,
      fee_ugx,
      usdt_rate,
      notes: notes || null,
      sender_email: sender_email || null,
      sending_chain: sending_chain || 'trc20',
      settlement_method: settlement_method || null,
      recipient_name: recipient_name || null,
      recipient_account: recipient_account || null,
      recipient_bank: recipient_bank || null,
      amount_foreign: amount_foreign ? parseFloat(amount_foreign) : null,
      foreign_currency: foreign_currency || null,
    });

    // Notify Coach via Telegram (fire and forget)
    notifyNewOrder({
      ...order,
      corridor_name: corridor.name,
      corridor_flag: corridor.flag,
    }).catch(() => {});

    const wa = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';
    return Response.json({
      order: {
        ...order,
        whatsapp_coach: `https://wa.me/${wa}?text=Order+${order.reference}`,
        reference_note: `Use ${order.reference} as your payment reference`,
      },
    }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
