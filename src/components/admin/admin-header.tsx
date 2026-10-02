'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Bell, ExternalLink, ChevronRight, Menu } from 'lucide-react';
import { useAdminTheme } from './admin-theme-provider';

interface AdminHeaderProps {
  email: string;
  unreadCount?: number;
}

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/enquiries': 'Enquiries',
  '/admin/services': 'Services',
  '/admin/blog': 'Blog Posts',
  '/admin/testimonials': 'Testimonials',
  '/admin/faqs': 'FAQs',
  '/admin/pages': 'Pages',
  '/admin/settings': 'Settings',
};

function getBreadcrumbs(pathname: string) {
  const crumbs = [{ label: 'Admin', href: '/admin' }];
  const match = Object.entries(BREADCRUMB_MAP).find(([key]) => key !== '/admin' && pathname.startsWith(key));
  if (match) crumbs.push({ label: match[1], href: match[0] });
  return crumbs;
}

export default function AdminHeader({ email, unreadCount = 0 }: AdminHeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme, toggleMobileSidebar } = useAdminTheme();
  const breadcrumbs = getBreadcrumbs(pathname);
  const isLight = theme === 'light';

  return (
    <header
      className="h-16 flex items-center justify-between px-4 sm:px-6 border-b sticky top-0 z-40"
      style={{
        background: isLight
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(10,13,26,0.96)',
        borderColor: 'var(--admin-border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: isLight
          ? '0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)'
          : '0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg transition-colors cursor-pointer flex-shrink-0"
          style={{
            color: 'var(--admin-text)',
            border: '1px solid var(--admin-border)',
            background: 'transparent',
          }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && (
              <ChevronRight
                size={13}
                style={{ color: 'var(--admin-muted)', opacity: 0.5 }}
              />
            )}
            <span
              style={{
                fontSize: '13px',
                fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                color: i === breadcrumbs.length - 1
                  ? 'var(--admin-text)'
                  : 'var(--admin-muted)',
                letterSpacing: '0.01em',
              }}
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* View Site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View live site"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            color: 'var(--admin-muted)',
            border: '1px solid var(--admin-border)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#CFA56A';
            e.currentTarget.style.borderColor = 'rgba(207,165,106,0.4)';
            e.currentTarget.style.background = 'rgba(207,165,106,0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--admin-muted)';
            e.currentTarget.style.borderColor = 'var(--admin-border)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <ExternalLink size={12} />
          <span className="hidden sm:inline">View Site</span>
        </a>

        {/* Notifications */}
        {unreadCount > 0 && (
          <a
            href="/admin/enquiries"
            title={`${unreadCount} unread enquiries`}
            className="relative p-2 rounded-lg transition-all duration-200"
            style={{ color: 'var(--admin-muted)', border: '1px solid var(--admin-border)' }}
          >
            <Bell size={15} />
            <span
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: '#ef4444', color: '#fff' }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </a>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
          className="p-2 rounded-lg transition-all duration-200"
          style={{
            color: 'var(--admin-muted)',
            border: '1px solid var(--admin-border)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#CFA56A';
            e.currentTarget.style.borderColor = 'rgba(207,165,106,0.4)';
            e.currentTarget.style.background = 'rgba(207,165,106,0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--admin-muted)';
            e.currentTarget.style.borderColor = 'var(--admin-border)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {isLight ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'var(--admin-border)' }} />

        {/* User Avatar */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #CFA56A, #A37D42)',
              color: '#0B0F1E',
              letterSpacing: '0.05em',
            }}
          >
            {(email?.[0] ?? 'A').toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium leading-none truncate max-w-[160px]" style={{ color: 'var(--admin-text)' }}>
              {email}
            </p>
            <p className="text-[10px] mt-0.5 uppercase tracking-widest" style={{ color: 'var(--admin-muted)' }}>
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
