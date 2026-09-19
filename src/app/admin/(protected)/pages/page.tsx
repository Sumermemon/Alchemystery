import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPages } from '@/lib/repositories/page.repository';
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

export const metadata: Metadata = { title: 'Pages — Admin' };

export default async function AdminPagesPage() {
  const pages = await getAllPages();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Pages</h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">Manage content for custom pages</p>
        </div>
        <Button>
          <Link href="/admin/pages/new">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Link>
        </Button>
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
                      /{page.slug}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={page.status === 'published' ? 'success' : page.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Link href={`/admin/pages/${page.id}`}>
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
