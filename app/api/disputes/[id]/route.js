import { NextResponse } from 'next/server';
import { getDisputes, updateDispute } from '@/lib/db';
import { sendDisputeResolved } from '@/lib/telegram';

export async function PATCH(request, { params }) {
  const token = request.headers.get('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const { status, admin_response, refund_amount } = body;

    if (!status) {
      return NextResponse.json({ error: 'status required' }, { status: 400 });
    }

    const updates = { status };
    if (admin_response) updates.admin_response = admin_response;
    if (refund_amount) updates.refund_amount = refund_amount;
    if (status === 'resolved' || status === 'refunded') {
      updates.resolved_at = new Date().toISOString();
    }

    const dispute = await updateDispute(id, updates);
    if (!dispute) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }

    if (status === 'resolved' || status === 'refunded') {
      await sendDisputeResolved(dispute).catch(() => {});
    }

    return NextResponse.json({ ok: true, dispute });
  } catch (err) {
    console.error('[disputes PATCH]', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const token = request.headers.get('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  try {
    const disputes = await getDisputes({});
    const dispute = disputes.find(d => d.id === id);
    if (!dispute) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ dispute });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
