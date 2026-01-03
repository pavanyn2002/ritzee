'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/ui/logo';
import { useCart } from '@/context/cart-context';
import React, { useState, useEffect } from 'react';
// Categories are now managed in Shopify
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SearchDialog from './search-dialog';
import AuthDialog from './auth-dialog';

// Categories will be fetched from Shopify dynamically
const linkStyles = "text-base font-medium text-foreground/80 hover:text-primary transition-colors relative group after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-[hsl(var(--accent))] hover:after:w-full after:transition-all after:duration-300";


const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => {
  const [categories, setCategories] = useState<{ title: string, handle: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories from Shopify on component mount
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch('/api/shopify/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <nav className={className}>
      <Link href="/" onClick={onLinkClick} className={linkStyles}>Home</Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(linkStyles, "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0")}>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-wrap justify-center w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                {loading ? (
                  <li className="text-sm text-muted-foreground p-3">Loading categories...</li>
                ) : categories.length === 0 ? (
                  <li className="text-sm text-muted-foreground p-3">No categories available</li>
                ) : (
                  categories.map((category) => (
                    <ListItem
                      key={category.handle}
                      href={`/collections/${category.handle}`}
                      title={category.title}
                      onClick={onLinkClick}
                    >
                      Browse our collection of {category.title.toLowerCase()}.
                    </ListItem>
                  ))
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/bestsellers" onClick={onLinkClick} className={linkStyles}>Bestsellers</Link>
      <Link href="/blog" onClick={onLinkClick} className={linkStyles}>Blog</Link>
      <Link href="/about" onClick={onLinkClick} className={linkStyles}>About</Link>
      <Link href="/faq" onClick={onLinkClick} className={linkStyles}>FAQ</Link>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-center">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-center">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


// Mobile Navigation Component using Accordion for better UX
const mobileLinkStyles = "text-lg font-medium text-foreground/80 hover:text-primary transition-colors relative group py-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[hsl(var(--accent))] hover:after:w-full after:transition-all after:duration-300";

const MobileNavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => {
  const [categories, setCategories] = useState<{ title: string, handle: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch('/api/shopify/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <nav className={className}>
      <Link href="/" onClick={onLinkClick} className={mobileLinkStyles}>Home</Link>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="shop" className="border-b-0">
          <AccordionTrigger className="text-lg font-medium text-foreground/80 hover:text-primary py-3 hover:no-underline">Shop</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col space-y-1 pl-4 border-l-2 border-[hsl(var(--accent))]">
              <li>
                <Link href="/shop" onClick={onLinkClick} className="block py-2 text-foreground/70 hover:text-primary transition-colors">
                  View All Collections
                </Link>
              </li>
              {loading ? (
                <li className="text-sm text-muted-foreground py-2">Loading...</li>
              ) : (
                categories.map((category) => (
                  <li key={category.handle}>
                    <Link
                      href={`/collections/${category.handle}`}
                      onClick={onLinkClick}
                      className="block py-2 text-foreground/70 hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link href="/bestsellers" onClick={onLinkClick} className={mobileLinkStyles}>Bestsellers</Link>
      <Link href="/blog" onClick={onLinkClick} className={mobileLinkStyles}>Blog</Link>
      <Link href="/about" onClick={onLinkClick} className={mobileLinkStyles}>About</Link>
      <Link href="/faq" onClick={onLinkClick} className={mobileLinkStyles}>FAQ</Link>
    </nav>
  );
};


export default function Header() {
  const { toggleCart, cartItemCount } = useCart();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center px-4 md:px-8">
          <div className="mr-12 hidden md:flex">
            <Logo />
          </div>

          <div className="flex-1 md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col p-6">
                  <Logo />
                  <MobileNavLinks className="flex flex-col space-y-4 mt-8" onLinkClick={handleLinkClick} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:flex-1 md:items-center md:justify-center">
            <div className="md:hidden">
              <Logo />
            </div>
            <NavLinks className="hidden md:flex items-center space-x-10 text-base" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
}
