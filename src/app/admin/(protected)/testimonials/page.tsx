import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTestimonials } from '@/lib/repositories/testimonial.repository';
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
import { Edit, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Testimonials — Admin' };

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">Testimonials</h1>
          <p className="text-[var(--admin-muted)] text-sm mt-1">Manage client reflections</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          id="new-testimonial-btn"
          className={buttonVariants({ variant: 'primary', size: 'md' })}
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Testimonial</span>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-[var(--color-muted)]">
                    No testimonials found.
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium text-[var(--color-ivory)]">
                      {testimonial.author_name}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {testimonial.content}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={testimonial.status === 'published' ? 'success' : testimonial.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {testimonial.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
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
