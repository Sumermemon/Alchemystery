import { redirect } from 'next/navigation';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { getUnreadEnquiriesCount } from '@/lib/repositories/enquiry.repository';
import AdminSidebar from '@/components/admin/admin-sidebar';

/**
 * Admin layout — server component.
 *
 * Defense-in-depth authorization:
 * 1. Next.js middleware already redirected unauthenticated users to /admin/login
 * 2. This layout performs the ROLE CHECK — verifying the user is a super_admin
 *    by fetching their profile from Supabase (not trusting any client value)
 * 3. If the role check fails, redirect to /admin/login
 *
 * Every admin child route inherits this protection automatically.
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

  // If they reached here but aren't a super_admin, they are authenticated
  // (otherwise middleware would have caught them), but lack permissions.
  // We MUST NOT redirect to /admin/login, as that causes an infinite loop
  // because middleware will redirect them back to /admin.
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
              Your account exists, but you do not have <code className="text-[var(--color-ivory)] bg-white/5 px-1 py-0.5 rounded text-xs">super_admin</code> permissions. By default, new users receive the <code className="text-[var(--color-ivory)] bg-white/5 px-1 py-0.5 rounded text-xs">editor</code> role.
            </p>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              Run this SQL in your Supabase project to elevate your role:
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
          <p className="text-[var(--color-muted)] text-xs">
            After updating, refresh this page.
          </p>
        </div>
      </div>
    );
  }

  const unreadEnquiries = await getUnreadEnquiriesCount();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0d1022' }}>
      <AdminSidebar 
        user={{
          displayName: authUser.profile.display_name,
          email: authUser.supabaseUser.email,
          role: authUser.profile.role,
        }} 
        unreadEnquiriesCount={unreadEnquiries}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-14 flex items-center justify-between px-6 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0d1022' }}
        >
          <div className="text-xs text-[var(--color-muted)] tracking-wider uppercase">
            Admin CMS
          </div>
          <div className="text-xs text-[var(--color-muted)]">
            {authUser.supabaseUser.email}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
