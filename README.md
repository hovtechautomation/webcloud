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
| **Tailwind CSS** | 4.x | Utility-first CSS framework (CSS-based config) |
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
│   ├── layout.tsx                    # Root layout (font, metadata, JSON-LD, Toaster)
│   ├── page.tsx                      # Homepage (Contentful-driven sections)
│   ├── globals.css                   # Tailwind v4 + CSS variables
│   ├── robots.ts                     # Dynamic robots.txt generator
│   ├── sitemap.ts                    # Dynamic sitemap (static + Contentful slugs)
│   ├── error.tsx                     # Custom error boundary page
│   ├── not-found.tsx                 # Custom 404 page
│   ├── loading.tsx                   # Loading skeleton page
│   ├── profile/page.tsx              # Profil perusahaan + timeline
│   ├── services/page.tsx             # Daftar layanan (Contentful + default)
│   ├── portfolio/
│   │   ├── page.tsx                  # Daftar portofolio + filter
│   │   └── [slug]/page.tsx           # Detail portofolio + galeri + breadcrumb
│   ├── products/
│   │   ├── page.tsx                  # Daftar produk + filter
│   │   └── [slug]/page.tsx           # Detail produk + galeri + breadcrumb
│   ├── artikel/
│   │   ├── page.tsx                  # Daftar artikel + filter
│   │   └── [slug]/page.tsx           # Detail artikel + RichText + breadcrumb
│   ├── contact/page.tsx              # Kontak + form + peta + sosmed
│   └── api/
│       └── contact/route.ts          # API kirim email via Resend (XSS-safe, rate-limited)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Navigasi responsive + active state + mobile sheet
│   │   └── Footer.tsx                # Footer + social links (IG, FB, WA)
│   ├── sections/
│   │   ├── HeroSection.tsx           # Hero banner + statistik
│   │   ├── ProfileSection.tsx        # Profil + visi misi + profileImage/aboutImage
│   │   ├── ServicesSection.tsx       # Layanan (Contentful + fallback)
│   │   ├── ClientsPartnersSection.tsx        # Klien & partner (server)
│   │   ├── ClientsPartnersSectionClient.tsx  # Auto-scroll horizontal (client)
│   │   ├── ArticlesSection.tsx       # Artikel terbaru
│   │   ├── WhyChooseUsSection.tsx    # Keunggulan perusahaan
│   │   └── ContactSection.tsx        # Form kontak + info + sosmed
│   ├── forms/
│   │   └── ContactForm.tsx           # Form kontak standalone (halaman /contact)
│   ├── clients/
│   │   ├── PortfolioListClient.tsx   # Grid portofolio + filter (client)
│   │   ├── ProductListClient.tsx     # Grid produk + filter (client)
│   │   └── ArticleListClient.tsx     # Grid artikel + filter (client)
│   └── ui/                           # shadcn/ui components
│       ├── button.tsx                # shadcn/ui Button
│       ├── sheet.tsx                 # shadcn/ui Sheet (mobile nav)
│       ├── input.tsx                 # shadcn/ui Input
│       ├── textarea.tsx              # shadcn/ui Textarea
│       ├── label.tsx                 # shadcn/ui Label
│       ├── toast.tsx                 # shadcn/ui Toast primitives
│       ├── toaster.tsx               # shadcn/ui Toaster (layout)
│       └── rich-text-renderer.tsx    # Contentful RichText renderer
└── lib/
    ├── company.ts                    # Shared CompanyInfo type + getCompanyInfo()
    ├── contentful.ts                 # Contentful CMS client + helpers
    └── utils.ts                      # cn() utility (Tailwind merge)
