import { NextResponse } from 'next/server';
import { checkTxStatus } from '@/lib/blockchain';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get('hash');
  const chain = searchParams.get('chain') || 'trc20';

  if (!hash) {
    return NextResponse.json({ error: 'hash required' }, { status: 400 });
  }

  try {
    const result = await checkTxStatus(hash, chain);
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' },
    });
  } catch (err) {
    console.error('[tx-status]', err.message);
    return NextResponse.json({ error: 'Failed to check TX status' }, { status: 500 });
  }
}
