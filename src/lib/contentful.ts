import { createClient, type Entry, type Asset } from 'contentful';

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient = spaceId && accessToken
  ? createClient({ space: spaceId, accessToken })
  : null;

export const CONTENT_TYPES = {
  COMPANY_INFO: 'companyInfo',
  SERVICE: 'service',
  PRODUCT: 'product',
  PORTFOLIO: 'portfolio',
  TEAM_MEMBER: 'teamMember',
  MILESTONE: 'milestone',
  WHY_CHOOSE_US: 'whyChooseUs',
  CLIENT: 'client',
  ARTICLE: 'article',
} as const;

// ==================== In-Memory Cache (Edge-Safe) ====================
// Works per-isolate on Cloudflare Workers. Provides caching within
// a single isolate's lifetime. For cross-request persistence, use
// Cloudflare KV or Cache API.
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  if (entry) cache.delete(key); // expired
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

function getCacheKey(contentType: string, options?: Record<string, unknown>): string {
  return `${contentType}:${JSON.stringify(options || {})}`;
}

// ==================== Contentful Fetch Functions ====================

export async function getEntries(contentType: string, options?: Record<string, unknown>): Promise<Entry<any>[]> {
  if (!contentfulClient) return [];

  const cacheKey = getCacheKey(contentType, options);
  const cached = getCached<Entry<any>[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      ...options,
    });
    setCache(cacheKey, response.items);
    return response.items;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export async function getFirstEntry(contentType: string, options?: Record<string, unknown>): Promise<Entry<any> | null> {
  if (!contentfulClient) return null;

  const cacheKey = getCacheKey(contentType, { ...options, limit: 1, _first: true });
  const cached = getCached<Entry<any> | null>(cacheKey);
  if (cached !== null) return cached;

  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      limit: 1,
      ...options,
    });
    const result = response.items[0] || null;
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

export function getAssetUrl(asset: any): string | undefined {
  if (!asset?.fields?.file?.url) return undefined;
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

export async function getEntryBySlug(contentType: string, slug: string): Promise<Entry<any> | null> {
  if (!contentfulClient) return null;

  const cacheKey = getCacheKey(contentType, { slug });
  const cached = getCached<Entry<any> | null>(cacheKey);
  if (cached !== null) return cached;

  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1,
    });
    const result = response.items[0] || null;
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching ${contentType} by slug:`, error);
    return null;
  }
}

export async function getAllSlugs(contentType: string): Promise<string[]> {
  if (!contentfulClient) return [];

  const cacheKey = `slugs:${contentType}`;
  const cached = getCached<string[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      select: ['fields.slug'] as any,
    });
    const slugs = response.items
      .map((item: any) => item.fields.slug)
      .filter((slug: string | undefined): slug is string => !!slug);
    setCache(cacheKey, slugs);
    return slugs;
  } catch (error) {
    console.error(`Error fetching slugs for ${contentType}:`, error);
    return [];
  }
}

export function getGalleryUrls(gallery: any[]): string[] {
  if (!Array.isArray(gallery)) return [];
  return gallery
    .map((asset) => getAssetUrl(asset))
    .filter((url): url is string => !!url);
}

export function getFirstImageUrl(image: any): string | undefined {
  // Handle single Link (Asset)
  if (image && !Array.isArray(image)) return getAssetUrl(image);
  // Handle Array of Link (Asset)
  if (Array.isArray(image) && image.length > 0) return getAssetUrl(image[0]);
  return undefined;
}

export function getImageUrls(images: any): string[] {
  // Handle single Link
  if (images && !Array.isArray(images)) {
    const url = getAssetUrl(images);
    return url ? [url] : [];
  }
  // Handle Array
  if (Array.isArray(images)) return getGalleryUrls(images);
  return [];
}
