import { getMultiRates } from '@/lib/rates';

export const runtime = 'nodejs';
export const revalidate = 600; // 10 minutes

export async function GET() {
  try {
    const data = await getMultiRates();
    return Response.json(data);
  } catch (err) {
    console.error('[GET /api/rates/multi]', err);
    return Response.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}
