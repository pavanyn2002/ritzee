'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Blog = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    published: boolean;
    created_at: string;
};

export default function BlogsAdminPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('id, slug, title, excerpt, date, published, created_at')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBlogs(data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast({
                title: 'Error',
                description: 'Failed to load blogs',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    async function togglePublished(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('blogs')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            toast({
                title: 'Success',
                description: `Blog ${!currentStatus ? 'published' : 'unpublished'}`,
            });

            fetchBlogs();
        } catch (error) {
            console.error('Error toggling published:', error);
            toast({
                title: 'Error',
                description: 'Failed to update blog status',
                variant: 'destructive',
            });
        }
    }

    async function deleteBlog(id: string, title: string) {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Blog deleted successfully',
            });

            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete blog',
                variant: 'destructive',
            });
        }
    }

    if (loading) {
        return (
            <div className="container max-w-6xl py-10">
                <p className="text-center text-muted-foreground">Loading blogs...</p>
            </div>
        );
    }

    return (
        <div className="container max-w-6xl py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Blog Management</h1>
                    <p className="text-muted-foreground mt-1">Create and manage blog posts</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blogs/new">
                        <Plus className="w-4 h-4 mr-2" /> New Blog Post
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                    <CardDescription>
                        {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} total
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {blogs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No blog posts yet.</p>
                            <p className="text-sm mt-2">Click "New Blog Post" to create one.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell className="font-medium">
                                            <div>
                                                <p className="font-semibold">{blog.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                                    {blog.excerpt}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{blog.date}</TableCell>
                                        <TableCell>
                                            {blog.published ? (
                                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Draft</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => togglePublished(blog.id, blog.published)}
                                                    title={blog.published ? 'Unpublish' : 'Publish'}
                                                >
                                                    {blog.published ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button size="icon" variant="ghost" asChild>
                                                    <Link href={`/admin/blogs/${blog.id}/edit`}>
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => deleteBlog(blog.id, blog.title)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
