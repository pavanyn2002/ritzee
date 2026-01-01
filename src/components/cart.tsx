'use client';

import { useCart } from '@/context/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';
import { Separator } from './ui/separator';

const FREE_SHIPPING_THRESHOLD = 999;

export default function Cart() {
  const { isCartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md bg-background">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2 text-xl font-headline">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            {/* Free Shipping Progress */}
            <div className="px-6 py-3 bg-muted/50">
              {cartTotal < FREE_SHIPPING_THRESHOLD ? (
                <div className="space-y-2">
                  <p className="text-sm text-center">
                    <span className="text-foreground/60">Add </span>
                    <span className="font-bold text-primary">${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</span>
                    <span className="text-foreground/60"> more for </span>
                    <span className="font-semibold">FREE shipping! 🚚</span>
                  </p>
                  <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="w-4 h-4" />
                  You've unlocked FREE shipping!
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="group relative flex gap-4 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate pr-6">{item.product.name}</h3>
                      <p className="text-xs text-foreground/50 mt-0.5">{item.product.category}</p>
                      <p className="text-primary font-bold mt-1">${item.product.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border/50 px-6 py-4 space-y-4 bg-card/50">
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pb-3 border-b border-border/30">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-foreground/60">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-foreground/60">Secure Pay</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-foreground/60">30-Day Returns</span>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-foreground/60">Subtotal</span>
                <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-foreground/50 text-center">Shipping calculated at checkout</p>

              {/* Checkout Button */}
              <Button size="lg" className="w-full h-12 font-bold text-base gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" />
                Checkout Now
              </Button>

              {/* Continue Shopping */}
              <Button variant="ghost" size="sm" onClick={closeCart} className="w-full text-foreground/60 hover:text-foreground">
                Continue Shopping
              </Button>
            </div>
          </>
        ) : (
          /* Empty Cart State */
          <div className="flex h-full flex-col items-center justify-center space-y-6 px-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <ShoppingBag className="relative h-24 w-24 text-foreground/20" strokeWidth={1} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold font-headline">Nothing here yet...</p>
              <p className="text-sm text-foreground/50">Your future fits are waiting 👀</p>
            </div>
            <Button onClick={closeCart} className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
