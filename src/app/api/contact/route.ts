import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

// ==================== XSS Protection ====================
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== Rate Limiting (Edge-Safe) ====================
// Cloudflare Workers are request-scoped, so in-memory Map is per-isolate.
// This provides basic burst protection; for production-grade rate limiting,
// consider Cloudflare KV, Durable Objects, or Workers Analytics.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Cleanup stale entries on each check (no setInterval needed on Edge)
  for (const [key, val] of rateLimitMap.entries()) {
    if (val.resetTime <= now) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime <= now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ==================== Resend Client ====================
// Instantiate per-request to avoid stale closures in Edge isolation
const FROM_EMAIL = process.env.FROM_EMAIL || 'info@hovtechautomation.com';
const TO_EMAIL = process.env.TO_EMAIL || 'info@hovtechautomation.com';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '6285733118439';

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

// ==================== Input Validation ====================
const MAX_FIELD_LENGTHS: Record<string, number> = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
};

// ==================== POST Handler ====================
export async function POST(request: NextRequest) {
  // --- Rate Limit Check ---
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Terlalu banyak request. Silakan coba lagi dalam 1 menit.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // --- Validate required fields ---
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    // --- Validate field lengths ---
    for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTHS)) {
      const value = body[field];
      if (typeof value === 'string' && value.length > maxLength) {
        return NextResponse.json(
          { success: false, error: `Field ${field} terlalu panjang. Maksimal ${maxLength} karakter.` },
          { status: 400 }
        );
      }
    }

    // --- Email format validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // --- Message length check ---
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Pesan terlalu pendek. Minimal 10 karakter.' },
        { status: 400 }
      );
    }

    // --- Escape all user input for HTML safety ---
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim());

    const resend = getResend();

    // --- Send notification email to company ---
    const { error: sendError } = await resend.emails.send({
      from: `HOVTECH Website <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[HOVTECH] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #f97316; margin: 0; font-size: 24px; font-weight: 800;">HOVTECH</h1>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">Pesan Baru dari Website</p>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
            <div style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #f97316;">
              <h2 style="margin: 0 0 8px; color: #0f172a; font-size: 18px; font-weight: 700;">${safeSubject}</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px; font-weight: 600;">Nama</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #f97316; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">IP</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(ip)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Waktu</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
              </tr>
            </table>
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0;">Email ini dikirim dari formulir kontak hovtechautomation.com</p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend send error:', sendError);
      return NextResponse.json(
        { success: false, error: 'Gagal mengirim email. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    // --- Send auto-reply to the sender ---
    await resend.emails.send({
      from: `HOVTECH Automation <${FROM_EMAIL}>`,
      to: [email],
      subject: `Terima kasih telah menghubungi HOVTECH Automation`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #f97316; margin: 0; font-size: 24px; font-weight: 800;">HOVTECH</h1>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">Automation & Electrical Engineering</p>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">Halo ${safeName},</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
              Terima kasih telah menghubungi kami! Pesan Anda sudah kami terima dan akan segera kami proses.
            </p>
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #f97316; margin-bottom: 16px;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 4px; font-weight: 600;">Subjek Pesan Anda:</p>
              <p style="color: #0f172a; font-size: 14px; margin: 0; font-weight: 600;">${safeSubject}</p>
            </div>
            <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
              Tim kami akan merespons dalam 1x24 jam kerja. Jika Anda memerlukan respons lebih cepat, silakan hubungi kami melalui WhatsApp.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/${WHATSAPP_NUMBER}" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0;">HOVTECH Automation | hovtechautomation.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (error: unknown) {
    console.error('Contact form error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message === 'RESEND_API_KEY is not configured') {
      return NextResponse.json(
        { success: false, error: 'Layanan email sedang dikonfigurasi. Silakan coba lagi nanti.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
