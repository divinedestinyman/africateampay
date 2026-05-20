import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  cookies().set('admin_auth', process.env.ADMIN_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return Response.json({ success: true });
}

export async function DELETE() {
  cookies().delete('admin_auth');
  return Response.json({ success: true });
}
