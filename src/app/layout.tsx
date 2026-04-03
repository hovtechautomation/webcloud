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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
