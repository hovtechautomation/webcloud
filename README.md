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
│   ├── page.tsx                      # Homepage (Contentful-driven sections)
│   ├── globals.css                   # Tailwind v4 + CSS variables
│   ├── robots.ts                     # Dynamic robots.txt generator
│   ├── sitemap.ts                    # Static sitemap (7 halaman)
│   ├── profile/page.tsx              # Profil perusahaan + timeline
│   ├── services/page.tsx             # Daftar layanan (Contentful + default)
│   ├── portfolio/
│   │   ├── page.tsx                  # Daftar portofolio + filter
│   │   └── [slug]/page.tsx           # Detail portofolio + galeri horizontal scroll
│   ├── products/
│   │   ├── page.tsx                  # Daftar produk + filter
│   │   └── [slug]/page.tsx           # Detail produk + galeri horizontal scroll
│   ├── artikel/
│   │   ├── page.tsx                  # Daftar artikel + filter
│   │   └── [slug]/page.tsx           # Detail artikel + RichText
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
│   │   ├── ProfileSection.tsx        # Profil + visi misi + aboutImage (1:1)
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
│       └── rich-text-renderer.tsx    # Contentful RichText renderer
└── lib/
    ├── contentful.ts                 # Contentful CMS client + helpers
    ├── utils.ts                      # cn() utility (Tailwind merge)
    └── db.ts                         # Prisma client (lokal, belum digunakan)
```

---

## Fitur

### Core Features
- **Mobile-first responsive** — Optimal di semua ukuran layar dengan breakpoint `sm/md/lg/xl`
- **Contentful CMS** — Konten dinamis dari Contentful dengan default fallback
  - ✅ Company Info (profil, kontak, aboutImage, sosmed)
  - ✅ Services (layanan dengan icon, features, gambar)
  - ✅ Portfolio (proyek dengan galeri, lokasi, tahun)
  - ✅ Products (produk dengan galeri, fitur, harga)
  - ✅ Articles (artikel dengan RichText, kategori, tanggal)
  - ✅ Clients & Partners (logo auto-scroll)
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
- **1:1 image ratio** — Gambar utama & galeri semua square (modern look)
- **Horizontal scroll gallery** — Galeri produk & portfolio dengan snap scroll
- **Description in hero** — Deskripsi/excerpt tampil di hero section, bukan di body

### SEO
- **Dynamic metadata** — Setiap halaman punya title, description, Open Graph, Twitter Cards
- **generateMetadata()** — Semua dynamic route punya metadata unik per konten
- **Sitemap** — `sitemap.xml` untuk Google Search Console
- **Robots.txt** — `robots.txt` dinamis yang mengizinkan semua crawler
- **Favicon** — Multi-format (.ico, .png, apple-touch-icon) untuk browser & PWA

### Bug Fixes Applied
- **Hydration mismatch fixed** — Captcha `Math.random()` dipindah ke `useEffect`, tidak lagi di `useState`
- **DialogContent accessibility** — `DialogTitle` dipindah ke dalam `DialogContent` di command.tsx
- **Contentful field mismatches** — Image Array vs Link, RichText rendering, field name corrections
- **Services page image** — Fixed `getAssetUrl` → `getFirstImageUrl` untuk Array-type image field

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
| **Company Info** | `companyInfo` | name, tagline, description, logo, whatsapp, email, address, instagram, facebook, phone, aboutImage, projectCount, clientCount, teamSize, visi, misi | Data perusahaan (single entry) |
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

# Push database schema (lokal, opsional)
bun run db:push
```

---

## Changelog

### v0.4.0 — Update Terbaru
- ✅ **XSS protection** — Semua user input di-escape sebelum masuk HTML email template (name, subject, message)
- ✅ **Rate limiting** — IP-based rate limiter: max 5 request/menit ke API kontak, auto-cleanup
- ✅ **Google Maps API Key** — Di-hardcode → pindah ke `NEXT_PUBLIC_GOOGLE_MAPS_KEY` env var, fallback embed gratis
- ✅ **Hapus duplicate robots.txt** — Hapus `public/robots.txt`, hanya pakai `src/app/robots.ts`
- ✅ **Hapus test API endpoint** — Hapus `GET /api` (return "Hello, world!")
- ✅ **Field length validation** — Max length: name(100), email(254), subject(200), message(5000)
- ✅ **IP logging di email** — IP pengirim ditampilkan di email notifikasi admin

