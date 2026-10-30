import React from 'react';
import Link from 'next/link';
import salariesData from '@/data/salaries.json';

export default function RelatedLinks({ currentSlug }: { currentSlug?: string }) {
  const rawData: any = salariesData;
  const items = Array.isArray(rawData) ? rawData : (rawData.calculators || []);
  const filtered = items.filter((item: any) => item.slug !== currentSlug);
  const otherItems = filtered.slice(0, 5);

  return (
    <div style={{ background: '#fff', padding: '20px', margin: '20px 0', border: '1px solid #ccc' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Weitere Gehaltsanalysen entdecken</h3>
      <ul>
        {otherItems.map((item: any, index: number) => {
          const targetUrl = '/' + item.slug;
          return (
            <li key={index} style={{ marginBottom: '8px' }}>
              <Link href={targetUrl} style={{ color: 'blue', textDecoration: 'underline' }}>
                Gehaltsrechner {item.title || item.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}