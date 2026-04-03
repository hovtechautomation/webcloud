import Image from 'next/image';
import Link from 'next/link';

interface Service {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  features?: string[];
  order?: number;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    _id: '1',
    title: 'PLC & Microcontroller',
    description: 'Pemrograman PLC, SCADA, HMI, dan Microcontroller untuk otomasi industri.',
    image: {
      fields: {
        file: { url: '//images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600' },
      },
    },
    order: 1,
  },
  {
    _id: '2',
    title: 'PCB & Hardware Design',
    description: 'Jasa desain dan pembuatan PCB kustom sesuai kebutuhan project Anda.',
    image: {
      fields: {
        file: { url: '//images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600' },
      },
    },
    order: 2,
  },
  {
    _id: '3',
    title: 'IoT & Smart Systems',
    description: 'Integrasi sistem IoT untuk monitoring dan kontrol jarak jauh.',
    image: {
      fields: {
        file: { url: '//images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600' },
      },
    },
    order: 3,
  },
  {
    _id: '4',
    title: 'Prototyping & Production',
    description: 'Jasa pembuatan prototipe perangkat elektronik kustom hingga produksi massal.',
    image: {
      fields: {
        file: { url: '//images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600' },
      },
    },
    order: 4,
  },
];

function getImageUrl(image?: Service['image']): string {
  if (!image?.fields?.file?.url) return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600';
  const url = image.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

export default function ServicesSection({
  title = 'Layanan Kami',
  subtitle = 'Menyediakan solusi teknis menyeluruh untuk kebutuhan otomasi dan sistem kontrol Anda.',
  services = defaultServices,
}: ServicesSectionProps) {
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
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={getImageUrl(service.image)}
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
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
