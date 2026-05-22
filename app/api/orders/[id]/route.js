import { getOrderById, updateOrder } from '@/lib/db';
import { notifyUsdtSent } from '@/lib/telegram';
import { sendReceiptEmail } from '@/lib/email';
import { renderToBuffer } from '@react-pdf/renderer';
import ReceiptDocument from '@/components/ReceiptDocument';
import { createElement } from 'react';

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
  const { status, tron_tx_hash, blockchain_tx_hash, amount_usdt, notes } = body;

  const ALLOWED_STATUSES = [
    'pending', 'rate_locked', 'payment_received', 'converting',
    'sending', 'completed', 'failed', 'refunded', 'disputed',
    'cancelled', 'usdt_sent',
  ];
  if (status && !ALLOWED_STATUSES.includes(status)) {
    return Response.json({ error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(', ')}` }, { status: 400 });
  }

  const updates = {};
  if (status) updates.status = status;

  // Support both field names; blockchain_tx_hash is canonical, tron_tx_hash is legacy alias
  const txHash = blockchain_tx_hash || tron_tx_hash;
  if (txHash) {
    updates.tron_tx_hash = txHash;
    updates.blockchain_tx_hash = txHash;
  }
  if (amount_usdt) updates.amount_usdt = parseFloat(amount_usdt);
  if (notes !== undefined) updates.notes = notes;

  if (status === 'payment_received') updates.payment_confirmed_at = new Date().toISOString();
  if (status === 'usdt_sent' || status === 'completed') updates.usdt_sent_at = new Date().toISOString();

  const order = await updateOrder(params.id, updates);
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

  // Notify when USDT is sent or order is completed
  if ((status === 'usdt_sent' || status === 'completed') && txHash) {
    notifyUsdtSent(order).catch(() => {});
  }

  // Send PDF receipt email when order is marked completed and has a customer email
  let emailResult = null;
  if (status === 'completed' && order.customer_email) {
    try {
      const pdfBuffer = await renderToBuffer(createElement(ReceiptDocument, { order }));
      emailResult = await sendReceiptEmail({ order, pdfBuffer });
    } catch (err) {
      console.error('Receipt email failed:', err);
      emailResult = { sent: false, reason: 'error' };
    }
  }

  return Response.json({ order, emailResult });
}
