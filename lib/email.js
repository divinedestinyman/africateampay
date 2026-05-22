import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function sendReceiptEmail({ order, pdfBuffer }) {
  const { customer_email, reference, amount_usdt, amount_ugx, direction, customer_name } = order;
  if (!customer_email) return { sent: false, reason: 'no_email' };
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER / EMAIL_PASS not configured — skipping receipt email');
    return { sent: false, reason: 'not_configured' };
  }

  const amountLine = direction === 'inbound'
    ? `${Number(order.sender_amount || 0).toLocaleString()} ${order.sender_currency || 'USD'}`
    : `UGX ${Number(amount_ugx || 0).toLocaleString()}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;color:#F5F5F5;padding:32px;border-radius:8px;">
      <h1 style="font-size:24px;color:#D4A017;margin-bottom:4px;">Transfer Complete ✅</h1>
      <p style="color:#888;font-size:14px;margin-bottom:24px;">Your AfricaTeamPay transfer has been processed.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr><td style="padding:8px 0;color:#888;">Reference</td><td style="padding:8px 0;font-family:monospace;color:#D4A017;">${reference}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Customer</td><td style="padding:8px 0;">${customer_name || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Amount paid</td><td style="padding:8px 0;font-family:monospace;">${amountLine}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">USDT sent</td><td style="padding:8px 0;font-family:monospace;color:#D4A017;">${Number(amount_usdt || 0).toFixed(2)} USDT</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Chain</td><td style="padding:8px 0;font-family:monospace;">${(order.sending_chain || 'TRC20').toUpperCase()}</td></tr>
      </table>
      <p style="font-size:13px;color:#555;">Your PDF receipt is attached to this email. Track your transfer anytime at africateampay.vercel.app/track/${reference}</p>
      <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
      <p style="font-size:12px;color:#444;">AfricaTeamPay — Uganda USDT Corridor Network. Flat 1% fee.</p>
    </div>
  `;

  const attachments = [];
  if (pdfBuffer) {
    attachments.push({
      filename: `receipt-${reference}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    });
  }

  await getTransporter().sendMail({
    from: `"AfricaTeamPay" <${process.env.EMAIL_USER}>`,
    to: customer_email,
    subject: `Your AfricaTeamPay transfer is complete — ${reference}`,
    html,
    attachments,
  });

  return { sent: true, to: customer_email };
}
