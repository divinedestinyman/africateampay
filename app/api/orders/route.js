import { createOrder, getOrders, getCorridorById, getOrderByReference, getWalletForChain } from '@/lib/db';
import { getRates, getMultiRates } from '@/lib/rates';
import { generateReference, generateId } from '@/lib/utils';
import { notifyNewOrder } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const ref = searchParams.get('ref');
  const direction = searchParams.get('direction');

  if (ref) {
    const order = await getOrderByReference(ref);
    return Response.json({ orders: order ? [order] : [] });
  }

  const orders = await getOrders({ status: status || undefined, direction: direction || undefined });
  return Response.json({ orders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      direction = 'outbound',
      // Shared
      sender_name,
      sender_email,
      sender_whatsapp,
      sender_telegram,
      sender_country,
      notes,
      sending_chain = 'trc20',
      // Outbound
      corridor_id,
      amount_ugx,
      supplier_name,
      supplier_country,
      supplier_payment_method,
      supplier_wallet,
      supplier_bank_name,
      supplier_bank_account,
      supplier_bank_swift,
      supplier_bank_iban,
      supplier_currency,
      goods_description,
      payment_type = 'single',
      // Inbound
      sender_currency = 'USD',
      sender_amount,
      settlement_method = 'mtn_momo',
      recipient_name,
      recipient_whatsapp,
      recipient_momo_number,
      recipient_momo_network,
      recipient_bank_name,
      recipient_bank_account,
      recipient_bank_branch,
      recipient_wallet_address,
      recipient_id_for_cash,
    } = body;

    if (!sender_email) {
      return Response.json({ error: 'sender_email is required' }, { status: 400 });
    }

    if (direction === 'outbound') {
      const ugx = parseInt(amount_ugx);
      if (!corridor_id || !ugx || ugx < 500000) {
        return Response.json(
          { error: 'corridor_id and amount_ugx (min 500,000 UGX) required for outbound orders' },
          { status: 400 }
        );
      }
    } else {
      if (!sender_amount || parseFloat(sender_amount) <= 0) {
        return Response.json({ error: 'sender_amount is required for inbound orders' }, { status: 400 });
      }
    }

    // Fetch rates in parallel
    const [usdt_rates, multi_rates] = await Promise.all([
      getRates(),
      direction === 'inbound' ? getMultiRates() : Promise.resolve(null),
    ]);

    const usdt_ugx_rate = usdt_rates.usdt_ugx;
    let amount_usdt, amount_ugx_final, fee_ugx, fee_usdt;
    let corridor = null;

    if (direction === 'outbound') {
      corridor = await getCorridorById(corridor_id);
      if (!corridor) {
        return Response.json({ error: 'Invalid corridor' }, { status: 400 });
      }
      const fee_pct = parseFloat(corridor.fee_percent || 1) / 100;
      const ugx = parseInt(amount_ugx);
      fee_ugx = Math.round(ugx * fee_pct);
      const net_ugx = ugx - fee_ugx;
      amount_usdt = parseFloat((net_ugx / usdt_ugx_rate).toFixed(6));
      amount_ugx_final = ugx;
      fee_usdt = parseFloat((amount_usdt * fee_pct).toFixed(6));
    } else {
      // Inbound: convert sender foreign currency → USD → USDT
      const fiat_rates = multi_rates?.rates || {};
      const rate_to_usd = fiat_rates[sender_currency.toUpperCase()];
      if (!rate_to_usd) {
        return Response.json({ error: `Unknown currency: ${sender_currency}` }, { status: 400 });
      }
      const amount_usd = parseFloat(sender_amount) / rate_to_usd;
      const fee_pct = 0.01;
      fee_usdt = parseFloat((amount_usd * fee_pct).toFixed(6));
      // USDT Coach receives = full amount (sender sends full, Coach takes fee from UGX side)
      amount_usdt = parseFloat(amount_usd.toFixed(6));
      const net_usdt = amount_usd * (1 - fee_pct);
      amount_ugx_final = Math.round(net_usdt * usdt_ugx_rate);
      fee_ugx = Math.round(amount_usd * fee_pct * usdt_ugx_rate);
    }

    // Rate lock: 30 minutes
    const rate_lock_expires_at = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const orderData = {
      id: generateId(),
      reference: generateReference(),
      direction,
      status: 'rate_locked',
      // Sender
      sender_name: sender_name || null,
      sender_email,
      sender_whatsapp: sender_whatsapp || null,
      sender_telegram: sender_telegram || null,
      sender_country: sender_country || null,
      sender_currency: direction === 'inbound' ? sender_currency.toUpperCase() : 'UGX',
      sender_amount: direction === 'inbound' ? parseFloat(sender_amount) : parseInt(amount_ugx),
      // Transfer
      corridor_id: corridor?.id || null,
      amount_ugx: amount_ugx_final,
      amount_usdt,
      fee_ugx: fee_ugx || 0,
      fee_usdt: fee_usdt || 0,
      usdt_rate: usdt_ugx_rate,
      rate_lock_expires_at,
      sending_chain: sending_chain || 'trc20',
      notes: notes || null,
      // Outbound supplier
      supplier_name: supplier_name || null,
      supplier_country: supplier_country || null,
      supplier_payment_method: supplier_payment_method || null,
      supplier_wallet: supplier_wallet || null,
      supplier_bank_name: supplier_bank_name || null,
      supplier_bank_account: supplier_bank_account || null,
      supplier_bank_swift: supplier_bank_swift || null,
      supplier_bank_iban: supplier_bank_iban || null,
      supplier_currency: supplier_currency || null,
      goods_description: goods_description || null,
      payment_type: payment_type || 'single',
      // Inbound recipient
      recipient_name: recipient_name || null,
      recipient_whatsapp: recipient_whatsapp || null,
      settlement_method: direction === 'inbound' ? (settlement_method || 'mtn_momo') : null,
      recipient_momo_number: recipient_momo_number || null,
      recipient_momo_network: recipient_momo_network || null,
      recipient_bank_name: recipient_bank_name || null,
      recipient_bank_account: recipient_bank_account || null,
      recipient_bank_branch: recipient_bank_branch || null,
      recipient_wallet_address: recipient_wallet_address || null,
      recipient_id_for_cash: recipient_id_for_cash || null,
    };

    const order = await createOrder(orderData);

    // Get wallet address for selected chain
    const wallet_address = await getWalletForChain(sending_chain || 'trc20');

    // Notify Coach via Telegram (fire and forget)
    notifyNewOrder({
      ...order,
      wallet_address,
      corridor_name: corridor?.name || null,
      corridor_flag: corridor?.flag || null,
    }).catch(() => {});

    return Response.json(
      {
        order: {
          ...order,
          wallet_address,
          coach_whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664'}?text=Order+${order.reference}`,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
