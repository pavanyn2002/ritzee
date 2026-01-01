import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Blog - Ritzee Wear',
    description: 'Style tips, behind-the-scenes, and streetwear culture from Ritzee Wear.',
};

const blogPosts = [
    {
        id: 1,
        title: 'The Future of Streetwear: 2026 Trends',
        excerpt: 'Explore the cutting-edge trends shaping streetwear in 2026, from tech-integrated fabrics to sustainable fashion.',
        image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop',
        date: 'Dec 28, 2025',
        slug: 'future-of-streetwear-2026',
        category: 'Trends',
    },
    {
        id: 2,
        title: 'How to Style Oversized Tees Like a Pro',
        excerpt: 'Master the art of oversized styling with our complete guide to layering, proportions, and accessories.',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=400&fit=crop',
        date: 'Dec 20, 2025',
        slug: 'style-oversized-tees',
        category: 'Style Guide',
    },
    {
        id: 3,
        title: 'Behind the Scenes: Our Design Process',
        excerpt: 'Take a peek into how we create each limited-edition piece, from concept sketches to final production.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        date: 'Dec 15, 2025',
        slug: 'design-process-bts',
        category: 'Behind the Scenes',
    },
    {
        id: 4,
        title: 'The Rise of Digital Fashion',
        excerpt: 'How 3D rendering and virtual try-ons are changing the way we shop for clothes online.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
        date: 'Dec 10, 2025',
        slug: 'rise-of-digital-fashion',
        category: 'Innovation',
    },
    {
        id: 5,
        title: 'Streetwear x Sustainability',
        excerpt: 'Our commitment to eco-friendly materials and ethical manufacturing practices.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop',
        date: 'Dec 5, 2025',
        slug: 'streetwear-sustainability',
        category: 'Sustainability',
    },
    {
        id: 6,
        title: 'Gen Z Fashion: Breaking All the Rules',
        excerpt: 'How the new generation is redefining fashion norms and creating their own style language.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
        date: 'Nov 28, 2025',
        slug: 'genz-fashion-rules',
        category: 'Culture',
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen">
            <section className="py-12 md:py-20">
                <div className="container px-4 md:px-6">
                    <ScrollAnimation>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                                The Ritzee Blog
                            </h1>
                            <p className="text-foreground/60 max-w-2xl mx-auto">
                                Style guides, behind-the-scenes looks, and the latest in streetwear culture.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <ScrollAnimation key={post.id} delay={index * 50}>
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <article className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col">
                                        <div className="aspect-video relative overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                            <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-foreground/60 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
