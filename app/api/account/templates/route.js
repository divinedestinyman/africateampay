import { NextResponse } from 'next/server';
import { getUserBySession, getTemplatesByUser, createTemplate } from '@/lib/db';

async function getAuthUser(request) {
  const token = request.cookies.get('atp_session')?.value;
  if (!token) return null;
  return getUserBySession(token);
}

export async function GET(request) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const templates = await getTemplatesByUser(user.email);
  return NextResponse.json({ templates });
}

export async function POST(request) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { template_name, direction, corridor_id, recipient_name, recipient_contact,
          settlement_method, supplier_name, supplier_country, supplier_payment_method,
          typical_amount_usdt, sending_chain, goods_description,
          reminder_enabled, reminder_day } = body;

  if (!template_name) {
    return NextResponse.json({ error: 'Template name is required' }, { status: 400 });
  }

  const tmpl = await createTemplate({
    user_email: user.email,
    template_name,
    direction: direction || 'outbound',
    corridor_id,
    recipient_name,
    recipient_contact,
    settlement_method,
    supplier_name,
    supplier_country,
    supplier_payment_method,
    typical_amount_usdt,
    sending_chain: sending_chain || 'trc20',
    goods_description,
    is_active: true,
    reminder_enabled: reminder_enabled || false,
    reminder_day: reminder_day || null,
  });

  return NextResponse.json({ template: tmpl }, { status: 201 });
}
