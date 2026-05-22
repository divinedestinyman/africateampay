import { getSupplierById } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  const supplier = await getSupplierById(params.id);
  if (!supplier) {
    return Response.json({ error: 'Supplier not found' }, { status: 404 });
  }
  return Response.json({ supplier });
}
