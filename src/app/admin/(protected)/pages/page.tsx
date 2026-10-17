import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPages } from '@/lib/repositories/page.repository';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { Edit, Plus, ExternalLink } from 'lucide-react';
import { deletePageAction } from './actions';
import { DeleteActionButton } from '@/components/admin/delete-action-button';

export const metadata: Metadata = { title: 'Pages — Admin' };

export default async function AdminPagesPage() {
  const pages = await getAllPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">Pages</h1>
          <p className="text-[var(--admin-muted)] text-sm mt-1">Manage content for custom pages</p>
        </div>
        <Link
          href="/admin/pages/new"
          id="new-page-btn"
          className={buttonVariants({ variant: 'primary', size: 'md' })}
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Page</span>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-[var(--color-muted)]">
                    No pages found.
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium text-[var(--color-ivory)]">
                      {page.title}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1.5 font-mono text-xs"
                        title="View live page"
                      >
                        <span>/{page.slug}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={page.status === 'published' ? 'success' : page.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/pages/${page.id}`}
                          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <DeleteActionButton
                          id={page.id}
                          itemName={page.title}
                          itemType="page"
                          onDelete={deletePageAction}
                        />
                      </div>
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
