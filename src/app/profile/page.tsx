import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Target, Eye, Users, Award, Briefcase, GraduationCap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCompanyInfo } from '@/lib/company';
import { getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';
import ClientsPartnersSection from '@/components/sections/ClientsPartnersSection';

export const metadata: Metadata = {
  title: 'Profil Perusahaan',
  description: 'Mengenal lebih dekat PT Hovtech Automation Indonesia - solusi otomasi industri terpercaya.',
};

export const revalidate = 3600;

const defaultMilestones = [
  { _id: '1', year: '2018', title: 'Pendirian Perusahaan', description: 'HOVTECH didirikan dengan fokus pada solusi otomasi industri.' },
  { _id: '2', year: '2019', title: 'Proyek Pertama', description: 'Menyelesaikan proyek otomasi pabrik pertama untuk klien manufaktur.' },
  { _id: '3', year: '2020', title: 'Ekspansi IoT', description: 'Memulai divisi IoT dan smart systems untuk monitoring jarak jauh.' },
  { _id: '4', year: '2021', title: '100+ Proyek', description: 'Mencapai milestone 100+ proyek berhasil dengan tingkat kepuasan tinggi.' },
  { _id: '5', year: '2022', title: 'Sertifikasi ISO', description: 'Mendapatkan sertifikasi ISO 9001:2015 untuk sistem manajemen mutu.' },
  { _id: '6', year: '2023', title: 'Ekspansi Regional', description: 'Memperluas layanan ke seluruh Indonesia dan Asia Tenggara.' },
];

async function getMilestones() {
  try {
    const entries = await getEntries(CONTENT_TYPES.MILESTONE, { order: 'fields.year' });
    if (entries.length > 0) {
      return entries.map((item: any) => ({
        _id: item.sys.id,
        year: String(item.fields.year) || '',
        title: (item.fields.title as string) || '',
        description: (item.fields.description as string) || '',
      }));
    }
    return defaultMilestones;
  } catch { return defaultMilestones; }
}

export default async function ProfilePage() {
  const companyInfo = await getCompanyInfo();
  const milestones = await getMilestones();

  const achievements = [
    { icon: Award, value: companyInfo.projectCount, label: 'Proyek Selesai' },
    { icon: Users, value: companyInfo.clientCount, label: 'Klien Aktif' },
    { icon: Briefcase, value: 6, label: 'Tahun Pengalaman' },
    { icon: GraduationCap, value: companyInfo.teamSize, label: 'Tim Profesional' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Profil Perusahaan</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Mengenal lebih dekat PT Hovtech Automation Indonesia.</p>
          </div>
        </section>

        {/* About */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Tentang {companyInfo.name}</h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">{companyInfo.description}</p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 relative">
                  <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600" alt="HOVTECH" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Visi</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{companyInfo.visi}</p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Misi</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{companyInfo.misi}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{item.value}+</p>
                  <p className="text-orange-100 text-xs sm:text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Perjalanan Kami</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">Milestone penting dalam pengembangan HOVTECH.</p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
              <div className="space-y-6 sm:space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone._id} className="relative pl-12 sm:pl-16">
                    <div className="absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 rounded-full border-2 border-white shadow z-10" />
                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-100 shadow-sm">
                      <span className="text-orange-600 font-bold text-sm sm:text-base">{milestone.year}</span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 sm:mt-2">{milestone.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 sm:mt-2">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <ClientsPartnersSection />

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Siap Berkolaborasi?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">Hubungi kami untuk mendiskusikan kebutuhan otomasi dan IoT Anda.</p>
            <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors text-sm sm:text-base">
              <MessageCircle className="w-5 h-5" /> Hubungi Kami
            </a>
          </div>
        </section>
      </main>

      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}
