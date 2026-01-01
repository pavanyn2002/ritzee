'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollAnimation } from './scroll-animation';

const faqs = [
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for all unworn items with original tags attached. Simply contact our support team to initiate a return.'
    },
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. Free shipping on orders over $999.'
    },
    {
        question: 'What sizes do you offer?',
        answer: 'We offer sizes from S to XXL. Please refer to our size guide on each product page for detailed measurements.'
    },
    {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship worldwide. International shipping rates and delivery times vary by location.'
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-foreground/60 max-w-2xl mx-auto">
                            Got questions? We've got answers.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <ScrollAnimation key={index} delay={index * 50}>
                            <div
                                className="border border-border/50 rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "w-5 h-5 text-primary transition-transform flex-shrink-0",
                                            openIndex === index && "rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    className={cn(
                                        "grid transition-all duration-300",
                                        openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-4 text-foreground/70 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
