'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SiteSettingsPage() {
    const [announcements, setAnnouncements] = useState<string[]>([]);
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    // Fetch initial data
    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('site_config')
                    .select('announcements, hero_images, announcements_enabled')
                    .single();

                if (error) {
                    console.error("Error fetching config:", error);
                    toast({
                        title: "Database Error",
                        description: "Could not load settings. Make sure you've run the migration script.",
                        variant: "destructive"
                    });
                    setLoading(false);
                    return;
                }

                if (data) {
                    // Handle announcements (now JSONB array)
                    const loadedAnnouncements = Array.isArray(data.announcements)
                        ? data.announcements
                        : [];
                    setAnnouncements(loadedAnnouncements);

                    // Handle Hero Images (now JSONB array)
                    const loadedImages = Array.isArray(data.hero_images)
                        ? data.hero_images
                        : [];
                    setHeroImages(loadedImages);
                }
            } catch (error) {
                console.error("Error fetching config:", error);
                toast({
                    title: "Error",
                    description: "Failed to load site settings.",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [toast]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save arrays directly as JSONB (no JSON.stringify needed)
            const { error } = await supabase
                .from('site_config')
                .update({
                    announcements: announcements,
                    hero_images: heroImages,
                    announcements_enabled: true
                })
                .eq('id', 1);

            if (error) throw error;

            toast({
                title: "Settings Saved ✓",
                description: "Your site has been updated successfully."
            });
        } catch (error) {
            console.error("Error saving:", error);
            toast({
                title: "Error Saving",
                description: "Could not save settings. Check the console for details.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10">Loading settings...</div>;

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin"><ArrowLeft className="w-5 h-5" /></Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Site Configuration</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Accouncements</CardTitle>
                    <CardDescription>Add multiple announcements to rotate in the top bar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {announcements.map((text, idx) => (
                        <div key={idx} className="flex gap-2">
                            <Input
                                value={text}
                                onChange={(e) => {
                                    const newArr = [...announcements];
                                    newArr[idx] = e.target.value;
                                    setAnnouncements(newArr);
                                }}
                            />
                            <Button size="icon" variant="destructive" onClick={() => setAnnouncements(announcements.filter((_, i) => i !== idx))}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={() => setAnnouncements([...announcements, "New Announcement"])} variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Announcement
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Hero Media</CardTitle>
                    <CardDescription>Add images, videos, or 3D models for the homepage slider. Supports: .jpg, .png, .webp, .mp4, .webm, .glb</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {heroImages.map((url, idx) => (
                        <div key={idx} className="flex gap-2">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    value={url}
                                    placeholder="https://example.com/image.jpg"
                                    onChange={(e) => {
                                        const newArr = [...heroImages];
                                        newArr[idx] = e.target.value;
                                        setHeroImages(newArr);
                                    }}
                                />
                                {url && <img src={url} alt="Preview" className="h-20 w-auto object-cover rounded border" onError={(e) => e.currentTarget.style.display = 'none'} />}
                            </div>
                            <Button size="icon" variant="destructive" onClick={() => setHeroImages(heroImages.filter((_, i) => i !== idx))}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={() => setHeroImages([...heroImages, ""])} variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Media URL
                    </Button>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="lg" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                    {!saving && <Save className="w-4 h-4 ml-2" />}
                </Button>
            </div>
        </div>
    );
}
