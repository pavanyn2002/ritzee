'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Ruler } from 'lucide-react';

const sizeData = [
    { size: 'S', chest: '36-38"', waist: '28-30"', length: '27"' },
    { size: 'M', chest: '38-40"', waist: '30-32"', length: '28"' },
    { size: 'L', chest: '40-42"', waist: '32-34"', length: '29"' },
    { size: 'XL', chest: '42-44"', waist: '34-36"', length: '30"' },
    { size: 'XXL', chest: '44-46"', waist: '36-38"', length: '31"' },
];

export default function SizeGuide() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary gap-2">
                    <Ruler className="w-4 h-4" />
                    Size Guide
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-headline">Size Chart</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-2 text-left font-semibold">Size</th>
                                <th className="py-3 px-2 text-left font-semibold">Chest</th>
                                <th className="py-3 px-2 text-left font-semibold">Waist</th>
                                <th className="py-3 px-2 text-left font-semibold">Length</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizeData.map((row) => (
                                <tr key={row.size} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                    <td className="py-3 px-2 font-medium text-primary">{row.size}</td>
                                    <td className="py-3 px-2 text-foreground/80">{row.chest}</td>
                                    <td className="py-3 px-2 text-foreground/80">{row.waist}</td>
                                    <td className="py-3 px-2 text-foreground/80">{row.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-foreground/60">
                        Measurements are in inches. For the best fit, measure yourself and compare to the chart above.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
