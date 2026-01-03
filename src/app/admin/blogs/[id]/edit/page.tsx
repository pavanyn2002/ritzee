'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function EditBlogPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        date: '',
        author: '',
        tags: '',
        published: true,
    });

    useEffect(() => {
        fetchBlog();
    }, [id]);

    async function fetchBlog() {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) return notFound();

            setFormData({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                image: data.image,
                date: data.date,
                author: data.author || 'Ritzee Editorial Team',
                tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
                published: data.published,
            });
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast({
                title: 'Error',
                description: 'Failed to load blog post',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const tagsArray = formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

            const { error } = await supabase
                .from('blogs')
                .update({
                    title: formData.title,
                    slug: formData.slug,
                    excerpt: formData.excerpt,
                    content: formData.content,
                    image: formData.image,
                    date: formData.date,
                    author: formData.author,
                    tags: tagsArray,
                    published: formData.published,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id);

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Blog post updated successfully',
            });

            router.push('/admin/blogs');
        } catch (error: any) {
            console.error('Error updating blog:', error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to update blog post',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Blog post deleted successfully',
            });

            router.push('/admin/blogs');
        } catch (error: any) {
            console.error('Error deleting blog:', error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete blog post',
                variant: 'destructive',
            });
        }
    }

    if (loading) {
        return (
            <div className="container max-w-4xl py-10">
                <p className="text-center text-muted-foreground">Loading blog post...</p>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/blogs">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold font-headline">Edit Blog Post</h1>
                </div>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                URL: /blog/{formData.slug}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt *</Label>
                            <Textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                maxLength={200}
                                required
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {formData.excerpt.length}/200
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="content">HTML Content *</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={15}
                                className="font-mono text-sm"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media & Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="image">Featured Image URL *</Label>
                            <Input
                                id="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                required
                            />
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="h-32 w-auto object-cover rounded border mt-2"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Display Date *</Label>
                                <Input
                                    id="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="published"
                                checked={formData.published}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, published: checked as boolean })
                                }
                            />
                            <Label htmlFor="published" className="cursor-pointer">
                                Published
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/blogs">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                        {!saving && <Save className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </form>
        </div>
    );
}
