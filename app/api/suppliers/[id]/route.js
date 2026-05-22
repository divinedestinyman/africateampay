import { getSupplierById, updateSupplier } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  const supplier = await getSupplierById(params.id);
  if (!supplier) {
    return Response.json({ error: 'Supplier not found' }, { status: 404 });
  }
  return Response.json({ supplier });
}

export async function PATCH(request, { params }) {
  const token = request.headers.get('x-admin-token');
  if (token !== process.env.ADMIN_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const allowed = ['is_verified', 'is_featured', 'is_active', 'featured_expires_at'];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
  if (!Object.keys(updates).length) {
    return Response.json({ error: 'No valid fields' }, { status: 400 });
  }
  const supplier = await updateSupplier(params.id, updates);
  if (!supplier) return Response.json({ error: 'Supplier not found' }, { status: 404 });
  return Response.json({ supplier });
}
