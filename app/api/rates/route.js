import { getRates } from '@/lib/rates';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const rates = await getRates();
    return Response.json(rates);
  } catch (err) {
    return Response.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}
