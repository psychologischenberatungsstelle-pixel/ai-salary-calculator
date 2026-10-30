import { MetadataRoute } from 'next';
import salariesData from '@/data/salaries.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deine-domain.de';

  const items = Array.isArray(salariesData) ? salariesData : (salariesData.calculators || []);

  const salaryUrls = items.map((item: any) => ({
    url: ${baseUrl}/${item.slug},
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...salaryUrls,
  ];
}