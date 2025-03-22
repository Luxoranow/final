'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');
  const [subscription, setSubscription] = useState({
    status: 'free',
    plan: 'Free',
    currentPeriodEnd: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams.get('checkout');

  useEffect(() => {
    // Show a success message if the checkout was successful
    if (checkoutStatus === 'success') {
      // You could show a toast notification here
      console.log('Subscription successful!');
    }
  }, [checkoutStatus]);

  useEffect(() => {
    // Fetch the user's subscription status
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription');
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSubscription();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Render the subscription banner based on the user's subscription status
  const renderSubscriptionBanner = () => {
    if (isLoading) {
      return (
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 shadow-sm border border-border">
          <p>Loading subscription details...</p>
        </div>
      );
    }

    if (subscription.status === 'active') {
      return (
        <div className="bg-gradient-to-r from-green-500/20 to-green-400/10 rounded-lg p-6 shadow-sm border border-green-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">You're on the {subscription.plan} Plan</h2>
              <p className="text-muted-foreground mb-4 md:mb-0">
                {subscription.currentPeriodEnd ? (
                  <>Your subscription renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}.</>
                ) : (
                  <>Enjoy all the premium features of your plan.</>
                )}
              </p>
            </div>
            <Link href="/settings">
              <Button variant="outline" className="border-green-400 text-green-600">
                Manage Subscription
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">You're on the Free Plan</h2>
            <p className="text-muted-foreground mb-4 md:mb-0">
              Upgrade to Glow Up for advanced analytics, multiple card profiles, and more.
            </p>
          </div>
          <Link href="/#pricing">
            <Button className="bg-black text-white hover:bg-black/80">
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <h1 className="text-2xl font-bold font-mono mb-2">Welcome back, {user?.email?.split('@')[0]?.split('.')[0] || 'Rockstar'}</h1>
        <p className="text-muted-foreground">
          Your digital presence is looking 🔥. Track your networking game right here.
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white text-black rounded-lg p-4 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-gray-500">Active Cards</h3>
          <p className="text-3xl font-bold">2</p>
          <div className="mt-2 text-xs text-green-600">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +1 this month
            </span>
          </div>
        </div>
        <div className="bg-white text-black rounded-lg p-4 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-3xl font-bold">124</p>
          <div className="mt-2 text-xs text-green-600">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +28% from last week
            </span>
          </div>
        </div>
        <div className="bg-white text-black rounded-lg p-4 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-gray-500">Contacts</h3>
          <p className="text-3xl font-bold">18</p>
          <div className="mt-2 text-xs text-green-600">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +5 new this week
            </span>
          </div>
        </div>
        <div className="bg-white text-black rounded-lg p-4 shadow-sm border border-border">
          <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
          <p className="text-3xl font-bold">1</p>
          <div className="mt-2 text-xs text-gray-500">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              No change
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'overview'
                ? 'border-primary text-foreground'
                : 'border-transparent text-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'activity'
                ? 'border-primary text-foreground'
                : 'border-transparent text-foreground hover:text-foreground'
            }`}
          >
            Recent Activity
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Digital Cards */}
            <div className="bg-white text-black rounded-lg p-6 shadow-sm border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Digital Cards</h2>
                <Link href="/dashboard/cards">
                  <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-black/80">
                    View All
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Create and manage your digital business cards.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Personal Card</p>
                    <p className="text-sm text-gray-500">Last edited: 2 days ago</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-black">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-black">Share</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Work Card</p>
                    <p className="text-sm text-gray-500">Last edited: 5 days ago</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-black">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-black">Share</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Team */}
            <div className="bg-white text-black rounded-lg p-6 shadow-sm border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Team</h2>
                <Link href="/dashboard/team">
                  <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-black/80">
                    Manage Team
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Create a cohesive branding team for your organization.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      AJ
                    </div>
                    <div>
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-gray-500">Admin • Last active: 2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Invite Team Member
                </Button>
              </div>
            </div>
            
            {/* Virtual Vibes */}
            <div className="bg-white text-black rounded-lg p-6 shadow-sm border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Virtual Vibes</h2>
                <Link href="/dashboard/virtual-vibes">
                  <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-black/80">
                    View All
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Professional backgrounds with your QR code for virtual meetings.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-2 right-2 h-12 w-12 bg-white rounded-md flex items-center justify-center">
                    QR
                  </div>
                  <p className="text-sm text-gray-500">Modern Office</p>
                </div>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-2 right-2 h-12 w-12 bg-white rounded-md flex items-center justify-center">
                    QR
                  </div>
                  <p className="text-sm text-gray-500">City View</p>
                </div>
              </div>
            </div>
            
            {/* Analytics */}
            <div className="bg-white text-black rounded-lg p-6 shadow-sm border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Analytics</h2>
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="bg-black text-white border-gray-700 hover:bg-black/80">
                    View Details
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Track performance metrics for your digital cards.</p>
              <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Analytics visualization will appear here</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white text-black rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Your Personal Card was viewed</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">New contact captured: Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">You updated your Work Card</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">You created a new Virtual Vibe background</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Subscription Banner */}
      {renderSubscriptionBanner()}
    </div>
  );
} 