// Contentful REST API client — Edge-compatible (no Node.js SDK required)
// Uses Contentful Delivery API directly via fetch()

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const BASE_URL = spaceId
  ? `https://cdn.contentful.com/spaces/${spaceId}`
  : null;

// ==================== In-Memory Cache (Edge-Safe) ====================
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

// ==================== Types ====================

export interface ContentfulSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  contentType?: { sys: { id: string } };
}

export interface ContentfulEntry<T = any> {
  sys: ContentfulSys;
  fields: T;
}

// ==================== CONTENT_TYPES ====================

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

// ==================== API Helper ====================

interface ContentfulResponse {
  sys: { type: string };
  total: number;
  skip: number;
  limit: number;
  items: any[];
  includes?: {
    Entry?: any[];
    Asset?: any[];
  };
}

async function contentfulFetch(endpoint: string, params: Record<string, any> = {}): Promise<ContentfulResponse> {
  if (!BASE_URL || !accessToken) {
    throw new Error('Contentful environment variables are not configured');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('access_token', accessToken);
  // Always include linked resources (up to 10 levels) to match SDK behavior
  params.include = params.include ?? 10;
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Contentful API error [${response.status}]: ${text}`);
    throw new Error(`Contentful API error: ${response.status}`);
  }

  return response.json();
}

// ==================== Contentful Fetch Functions ====================

export async function getEntries(contentType: string, options?: Record<string, unknown>): Promise<ContentfulEntry[]> {
  const cacheKey = getCacheKey(contentType, options);
  const cached = getCached<ContentfulEntry[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await contentfulFetch('/entries', {
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

export async function getFirstEntry(contentType: string, options?: Record<string, unknown>): Promise<ContentfulEntry | null> {
  const cacheKey = getCacheKey(contentType, { ...options, limit: 1, _first: true });
  const cached = getCached<ContentfulEntry | null>(cacheKey);
  if (cached !== null) return cached;

  try {
    const response = await contentfulFetch('/entries', {
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

export async function getEntryBySlug(contentType: string, slug: string): Promise<ContentfulEntry | null> {
  const cacheKey = getCacheKey(contentType, { slug });
  const cached = getCached<ContentfulEntry | null>(cacheKey);
  if (cached !== null) return cached;

  try {
    const response = await contentfulFetch('/entries', {
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
  const cacheKey = `slugs:${contentType}`;
  const cached = getCached<string[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await contentfulFetch('/entries', {
      content_type: contentType,
      select: 'fields.slug',
    });
    const slugs = response.items
      .map((item: any) => item.fields?.slug)
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
