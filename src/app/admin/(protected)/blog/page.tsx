import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/repositories/blog.repository';
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
import { Edit, PenTool } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = { title: 'Blog Posts — Admin' };

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">Blog Posts</h1>
          <p className="text-[var(--admin-muted)] text-sm mt-1">Manage articles and journal entries</p>
        </div>
        <Link
          href="/admin/blog/new"
          id="new-post-btn"
          className={buttonVariants({ variant: 'primary', size: 'md' })}
        >
          <PenTool className="w-4 h-4 shrink-0" />
          <span>New Post</span>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-[var(--admin-muted)]">
                    No blog posts found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium text-[var(--admin-text)]">
                      {post.title}
                      <div className="text-xs text-[var(--admin-muted)] font-normal mt-0.5">
                        /{post.slug}
                      </div>
                    </TableCell>
                    <TableCell>{post.author_name || '—'}</TableCell>
                    <TableCell>
                      {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={post.status === 'published' ? 'success' : post.status === 'draft' ? 'warning' : 'outline'}
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/blog/${post.id}`}
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
