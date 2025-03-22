'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';
import { Button } from '../../components/ui/button';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    } else if (tab === 'login') {
      setActiveTab('login');
    }
  }, [searchParams]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-mono">LUXORA</h1>
          <h2 className="mt-6 text-2xl font-bold">
            {activeTab === 'login' ? 'Oh hey, look who\'s back!' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {activeTab === 'login'
              ? "Miss us? Of course, you did. Time to log in and get back to networking like the lead-generating, deal-closing machine you are."
              : 'Already have an account? '}
            {activeTab === 'signup' && (
              <button
                onClick={() => setActiveTab('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            )}
          </p>
        </div>

        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === 'login'
                ? 'border-b-2 border-primary font-medium'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === 'signup'
                ? 'border-b-2 border-primary font-medium'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-8">
          {activeTab === 'login' ? (
            <>
              <LoginForm />
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  👉 New here? <button
                    onClick={() => setActiveTab('signup')}
                    className="text-primary hover:underline font-medium"
                  >
                    Create an account
                  </button>
                </p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                  (Unless you prefer handing out paper cards and hoping for the best. No judgment... kinda.)
                </p>
              </div>
            </>
          ) : (
            <SignUpForm />
          )}
        </div>
      </div>
    </div>
  );
} 