### v0.3.0
- ✅ **ServicesSection Contentful integration** — Homepage & /services fetch dari Contentful, fallback 4/6 default services
- ✅ **aboutImage integration** — Field aboutImage dari Contentful ditampilkan di ProfileSection (1:1 square)
- ✅ **Hydration mismatch fix** — Captcha Math.random() dipindah ke useEffect (ContactSection + ContactForm)
- ✅ **DialogContent accessibility fix** — DialogTitle dipindah ke dalam DialogContent (command.tsx)
- ✅ **Image ratio 1:1** — Semua gambar utama detail page diganti ke aspect-square
- ✅ **Gallery horizontal scroll** — Galeri produk & portfolio: 1:1 square + snap scroll + hover zoom
- ✅ **Description in hero** — Deskripsi produk dipindah ke hero section (di bawah judul)
- ✅ **Services page image fix** — `getAssetUrl` → `getFirstImageUrl` untuk Array-type image field

### v0.2.0
- ✅ Contentful RichText rendering (portfolio, produk, artikel)
- ✅ generateMetadata() di semua dynamic routes
- ✅ Image field handling (Array vs Link)
- ✅ Full code analysis + README

### v0.1.0
- ✅ Initial website setup
- ✅ Contentful CMS integration
- ✅ Contact form + Resend email
- ✅ Auto-scroll clients & partners
- ✅ Social media links
- ✅ Mobile responsive optimization

---

## Roadmap Optimasi

### Sudah Diselesaikan ✅
| # | Issue | Status |
|---|---|---|
| 1 | generateMetadata() di dynamic routes | ✅ v0.2.0 |
| 2 | Contentful RichText rendering | ✅ v0.2.0 |
| 3 | Image field Array vs Link handling | ✅ v0.2.0 |
| 4 | Hydration mismatch (captcha Math.random) | ✅ v0.3.0 |
| 5 | DialogContent accessibility warning | ✅ v0.3.0 |
| 6 | ServicesSection Contentful integration | ✅ v0.3.0 |
| 7 | aboutImage integration | ✅ v0.3.0 |
| 8 | Image ratio 1:1 + gallery horizontal scroll | ✅ v0.3.0 |
| 9 | Description di hero section | ✅ v0.3.0 |
| 10 | Google Maps API Key hardcoded | ✅ v0.4.0 |
| 11 | XSS di email template | ✅ v0.4.0 |
| 12 | Rate limiting API kontak | ✅ v0.4.0 |
| 13 | Duplicate robots.txt | ✅ v0.4.0 |
| 14 | Test API endpoint leftover | ✅ v0.4.0 |

### Belum Dikerjakan

#### Prioritas Sedang 🟡
| # | Issue | Keterangan |
|---|---|---|
| 1 | `getCompanyInfo()` duplikat di 8+ file | Ekstrak ke `src/lib/company.ts` |
| 2 | `ContactForm.tsx` & `ContactSection.tsx` duplikat | ~440 baris form duplikat. Gabungkan |
| 3 | 3 list client komponen hampir identik | Bisa dijadikan generic `<FilterableGrid>` |
| 4 | `force-dynamic` + `revalidate = 0` semua halaman | Gunakan ISR `revalidate = 3600` |
| 5 | Sitemap hanya halaman statis | Artikel, portofolio, produk belum masuk sitemap |
| 6 | Tidak ada `loading.tsx` | Tidak ada skeleton loading saat navigasi |
| 7 | Tidak ada `not-found.tsx` | Halaman 404 default Next.js (kurang branding) |
| 8 | Tidak ada `error.tsx` | Error boundary tidak ada |

#### Prioritas Rendah 🟢
| # | Issue | Keterangan |
|---|---|---|
| 9 | ~30 dependency unused | `next-auth`, `next-intl`, `@dnd-kit/*`, `zustand`, dll |
| 10 | ~29 shadcn/ui components unused | Hanya 7 yang dipakai: button, sheet, input, textarea, label, toast, toaster |
| 11 | Prisma setup unused | `db.ts`, `prisma/schema.prisma`, `db/custom.db` tidak digunakan |
| 12 | ESLint rules hampir semua off | Linter tidak menangkap error meaningful |
| 13 | Dark mode CSS ada tapi tidak bisa diakses | Variabel dark theme ada tapi tidak ada toggle |
| 14 | `ignoreBuildErrors: true` | TypeScript error di-suppress |

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
