import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/repositories/blog.repository';
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
import { Edit, PenTool } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = { title: 'Blog Posts — Admin' };

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Blog Posts</h1>
          <p className="text-[var(--color-muted)] text-sm mt-1">Manage articles and journal entries</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new" id="new-post-btn">
            <PenTool className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
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
                  <TableCell colSpan={5} className="text-center h-24 text-[var(--color-muted)]">
                    No blog posts found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium text-[var(--color-ivory)]">
                      {post.title}
                      <div className="text-xs text-[var(--color-muted)] font-normal mt-0.5">
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
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/blog/${post.id}`}>
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
