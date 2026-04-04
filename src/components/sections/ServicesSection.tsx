import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export interface Service {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl: string;
  icon?: string;
  features?: string[];
  order?: number;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

export default function ServicesSection({
  title = 'Layanan Kami',
  subtitle = 'Menyediakan solusi teknis menyeluruh untuk kebutuhan otomasi dan sistem kontrol Anda.',
  services = [],
}: ServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 bg-slate-50">
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

        {/* Services Grid - 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all"
            >
              {/* Icon badge (if available from Contentful) */}
              {service.icon && (
                <div className="pt-4 px-4 sm:pt-5 sm:px-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-lg sm:text-xl">
                    {service.icon}
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {service.description}
                </p>

                {/* Features list (if available) */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-600 flex-shrink-0" />
                        <span className="text-slate-600 text-xs sm:text-xs leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
