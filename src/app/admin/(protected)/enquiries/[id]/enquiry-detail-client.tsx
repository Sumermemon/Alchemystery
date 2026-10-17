'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { EnquiryRow, EnquiryStatus } from '@/types/database.types';
import { updateEnquiryStatusAction, deleteEnquiryAction } from '../actions';
import { useToast } from '@/components/ui/toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Archive, 
  ExternalLink,
  Calendar,
  Sparkles,
  User
} from 'lucide-react';

interface EnquiryDetailClientProps {
  enquiry: EnquiryRow;
}

export default function EnquiryDetailClient({ enquiry }: EnquiryDetailClientProps) {
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState<EnquiryStatus>(enquiry.status);

  const handleStatusChange = (status: EnquiryStatus) => {
    setCurrentStatus(status);
    startTransition(async () => {
      try {
        await updateEnquiryStatusAction(enquiry.id, status);
        showSuccess('Status Updated', `Enquiry marked as "${status}".`);
        router.refresh();
      } catch (err: any) {
        showError('Update Failed', err?.message || 'Could not update status');
      }
    });
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      try {
        await deleteEnquiryAction(enquiry.id, false);
        showSuccess('Enquiry Deleted', 'The enquiry has been removed.');
        router.push('/admin/enquiries');
        router.refresh();
      } catch (err: any) {
        showError('Delete Failed', err?.message || 'Could not delete enquiry');
      }
    });
  };

  const formattedDate = new Date(enquiry.created_at).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const mailtoSubject = encodeURIComponent(
    `Re: ${enquiry.session_type ? `${enquiry.session_type} Session — ` : ''}Alchemystery Enquiry`
  );
  const mailtoBody = encodeURIComponent(
    `Dear ${enquiry.name},\n\nThank you for reaching out to Alchemystery regarding ${
      enquiry.session_type ? `a ${enquiry.session_type} session` : 'your enquiry'
    }.\n\n`
  );
  const mailtoUrl = `mailto:${enquiry.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar / Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all enquiries
        </Link>

        {/* Status Pills Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--admin-muted)]">Status:</span>
          {(['new', 'read', 'replied', 'archived'] as EnquiryStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              disabled={isPending}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                currentStatus === st
                  ? st === 'new'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 shadow-sm'
                    : st === 'replied'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : st === 'read'
                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'bg-slate-500/15 text-slate-700 dark:text-zinc-300 border border-slate-500/40 shadow-sm'
                  : 'text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)] border border-transparent'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Info Card */}
      <Card>
        <CardHeader className="border-b pb-4" style={{ borderColor: 'var(--admin-border)' }}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl text-[var(--admin-text)] font-semibold font-sans">
                  {enquiry.name}
                </h1>
                {enquiry.session_type && (
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(201,168,76,0.12)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(201,168,76,0.3)',
                    }}
                  >
                    {enquiry.session_type}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--admin-muted)]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (currentStatus !== 'replied') {
                    handleStatusChange('replied');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#0B0F1E] transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  boxShadow: '0 2px 10px rgba(201,168,76,0.25)',
                }}
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 rounded-lg border border-red-500/20 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-500/10 transition-colors"
                title="Delete Enquiry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Client Details Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border"
            style={{
              backgroundColor: 'var(--admin-surface-2)',
              borderColor: 'var(--admin-border)',
            }}
          >
            <div className="space-y-1">
              <span className="text-[11px] text-[var(--admin-muted)] uppercase tracking-wider font-medium">Email Address</span>
              <p className="text-sm font-mono text-[var(--admin-text)]">
                <a href={mailtoUrl} className="hover:text-[var(--color-gold)] hover:underline">
                  {enquiry.email}
                </a>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[var(--admin-muted)] uppercase tracking-wider font-medium">Requested Session</span>
              <p className="text-sm text-[var(--admin-text)]">
                {enquiry.session_type || 'General Consultation / Inquiry'}
              </p>
            </div>
          </div>

          {/* Enquiry Message */}
          <div className="space-y-2">
            <span className="text-xs text-[var(--admin-muted)] uppercase tracking-wider font-semibold">
              Message from Client
            </span>
            <div
              className="p-6 rounded-xl border leading-relaxed text-sm text-[var(--admin-text)] whitespace-pre-wrap font-sans"
              style={{
                backgroundColor: 'var(--admin-surface-2)',
                borderColor: 'var(--admin-border)',
              }}
            >
              {enquiry.message}
            </div>
          </div>

          {/* Quick Helper Tips */}
          <div
            className="p-4 rounded-lg flex items-start gap-3 border text-xs"
            style={{
              backgroundColor: 'rgba(201, 168, 76, 0.04)',
              borderColor: 'rgba(201, 168, 76, 0.15)',
              color: 'var(--color-muted)',
            }}
          >
            <Sparkles className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
            <p>
              Clicking <strong className="text-[var(--color-ivory)]">Reply via Email</strong> will launch your email client with client&apos;s email and subject pre-filled, and will automatically update the status to <strong className="text-emerald-400">replied</strong>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
