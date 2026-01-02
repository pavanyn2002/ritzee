import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="text-foreground/60 hover:text-primary transition-all hover:scale-110">
    {children}
  </Link>
)

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm text-foreground/60 hover:text-primary transition-all duration-300 hover:translate-x-1 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
)

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="w-full px-4 md:px-8 py-2 md:py-4">
        {/* Main Footer Content - All in one row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Logo className="h-12 md:h-14" />
            <p className="text-sm text-foreground/60 max-w-xs mt-2">The future of fashion is here.</p>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Shop</h3>
            <FooterLink href="/shop">New Arrivals</FooterLink>
            <FooterLink href="/shop">Collections</FooterLink>
            <FooterLink href="/shop">Bestsellers</FooterLink>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">About</h3>
            <FooterLink href="/about">Our Story</FooterLink>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Support</h3>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="#">Shipping & Returns</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-10 pt-6 border-t border-border/40">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Ritzee Wear. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-foreground/60">Follow us</span>
            <div className="flex gap-3">
              <SocialIcon>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
              </SocialIcon>
              <SocialIcon>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>
              </SocialIcon>
              <SocialIcon>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
