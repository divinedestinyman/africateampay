import { getSupplierById, addSupplierReview } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req, { params }) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ error: 'Rating must be an integer 1–5' }, { status: 400 });
  }

  const supplier = await getSupplierById(params.id);
  if (!supplier) {
    return Response.json({ error: 'Supplier not found' }, { status: 404 });
  }

  const updated = await addSupplierReview(params.id, rating, body.review_text || null);
  return Response.json({ ok: true, community_rating: updated.community_rating, review_count: updated.review_count });
}
