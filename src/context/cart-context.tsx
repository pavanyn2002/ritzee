'use client';

import { Product } from '@/types/product';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CartItem = {
  product: Product;
  quantity: number;
  lineId: string;
  variantId: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, variantId?: string) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  cartItemCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  checkoutUrl: string | null;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

function mapCartLines(lines: any[]): CartItem[] {
  return lines.map((edge: any) => {
    const node = edge.node;
    const merchandise = node.merchandise;
    return {
      product: {
        id: merchandise.product.id,
        slug: merchandise.product.handle,
        name: merchandise.product.title,
        description: '',
        price: parseFloat(merchandise.priceV2.amount),
        image: merchandise.product.featuredImage?.url || '/placeholder.png',
        category: '',
      },
      quantity: node.quantity,
      lineId: node.id,
      variantId: merchandise.id,
    };
  });
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load cart from Shopify on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem('shopify_cart_id');
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId);
    }
  }, []);

  async function fetchCart(id: string) {
    try {
      const response = await fetch(`/api/shopify/cart?cartId=${encodeURIComponent(id)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.cart && data.cart.lines) {
          setCartItems(mapCartLines(data.cart.lines.edges));
          setCheckoutUrl(data.cart.checkoutUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  const addToCart = async (product: Product, variantId?: string) => {
    setLoading(true);
    try {
      // Use first variant ID from product or construct one
      const merchandiseId = variantId || `gid://shopify/ProductVariant/${product.id}`;

      if (!cartId) {
        // Create new cart
        const response = await fetch('/api/shopify/cart/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lines: [{ merchandiseId, quantity: 1 }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setCartId(data.cart.id);
          localStorage.setItem('shopify_cart_id', data.cart.id);
          setCartItems(mapCartLines(data.cart.lines.edges));
          setCheckoutUrl(data.cart.checkoutUrl);
        }
      } else {
        // Add to existing cart
        const response = await fetch('/api/shopify/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId,
            lines: [{ merchandiseId, quantity: 1 }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(mapCartLines(data.cart.lines.edges));
          setCheckoutUrl(data.cart.checkoutUrl);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cartId) return;

    setLoading(true);
    try {
      const response = await fetch('/api/shopify/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lineIds: [lineId],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(mapCartLines(data.cart.lines.edges));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;

    if (quantity <= 0) {
      await removeFromCart(lineId);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/shopify/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          lines: [{ id: lineId, quantity }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(mapCartLines(data.cart.lines.edges));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem('shopify_cart_id');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
        isCartOpen,
        toggleCart,
        closeCart,
        checkoutUrl,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
