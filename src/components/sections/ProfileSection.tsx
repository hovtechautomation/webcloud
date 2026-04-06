import Image from 'next/image';

interface ProfileSectionProps {
  image?: string;
  title?: string;
  description?: string;
  description2?: string;
  projectCount?: number;
  visi?: string;
  misi?: string;
}

export default function ProfileSection({
  image = 'https://picsum.photos/seed/automation-profile/800/600',
  title = 'Profil Perusahaan',
  description = 'PT Hovtech Automation Indonesia adalah mitra terpercaya dalam solusi otomasi industri dan pengembangan sistem cerdas. Berbasis di Surabaya, kami berdedikasi untuk membantu industri meningkatkan efisiensi melalui teknologi terkini.',
  description2 = 'Dengan tim ahli yang berpengalaman dalam pemrograman PLC hingga pengembangan IoT, kami memastikan setiap solusi yang kami berikan tepat sasaran, andal, dan mudah dioperasikan.',
  projectCount = 50,
  visi = 'Menjadi pemimpin solusi otomasi di Indonesia.',
  misi = 'Memberikan inovasi teknologi yang efisien.',
}: ProfileSectionProps) {
  return (
    <section id="profile" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-1 lg:order-none">
            <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl relative">
              <Image
                src={image}
                alt="Hovtech Team"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Mobile: Show badge below image instead of overlapping */}
            <div className="mt-4 flex justify-center lg:hidden">
              <div className="bg-orange-600 text-white px-6 py-3 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold">{projectCount}+</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold opacity-80">
                  Project Selesai
                </p>
              </div>
            </div>
            {/* Desktop: Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hidden lg:block">
              <p className="text-3xl font-bold">{projectCount}+</p>
              <p className="text-xs uppercase tracking-widest font-semibold opacity-80">
                Project Selesai
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
              {title}
            </h2>
            <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
            <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              {description2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm sm:text-base">Visi</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{visi}</p>
              </div>
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm sm:text-base">Misi</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{misi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
