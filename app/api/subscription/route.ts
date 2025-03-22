import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch user's subscription details from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_plan, subscription_current_period_end')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error('Error fetching subscription data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscription data' },
        { status: 500 }
      );
    }
    
    // Default to free plan if no subscription data is found
    const subscriptionData = {
      status: profile?.subscription_status || 'free',
      plan: profile?.subscription_plan || 'Free',
      currentPeriodEnd: profile?.subscription_current_period_end || null,
    };
    
    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error('Subscription data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 