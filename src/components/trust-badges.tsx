import { Truck, ShieldCheck, RotateCcw, Package } from 'lucide-react';

const badges = [
    { icon: Truck, label: 'Free Shipping', sublabel: 'On orders over $999' },
    { icon: ShieldCheck, label: 'Secure Checkout', sublabel: '100% Protected' },
    { icon: RotateCcw, label: 'Easy Returns', sublabel: '30-Day Policy' },
    { icon: Package, label: 'Quality Assured', sublabel: 'Premium Materials' },
];

export default function TrustBadges() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border/40">
            {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <badge.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{badge.label}</p>
                        <p className="text-xs text-foreground/60">{badge.sublabel}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
