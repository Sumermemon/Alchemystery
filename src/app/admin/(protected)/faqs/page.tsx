import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllFaqs } from '@/lib/repositories/faq.repository';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'FAQs — Admin' };

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>FAQs</h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">Manage frequently asked questions</p>
        </div>
        <Button>
          <Link href="/admin/faqs/new">
            <Plus className="w-4 h-4 mr-2" />
            New FAQ
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-[var(--color-muted)]">
                    No FAQs found.
                  </TableCell>
                </TableRow>
              ) : (
                faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium text-[var(--color-ivory)] max-w-md truncate">
                      {faq.question}
                    </TableCell>
                    <TableCell>
                      {faq.category || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={faq.status === 'published' ? 'success' : faq.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {faq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Link href={`/admin/faqs/${faq.id}`}>
                          <Edit className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
