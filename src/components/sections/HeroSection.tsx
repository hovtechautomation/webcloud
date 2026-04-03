import { Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  badge?: string;
  whatsapp?: string;
}

export default function HeroSection({
  title = 'Solusi Otomasi Industri',
  highlight = '& IoT Terpercaya.',
  description = 'Spesialisasi kami di bidang automation control: PLC, Microcontroller, SCADA, HMI, PCB, Aplikasi, WEB, coding, dan project custom sesuai request Anda.',
  badge = 'PT Hovtech Automation Indonesia',
  whatsapp = '6285733118439',
}: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-24 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 rounded-full border border-orange-500/20">
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 sm:mb-8 leading-[1.15] sm:leading-[1.1] tracking-tight">
              {title}{' '}
              <span className="text-orange-500">{highlight}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-10 leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 gap-2 shadow-xl shadow-orange-900/20 w-full sm:w-auto h-12 sm:h-auto">
                  Konsultasi Project
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </a>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 w-full sm:w-auto h-12 sm:h-auto text-sm sm:text-base">
                  Lihat Portofolio
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual - Show subtle version on mobile too */}
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-600/20 to-blue-600/20 border border-slate-700 flex items-center justify-center relative overflow-hidden">
              <Cpu className="w-48 h-48 text-orange-500/30 animate-pulse" />
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-slate-500" />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-only: Small decorative element */}
          <div className="relative lg:hidden flex justify-center">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-600/10 to-blue-600/10 border border-slate-700/50 flex items-center justify-center">
              <Cpu className="w-16 h-16 text-orange-500/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-600/5 blur-[80px] sm:blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/5 blur-[80px] sm:blur-[120px] rounded-full" />
    </section>
  );
}
