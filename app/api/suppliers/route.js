import { NextResponse } from 'next/server';
import { getSuppliers, createSupplier } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || '';
  const category = searchParams.get('category') || '';
  try {
    const suppliers = await getSuppliers({
      country: country || undefined,
      category: category || undefined,
      limit: 100,
    });
    return NextResponse.json({ suppliers });
  } catch (err) {
    console.error('[suppliers GET]', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, country, city, market_location,
            accepts_usdt, min_order_usd, contact_method, submitted_by } = body;

    if (!name || !country) {
      return NextResponse.json({ error: 'name and country required' }, { status: 400 });
    }

    const supplier = await createSupplier({
      name,
      category: category || 'General',
      country,
      city: city || null,
      market_location: market_location || null,
      accepts_usdt: !!accepts_usdt,
      accepts_tt: true,
      min_order_usd: min_order_usd ? Number(min_order_usd) : null,
      contact_method: contact_method || 'whatsapp',
      submitted_by: submitted_by || 'community',
      is_active: true,
      is_verified: false,
    });

    return NextResponse.json({ ok: true, supplier }, { status: 201 });
  } catch (err) {
    console.error('[suppliers POST]', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
