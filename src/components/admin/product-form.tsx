
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProductFormProps {
    initialData?: any; // If present, we are editing
    categories: any[];
}

export default function ProductForm({ initialData, categories }: ProductFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        original_price: initialData?.original_price || '',
        category_id: initialData?.category_id || '',
        images: initialData?.images || [],
        stock_by_size: initialData?.stock_by_size || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        is_active: initialData?.is_active ?? true,
        is_bestseller: initialData?.is_bestseller ?? false
    });

    // Auto-generate slug from name if creating new
    useEffect(() => {
        if (!initialData && formData.name) {
            setFormData(prev => ({ ...prev, slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') }));
        }
    }, [formData.name, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStockChange = (size: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            stock_by_size: { ...prev.stock_by_size, [size]: parseInt(value) || 0 }
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simple upload to 'product-images' bucket
        // Note: User must have created this bucket publicly
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        setLoading(true);

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file);

        setLoading(false);

        if (error) {
            console.error('Upload error:', error);
            toast({ title: 'Upload Failed', description: error.message, variant: 'destructive' });
            return;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);

        setFormData(prev => ({ ...prev, images: [...prev.images, publicUrl] }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            original_price: formData.original_price ? parseFloat(formData.original_price) : null,
            category_id: parseInt(formData.category_id)
        };

        let error;

        if (initialData) {
            // Update
            const { error: updateError } = await supabase
                .from('products')
                .update(payload)
                .eq('id', initialData.id);
            error = updateError;
        } else {
            // Create
            const { error: insertError } = await supabase
                .from('products')
                .insert([payload]);
            error = insertError;
        }

        setLoading(false);

        if (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Success', description: 'Product saved successfully.' });
            router.push('/admin/products');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={String(formData.category_id)}
                            onValueChange={(val) => setFormData(prev => ({ ...prev, category_id: val }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="original_price">Original Price (₹)</Label>
                            <Input id="original_price" name="original_price" type="number" value={formData.original_price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Stock by Size</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <div key={size} className="text-center">
                                    <Label className="text-xs mb-1 block">{size}</Label>
                                    <Input
                                        type="number"
                                        className="h-8 px-2 text-center"
                                        value={formData.stock_by_size[size] || 0}
                                        onChange={(e) => handleStockChange(size, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-8 py-4">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                            />
                            <Label>Active (Visible)</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.is_bestseller}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_bestseller: checked }))}
                            />
                            <Label>Bestseller</Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            className="h-32"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Images</Label>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {formData.images.map((url: string, index: number) => (
                                <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                                    <Image src={url} alt="Product" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <label className="border-2 border-dashed border-border rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground mt-1">Upload</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? 'Update Product' : 'Create Product')}
                </Button>
            </div>
        </form>
    );
}
