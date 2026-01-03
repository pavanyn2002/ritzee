
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ScrollAnimation } from './scroll-animation';
import { ArrowRight, Calendar } from 'lucide-react';

export default async function BlogSection() {
    // Fetch actual blog posts from Supabase 'blogs' table
    const { data: blogPosts, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

    if (error) {
        console.error('Error fetching blogs:', error);
    }

    // Map to display format (no mock data fallback)
    const posts = (blogPosts && blogPosts.length > 0) ? blogPosts.map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || 'Read this latest article on the Ritzee blog.',
        image: p.image || 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop',
        date: p.date || new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        slug: p.slug
    })) : [];

    // Don't render section if no blogs exist
    if (posts.length === 0) return null;

    return (
        <section className="py-20 md:py-32 bg-background border-t-4 border-foreground">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                        <div>
                            <h2
                                className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter"
                                style={{
                                    color: '#BFFF00',
                                    textShadow: '3px 3px 0px #000, 6px 6px 0px rgba(0,0,0,0.2)'
                                }}
                            >
                                THE ARCHIVES
                            </h2>
                            <p className="text-xl font-bold uppercase tracking-wide mt-2 border-l-4 border-primary pl-4">
                                Culture, Code, & Cloth
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="bg-foreground text-background px-6 py-3 font-bold uppercase tracking-widest hover:bg-primary hover:text-foreground transition-colors border-2 border-transparent hover:border-foreground shadow-[4px_4px_0px_0px_#000]"
                        >
                            View All Posts <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </ScrollAnimation>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <ScrollAnimation
                            key={post.id}
                            delay={index * 100}
                            className={index > 0 ? "hidden md:block" : "block"}
                        >
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <article className="bg-card border-2 border-foreground h-full flex flex-col shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-300">
                                    <div className="aspect-[4/3] relative overflow-hidden border-b-2 border-foreground">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-xs font-bold border-2 border-foreground uppercase tracking-widest">
                                            {post.date}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 relative bg-white dark:bg-black">
                                        <h3 className="font-headline font-bold text-2xl uppercase leading-none mb-4 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-base text-muted-foreground line-clamp-3 mb-6 flex-1 font-medium">
                                            {post.excerpt}
                                        </p>
                                        <div className="w-full h-2 bg-muted mt-auto overflow-hidden relative border border-foreground">
                                            <div className="absolute inset-y-0 left-0 bg-primary w-2/3 animate-pulse" />
                                        </div>
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
