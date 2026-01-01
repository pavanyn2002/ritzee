'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollAnimation } from './scroll-animation';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
            title: "Message Sent!",
            description: "We'll get back to you as soon as possible.",
        });

        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollAnimation>
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline">
                                Get in Touch
                            </h2>
                            <p className="text-foreground/70 text-lg">
                                Have questions about our products or need styling advice? We'd love to hear from you.
                            </p>
                            <div className="space-y-3 pt-4">
                                <div className="flex items-center gap-3 text-foreground/60">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <span>support@ritzeewear.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/60">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    <span>We typically respond within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation delay={100}>
                        <form onSubmit={handleSubmit} className="space-y-4 bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="pl-10 bg-background border-border/50"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 bg-background border-border/50"
                                    required
                                />
                            </div>
                            <Textarea
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="min-h-[120px] bg-background border-border/50"
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full font-semibold gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}
