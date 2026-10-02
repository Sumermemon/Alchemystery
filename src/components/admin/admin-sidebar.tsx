'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  PenTool,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
  Inbox,
  X,
} from 'lucide-react';
import type { Role } from '@/constants/roles';
import { signOutAction } from '@/app/admin/actions';
import { useAdminTheme } from './admin-theme-provider';

interface AdminSidebarProps {
  user: {
    displayName: string | null;
    email: string | undefined;
    role: Role;
  };
  unreadEnquiriesCount?: number;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', exact: true, icon: LayoutDashboard },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox, badge: 'enquiries' },
  { label: 'Services', href: '/admin/services', icon: Sparkles },
  { label: 'Blog Posts', href: '/admin/blog', icon: PenTool },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
] as const;

export default function AdminSidebar({ user, unreadEnquiriesCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useAdminTheme();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  function isActive(href: string, exact = false): boolean {
    if (exact) return pathname === href;
    return pathname === href || (href !== '/admin' && pathname.startsWith(href));
  }

  const renderContent = (isMobile = false) => (
    <>
      {/* Top glow accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(207,165,106,0.5), transparent)',
        }}
      />

      {/* Logo / Brand */}
      <div
        className="h-16 flex items-center justify-between px-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          {/* Emblem */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(207,165,106,0.2), rgba(163,125,66,0.1))',
              border: '1px solid rgba(207,165,106,0.3)',
              color: '#CFA56A',
            }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wider font-serif" style={{ color: '#f1ede2' }}>
              Alchemystery
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(207,165,106,0.6)' }}>
              Admin Panel
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto" aria-label="Admin navigation">
        <p
          className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'rgba(136,146,164,0.5)' }}
        >
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, 'exact' in item ? item.exact : false);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative overflow-hidden"
              style={{
                color: active ? '#CFA56A' : '#8892a4',
                background: active
                  ? 'linear-gradient(90deg, rgba(207,165,106,0.12), rgba(207,165,106,0.04))'
                  : 'transparent',
                fontWeight: active ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.color = '#c4cdd9';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.color = '#8892a4';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {/* Active indicator bar */}
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: '3px',
                    background: 'linear-gradient(180deg, #CFA56A, #A37D42)',
                    borderRadius: '0 3px 3px 0',
                  }}
                />
              )}
              <div className="flex items-center gap-3">
                <Icon
                  size={16}
                  style={{ color: active ? '#CFA56A' : 'inherit', opacity: active ? 1 : 0.65 }}
                />
                {item.label}
              </div>
              {'badge' in item && item.badge === 'enquiries' && unreadEnquiriesCount > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(239,68,68,0.4)',
                  }}
                >
                  {unreadEnquiriesCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div
        className="p-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #CFA56A, #A37D42)',
              color: '#0B0F1E',
            }}
          >
            {((user.displayName ?? user.email ?? 'A')[0] ?? 'A').toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: '#f1ede2' }}>
              {user.displayName ?? user.email ?? 'Admin'}
            </p>
            <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(207,165,106,0.7)' }}>
              {user.role.replace('_', ' ')}
            </p>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="p-1.5 rounded-lg transition-all duration-200 cursor-pointer"
              title="Sign out"
              style={{ color: '#4a5568', background: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f87171';
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4a5568';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={15} />
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (hidden on mobile, visible on lg+) */}
      <aside
        className="hidden lg:flex w-64 flex-shrink-0 flex-col"
        style={{
          background: 'linear-gradient(180deg, #0d1127 0%, #0a0d1a 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        {renderContent(false)}
      </aside>

      {/* Mobile Off-Canvas Drawer (visible on < lg when toggled) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Slide-over menu */}
          <aside
            className="fixed inset-y-0 left-0 w-72 flex flex-col z-50 shadow-2xl animate-in slide-in-from-left duration-200"
            style={{
              background: 'linear-gradient(180deg, #0d1127 0%, #0a0d1a 100%)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {renderContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
