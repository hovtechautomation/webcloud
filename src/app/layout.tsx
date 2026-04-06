import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HOVTECH - Automation & IoT",
    template: "%s | HOVTECH - Automation & IoT",
  },
  description:
    "Jasa segala bidang automation control: PLC, Microcontroller, SCADA, HMI, PCB, Aplikasi, WEB, coding, dan project custom di Surabaya.",
  keywords: [
    "Hovtech",
    "Automation",
    "PLC",
    "SCADA",
    "HMI",
    "IoT",
    "Microcontroller",
    "PCB Design",
    "Surabaya",
    "Indonesia",
  ],
  authors: [{ name: "PT Hovtech Automation Indonesia" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "HOVTECH - Automation & IoT",
    description:
      "Solusi Otomasi Industri, IoT, dan Project Custom Terbaik di Surabaya.",
    url: "https://www.hovtechautomation.com/",
    siteName: "Hovtech Automation",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://www.hovtechautomation.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "HOVTECH Automation & IoT",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "HOVTECH - Automation & IoT",
    description:
      "Solusi Otomasi Industri, IoT, dan Project Custom Terbaik di Surabaya.",
    images: ["https://www.hovtechautomation.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'PT Hovtech Automation Indonesia',
        alternateName: 'HOVTECH',
        url: 'https://www.hovtechautomation.com',
        logo: 'https://www.hovtechautomation.com/favicon.jpg',
        description: 'Jasa segala bidang automation control: PLC, Microcontroller, SCADA, HMI, PCB, Aplikasi, WEB, coding, dan project custom di Surabaya.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jemur Wonosari Kec Wonocolo',
          addressLocality: 'Surabaya',
          addressRegion: 'Jawa Timur',
          postalCode: '60237',
          addressCountry: 'ID',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+62-857-3311-8439',
          contactType: 'customer service',
          availableLanguage: ['Indonesian', 'English'],
        },
        sameAs: [
          'https://instagram.com/hovtech.id',
          'https://www.facebook.com/mohrifqi17',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'HOVTECH Automation',
        url: 'https://www.hovtechautomation.com',
        description: 'Solusi Otomasi Industri, IoT, dan Project Custom Terbaik di Surabaya.',
        inLanguage: 'id-ID',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.hovtechautomation.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
