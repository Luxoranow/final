# Subscription System Setup

This document provides step-by-step instructions for setting up and testing the subscription system in Luxora.

## Prerequisites

- A Stripe account with API keys
- Supabase project with database access
- Next.js application running locally

## Setup Steps

### 1. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com) if you don't have one
2. Create products and pricing plans in the Stripe dashboard
   - Create a "Glow Up" product with a price of $19.99/month
   - Create a "Squad Goals" product with a price of $5.99/user/month
3. Note the Price IDs for each plan (format: `price_xxxxxx`)
4. In the Stripe dashboard, go to Developers > API keys and copy your publishable and secret keys
5. Set up a webhook endpoint in the Stripe dashboard pointing to `https://your-domain.com/api/stripe/webhook`
   - Add the following events to listen for:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
6. Copy the webhook signing secret

### 2. Update Environment Variables

Update your `.env.local` file with the following Stripe keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
```

### 3. Set Up Supabase Database

Run the SQL commands in `supabase_schema.sql` in your Supabase SQL editor to:
- Add subscription-related columns to the profiles table
- Set up necessary indexes and security policies
- Create webhook event logging table and triggers

### 4. Update Price IDs in the Code

Open `components/Pricing.tsx` and update the price IDs to match your Stripe products:

```javascript
const plans = [
  // Free plan
  {
    // ...
    priceId: "", // Free plan has no price ID
    // ...
  },
  // Glow Up plan
  {
    // ...
    priceId: "price_your_glow_up_price_id", // Replace with your actual Stripe price ID
    // ...
  },
  // Squad Goals plan
  {
    // ...
    priceId: "price_your_squad_goals_price_id", // Replace with your actual Stripe price ID
    // ...
  }
];
```

## Testing the Subscription System

### Local Testing with Stripe CLI

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Run the following command to forward events to your local webhook:
   ```
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```
3. In a separate terminal, start your Next.js application:
   ```
   npm run dev
   ```

### Test Subscription Flow

1. Create a user account (or log in to an existing account)
2. Navigate to the pricing page
3. Click "Get Started" on either paid plan
4. Complete the checkout using Stripe test card details:
   - Card number: `4242 4242 4242 4242`
   - Any future expiration date
   - Any 3-digit CVC
   - Any postal code
5. After successful payment, you should be redirected to the dashboard
6. The dashboard should display your active subscription

### Verify Database Updates

Check your Supabase database to confirm:
1. The user's profile has been updated with:
   - `stripe_customer_id`: The Stripe customer ID
   - `subscription_id`: The Stripe subscription ID
   - `subscription_status`: Set to `active`
   - `subscription_plan`: Set to the name of the selected plan
   - `subscription_current_period_end`: Set to the end date of the current billing period

### Test Subscription Management

1. Go to the Settings > Billing tab
2. Verify the current plan is displayed correctly
3. Click "Cancel Subscription" to test cancellation
4. The subscription status should change to "canceling"
5. The subscription will remain active until the end of the current billing period

## Troubleshooting

If subscriptions aren't working as expected:

1. Check browser console for errors in the network requests
2. Verify webhook events are being received (check Stripe CLI output)
3. Check API route logs for any errors during webhook processing
4. Confirm the Stripe price IDs in your code match those in your Stripe dashboard
5. Verify environment variables are properly set

## Production Deployment

Before deploying to production:

1. Update environment variables on your hosting platform
2. Update the Stripe webhook endpoint URL to your production domain
3. Test the complete flow in production with a test account 