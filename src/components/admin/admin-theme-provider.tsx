'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type AdminTheme = 'dark' | 'light';

interface AdminThemeContextValue {
  theme: AdminTheme;
  toggleTheme: () => void;
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  isMobileSidebarOpen: false,
  setMobileSidebarOpen: () => {},
  toggleMobileSidebar: () => {},
});

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>('dark');
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('admin-theme') as AdminTheme | null;
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    } catch {}
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('admin-theme', next); } catch {}
      return next;
    });
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  // Apply CSS variables based on theme
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute('data-admin-theme', theme);

    if (theme === 'light') {
      // Admin layout vars
      root.style.setProperty('--admin-bg', '#f4f6fa');
      root.style.setProperty('--admin-surface', '#ffffff');
      root.style.setProperty('--admin-surface-2', '#f8fafc');
      root.style.setProperty('--admin-sidebar-bg', '#0d1127');
      root.style.setProperty('--admin-border', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--admin-text', '#0f172a');
      root.style.setProperty('--admin-muted', '#64748b');
      root.style.setProperty('--admin-header-bg', 'rgba(255, 255, 255, 0.94)');

      // Inputs & forms
      root.style.setProperty('--admin-input-bg', '#ffffff');
      root.style.setProperty('--admin-input-border', '#cbd5e1');
      root.style.setProperty('--admin-input-text', '#0f172a');
      root.style.setProperty('--admin-input-placeholder', '#94a3b8');
      root.style.setProperty('--admin-card-bg', '#ffffff');
      root.style.setProperty('--admin-card-border', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--admin-card-shadow', '0 1px 3px rgba(0,0,0,0.05), 0 10px 25px -5px rgba(0,0,0,0.03)');
      root.style.setProperty('--admin-section-border', '#e2e8f0');
      root.style.setProperty('--admin-upload-bg', '#f8fafc');
      root.style.setProperty('--admin-upload-bg-hover', '#f1f5f9');
      root.style.setProperty('--admin-upload-border', '#cbd5e1');

      // Alerts / status banners
      root.style.setProperty('--admin-banner-amber-bg', '#fef3c7');
      root.style.setProperty('--admin-banner-amber-border', '#fcd34d');
      root.style.setProperty('--admin-banner-amber-text', '#92400e');
      root.style.setProperty('--admin-banner-emerald-bg', '#d1fae5');
      root.style.setProperty('--admin-banner-emerald-border', '#6ee7b7');
      root.style.setProperty('--admin-banner-emerald-text', '#065f46');

      // Override public-site color tokens so admin pages render correctly
      root.style.setProperty('--color-ivory', '#0f172a');
      root.style.setProperty('--color-muted', '#64748b');
      root.style.setProperty('--color-slate-muted', '#94a3b8');
      root.style.setProperty('--color-gold', '#a07835');
    } else {
      // Admin layout vars
      root.style.setProperty('--admin-bg', '#0d1022');
      root.style.setProperty('--admin-surface', '#11162b');
      root.style.setProperty('--admin-surface-2', 'rgba(255, 255, 255, 0.02)');
      root.style.setProperty('--admin-sidebar-bg', '#0a0d1a');
      root.style.setProperty('--admin-border', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--admin-text', '#f1ede2');
      root.style.setProperty('--admin-muted', '#8892a4');
      root.style.setProperty('--admin-header-bg', 'rgba(10, 13, 26, 0.96)');

      // Inputs & forms
      root.style.setProperty('--admin-input-bg', 'rgba(255, 255, 255, 0.03)');
      root.style.setProperty('--admin-input-border', 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--admin-input-text', '#f1ede2');
      root.style.setProperty('--admin-input-placeholder', '#64748b');
      root.style.setProperty('--admin-card-bg', '#11162b');
      root.style.setProperty('--admin-card-border', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--admin-card-shadow', '0 4px 20px rgba(0,0,0,0.3)');
      root.style.setProperty('--admin-section-border', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--admin-upload-bg', 'rgba(255, 255, 255, 0.02)');
      root.style.setProperty('--admin-upload-bg-hover', 'rgba(255, 255, 255, 0.05)');
      root.style.setProperty('--admin-upload-border', 'rgba(255, 255, 255, 0.12)');

      // Alerts / status banners
      root.style.setProperty('--admin-banner-amber-bg', 'rgba(120, 53, 15, 0.2)');
      root.style.setProperty('--admin-banner-amber-border', 'rgba(245, 158, 11, 0.3)');
      root.style.setProperty('--admin-banner-amber-text', '#fbbf24');
      root.style.setProperty('--admin-banner-emerald-bg', 'rgba(6, 78, 59, 0.2)');
      root.style.setProperty('--admin-banner-emerald-border', 'rgba(16, 185, 129, 0.3)');
      root.style.setProperty('--admin-banner-emerald-text', '#34d399');

      // Restore original public-site color tokens
      root.style.setProperty('--color-ivory', '#F1EDE2');
      root.style.setProperty('--color-muted', '#8892A4');
      root.style.setProperty('--color-slate-muted', '#6B7280');
      root.style.setProperty('--color-gold', '#CFA56A');
    }
  }, [theme, mounted]);

  // Clean up when unmounting admin layout so public site isn't affected
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-admin-theme');
      root.style.setProperty('--color-ivory', '#F1EDE2');
      root.style.setProperty('--color-muted', '#8892A4');
      root.style.setProperty('--color-slate-muted', '#6B7280');
      root.style.setProperty('--color-gold', '#CFA56A');
    };
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <AdminThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isMobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  );
}
