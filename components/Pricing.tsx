'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';

export default function Pricing() {
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const plans = [
    {
      name: "Zero Bucks Given",
      price: "Free",
      period: "",
      priceId: "", // Free plan has no price ID
      description: "Because networking shouldn't cost a dime.",
      features: [
        "Digital business card",
        "QR code sharing (flash it, scan it, done)"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Glow Up",
      price: "$19.99",
      period: "per month",
      priceId: "price_1R0uUZGvrQbQlRXYz13KlV6x", // Glow Up plan price ID
      description: "For the ones who take networking seriously.",
      features: [
        "Everything in Zero Bucks Given (but leveled up)",
        "Custom branding (because your vibe matters)",
        "Advanced analytics (see who's lurking)",
        "Multiple card profiles (one for biz, one for the side hustle)",
        "Contact Capture (so you don't just hope they reach out)",
        "Virtual Vibes™ backgrounds for Zoom (because first impressions matter)",
        "Priority support (because you're VIP)"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Squad Goals",
      price: "$5.99",
      period: "per user/month",
      priceId: "price_1R3UEDGvrQbQlRXYdSbJTGY7", // Squad Goals plan price ID
      description: "For teams that need to keep it professional (without the paper clutter).",
      features: [
        "Everything in Glow Up",
        "Team-wide branding (so everyone looks on point)",
        "Centralized team dashboard (one spot to manage all cards)",
        "Bulk contact capture (because leads = life)",
        "Team analytics (who's networking like a boss and who's slacking)"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const handleSubscription = async (planIndex: number) => {
    // If it's the free plan, just redirect to signup
    if (planIndex === 0) {
      router.push('/auth?tab=signup');
      return;
    }

    // If the user is not logged in, redirect to auth
    if (!user) {
      router.push('/auth?tab=signup');
      return;
    }

    const plan = plans[planIndex];
    
    // Start loading state
    setIsLoading(planIndex);
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          planName: plan.name,
        }),
      });
      
      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section className="py-20 border-t border-border" id="pricing">
      <div className="portfolio-container">
        <h2 className="text-3xl font-mono font-bold mb-4">Pricing</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          You wouldn't send a fax instead of a text, so why are you still using paper business cards? Upgrade your networking game before you get left on read.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`border ${plan.popular ? 'border-primary' : 'border-border'} rounded-lg p-8 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-8 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleSubscription(index)}
                variant={plan.popular ? "default" : "outline"} 
                className="w-full rounded-full"
                disabled={isLoading === index}
              >
                {isLoading === index ? 'Processing...' : plan.cta}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2 italic font-medium">
            Need more than Squad Goals? Let&apos;s talk and get you a custom quote that fits your empire →
          </p>
          <Link href="#contact">
            <Button variant="ghost" className="rounded-full">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 