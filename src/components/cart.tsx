'use client';

import { useCart } from '@/context/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Sparkles, Truck, Shield, RotateCcw, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 1000;

export default function Cart() {
  const { isCartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQuantity, checkoutUrl, loading } = useCart();

  const safeTotal = Number(isNaN(cartTotal) ? 0 : cartTotal);
  const shippingProgress = Math.min((safeTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md bg-background border-l-4 border-foreground" side="right">
        {/* Header */}
        <SheetHeader className="px-6 py-6 border-b-4 border-foreground bg-primary/10">
          <SheetTitle className="flex items-center justify-between text-2xl font-black font-headline uppercase tracking-tighter">
            <span className="flex items-center gap-2">
              MY HAUL
              <span className="text-xl">🛒</span>
            </span>
            {itemCount > 0 && (
              <div className="px-3 py-1 text-xs font-bold bg-foreground text-background transform -rotate-2">
                {itemCount} ITEMS
              </div>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            {/* Free Shipping Progress: Brutalist Style */}
            <div className="px-6 py-4 border-b-4 border-foreground bg-background">
              {safeTotal < FREE_SHIPPING_THRESHOLD ? (
                <div className="space-y-3">
                  <p className="text-sm font-bold font-headline uppercase tracking-wide">
                    Add <span className="text-primary mx-1 px-1 bg-foreground text-background">₹{(FREE_SHIPPING_THRESHOLD - safeTotal).toFixed(0)}</span> for Free Shipping
                  </p>
                  <div className="h-4 w-full border-2 border-foreground p-[2px]">
                    <div
                      className="h-full bg-primary transition-all duration-300 relative"
                      style={{ width: `${shippingProgress}%` }}
                    >
                      {/* Striped pattern overlay */}
                      <div className="absolute inset-0 bg-[url('/stripes.png')] opacity-20" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-primary animate-pulse">
                  <Sparkles className="w-4 h-4 text-foreground" />
                  Free Shipping Unlocked!
                  <Sparkles className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6 bg-muted/20">
              <div className="flex flex-col gap-6 py-6">
                {cartItems.map((item) => (
                  <div key={item.lineId} className="group relative flex gap-4 p-4 bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 border-2 border-foreground flex-shrink-0 bg-white">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                        sizes="96px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold font-headline text-lg uppercase leading-none truncate pr-6">{item.product.name}</h3>
                        {item.variantTitle && (
                          <div className="inline-block px-2 py-0.5 mt-2 text-xs font-bold border border-foreground bg-accent/20">
                            SIZE: {item.variantTitle}
                          </div>
                        )}
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        <p className="text-xl font-black font-headline">₹{item.product.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-foreground bg-background">
                          <button
                            onClick={() => updateQuantity(item.lineId, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted border-r-2 border-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted border-l-2 border-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.lineId)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-destructive border-2 border-foreground text-destructive-foreground flex items-center justify-center hover:rotate-90 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t-4 border-foreground p-6 bg-background space-y-4">

              {/* Subtotal */}
              <div className="flex items-end justify-between border-b-2 border-dashed border-foreground pb-4">
                <span className="font-bold font-headline text-lg uppercase text-muted-foreground">Subtotal</span>
                <span className="text-3xl font-black font-headline">₹{safeTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-3 pt-2">
                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-black uppercase tracking-widest border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-primary text-foreground hover:bg-primary/90"
                  onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
                  disabled={!checkoutUrl || loading}
                >
                  {loading ? 'LOADING...' : 'SECURE CHECKOUT'} <ArrowRight className="ml-2 w-6 h-6" />
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeCart}
                  className="w-full border-2 border-transparent hover:bg-transparent hover:underline uppercase font-bold tracking-wide"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty Cart State */
          <div className="flex h-full flex-col items-center justify-center space-y-8 px-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
            <div className="relative">
              <div className="absolute inset-0 bg-accent blur-[50px] opacity-40 animate-pulse" />
              <ShoppingBag className="relative h-32 w-32 border-4 border-foreground p-6 rounded-full bg-background rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" strokeWidth={1.5} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-black font-headline uppercase italic">Your Cart is Empty!</p>
              <p className="text-lg font-medium text-muted-foreground">Honestly? That's kinda sad.</p>
            </div>
            <Button
              onClick={closeCart}
              className="gap-2 h-12 px-8 text-lg font-bold border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all bg-foreground text-background hover:bg-foreground/90"
            >
              start hauling <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
