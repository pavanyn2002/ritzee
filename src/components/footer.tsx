import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
    <Link href="#" className="text-foreground/60 hover:text-primary transition-colors">
        {children}
    </Link>
)

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-sm text-foreground/60">The future of fashion is here.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="grid gap-1">
                <h3 className="font-semibold">Shop</h3>
                <Link href="/shop" className="text-foreground/60 hover:text-primary">New Arrivals</Link>
                <Link href="/shop" className="text-foreground/60 hover:text-primary">Collections</Link>
                <Link href="/shop" className="text-foreground/60 hover:text-primary">Sale</Link>
            </div>
             <div className="grid gap-1">
                <h3 className="font-semibold">About</h3>
                <Link href="/about" className="text-foreground/60 hover:text-primary">Our Story</Link>
                <Link href="#" className="text-foreground/60 hover:text-primary">Careers</Link>
                <Link href="#" className="text-foreground/60 hover:text-primary">Press</Link>
            </div>
             <div className="grid gap-1">
                <h3 className="font-semibold">Support</h3>
                <Link href="#" className="text-foreground/60 hover:text-primary">Contact</Link>
                <Link href="#" className="text-foreground/60 hover:text-primary">FAQ</Link>
                <Link href="#" className="text-foreground/60 hover:text-primary">Returns</Link>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <h3 className="font-semibold text-sm">Join the revolution</h3>
             <div className="flex gap-4 mt-2">
                <SocialIcon>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
                </SocialIcon>
                 <SocialIcon>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19,4H14.82C14.4,2.84 13.3,2 12,2C10.7,2 9.6,2.84 9.18,4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M14,14H11V10H9V14H6V16H9V20H11V16H14V14Z" /></svg>
                 </SocialIcon>
                 <SocialIcon>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>
                 </SocialIcon>
             </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} Ritzee Wear. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
