import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from './scroll-animation';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'The Future of Streetwear: 2026 Trends',
        excerpt: 'Explore the cutting-edge trends shaping streetwear in 2026, from tech-integrated fabrics to sustainable fashion.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop',
        date: 'Dec 28, 2025',
        slug: 'future-of-streetwear-2026',
    },
    {
        id: 2,
        title: 'How to Style Oversized Tees Like a Pro',
        excerpt: 'Master the art of oversized styling with our complete guide to layering, proportions, and accessories.',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=400&fit=crop',
        date: 'Dec 20, 2025',
        slug: 'style-oversized-tees',
    },
    {
        id: 3,
        title: 'Behind the Scenes: Our Design Process',
        excerpt: 'Take a peek into how we create each limited-edition piece, from concept sketches to final production.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        date: 'Dec 15, 2025',
        slug: 'design-process-bts',
    },
];

export default function BlogSection() {
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
                    {blogPosts.map((post, index) => (
                        <ScrollAnimation key={post.id} delay={index * 100}>
                            <Link href={`/blog/${post.slug}`} className="group block">
                                <article className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
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
