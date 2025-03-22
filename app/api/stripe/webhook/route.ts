import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16' as any, // Type assertion to bypass version mismatch
});

// Disable body parsing, we need to get the raw body for webhook signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: ReadableStream) {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  try {
    const rawBody = await buffer(request.body!);
    const signature = request.headers.get('stripe-signature')!;
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          
          const { userId, planName } = subscription.metadata;
          
          // Update user subscription status in database
          if (userId) {
            const { error } = await supabase
              .from('profiles')
              .update({
                subscription_status: 'active',
                subscription_id: subscription.id,
                subscription_plan: planName || 'premium',
                subscription_current_period_end: new Date(
                  subscription.current_period_end * 1000
                ).toISOString(),
              })
              .eq('id', userId);
            
            if (error) {
              console.error('Error updating subscription status:', error);
              return NextResponse.json(
                { error: 'Failed to update subscription status' },
                { status: 500 }
              );
            }
          }
        }
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          
          const { userId } = subscription.metadata;
          
          // Update subscription period end
          if (userId) {
            const { error } = await supabase
              .from('profiles')
              .update({
                subscription_status: 'active',
                subscription_current_period_end: new Date(
                  subscription.current_period_end * 1000
                ).toISOString(),
              })
              .eq('id', userId);
            
            if (error) {
              console.error('Error updating subscription period:', error);
            }
          }
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const { userId } = subscription.metadata;
        
        if (userId) {
          const { error } = await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status,
              subscription_current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq('id', userId);
          
          if (error) {
            console.error('Error updating subscription status:', error);
          }
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const { userId } = subscription.metadata;
        
        if (userId) {
          const { error } = await supabase
            .from('profiles')
            .update({
              subscription_status: 'canceled',
              subscription_id: null,
              subscription_plan: 'free',
            })
            .eq('id', userId);
          
          if (error) {
            console.error('Error updating subscription cancellation:', error);
          }
        }
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 