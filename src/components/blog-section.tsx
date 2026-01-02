
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ScrollAnimation } from './scroll-animation';
import { ArrowRight, Calendar } from 'lucide-react';

export default async function BlogSection() {
    const { data: blogPosts } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

    const posts = (blogPosts || []).map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || 'Read this latest article on the Ritzee blog.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop', // Fallback as we didn't add image column to blog yet
        date: new Date(p.created_at).toLocaleDateString(),
        slug: p.slug
    }));

    if (posts.length === 0) return null;

    return (
        <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">
                                From the Blog
                            </h2>
                            <p className="text-foreground/60 mt-2">
                                Style tips, behind-the-scenes, and culture.
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all group"
                        >
                            View All Posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </ScrollAnimation>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <ScrollAnimation key={post.id} delay={index * 100}>
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <article className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col">
                                    <div className="aspect-video relative overflow-hidden bg-muted">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-foreground/60 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
