import {
  ShieldCheck,
  Coffee,
  Map,
  Zap,
  ThumbsUp,
  Clock,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhyChooseUsItem {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

interface WhyChooseUsSectionProps {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  whatsapp?: string;
  items?: WhyChooseUsItem[];
}

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Coffee,
  Map,
  Zap,
  ThumbsUp,
  Clock,
  Shield: ShieldCheck,
  Users: ThumbsUp,
  Award: ThumbsUp,
  CheckCircle: ShieldCheck,
  Star: Zap,
  Heart: ThumbsUp,
};

const defaultItems: WhyChooseUsItem[] = [
  { _id: '1', title: 'Keahlian Teruji', description: 'Tim ahli berpengalaman menangani berbagai skala project otomasi.', icon: 'ShieldCheck', order: 1 },
  { _id: '2', title: 'Free Konsultasi', description: 'Bebas biaya diskusi teknis sebelum kontrak. Tanpa tekanan.', icon: 'Coffee', order: 2 },
  { _id: '3', title: 'Integrasi On-Site', description: 'Siap terjun langsung ke lokasi Anda untuk instalasi sempurna.', icon: 'Map', order: 3 },
  { _id: '4', title: 'Solusi Tepat Guna', description: 'Desain kustom yang menjawab tantangan spesifik Anda.', icon: 'Zap', order: 4 },
  { _id: '5', title: 'User Friendly', description: 'Sistem mudah dioperasikan dengan dokumentasi lengkap.', icon: 'ThumbsUp', order: 5 },
  { _id: '6', title: 'Support Responsif', description: 'Layanan maintenance dan bantuan teknis siap siaga.', icon: 'Clock', order: 6 },
];

const colorMap: Record<number, { bg: string; text: string }> = {
  1: { bg: 'bg-orange-50', text: 'text-orange-600' },
  2: { bg: 'bg-blue-50', text: 'text-blue-600' },
  3: { bg: 'bg-green-50', text: 'text-green-600' },
  4: { bg: 'bg-purple-50', text: 'text-purple-600' },
  5: { bg: 'bg-red-50', text: 'text-red-600' },
  6: { bg: 'bg-teal-50', text: 'text-teal-600' },
};

export default function WhyChooseUsSection({
  title = 'Mengapa Harus Kami?',
  subtitle = 'Kami memberikan lebih dari sekadar teknologi; kami memberikan solusi yang meyakinkan untuk pertumbuhan bisnis Anda.',
  ctaTitle = 'Siap Mengotomasi Bisnis Anda?',
  ctaDescription = 'Dapatkan penawaran spesial dan konsultasi gratis untuk project pertama Anda bersama Hovtech.',
  ctaButtonText = 'Mulai Konsultasi',
  whatsapp = '6285733118439',
  items = defaultItems,
}: WhyChooseUsSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {subtitle}
          </p>
        </div>

        {/* Items Grid - 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon || 'ShieldCheck'] || ShieldCheck;
            const colors = colorMap[(index % 6) + 1];

            return (
              <div key={item._id} className="flex flex-col items-center text-center p-5 sm:p-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${colors.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colors.text}`} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Box - Better mobile layout */}
        <div className="mt-10 sm:mt-16 p-6 sm:p-8 md:p-12 bg-slate-900 rounded-2xl md:rounded-[2rem] relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
                {ctaTitle}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">{ctaDescription}</p>
            </div>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-shrink-0"
            >
              <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-900/40 gap-2 h-12 text-sm sm:text-base whitespace-nowrap">
                {ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-orange-600/10 blur-[80px] sm:blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-blue-600/10 blur-[80px] sm:blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
}
