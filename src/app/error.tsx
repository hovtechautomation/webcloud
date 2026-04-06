'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Error Content */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-1 flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
            </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Terjadi Kesalahan
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-2">
            Maaf, something went wrong. Silakan coba lagi atau kembali ke beranda.
          </p>
          {error.digest && (
            <p className="text-slate-600 text-xs font-mono mb-8">
              Error ID: {error.digest}
            </p>
          )}
          {!error.digest && <div className="mb-8" />}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              onClick={reset}
              className="bg-orange-500 hover:bg-orange-600 rounded-full gap-2 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full gap-2 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full gap-2 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                <ArrowLeft className="w-4 h-4" />
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} PT Hovtech Automation Indonesia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
