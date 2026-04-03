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

export async function getEntries(contentType: string, options?: Record<string, unknown>): Promise<Entry<any>[]> {
  if (!contentfulClient) return [];
  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      ...options,
    });
    return response.items;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export async function getFirstEntry(contentType: string, options?: Record<string, unknown>): Promise<Entry<any> | null> {
  if (!contentfulClient) return null;
  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      limit: 1,
      ...options,
    });
    return response.items[0] || null;
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
  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching ${contentType} by slug:`, error);
    return null;
  }
}

export async function getAllSlugs(contentType: string): Promise<string[]> {
  if (!contentfulClient) return [];
  try {
    const response = await contentfulClient.getEntries({
      content_type: contentType,
      select: ['fields.slug'] as any,
    });
    return response.items
      .map((item: any) => item.fields.slug)
      .filter((slug: string | undefined): slug is string => !!slug);
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
