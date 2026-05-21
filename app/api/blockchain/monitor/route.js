import { NextResponse } from 'next/server';
import { getOrders, updateOrder } from '@/lib/db';
import { checkTxStatus } from '@/lib/blockchain';
import { notifyStatusUpdate } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check orders in 'sending' status with a blockchain_tx_hash set
  const sendingOrders = await getOrders({ status: 'sending' });
  const toCheck = sendingOrders.filter(o => o.blockchain_tx_hash);

  const results = [];

  for (const order of toCheck) {
    try {
      const txStatus = await checkTxStatus(
        order.blockchain_tx_hash,
        order.sending_chain || 'trc20'
      );

      if (txStatus?.confirmed) {
        const updated = await updateOrder(order.id, { status: 'completed' });
        if (updated) await notifyStatusUpdate(updated);
        results.push({ reference: order.reference, action: 'auto_completed', confirmations: txStatus.confirmations });
      } else {
        results.push({
          reference: order.reference,
          action: 'pending',
          confirmations: txStatus?.confirmations ?? null,
          manualVerify: txStatus?.manualVerifyRequired ?? false,
        });
      }
    } catch (err) {
      results.push({ reference: order.reference, action: 'error', error: err.message });
    }
  }

  return NextResponse.json({
    ok: true,
    checked: results.length,
    results,
    timestamp: new Date().toISOString(),
  });
}
