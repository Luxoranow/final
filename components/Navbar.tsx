'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from '../lib/auth-context';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Don't show navbar on auth page or dashboard pages
  if (pathname === '/auth' || pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="py-6 border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="portfolio-container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl md:text-3xl font-mono font-bold">
            <Link href="/">
              LUXORA
            </Link>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Show these links for all users */}
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && (
            user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="default" className="bg-white text-black hover:bg-gray-200 rounded-full">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth?tab=login">
                  <Button variant="default" className="bg-white text-black hover:bg-gray-200 rounded-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?tab=signup">
                  <Button variant="outline" className="rounded-full border-white hover:border-gray-300">
                    Get Started
                  </Button>
                </Link>
              </>
            )
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border">
          <nav className="flex flex-col space-y-4">
            {/* Common navigation links for all users */}
            <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            
            {/* Conditional auth buttons */}
            {!user ? (
              <div className="pt-4 border-t border-border flex flex-col space-y-2">
                <Link href="/auth?tab=login">
                  <Button variant="default" className="w-full justify-start bg-white text-black hover:bg-gray-200 rounded-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?tab=signup">
                  <Button variant="outline" className="w-full justify-start rounded-full border-white hover:border-gray-300">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-border flex flex-col space-y-2">
                <Link href="/dashboard">
                  <Button variant="default" className="w-full justify-start bg-white text-black hover:bg-gray-200 rounded-full">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => signOut()} className="w-full justify-start">
                  Sign Out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 