import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'info@hovtechautomation.com';
const TO_EMAIL = process.env.TO_EMAIL || 'info@hovtechautomation.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // Basic spam check
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Pesan terlalu pendek. Minimal 10 karakter.' },
        { status: 400 }
      );
    }

    const resend = getResend();

    // Send notification email to company
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
              <h2 style="margin: 0 0 8px; color: #0f172a; font-size: 18px; font-weight: 700;">${subject}</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px; font-weight: 600;">Nama</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Waktu</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
              </tr>
            </table>
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
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

    // Send auto-reply to the sender
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
            <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">Halo ${name},</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
              Terima kasih telah menghubungi kami! Pesan Anda sudah kami terima dan akan segera kami proses.
            </p>
            <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #f97316; margin-bottom: 16px;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 4px; font-weight: 600;">Subjek Pesan Anda:</p>
              <p style="color: #0f172a; font-size: 14px; margin: 0; font-weight: 600;">${subject}</p>
            </div>
            <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
              Tim kami akan merespons dalam 1x24 jam kerja. Jika Anda memerlukan respons lebih cepat, silakan hubungi kami melalui WhatsApp.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://wa.me/6285733118439" style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
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
  } catch (error: any) {
    console.error('Contact form error:', error);

    if (error.message === 'RESEND_API_KEY is not configured') {
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
