import FAQSection from '@/components/faq-section';

export const metadata = {
    title: 'FAQ - Ritzee Wear',
    description: 'Frequently asked questions about Ritzee Wear products, shipping, returns, and more.',
};

export default function FAQPage() {
    return (
        <div className="min-h-screen">
            <FAQSection />
        </div>
    );
}
