import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="py-6 border-b border-border">
      <div className="portfolio-container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-mono font-bold">
            <Link href="/">
              LUXORA
            </Link>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/auth?tab=login">
            <Button variant="ghost">
              Sign In
            </Button>
          </Link>
          <Link href="/auth?tab=signup">
            <Button variant="outline" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 