import { NextResponse } from 'next/server';
import { getUserBySession, getTemplateById, updateTemplate } from '@/lib/db';

async function getAuthUser(request) {
  const token = request.cookies.get('atp_session')?.value;
  if (!token) return null;
  return getUserBySession(token);
}

export async function PATCH(request, { params }) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const tmpl = await getTemplateById(params.id);
  if (!tmpl || tmpl.user_email !== user.email) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updates = await request.json();
  // Only allow specific fields to be updated
  const allowed = ['template_name', 'reminder_enabled', 'reminder_day', 'typical_amount_usdt',
                   'recipient_name', 'recipient_contact', 'supplier_name', 'goods_description'];
  const safe = Object.fromEntries(Object.entries(updates).filter(([k]) => allowed.includes(k)));

  const updated = await updateTemplate(params.id, safe);
  return NextResponse.json({ template: updated });
}

export async function DELETE(request, { params }) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const tmpl = await getTemplateById(params.id);
  if (!tmpl || tmpl.user_email !== user.email) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await updateTemplate(params.id, { is_active: false });
  return NextResponse.json({ ok: true });
}
