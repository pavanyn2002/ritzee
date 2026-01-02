"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function AnnouncementBar() {
    const [announcements, setAnnouncements] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    useEffect(() => {
        async function fetchConfig() {
            const { data } = await supabase
                .from('site_config')
                .select('announcements, announcements_enabled')
                .single();

            if (data && data.announcements_enabled) {
                // Data is already a JSONB array, no parsing needed
                const items = Array.isArray(data.announcements) ? data.announcements : [];
                setAnnouncements(items);
            } else {
                setAnnouncements([]);
            }
            setLoading(false);
        }
        fetchConfig();
    }, []);

    if (loading || announcements.length === 0) return null;

    if (announcements.length === 1) {
        return (
            <div className="bg-primary text-primary-foreground text-sm text-center py-2.5 px-4 overflow-hidden">
                <p className="font-medium">{announcements[0]}</p>
            </div>
        )
    }

    return (
        <div className="bg-primary text-primary-foreground text-sm text-center py-2.5 px-4 overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {announcements.map((text, i) => (
                    <div className="flex-[0_0_100%] min-w-0" key={i}>
                        <p className="font-medium animate-pulse">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
