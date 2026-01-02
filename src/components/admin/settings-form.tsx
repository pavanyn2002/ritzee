
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, X, Check } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsFormProps {
    initialConfig: any;
    products: { id: string; name: string }[];
}

export default function SettingsForm({ initialConfig, products }: SettingsFormProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState(initialConfig || {
        notification_text: '',
        notification_enabled: true,
        hero_headline: 'Unleash Your Alter Ego',
        hero_images: [],
        bestsellers_ids: [],
        latest_drops_product_ids: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = `hero-${Date.now()}`;
        setLoading(true);

        const { error } = await supabase.storage.from('site-assets').upload(fileName, file);

        setLoading(false);

        if (error) {
            toast({ title: 'Upload Failed', description: error.message, variant: 'destructive' });
            return;
        }

        const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(fileName);
        setConfig({ ...config, hero_images: [...(config.hero_images || []), publicUrl] });
    };

    const removeImage = (index: number) => {
        setConfig({
            ...config,
            hero_images: config.hero_images.filter((_: any, i: number) => i !== index)
        });
    };

    const toggleProductSelection = (field: 'bestsellers_ids' | 'latest_drops_product_ids', productId: string) => {
        const current = config[field] || [];
        const exists = current.includes(productId);

        let updated;
        if (exists) {
            updated = current.filter((id: string) => id !== productId);
        } else {
            updated = [...current, productId];
        }

        setConfig({ ...config, [field]: updated });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('site_config')
            .update(config)
            .eq('id', initialConfig.id);

        setLoading(false);

        if (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Saved', description: 'Site configuration updated.' });
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8">

            {/* Notification Bar */}
            <Card>
                <CardHeader>
                    <CardTitle>Notification Bar</CardTitle>
                    <CardDescription>Top announcement bar settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="notification_enabled">Visible?</Label>
                        <Switch
                            id="notification_enabled"
                            checked={config.notification_enabled}
                            onCheckedChange={(checked) => setConfig({ ...config, notification_enabled: checked })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notification_text">Message Text</Label>
                        <Input
                            id="notification_text"
                            name="notification_text"
                            value={config.notification_text}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>Homepage main visual customization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="hero_headline">Headline Text</Label>
                        <Input
                            id="hero_headline"
                            name="hero_headline"
                            value={config.hero_headline}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Background Images (Slideshow)</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {config.hero_images?.map((url: string, index: number) => (
                                <div key={index} className="relative aspect-video rounded-md overflow-hidden border border-border group">
                                    <Image src={url} alt="Hero" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                                        Slide {index + 1}
                                    </div>
                                </div>
                            ))}
                            <label className="border-2 border-dashed border-border rounded-md aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/10">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground mt-1">Add Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bestsellers Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Featured Bestsellers</CardTitle>
                    <CardDescription>Select products to appear in the "Bestsellers" section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] border rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {products.map((product) => {
                                const isSelected = (config.bestsellers_ids || []).includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                                        onClick={() => toggleProductSelection('bestsellers_ids', product.id)}
                                    >
                                        <div className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                        </div>
                                        <span className="text-sm font-medium">{product.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                    <p className="text-xs text-muted-foreground mt-2">
                        Selected: {config.bestsellers_ids?.length || 0} items
                    </p>
                </CardContent>
            </Card>

            {/* Latest Drops Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Latest Drops Collection</CardTitle>
                    <CardDescription>Select products to highlight in the "Latest Drops" marquee/section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] border rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {products.map((product) => {
                                const isSelected = (config.latest_drops_product_ids || []).includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-accent/10 border-accent' : 'hover:bg-muted'}`}
                                        onClick={() => toggleProductSelection('latest_drops_product_ids', product.id)}
                                    >
                                        <div className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? 'bg-accent border-accent' : 'border-muted-foreground'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
                                        </div>
                                        <span className="text-sm font-medium">{product.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                    <p className="text-xs text-muted-foreground mt-2">
                        Selected: {config.latest_drops_product_ids?.length || 0} items
                    </p>
                </CardContent>
            </Card>

            <div className="flex justify-end pb-12">
                <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto font-bold text-lg h-12">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Save All Changes
                </Button>
            </div>
        </form>
    );
}
