'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', 'x'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let answer: number;
  switch (operator) {
    case '+': answer = num1 + num2; break;
    case '-': { const [a, b] = num1 > num2 ? [num1, num2] : [num2, num1]; answer = a - b; break; }
    case 'x': answer = Math.min(num1, 5) * Math.min(num2, 5); break;
    default: answer = num1 + num2;
  }
  return { num1: operator === 'x' ? Math.min(num1, 5) : num1, num2: operator === 'x' ? Math.min(num2, 5) : num2, operator, answer };
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const formLoadTime = useRef(Date.now());

  useEffect(() => { setCaptcha(generateCaptcha()); formLoadTime.current = Date.now(); }, []);

  const refreshCaptcha = () => { setCaptcha(generateCaptcha()); setCaptchaInput(''); setCaptchaError(''); };

  const validateCaptcha = (): boolean => {
    if (formData.website) return false;
    if ((Date.now() - formLoadTime.current) / 1000 < 2) return false;
    const userAnswer = parseInt(captchaInput, 10);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) { setCaptchaError('Jawaban salah.'); refreshCaptcha(); return false; }
    setCaptchaError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCaptcha()) { if (formData.website) { setStatus('success'); return; } return; }
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setCaptchaInput(''); setCaptcha(generateCaptcha()); formLoadTime.current = Date.now();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="cf-name" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Nama</Label>
          <Input required id="cf-name" name="name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Budi Santoso" className="bg-slate-50 border-slate-200 h-11 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cf-email" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Email</Label>
          <Input required type="email" id="cf-email" name="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="budi@email.com" className="bg-slate-50 border-slate-200 h-11 text-sm" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cf-subject" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Subjek</Label>
        <Input required id="cf-subject" name="subject" value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Tanya Harga PLC" className="bg-slate-50 border-slate-200 h-11 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cf-message" className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">Pesan</Label>
        <Textarea required id="cf-message" name="message" rows={4} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Detail kebutuhan project Anda..." className="bg-slate-50 border-slate-200 resize-none text-sm" />
      </div>
      <input type="text" name="website" value={formData.website} onChange={(e) => setFormData(p => ({ ...p, website: e.target.value }))} className="absolute -left-[9999px] w-0 h-0 opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="space-y-2 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600"><ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" /><span className="font-medium">Verifikasi</span></div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-base sm:text-lg font-bold text-slate-800">{captcha.num1} {captcha.operator} {captcha.num2} = ?</span>
          </div>
          <button type="button" onClick={refreshCaptcha} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"><RefreshCw className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Input required type="number" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Jawaban" className="w-28 sm:w-32 bg-white border-slate-200 h-11 text-sm" />
        </div>
        {captchaError && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{captchaError}</p>}
      </div>
      <Button type="submit" disabled={status === 'loading' || status === 'success'} className={`w-full py-5 rounded-xl font-bold gap-2 text-sm sm:text-base h-12 ${status === 'success' ? 'bg-green-600' : 'bg-slate-900 hover:bg-orange-600'}`}>
        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</> : status === 'success' ? <><CheckCircle2 className="w-4 h-4" /> Terkirim!</> : <><Send className="w-4 h-4" /> Kirim Sekarang</>}
      </Button>
      <AnimatePresence>
        {status === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500 text-[10px] sm:text-xs text-center font-medium">{errorMessage || 'Terjadi kesalahan. Coba lagi atau hubungi via WhatsApp.'}</motion.p>}
        {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-600 text-[10px] sm:text-xs text-center font-medium">Terima kasih! Pesan Anda telah kami terima. Cek email Anda untuk konfirmasi.</motion.p>}
      </AnimatePresence>
    </form>
  );
}
