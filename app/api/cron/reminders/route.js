import { NextResponse } from 'next/server';
import { getTemplatesWithReminders } from '@/lib/db';
import { sendMonthlyReminder } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dayOfMonth = new Date().getDate();
  const templates = await getTemplatesWithReminders(dayOfMonth);

  let sent = 0;
  for (const tmpl of templates) {
    try {
      await sendMonthlyReminder(tmpl);
      sent++;
    } catch (err) {
      console.error('[Reminders] Failed for template', tmpl.id, err.message);
    }
  }

  return NextResponse.json({ ok: true, day: dayOfMonth, checked: templates.length, sent });
}
