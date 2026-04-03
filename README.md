# HOVTECH Automation - Website

Website resmi **PT Hovtech Automation Indonesia** — Solusi Otomasi Industri & IoT terpercaya di Surabaya.

> **Live:** [hovtechautomation.com](https://www.hovtechautomation.com)
> **Repository:** [github.com/hovtechautomation/webhovtech](https://github.com/hovtechautomation/webhovtech)
> **Deploy:** Vercel (auto-deploy dari branch `main`)

---

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| **Next.js** | 16.x | React framework dengan App Router |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **shadcn/ui** | New York style | Komponen UI modern (Radix UI) |
| **Framer Motion** | 12.x | Animasi & transisi halus |
| **Contentful** | 11.x | Headless CMS untuk konten dinamis |
| **Resend** | 6.x | Email delivery service |
| **Lucide React** | 0.525.x | Icon library |
| **Bun** | 1.3.x | JavaScript runtime & package manager |

---

## Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (font, metadata, Toaster)
│   ├── page.tsx                      # Homepage (8 section)
│   ├── globals.css                   # Tailwind v4 + CSS variables
│   ├── robots.ts                     # Dynamic robots.txt generator
│   ├── sitemap.ts                    # Static sitemap (7 halaman)
│   ├── profile/page.tsx              # Profil perusahaan + timeline
│   ├── services/page.tsx             # Daftar layanan
│   ├── portfolio/
│   │   ├── page.tsx                  # Daftar portofolio + filter
│   │   └── [slug]/page.tsx           # Detail portofolio (dynamic)
│   ├── products/
│   │   ├── page.tsx                  # Daftar produk + filter
│   │   └── [slug]/page.tsx           # Detail produk (dynamic)
│   ├── artikel/
│   │   ├── page.tsx                  # Daftar artikel + filter
│   │   └── [slug]/page.tsx           # Detail artikel (dynamic)
│   ├── contact/page.tsx              # Kontak + form + peta + sosmed
│   └── api/
│       └── contact/route.ts          # API kirim email via Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Navigasi responsive + mobile sheet
│   │   ├── Footer.tsx                # Footer multi-kolom
│   │   └── FloatingWhatsApp.tsx      # Tombol WhatsApp melayang
│   ├── sections/
│   │   ├── HeroSection.tsx           # Hero banner + statistik
│   │   ├── ProfileSection.tsx        # Profil ringkas + visi misi
│   │   ├── ServicesSection.tsx       # Layanan utama
│   │   ├── ClientsPartnersSection.tsx        # Klien & partner (server)
│   │   ├── ClientsPartnersSectionClient.tsx  # Klien & partner auto-scroll (client)
│   │   ├── ArticlesSection.tsx       # Artikel terbaru
│   │   ├── WhyChooseUsSection.tsx    # Keunggulan perusahaan
│   │   └── ContactSection.tsx        # Form kontak + info + sosmed
│   ├── forms/
│   │   └── ContactForm.tsx           # Form kontak standalone (halaman /contact)
│   ├── clients/
│   │   ├── PortfolioListClient.tsx   # Grid portofolio + filter (client)
│   │   ├── ProductListClient.tsx     # Grid produk + filter (client)
│   │   └── ArticleListClient.tsx     # Grid artikel + filter (client)
│   └── ui/                           # ~35 shadcn/ui components
└── lib/
    ├── contentful.ts                 # Contentful CMS client + helpers
    ├── utils.ts                      # cn() utility (Tailwind merge)
    └── db.ts                         # Prisma client (lokal, belum digunakan)
```

---

## Fitur

### Core Features
- **Mobile-first responsive** — Optimal di semua ukuran layar dengan breakpoint `sm/md/lg/xl`
- **Contentful CMS** — Semua konten dinamis dari Contentful (profil, layanan, portofolio, produk, artikel)
- **Contact form + Email** — Form kontak dengan Resend, kirim ke `info@hovtechautomation.com`
- **Auto-reply email** — Konfirmasi otomatis ke pengirim
- **Anti-spam** — Math CAPTCHA + honeypot + timer check
- **Auto-scroll clients** — Section klien & partner horizontal auto-scroll + swipe

### UI/UX
- **Navbar sticky** — Navigasi responsif dengan sheet drawer di mobile
- **Floating WhatsApp** — Tombol WhatsApp melayang (mobile only)
- **Smooth animations** — Framer Motion untuk scroll reveal & transisi
- **44px touch targets** — Semua elemen interaktif memenuhi standar aksesibilitas
- **Social media links** — Instagram & Facebook di section kontak dan halaman /contact
- **Search & filter** — Pencarian + filter kategori di portofolio, produk, artikel

### SEO
- **Dynamic metadata** — Setiap halaman punya title, description, Open Graph, Twitter Cards
- **Sitemap** — `sitemap.xml` untuk Google Search Console
- **Robots.txt** — `robots.txt` dinamis yang mengizinkan semua crawler
- **Favicon** — Multi-format (.ico, .png, apple-touch-icon) untuk browser & PWA

---

## Environment Variables

Tambahkan di `.env.local` (lokal) dan **Vercel Dashboard** > Settings > Environment Variables:

```env
# === Contentful CMS (WAJIB - untuk konten dinamis) ===
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=4fk8hsc95cwp
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=<delivery_api_key>

# Contentful Preview (opsional)
CONTENTFUL_PREVIEW_ACCESS_TOKEN=<preview_api_key>

# === Resend Email (WAJIB - untuk form kontak) ===
RESEND_API_KEY=re_xxxxxxxxxxxx

# === Opsional ===
FROM_EMAIL=info@hovtechautomation.com     # default: info@hovtechautomation.com
TO_EMAIL=info@hovtechautomation.com       # default: info@hovtechautomation.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=<api_key>     # untuk peta di halaman kontak
```

### Setup Environment di Vercel
1. Buka **Vercel Dashboard** > project `webhovtech`
2. **Settings** > **Environment Variables**
3. Tambahkan semua variabel di atas
4. Centang **Production**, **Preview**, dan **Development**
5. Klik **Save** > **Redeploy**

> **Penting:** Tanpa `NEXT_PUBLIC_CONTENTFUL_*`, website akan menampilkan konten default/fallback.

---

## Sistem Email (Resend)

### Alur Kerja
```
User submit form
  → Validasi client-side (CAPTCHA + honeypot + timer)
  → POST /api/contact
  → Validasi server-side (field wajib, format email, panjang pesan)
  → Kirim email notifikasi ke admin (info@hovtechautomation.com)
  → Kirim auto-reply ke pengirim
  → Response JSON { success: true/false }
```

### Domain Verification
Domain `hovtechautomation.com` sudah diverifikasi di Resend. DNS records yang diperlukan:
| Type | Name | Value |
|---|---|---|
| **MX** | `send` | `feedback-smtp.us-east-1.amazonses.com` |
| **TXT (SPF)** | `send` | `v=spf1 include:amazonses.com ~all` |
| **TXT (DKIM)** | `resend._domainkey` | (DKIM key dari dashboard Resend) |

---

## Development

```bash
# Install dependencies
bun install

# Run development server (port 3000)
bun run dev

# Lint check
bun run lint

# Push database schema (lokal, opsional)
bun run db:push
```

---

## Contentful CMS

### Content Models
Website ini menggunakan 7 content model di Contentful:

| Model | ID | Keterangan |
|---|---|---|
| **Company Info** | `companyInfo` | Data perusahaan (nama, alamat, kontak, sosmed) |
| **Hero** | `hero` | Banner hero di homepage |
| **Service** | `service` | Daftar layanan |
| **Portfolio** | `portfolio` | Proyek portofolio |
| **Product** | `product` | Produk yang dijual |
| **Article** | `article` | Blog/artikel |
| **Client Partner** | `clientPartner` | Logo klien & partner |

### Fallback System
Semua halaman memiliki data default/fallback. Jika Contentful tidak tersedia atau environment variable belum dikonfigurasi, website tetap berfungsi dengan data default.

---

## Analisis & Roadmap Optimasi

### Status Saat Ini (v0.2.0)

#### Sudah Berfungsi
- [x] Homepage dengan 8 section lengkap
- [x] Halaman profil, layanan, portofolio, produk, artikel
- [x] Dynamic route untuk detail halaman
- [x] Form kontak dengan Resend (email ke admin + auto-reply)
- [x] Contentful CMS integration (semua 7 content model)
- [x] Responsive mobile-first design
- [x] SEO meta tags + sitemap + robots.txt
- [x] Social media links (Instagram & Facebook)
- [x] WhatsApp floating button
- [x] Auto-scroll clients & partners section

#### Perlu Diperbaiki (Prioritas Tinggi)

| # | Issue | File | Keterangan |
|---|---|---|---|
| 1 | Google Maps API Key hardcoded | `contact/page.tsx` | API key terekspos di source code. Pindahkan ke env var `NEXT_PUBLIC_GOOGLE_MAPS_KEY` |
| 2 | XSS di email template | `api/contact/route.ts` | Input user tidak di-escape sebelum dimasukkan ke HTML email. Gunakan `sanitize-html` |
| 3 | Tidak ada rate limiting | `api/contact/route.ts` | API kontak rentan spam. Tambahkan rate limiter berbasis IP |
| 4 | Tidak ada `generateMetadata()` di dynamic routes | `portfolio/[slug]`, `products/[slug]`, `artikel/[slug]` | Semua halaman detail punya title sama — buruk untuk SEO |
| 5 | Tidak ada `loading.tsx` | `src/app/` | Tidak ada skeleton loading saat navigasi |

#### Perlu Diperbaiki (Prioritas Sedang)

| # | Issue | Keterangan |
|---|---|---|
| 6 | `getCompanyInfo()` duplikat di 8+ file | Ekstrak ke `src/lib/company.ts` sebagai shared function |
| 7 | `ContactForm.tsx` & `ContactSection.tsx` duplikat | ~440 baris kode form duplikat. Gabungkan menjadi satu komponen |
| 8 | 3 list client komponen hampir identik | `PortfolioListClient`, `ProductListClient`, `ArticleListClient` bisa dijadikan generic `<FilterableGrid>` |
| 9 | `force-dynamic` + `revalidate = 0` di semua halaman | Nonaktifkan caching Next.js. Gunakan `revalidate = 3600` (ISR 1 jam) |
| 10 | Sitemap hanya halaman statis | Artikel, portofolio, produk belum masuk sitemap |
| 11 | Default data tidak konsisten | `projectCount=50` vs `200`, email `info@hovtech.id` vs `info@hovtechautomation.com` |
| 12 | `ignoreBuildErrors: true` | TypeScript error di-suppress, bisa masalah ke production |
| 13 | Tidak ada `not-found.tsx` | Halaman 404 default Next.js (kurang branding) |
| 14 | Tidak ada `error.tsx` | Error boundary tidak ada, error tampil raw Next.js page |

#### Perlu Diperbaiki (Prioritas Rendah)

| # | Issue | Keterangan |
|---|---|---|
| 15 | ~30 dependency unused | `next-auth`, `next-intl`, `@dnd-kit/*`, `zustand`, `@tanstack/*`, `recharts`, dll |
| 16 | ~29 shadcn/ui components unused | Hanya 7 yang dipakai: `button`, `sheet`, `input`, `textarea`, `label`, `toast`, `toaster` |
| 17 | Prisma setup unused | `db.ts`, `prisma/schema.prisma`, `db/custom.db` tidak digunakan |
| 18 | ESLint rules hampir semua off | Linter tidak menangkap error meaningful |
| 19 | Dark mode CSS ada tapi tidak bisa diakses | Variabel dark theme ada di `globals.css` tapi tidak ada toggle |
| 20 | Artikel tidak render rich text | Konten artikel plain text, `react-markdown` ada tapi belum dipakai |
| 21 | Duplicate `robots.txt` | `public/robots.txt` dan `src/app/robots.ts` bentrok |
| 22 | Test API endpoint leftover | `GET /api` return "Hello, world!" — unused |

---

## Deployment

### Vercel (Production)
- **Branch:** `main`
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Auto-deploy:** Aktif saat push ke `main`

### Local Development
```bash
# Clone repository
git clone https://github.com/hovtechautomation/webhovtech.git
cd webhovtech

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local sesuai konfigurasi

# Run development server
bun run dev
```

---

## Kontak & Informasi

| | |
|---|---|
| **Website** | [hovtechautomation.com](https://www.hovtechautomation.com) |
| **Email** | info@hovtechautomation.com |
| **WhatsApp** | +62 857-3311-8439 |
| **Instagram** | [@hovtech.id](https://instagram.com/hovtech.id) |
| **Facebook** | [HOVTECH](https://www.facebook.com/mohrifqi17) |
| **Lokasi** | Jemur Wonosari, Wonocolo, Surabaya 60237 |

---

## Lisensi

© 2025 PT Hovtech Automation Indonesia. All rights reserved.
