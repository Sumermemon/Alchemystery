import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllServices } from '@/lib/repositories/service.repository';
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
import { Edit, Sparkles } from 'lucide-react';

export const metadata: Metadata = { title: 'Services — Admin' };

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">Services</h1>
          <p className="text-[var(--admin-muted)] text-sm mt-1">Manage sessions & offerings</p>
        </div>
        <Link
          href="/admin/services/new"
          id="new-service-btn"
          className={buttonVariants({ variant: 'primary', size: 'md' })}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>New Service</span>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-[var(--color-muted)]">
                    No services found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-[var(--admin-text)]">
                      {service.title}
                      <div className="text-xs text-[var(--admin-muted)] font-normal mt-0.5">
                        /{service.slug}
                      </div>
                    </TableCell>
                    <TableCell>{service.price_display || '—'}</TableCell>
                    <TableCell>{service.duration_minutes ? `${service.duration_minutes}m` : '—'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={service.status === 'published' ? 'success' : service.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/services/${service.id}`}
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
