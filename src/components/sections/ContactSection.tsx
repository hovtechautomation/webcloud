'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, MessageCircle, Mail, Send, CheckCircle2, Loader2, RefreshCw, ShieldCheck, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactSectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  address?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', 'x'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer: number;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      const [larger, smaller] = num1 > num2 ? [num1, num2] : [num2, num1];
      answer = larger - smaller;
      break;
    case 'x':
      const s1 = Math.min(num1, 5);
      const s2 = Math.min(num2, 5);
      answer = s1 * s2;
      return { num1: s1, num2: s2, operator: 'x', answer };
    default:
      answer = num1 + num2;
  }
  return { num1, num2, operator, answer };
}

export default function ContactSection({
  title = 'Siap Memulai',
  highlight = 'Project',
  description = 'Diskusikan kebutuhan otomasi Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik.',
  address = 'Jemur Wonosari Kec Wonocolo Surabaya, Indonesia 60237',
  whatsapp = '6285733118439',
  email = 'info@hovtechautomation.com',
  instagram = 'https://instagram.com/hovtech.id',
  facebook = 'https://www.facebook.com/mohrifqi17',
}: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const formLoadTime = useRef(Date.now());
  const [timeError, setTimeError] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
    formLoadTime.current = Date.now();
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError('');
  };

  const validateCaptcha = (): boolean => {
    if (formData.website) return false;
    const timeElapsed = (Date.now() - formLoadTime.current) / 1000;
    if (timeElapsed < 2) {
      setTimeError('Terlalu cepat! Mohon tunggu sebentar.');
      return false;
    }
    setTimeError('');
    const userAnswer = parseInt(captchaInput, 10);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      setCaptchaError('Jawaban salah. Silakan coba lagi.');
      refreshCaptcha();
      return false;
    }
    setCaptchaError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCaptcha()) {
      if (formData.website) { setStatus('success'); return; }
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setCaptchaInput('');
        setCaptcha(generateCaptcha());
        formLoadTime.current = Date.now();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Gagal mengirim pesan.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Gagal terhubung ke server.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl md:rounded-[2rem] p-5 sm:p-8 md:p-12 lg:p-16 shadow-sm border border-slate-100">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
              Hubungi Kami
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              {title}{' '}
              <span className="text-orange-600">{highlight}</span> Anda?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto px-4">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6">
              {/* Address */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-orange-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Lokasi Workshop</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{address}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-green-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">WhatsApp</h4>
                  <p className="text-green-600 font-medium text-xs sm:text-sm">
                    +{whatsapp.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2-$3-$4')}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Email</h4>
                  <p className="text-blue-600 font-medium text-xs sm:text-sm">{email}</p>
                </div>
              </a>

              {/* Mobile Quick Contact */}
              <div className="flex gap-3 lg:hidden pt-2">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl gap-2 h-11 text-sm font-semibold">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href={`mailto:${email}`} className="flex-1">
                  <Button variant="outline" className="w-full rounded-xl gap-2 h-11 text-sm">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-6 sm:pt-8">
                <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
                  Ikuti Kami
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Instagram</span>
                  </a>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
                Kirim Pesan
              </h3>
              <p className="text-slate-500 mb-5 sm:mb-8 text-xs sm:text-sm">
                Punya pertanyaan atau butuh penawaran? Pesan akan langsung dikirim ke email kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="name" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nama Lengkap
                    </Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Budi Santoso"
                      className="bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-200 h-11 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Anda
                    </Label>
                    <Input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="budi@email.com"
                      className="bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-200 h-11 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="subject" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subjek
                  </Label>
                  <Input
                    required
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tanya Harga PLC"
                    className="bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-200 h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="message" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pesan Anda
                  </Label>
                  <Textarea
                    required
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan detail kebutuhan project Anda..."
                    className="bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-200 resize-none text-sm"
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="absolute -left-[9999px] w-0 h-0 opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Math Captcha */}
                <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    <span className="font-medium">Verifikasi Keamanan</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-base sm:text-lg font-bold text-slate-800">
                        {captcha.num1} {captcha.operator} {captcha.num2} = ?
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Refresh"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Input
                      required
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Jawaban"
                      className="w-28 sm:w-32 bg-white border-slate-200 focus:border-orange-500 focus:ring-orange-200 h-11 text-sm"
                    />
                    <span className="text-[10px] sm:text-xs text-slate-500 hidden sm:inline">
                      Isi jawaban untuk verifikasi
                    </span>
                  </div>
                  {captchaError && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{captchaError}</p>}
                  {timeError && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{timeError}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-5 sm:py-6 rounded-xl font-bold gap-2 transition-all text-sm sm:text-base h-12 sm:h-auto ${
                    status === 'success'
                      ? 'bg-green-600 hover:bg-green-600'
                      : 'bg-slate-900 hover:bg-orange-600'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      Terkirim!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      Kirim Sekarang
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-[10px] sm:text-xs text-center font-medium"
                    >
                      {errorMessage || 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.'}
                    </motion.p>
                  )}
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-600 text-[10px] sm:text-xs text-center font-medium"
                    >
                      Terima kasih! Pesan Anda telah kami terima. Cek email Anda untuk konfirmasi.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
