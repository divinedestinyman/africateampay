import { getOrderById, updateOrder } from '@/lib/db';
import { notifyUsdtSent } from '@/lib/telegram';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const order = await getOrderById(params.id);
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
  return Response.json({ order });
}

export async function PATCH(request, { params }) {
  // Admin-only — verify token
  const token = request.headers.get('x-admin-token');
  if (token !== process.env.ADMIN_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { status, tron_tx_hash, amount_usdt } = body;

  const allowed = ['payment_received', 'usdt_sent', 'completed', 'cancelled'];
  if (status && !allowed.includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updates = {};
  if (status) updates.status = status;
  if (tron_tx_hash) updates.tron_tx_hash = tron_tx_hash;
  if (amount_usdt) updates.amount_usdt = parseFloat(amount_usdt);

  if (status === 'payment_received') updates.payment_confirmed_at = new Date().toISOString();
  if (status === 'usdt_sent') updates.usdt_sent_at = new Date().toISOString();

  const order = await updateOrder(params.id, updates);
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

  // Notify when USDT is sent
  if (status === 'usdt_sent' && tron_tx_hash) {
    notifyUsdtSent(order).catch(() => {});
  }

  return Response.json({ order });
}
