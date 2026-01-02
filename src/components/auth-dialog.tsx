'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleShopifyLogin = () => {
        // Redirect to Shopify customer login
        const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        window.location.href = `https://${shopifyDomain}/account/login`;
    };

    const handleShopifyRegister = () => {
        // Redirect to Shopify customer registration
        const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        window.location.href = `https://${shopifyDomain}/account/register`;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Customer Account</DialogTitle>
                    <DialogDescription>
                        Login or create an account to view your orders and manage your profile.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                You'll be redirected to Shopify to securely login to your account.
                            </p>
                            <Button
                                onClick={handleShopifyLogin}
                                className="w-full"
                                size="lg"
                            >
                                Login with Shopify
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Create a new account to track your orders and save your preferences.
                            </p>
                            <Button
                                onClick={handleShopifyRegister}
                                className="w-full"
                                size="lg"
                            >
                                Create Account
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="text-xs text-center text-muted-foreground mt-4">
                    Your account is managed securely by Shopify
                </div>
            </DialogContent>
        </Dialog>
    );
}