```

---

## Fitur

### Core Features
- **Mobile-first responsive** — Optimal di semua ukuran layar dengan breakpoint `sm/md/lg/xl`
- **Contentful CMS** — Konten dinamis dari Contentful dengan default fallback
  - ✅ Company Info (profil, kontak, profileImage, aboutImage, sosmed)
  - ✅ Services (layanan dengan icon, features, gambar)
  - ✅ Portfolio (proyek dengan galeri, lokasi, tahun)
  - ✅ Products (produk dengan galeri, fitur, harga)
  - ✅ Articles (artikel dengan RichText, kategori, tanggal)
  - ✅ Clients & Partners (logo auto-scroll)
- **Contact form + Email** — Form kontak dengan Resend, kirim ke `info@hovtechautomation.com`
- **Auto-reply email** — Konfirmasi otomatis ke pengirim (WA number dari Contentful)
- **Anti-spam** — Math CAPTCHA + honeypot + timer check
- **Auto-scroll clients** — Section klien & partner horizontal auto-scroll + swipe

### UI/UX
- **Navbar sticky + active state** — Navigasi responsif dengan highlight menu aktif
- **Smooth animations** — Framer Motion untuk scroll reveal & transisi
- **44px touch targets** — Semua elemen interaktif memenuhi standar aksesibilitas
- **Social media links** — WhatsApp, Instagram & Facebook di footer
- **Search & filter** — Pencarian + filter kategori di portofolio, produk, artikel
- **1:1 image ratio** — Gambar utama & galeri semua square (modern look)
- **Horizontal scroll gallery** — Galeri produk & portfolio dengan snap scroll
- **Breadcrumbs** — Visual breadcrumbs + JSON-LD di semua detail pages

### SEO
- **JSON-LD Structured Data** — Organization + WebSite schema di root layout
- **BreadcrumbList schema** — Schema.org breadcrumbs di portfolio/products/artikel detail
- **Dynamic metadata** — Setiap halaman punya title, description, Open Graph, Twitter Cards
- **OG Image** — Default og:image untuk link preview di social media
- **generateMetadata()** — Semua dynamic route punya metadata unik per konten
- **Dynamic sitemap** — `sitemap.xml` dengan slug dari Contentful
- **Robots.txt** — `robots.txt` dinamis yang mengizinkan semua crawler
- **Favicon** — Multi-format (.ico, .png, apple-touch-icon) untuk browser & PWA

### Security
- **XSS protection** — Semua user input di-escape sebelum masuk HTML email template
- **Rate limiting** — IP-based rate limiter: max 5 request/menit ke API kontak
- **Field validation** — Max length, format email, required fields

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

## Contentful CMS

### Content Models
Website ini menggunakan 7 content model di Contentful:

| Model | ID | Field Utama | Keterangan |
|---|---|---|---|
| **Company Info** | `companyInfo` | name, tagline, description, logo, whatsapp, email, address, instagram, facebook, phone, aboutImage, profileImage, projectCount, clientCount, teamSize, visi, misi | Data perusahaan (single entry) |
| **Service** | `service` | title, description, image (Array), icon, features (Array), order | Daftar layanan |
| **Portfolio** | `portfolio` | title, excerpt, content (RichText), image (Array), gallery (Array), category, location, year | Proyek portofolio |
| **Product** | `product` | name, description, content (RichText), image (Array), gallery (Array), category, features (Array), price | Produk |
| **Article** | `article` | title, excerpt, content (RichText), image (Array), category, publishedAt | Blog/artikel |
| **Client Partner** | `clientPartner` | name, logo, website | Logo klien & partner |
| **Why Choose Us** | `whyChooseUs` | title, description, icon | Keunggulan |

### Fallback System
Semua halaman memiliki data default/fallback:
- **Contentful tersedia + ada data** → Tampilkan data Contentful
- **Contentful kosong / error** → Tampilkan data default (hardcoded)
- **Environment variable belum dikonfigurasi** → Website tetap berfungsi dengan data default

### Image Field Types
Contentful menggunakan 2 tipe image field:
- **Link (single Asset)** → Diambil dengan `getAssetUrl()`
- **Array (multiple Assets)** → Diambil dengan `getFirstImageUrl()` atau `getGalleryUrls()`

---

## Development

```bash
# Install dependencies
bun install

# Run development server (port 3000)
bun run dev

