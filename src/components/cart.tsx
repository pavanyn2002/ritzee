'use client';

import { useCart } from '@/context/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Input } from './ui/input';
import { X, ShoppingBag } from 'lucide-react';
import { Separator } from './ui/separator';

const FREE_SHIPPING_THRESHOLD = 999;

export default function Cart() {
  const { isCartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <ScrollArea className="h-full pr-6">
                <div className="flex flex-col gap-6 py-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center">
                           <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                            className="h-8 w-16"
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <Separator />
            <SheetFooter className="flex-col space-y-4 px-6 py-4">
               <div className="w-full">
                {cartTotal < FREE_SHIPPING_THRESHOLD ? (
                  <p className="text-center text-sm text-muted-foreground mb-2">
                    You're ${ (FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2) } away from free shipping!
                  </p>
                ) : (
                  <p className="text-center text-sm font-semibold text-primary mb-2">
                    You've unlocked free shipping!
                  </p>
                )}
                 <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${shippingProgress}%`}}
                    />
                 </div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and taxes will be calculated at checkout.</p>
              <Button size="lg" className="w-full">
                Checkout
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-24 w-24 text-muted-foreground/30" strokeWidth={1} />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" onClick={closeCart}>Continue Shopping</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
