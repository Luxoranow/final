import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20">
      <div className="portfolio-container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-mono font-bold mb-6">
              DIGITAL<br />BUSINESS CARDS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl font-open-sans">
              Paper Business Cards? <span className="italic">Be so fr.</span> It's 2025. We've got AI girlfriends, self-driving Ubers, and people making six figures posting memes—but you're still handing out paper business cards?
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl font-open-sans">
              Welcome to <span className="font-bold">LUXORA</span>, the only digital business card that doesn't make you look like a corporate NPC.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#pricing">
                <Button variant="outline" size="lg" className="rounded-full">
                  Level Up Your Network Game
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
              
              <Link href="#features">
                <Button variant="ghost" size="lg" className="rounded-full">
                  Welcome Back, Main Character
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative aspect-square rounded-2xl overflow-hidden border border-border">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Digital Card Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 