import { redirect } from 'next/navigation';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { getUnreadEnquiriesCount } from '@/lib/repositories/enquiry.repository';
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminHeader from '@/components/admin/admin-header';
import { AdminThemeProvider } from '@/components/admin/admin-theme-provider';
import { ToastProvider } from '@/components/ui/toast';

/**
 * Admin layout — server component.
 * Defense-in-depth authorization + premium UI shell.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authUser = null;
  try {
    authUser = await requireSuperAdmin();
  } catch {
    // Supabase unreachable
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0B0F1E' }}>
        <div className="w-full max-w-md text-center">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">
            Alchemystery · Admin
          </p>
          <h1 className="text-2xl text-[var(--color-ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            Access Denied
          </h1>
          <div className="text-left rounded-lg p-5 mb-6 space-y-3" style={{ backgroundColor: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-wider mb-1">
              Role Elevation Required
            </p>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              Your account exists, but you do not have <code className="text-[var(--color-ivory)] bg-white/5 px-1 py-0.5 rounded text-xs">super_admin</code> permissions.
            </p>
            <pre className="text-xs rounded p-3 overflow-x-auto" style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#a0aec0' }}>
{`UPDATE profiles
SET role = 'super_admin'
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'your-email@example.com'
);`}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  const unreadEnquiries = await getUnreadEnquiriesCount();

  return (
    <AdminThemeProvider>
      <ToastProvider>
        <div
          className="flex min-h-screen font-sans admin-shell"
          style={{ background: 'var(--admin-bg, #0d1022)', color: 'var(--admin-text)' }}
        >
          {/* Sidebar */}
          <AdminSidebar
            user={{
              displayName: authUser.profile.display_name,
              email: authUser.supabaseUser.email,
              role: authUser.profile.role,
            }}
            unreadEnquiriesCount={unreadEnquiries}
          />

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader
              email={authUser.supabaseUser.email ?? ''}
              unreadCount={unreadEnquiries}
            />

            <main
              className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-w-0"
              style={{ background: 'var(--admin-bg, #0d1022)' }}
            >
              {/* Page content wrapper with subtle card feel */}
              <div className="w-full max-w-[1400px] mx-auto min-w-0">
                {children}
              </div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </AdminThemeProvider>
  );
}
