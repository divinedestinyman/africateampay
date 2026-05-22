import { getOrderByReference } from '@/lib/db';
import { renderToBuffer } from '@react-pdf/renderer';
import ReceiptDocument from '@/components/ReceiptDocument';
import { createElement } from 'react';

export const dynamic = 'force-dynamic';

const ALLOWED_STATUSES = new Set(['completed', 'sending', 'payment_received', 'converting']);

export async function GET(_req, { params }) {
  const order = await getOrderByReference(params.reference);

  if (!order) {
    return new Response('Order not found', { status: 404 });
  }
  if (!ALLOWED_STATUSES.has(order.status)) {
    return new Response('Receipt not yet available for this order', { status: 403 });
  }

  try {
    const buffer = await renderToBuffer(createElement(ReceiptDocument, { order }));
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${params.reference}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('PDF generation failed:', err);
    return new Response('Failed to generate receipt', { status: 500 });
  }
}
