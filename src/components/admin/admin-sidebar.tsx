'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  PenTool, 
  MessageSquareQuote, 
  HelpCircle, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import type { Role } from '@/constants/roles';
import { signOutAction } from '@/app/admin/actions';

interface AdminSidebarProps {
  user: {
    displayName: string | null;
    email: string | undefined;
    role: Role;
  };
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', exact: true, icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Sparkles },
  { label: 'Blog Posts', href: '/admin/blog', icon: PenTool },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
] as const;

/**
 * Admin sidebar navigation.
 */
export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean = false): boolean {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col border-r"
      style={{
        backgroundColor: '#0a0d1a',
        borderColor: 'rgba(255,255,255,0.06)',
        minHeight: '100vh',
      }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span
          className="text-[var(--color-gold)] text-sm tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Alchemystery
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3" aria-label="Admin navigation">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, 'exact' in item ? item.exact : false);
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm transition-all duration-200"
                  style={{
                    color: active ? 'var(--color-gold)' : 'var(--color-muted)',
                    backgroundColor: active ? 'rgba(201, 168, 76, 0.08)' : 'transparent',
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={16} className={active ? "opacity-100" : "opacity-60"} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info & Sign Out */}
      <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="min-w-0 pr-2">
          <p className="text-[var(--color-ivory)] text-xs font-medium truncate">
            {user.displayName ?? user.email}
          </p>
          <p className="text-[var(--color-muted)] text-[10px] mt-0.5 uppercase tracking-widest">
            {user.role.replace('_', ' ')}
          </p>
        </div>
        
        <form action={signOutAction}>
          <button 
            type="submit"
            className="p-1.5 rounded hover:bg-red-900/20 text-[var(--color-muted)] hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </form>
      </div>
    </aside>
  );
}
