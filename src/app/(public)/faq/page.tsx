import type { Metadata } from 'next';
import { getPublishedFaqs } from '@/lib/repositories/faq.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || 'Alchemystery';
  return {
    title: `FAQ | ${brandName}`,
    description: 'Frequently asked questions about Alchemystery sessions and the practice.',
  };
}

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-24">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">FAQ</p>
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          Frequently Asked Questions
        </h1>
      </div>

      {Object.entries(groupedFaqs).map(([category, items]) => (
        <div key={category} className="mb-16 last:mb-0">
          <h2 className="text-2xl mb-8 text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-serif)' }}>
            {category}
          </h2>
          <div className="space-y-6">
            {items.map((faq) => (
              <div key={faq.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-8">
                <h3 className="text-xl mb-4 text-[var(--color-ivory)]">{faq.question}</h3>
                <div className="text-[var(--color-muted)]">
                  <MarkdownRenderer content={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {faqs.length === 0 && (
        <div className="text-center py-24 text-[var(--color-muted)]">
          No FAQs available at the moment.
        </div>
      )}
    </div>
  );
}
