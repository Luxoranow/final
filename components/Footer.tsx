import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-black">
      <div className="portfolio-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-mono font-medium mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Peek behind the curtain
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  The Fine Print
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Signature Touch
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Where the Magic Happens
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-mono font-medium mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Send a Digital Pigeon
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Slide into Our Inbox
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Call Our Fancy Line
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-mono font-medium mb-6">Stay Connected</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Let's Get Social
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Follow Our Glow-Up
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tweet Us a Compliment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-mono font-medium mb-6">Legal Schmegal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Stuff Lawyers Love
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Don't Steal Our Stuff
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Keep It Confidential
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-6 border-t border-zinc-800">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} LUXORA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 