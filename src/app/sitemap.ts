import type { MetadataRoute } from 'next';
import { getPublishedServices } from '@/lib/repositories/service.repository';
import { getPublishedBlogPosts } from '@/lib/repositories/blog.repository';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sessions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/connect`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic session routes
  let sessionRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await getPublishedServices();
    sessionRoutes = services.map((service) => ({
      url: `${baseUrl}/sessions/${service.slug}`,
      lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch (err) {
    console.error('[Sitemap] Failed to fetch services:', err);
  }

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedBlogPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (err) {
    console.error('[Sitemap] Failed to fetch blog posts:', err);
  }

  return [...staticRoutes, ...sessionRoutes, ...blogRoutes];
}
