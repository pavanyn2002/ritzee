
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: { slug: string }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = params;

    // Fetch blog from Supabase by slug
    const { data: post } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen py-16">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
                </Link>

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter leading-tight">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Hero Image */}
                <div className="aspect-video relative rounded-xl overflow-hidden mb-12 border border-border">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                <div className="mt-16 pt-8 border-t border-border flex justify-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/shop">Shop the Collection</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