# Lint check
bun run lint
```

---

## Changelog

### v0.6.0 — Update Terbaru
- ✅ **JSON-LD Structured Data** — Organization + WebSite schema di root layout
- ✅ **BreadcrumbList JSON-LD** — Schema.org breadcrumbs di portfolio/products/artikel detail
- ✅ **OG Image metadata** — Default og:image + twitter:image untuk social media preview
- ✅ **Active navigation state** — Navbar highlight menu aktif (desktop + mobile)
- ✅ **Visual breadcrumbs** — Breadcrumb navigation di 3 detail pages
- ✅ **Hapus FloatingWhatsApp** — Komponen dihapus (redundant dengan footer links)
- ✅ **Dead code cleanup** — Hapus Prisma, use-mobile hook, tailwind.config.ts
- ✅ **5 unused packages removed** — @prisma/client, prisma, next-themes, tailwindcss-animate, z-ai-web-dev-sdk

### v0.5.1 — Hotfix
- ✅ **tsconfig exclude** — Exclude `examples/` dan `mini-services/` dari TypeScript build
- ✅ **Font CSS fix** — Inter font CSS variable mapping diperbaiki
- ✅ **Detail pages companyInfo** — 3 detail pages pakai `getCompanyInfo()` dari Contentful
- ✅ **Toast delay fix** — TOAST_REMOVE_DELAY dari 1000000ms → 5000ms
- ✅ **WhatsApp dynamic** — Auto-reply WA number dari companyInfo (bukan hardcoded)
- ✅ **Footer social links** — Tambah Facebook & WhatsApp di footer
- ✅ **Strict Mode** — React Strict Mode di-enable, ignoreBuildErrors dihapus

### v0.5.0
- ✅ **Code dedup** — `getCompanyInfo()` diekstrak ke `src/lib/company.ts` (7 file)
- ✅ **ContactForm reuse** — `ContactSection` pakai `ContactForm` (~200 baris dihemat)
- ✅ **Custom 404 page** — `not-found.tsx` dengan branding HOVTECH
- ✅ **Loading skeleton** — `loading.tsx` skeleton saat navigasi
- ✅ **Error boundary** — `error.tsx` halaman error dengan tombol reset
- ✅ **Dynamic sitemap** — Slug artikel, portofolio, produk dari Contentful
- ✅ **47 unused packages removed** — Bersih dari deps tidak terpakai
- ✅ **41 unused UI components removed** — Hanya 8 komponen yang dipakai
- ✅ **ESLint clean** — 0 errors, 0 warnings

### v0.4.0
- ✅ **XSS protection** — Semua user input di-escape sebelum masuk HTML email template
- ✅ **Rate limiting** — IP-based rate limiter: max 5 request/menit ke API kontak
- ✅ **Google Maps API Key** — Pindah ke env var, fallback embed gratis
- ✅ **Hapus duplicate robots.txt** dan test API endpoint
- ✅ **Field length validation** — Max length untuk semua field
- ✅ **IP logging di email** — IP pengirim ditampilkan di email notifikasi

### v0.3.0
- ✅ **ServicesSection Contentful integration** — Homepage & /services dari Contentful
- ✅ **aboutImage integration** — Field aboutImage di ProfileSection
- ✅ **Hydration mismatch fix** — Captcha Math.random() dipindah ke useEffect
- ✅ **Image ratio 1:1** — Semua gambar utama detail page aspect-square
- ✅ **Gallery horizontal scroll** — Snap scroll + hover zoom
- ✅ **Description in hero** — Deskripsi dipindah ke hero section

### v0.2.0
- ✅ Contentful RichText rendering
- ✅ generateMetadata() di semua dynamic routes
- ✅ Image field handling (Array vs Link)

### v0.1.0
- ✅ Initial website setup
- ✅ Contentful CMS integration
- ✅ Contact form + Resend email
- ✅ Auto-scroll clients & partners
- ✅ Mobile responsive optimization

---

## Roadmap Optimasi

### Belum Dikerjakan

#### Prioritas Rendah 🟢
| # | Issue | Keterangan |
|---|---|---|
| 1 | Dark mode toggle | Variabel dark theme ada tapi tidak ada toggle UI |
| 2 | ISR optimization | `force-dynamic` masih diperlukan karena Contentful tidak tersedia saat build |
| 3 | OG Image file | Perlu membuat `public/og-image.png` (1200x630) untuk social media preview |

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
