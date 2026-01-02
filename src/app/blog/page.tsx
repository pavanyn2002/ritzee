
import { supabase } from '@/lib/supabase';
import { ScrollAnimation } from '@/components/scroll-animation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogIndexPage() {
    // Fetch published blogs from Supabase
    const { data: posts } = await supabase
        .from('blogs')
        .select('id, slug, title, excerpt, image, date')
        .eq('published', true)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen py-24">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter mb-4">
                            THE JOURNAL
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Ritzee culture, style guides, and community stories.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {posts?.map((post, index) => (
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
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <h2 className="text-xl font-bold font-headline mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-primary text-sm font-medium">
                                            Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </ScrollAnimation>
                    ))}
                    {(!posts || posts.length === 0) && (
                        <div className="col-span-full text-center py-20 text-muted-foreground">
                            No articles found. Check back later.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
