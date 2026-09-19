'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { EnquiryRow, EnquiryStatus } from '@/types/database.types';
import { updateEnquiryStatusAction, deleteEnquiryAction } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Mail, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Archive, 
  Clock, 
  Search, 
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface EnquiriesClientProps {
  initialEnquiries: EnquiryRow[];
  tableMissing: boolean;
}

export default function EnquiriesClient({ initialEnquiries, tableMissing }: EnquiriesClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const filtered = initialEnquiries.filter((item) => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.session_type && item.session_type.toLowerCase().includes(q)) ||
        item.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: initialEnquiries.length,
    new: initialEnquiries.filter((e) => e.status === 'new').length,
    read: initialEnquiries.filter((e) => e.status === 'read').length,
    replied: initialEnquiries.filter((e) => e.status === 'replied').length,
    archived: initialEnquiries.filter((e) => e.status === 'archived').length,
  };

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    startTransition(async () => {
      await updateEnquiryStatusAction(id, newStatus);
      router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    startTransition(async () => {
      await deleteEnquiryAction(id);
      router.refresh();
    });
  };

  const copySql = () => {
    const sql = `-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  session_type  TEXT,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enquiries' AND policyname = 'public_insert_enquiry'
  ) THEN
    CREATE POLICY "public_insert_enquiry" ON enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'enquiries' AND policyname = 'super_admin_all_enquiries'
  ) THEN
    CREATE POLICY "super_admin_all_enquiries" ON enquiries FOR ALL TO authenticated USING (
      EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin')
    );
  END IF;
END $$;`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Table Missing Alert */}
      {tableMissing && (
        <div
          className="rounded-xl p-5 border"
          style={{
            backgroundColor: 'rgba(201, 168, 76, 0.08)',
            borderColor: 'rgba(201, 168, 76, 0.3)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--color-gold)] font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Supabase Table Setup Required</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-2xl">
                The <code className="text-[var(--color-ivory)] bg-white/10 px-1 py-0.5 rounded">enquiries</code> table has not been created yet in your Supabase database. Run migration <code className="text-[var(--color-ivory)] bg-white/10 px-1 py-0.5 rounded">005_enquiries.sql</code> in the Supabase SQL Editor.
              </p>
            </div>
            <button
              onClick={copySql}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                backgroundColor: 'rgba(201, 168, 76, 0.15)',
                color: 'var(--color-gold)',
                border: '1px solid rgba(201, 168, 76, 0.4)',
              }}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied SQL!' : 'Copy Migration SQL'}
            </button>
          </div>
        </div>
      )}

      {/* Controls Bar: Filters + Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border bg-[#080b15]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'new', label: 'New', count: counts.new, badgeColor: 'bg-amber-500/20 text-amber-300' },
            { key: 'read', label: 'Read', count: counts.read },
            { key: 'replied', label: 'Replied', count: counts.replied, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
            { key: 'archived', label: 'Archived', count: counts.archived },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === tab.key
                  ? 'bg-[rgba(201,168,76,0.15)] text-[var(--color-gold)] border border-[rgba(201,168,76,0.3)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-ivory)] hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${tab.badgeColor || 'bg-white/10 text-[var(--color-muted)]'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-[#080b15] border text-[var(--color-ivory)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          />
        </div>
      </div>

      {/* Enquiries Table Card */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Client</TableHead>
                <TableHead className="w-[140px]">Session Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[110px]">Status</TableHead>
                <TableHead className="w-[110px]">Received</TableHead>
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-[var(--color-muted)]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Mail className="w-8 h-8 opacity-30 text-[var(--color-gold)]" />
                      <p className="text-sm">No enquiries found {filter !== 'all' ? `with status "${filter}"` : ''}</p>
                      <p className="text-xs text-[var(--color-muted)] opacity-70">
                        Submissions from the /connect page form will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((enquiry) => {
                  const dateStr = new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <TableRow key={enquiry.id} className={enquiry.status === 'new' ? 'bg-[rgba(201,168,76,0.03)]' : undefined}>
                      {/* Client info */}
                      <TableCell className="font-medium text-[var(--color-ivory)]">
                        <div className="flex items-center gap-2">
                          {enquiry.status === 'new' && (
                            <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" title="Unread" />
                          )}
                          <div>
                            <span className="text-sm font-medium">{enquiry.name}</span>
                            <div className="text-xs text-[var(--color-muted)] font-mono">
                              <a 
                                href={`mailto:${enquiry.email}?subject=Re: Alchemystery Enquiry`}
                                className="hover:text-[var(--color-gold)] hover:underline flex items-center gap-1 mt-0.5"
                              >
                                {enquiry.email}
                                <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Session Type */}
                      <TableCell>
                        {enquiry.session_type ? (
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[11px] font-medium"
                            style={{
                              backgroundColor: 'rgba(201,168,76,0.1)',
                              color: 'var(--color-gold)',
                              border: '1px solid rgba(201,168,76,0.25)',
                            }}
                          >
                            {enquiry.session_type}
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--color-muted)]">—</span>
                        )}
                      </TableCell>

                      {/* Message preview */}
                      <TableCell>
                        <p className="text-xs text-[var(--color-muted)] line-clamp-2 max-w-md">
                          {enquiry.message}
                        </p>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                            enquiry.status === 'new'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : enquiry.status === 'replied'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : enquiry.status === 'read'
                              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                              : 'bg-zinc-500/15 text-zinc-400 border border-zinc-500/30'
                          }`}
                        >
                          {enquiry.status === 'new' && <Clock className="w-2.5 h-2.5" />}
                          {enquiry.status === 'replied' && <CheckCircle2 className="w-2.5 h-2.5" />}
                          {enquiry.status === 'archived' && <Archive className="w-2.5 h-2.5" />}
                          {enquiry.status}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-xs text-[var(--color-muted)] whitespace-nowrap">
                        {dateStr}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
                            className="p-1.5 rounded hover:bg-white/10 text-[var(--color-muted)] hover:text-[var(--color-ivory)] transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {enquiry.status !== 'replied' && (
                            <button
                              onClick={() => handleStatusChange(enquiry.id, 'replied')}
                              disabled={isPending}
                              className="p-1.5 rounded hover:bg-emerald-950/40 text-[var(--color-muted)] hover:text-emerald-400 transition-colors"
                              title="Mark as Replied"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {enquiry.status !== 'archived' && (
                            <button
                              onClick={() => handleStatusChange(enquiry.id, 'archived')}
                              disabled={isPending}
                              className="p-1.5 rounded hover:bg-zinc-800/40 text-[var(--color-muted)] hover:text-zinc-300 transition-colors"
                              title="Archive"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(enquiry.id)}
                            disabled={isPending}
                            className="p-1.5 rounded hover:bg-red-950/40 text-[var(--color-muted)] hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
