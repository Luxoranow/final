import { Button } from './ui/button';
import Link from 'next/link';

export default function Contact() {
  return (
    <section className="py-20 border-t border-border" id="contact">
      <div className="portfolio-container">
        <h2 className="text-3xl font-mono font-bold mb-8">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xl mb-6">
              Wanna level up your networking game with a sleek digital business card? 🚀
            </p>
            
            <p className="text-muted-foreground mb-8">
              Drop us a message, and we'll slide into your inbox within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">📧 Email</h3>
                  <p className="text-muted-foreground">aylen@luxoranow.com</p>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-8">
              Or just fill out this form and let's talk!
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-8 border border-border">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 rounded-lg bg-[#A6A6A6] border border-border focus:outline-none focus:ring-2 focus:ring-primary text-black"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 rounded-lg bg-[#A6A6A6] border border-border focus:outline-none focus:ring-2 focus:ring-primary text-black"
                  placeholder="Your email"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full p-3 rounded-lg bg-[#A6A6A6] border border-border focus:outline-none focus:ring-2 focus:ring-primary text-black"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <Button className="w-full rounded-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 