import { getFirstEntry, CONTENT_TYPES, getAssetUrl } from './contentful';

export interface CompanyInfo {
  name: string;
  tagline: string;
  description?: string;
  logo: any;
  whatsapp: string;
  email: string;
  address?: string;
  phone?: string;
  instagram: string;
  facebook: string;
  projectCount?: number;
  clientCount?: number;
  teamSize?: number;
  visi?: string;
  misi?: string;
  aboutImage?: any;
}

const defaultCompanyInfo: CompanyInfo = {
  name: 'HOVTECH',
  tagline: 'Automation & IoT',
  description: 'PT Hovtech Automation Indonesia adalah perusahaan yang bergerak di bidang solusi otomasi industri dan Internet of Things (IoT). Kami menyediakan layanan pemrograman PLC, SCADA, HMI, desain PCB, serta integrasi sistem IoT untuk berbagai kebutuhan industri.',
  logo: null,
  whatsapp: '6285733118439',
  email: 'info@hovtech.id',
  address: 'Jemur Wonosari Kec Wonocolo Surabaya, Indonesia 60237',
  phone: '+62 857-3311-8439',
  instagram: 'https://instagram.com/hovtech.id',
  facebook: 'https://www.facebook.com/mohrifqi17',
  projectCount: 50,
  clientCount: 50,
  teamSize: 25,
  visi: 'Menjadi perusahaan teknologi terdepan di Indonesia dalam menyediakan solusi otomasi industri dan IoT yang inovatif dan terpercaya.',
  misi: 'Memberikan solusi teknologi yang efisien, handal, dan mudah diimplementasikan untuk meningkatkan produktivitas industri Indonesia.',
  aboutImage: null,
};

export async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const entry = await getFirstEntry(CONTENT_TYPES.COMPANY_INFO);
    if (entry && entry.fields) {
      return {
        ...defaultCompanyInfo,
        name: (entry.fields.name as string) || defaultCompanyInfo.name,
        tagline: (entry.fields.tagline as string) || defaultCompanyInfo.tagline,
        description: (entry.fields.description as string) || defaultCompanyInfo.description,
        logo: entry.fields.logo,
        whatsapp: (entry.fields.whatsapp as string) || defaultCompanyInfo.whatsapp,
        email: (entry.fields.email as string) || defaultCompanyInfo.email,
        address: (entry.fields.address as string) || defaultCompanyInfo.address,
        phone: (entry.fields.phone as string) || defaultCompanyInfo.phone,
        instagram: (entry.fields.instagram as string) || defaultCompanyInfo.instagram,
        facebook: (entry.fields.facebook as string) || defaultCompanyInfo.facebook,
        projectCount: (entry.fields.projectCount as number) ?? defaultCompanyInfo.projectCount,
        clientCount: (entry.fields.clientCount as number) ?? defaultCompanyInfo.clientCount,
        teamSize: (entry.fields.teamSize as number) ?? defaultCompanyInfo.teamSize,
        visi: (entry.fields.visi as string) || defaultCompanyInfo.visi,
        misi: (entry.fields.misi as string) || defaultCompanyInfo.misi,
        aboutImage: entry.fields.aboutImage,
      };
    }
    return defaultCompanyInfo;
  } catch {
    return defaultCompanyInfo;
  }
}

export { defaultCompanyInfo };
