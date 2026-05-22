import { NextResponse } from 'next/server';
import { getUserBySession } from '@/lib/db';
import { getOrders } from '@/lib/db';

export async function GET(request) {
  const token = request.cookies.get('atp_session')?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const user = await getUserBySession(token);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  // Fetch orders for this user's email
  const orders = await getOrders({ limit: 50 });
  const userOrders = orders.filter(o => o.sender_email === user.email);

  return NextResponse.json({ user, orders: userOrders });
}
