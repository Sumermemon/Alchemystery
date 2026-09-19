import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import type { PageRow, PageSectionRow } from '@/types/database.types';

interface PageWithSections extends PageRow {
  sections: PageSectionRow[];
}

export function PageRenderer({ page }: { page: PageWithSections }) {
  return (
    <div className="flex flex-col gap-24 py-12 px-6 max-w-7xl mx-auto">
      {page.sections.map((section) => (
        <section key={section.id} id={section.section_key} className="space-y-6">
          {section.heading && (
            <h2 className="text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
              {section.heading}
            </h2>
          )}
          {section.subheading && (
            <h3 className="text-xl text-[var(--color-gold)] tracking-wide">
              {section.subheading}
            </h3>
          )}
          {section.body && (
            <div className="bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-8 md:p-12">
              <MarkdownRenderer content={section.body} />
            </div>
          )}
          {section.image_url && (
            <div className="mt-8">
              <img 
                src={section.image_url} 
                alt={section.heading || 'Section image'} 
                className="rounded-lg shadow-lg max-h-[600px] object-cover w-full" 
              />
            </div>
          )}
          {section.cta_label && section.cta_url && (
            <div className="mt-8">
              <a 
                href={section.cta_url} 
                className="inline-block px-8 py-3 bg-[var(--color-gold)] text-[var(--color-bg-dark)] font-medium uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
              >
                {section.cta_label}
              </a>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
