import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16' as any,
});

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the user's subscription ID from the database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_id')
      .eq('id', session.user.id)
      .single();
    
    if (profileError) {
      console.error('Error retrieving subscription ID:', profileError);
      return NextResponse.json(
        { error: 'Failed to retrieve subscription ID' },
        { status: 500 }
      );
    }
    
    if (!profile?.subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }
    
    // Cancel the subscription in Stripe
    const subscription = await stripe.subscriptions.update(
      profile.subscription_id,
      { cancel_at_period_end: true }
    );
    
    // Update the subscription status in the database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'canceling',
      })
      .eq('id', session.user.id);
    
    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update subscription status' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Subscription cancelled successfully',
      willEndOn: new Date(subscription.current_period_end * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
} 