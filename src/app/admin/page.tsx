import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Users, Tag, Package, Settings, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
    const storeName = storeDomain.split('.')[0]; // e.g. 'ritzee-3' from 'ritzee-3.myshopify.com'
    const adminUrl = `https://admin.shopify.com/store/${storeName}`;

    const shopifyLinks = [
        {
            title: "Products",
            description: "Manage your inventory, prices, and collections.",
            icon: <ShoppingBag className="w-8 h-8 mb-2 text-primary" />,
            href: `${adminUrl}/products`,
            color: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
        },
        {
            title: "Orders",
            description: "Process orders, manage fulfillment, and returns.",
            icon: <Package className="w-8 h-8 mb-2 text-primary" />,
            href: `${adminUrl}/orders`,
            color: "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
        },
        {
            title: "Customers",
            description: "View customer details and order history.",
            icon: <Users className="w-8 h-8 mb-2 text-primary" />,
            href: `${adminUrl}/customers`,
            color: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
        },
        {
            title: "Discounts",
            description: "Create discount codes and automatic discounts.",
            icon: <Tag className="w-8 h-8 mb-2 text-primary" />,
            href: `${adminUrl}/discounts`,
            color: "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
        }
    ];

    return (
        <div className="container max-w-6xl py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">Admin Dashboard</h1>
                    <p className="text-foreground/60 mt-2">Manage your Ritzee store via Shopify.</p>
                </div>
                <Button asChild variant="default">
                    <Link href={adminUrl} target="_blank">
                        Open Shopify Admin <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {shopifyLinks.map((link) => (
                    <Card key={link.title} className="hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                                    {link.icon}
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <CardTitle className="mt-4">{link.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4 text-sm">{link.description}</CardDescription>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={link.href} target="_blank">
                                    Manage {link.title}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Settings className="w-6 h-6 text-foreground" />
                        <CardTitle>Site Configuration</CardTitle>
                    </div>
                    <CardDescription>
                        Manage Hero Images and Announcements via Supabase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="default" className="w-full">
                        <Link href="/admin/site-settings">Manage Site Settings</Link>
                    </Button>
                </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <CardTitle>Blog Management</CardTitle>
                    </div>
                    <CardDescription>
                        Create and manage blog posts via Supabase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="default" className="w-full">
                        <Link href="/admin/blogs">Manage Blogs</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
