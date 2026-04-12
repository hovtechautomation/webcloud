import { MetadataRoute } from 'next';
import { getEntries, getAllSlugs, CONTENT_TYPES } from '@/lib/contentful';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hovtechautomation.com';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/profile`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/artikel`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];

  // Dynamic pages from Contentful
  const dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const [portfolioSlugs, productSlugs, articleSlugs] = await Promise.all([
      getAllSlugs(CONTENT_TYPES.PORTFOLIO),
      getAllSlugs(CONTENT_TYPES.PRODUCT),
      getAllSlugs(CONTENT_TYPES.ARTICLE),
    ]);

    for (const slug of portfolioSlugs) {
      dynamicPages.push({ url: `${baseUrl}/portfolio/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    }
    for (const slug of productSlugs) {
      dynamicPages.push({ url: `${baseUrl}/products/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
    }
    for (const slug of articleSlugs) {
      dynamicPages.push({ url: `${baseUrl}/artikel/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
