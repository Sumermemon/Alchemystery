import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllServices } from '@/lib/repositories/service.repository';
import { getAllBlogPosts } from '@/lib/repositories/blog.repository';
import { getEnquiries } from '@/lib/repositories/enquiry.repository';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, PenTool, MessageSquare, HelpCircle, FileText, Settings, Inbox } from 'lucide-react';

export const metadata: Metadata = { title: 'Dashboard — Admin' };

export default async function AdminDashboardPage() {
  const [services, blogPosts, enquiriesResult] = await Promise.all([
    getAllServices(),
    getAllBlogPosts(),
    getEnquiries(),
  ]);

  const newEnquiriesCount = enquiriesResult.enquiries.filter((e) => e.status === 'new').length;

  const cards = [
    { 
      label: 'Enquiries', 
      route: '/admin/enquiries', 
      description: newEnquiriesCount > 0 ? `${newEnquiriesCount} new unread submissions` : 'Client booking requests', 
      icon: Inbox, 
      count: enquiriesResult.enquiries.length,
      badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} new` : undefined,
    },
    { label: 'Services', route: '/admin/services', description: 'Manage sessions & offerings', icon: Sparkles, count: services.length },
    { label: 'Blog Posts', route: '/admin/blog', description: 'Write & publish insights', icon: PenTool, count: blogPosts.length },
    { label: 'Testimonials', route: '/admin/testimonials', description: 'Client reflections', icon: MessageSquare, count: 0 },
    { label: 'FAQs', route: '/admin/faqs', description: 'Manage frequently asked questions', icon: HelpCircle, count: 0 },
    { label: 'Pages', route: '/admin/pages', description: 'Manage page content sections', icon: FileText, count: 0 },
    { label: 'Site Settings', route: '/admin/settings', description: 'Brand, contact, SEO defaults', icon: Settings, count: 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[var(--color-gold)] text-xs tracking-widest uppercase mb-2">
          Alchemystery CMS
        </p>
        <h1 className="text-2xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>
          Overview
        </h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">
          Welcome back. Here is a summary of your content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.route} href={item.route} className="block group">
              <Card className="h-full transition-colors group-hover:border-[rgba(201,168,76,0.3)]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-[var(--color-ivory)]">
                      {item.label}
                    </CardTitle>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <Icon className="h-4 w-4 text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[var(--color-ivory)]">{item.count}</div>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
