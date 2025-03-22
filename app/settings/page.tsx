'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, User, Building, Phone, Mail, Globe, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  // Profile state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [fax, setFax] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  
  // Social media
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [contactSavedAlerts, setContactSavedAlerts] = useState(true);

  // Subscription state
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    status: 'free',
    plan: 'Free',
    currentPeriodEnd: null
  });

  // Load user profile data
  useEffect(() => {
    if (user) {
      // In a real app, you would fetch the user's profile from your database
      // For now, we'll just use placeholder data
      setName('LUXORA User');
      setBio('Digital business card enthusiast');
      setJobTitle('Professional Networker');
      setCompany('LUXORA');
      setPhone('+1 (555) 123-4567');
      setWebsite('https://luxora.com');
    }
  }, [user]);

  useEffect(() => {
    // Fetch the user's subscription status
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription');
        if (response.ok) {
          const data = await response.json();
          setSubscriptionData(data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setMessage({ type: 'success', text: 'Settings saved successfully!' });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion logic here
      await signOut();
      window.location.href = '/';
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCompanyLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerProfileImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerLogoUpload = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleCancelSubscription = async () => {
    setIsCanceling(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update local state to reflect cancellation
        setSubscriptionData({
          ...subscriptionData,
          status: 'canceled',
        });
        // You could show a success message here
      } else {
        console.error('Failed to cancel subscription');
        // You could show an error message here
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl font-bold font-mono">User Settings</CardTitle>
            <CardDescription>Manage your account preferences and profile in one place</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border">
              <div className="px-4">
                <TabsList className="h-12 bg-transparent border-b-0 p-0">
                  <TabsTrigger 
                    value="profile" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-12"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-12"
                    >
                      Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-12"
                    >
                      Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 h-12"
                    >
                      Billing
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <CardContent className="p-6">
              {message && (
                <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                </div>
              )}
              
              <TabsContent value="profile" className="mt-0 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image Upload */}
                  <div className="md:w-1/3">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Photo</h3>
                      <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-border">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden border border-gray-300">
                          {profileImage ? (
                            <img 
                              src={profileImage} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                        />
                        <Button 
                          variant="outline" 
                          onClick={triggerProfileImageUpload}
                          className="mb-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={() => setProfileImage(null)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>

                      <h3 className="text-lg font-medium mt-6">Company Logo</h3>
                      <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-border">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden border border-gray-300">
                          {companyLogo ? (
                            <img 
                              src={companyLogo} 
                              alt="Company Logo" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <input
                          type="file"
                          ref={logoInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoUpload}
                        />
                        <Button 
                          variant="outline" 
                          onClick={triggerLogoUpload}
                          className="mb-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                        {companyLogo && (
                          <button
                            type="button"
                            onClick={() => setCompanyLogo(null)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="md:w-2/3">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                              Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-md bg-background/50 text-muted-foreground"
                      />
                            <p className="text-xs text-muted-foreground">
                              Your email cannot be changed
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Your full name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="jobTitle" className="block text-sm font-medium">
                              Job Title
                            </label>
                            <input
                              type="text"
                              id="jobTitle"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Your job title"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium">
                              Phone
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Your phone number"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="website" className="block text-sm font-medium">
                              Website
                            </label>
                            <input
                              type="url"
                              id="website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Your personal website"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="company" className="block text-sm font-medium">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Your company name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="companyPhone" className="block text-sm font-medium">
                              Company Phone
                            </label>
                            <input
                              type="tel"
                              id="companyPhone"
                              value={companyPhone}
                              onChange={(e) => setCompanyPhone(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Company phone number"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="fax" className="block text-sm font-medium">
                              Fax
                            </label>
                            <input
                              type="text"
                              id="fax"
                              value={fax}
                              onChange={(e) => setFax(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Company fax number"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium">
                              Address
                            </label>
                            <textarea
                              id="address"
                              rows={2}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Company address"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Social Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="linkedin" className="block text-sm font-medium">
                              LinkedIn
                            </label>
                            <input
                              type="url"
                              id="linkedin"
                              value={linkedin}
                              onChange={(e) => setLinkedin(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="LinkedIn profile URL"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="twitter" className="block text-sm font-medium">
                              Twitter
                            </label>
                            <input
                              type="url"
                              id="twitter"
                              value={twitter}
                              onChange={(e) => setTwitter(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Twitter profile URL"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="instagram" className="block text-sm font-medium">
                              Instagram
                            </label>
                            <input
                              type="url"
                              id="instagram"
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Instagram profile URL"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="facebook" className="block text-sm font-medium">
                              Facebook
                            </label>
                            <input
                              type="url"
                              id="facebook"
                              value={facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md text-black"
                              placeholder="Facebook profile URL"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="bio" className="block text-sm font-medium">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md text-black"
                          placeholder="Tell us about yourself"
                        />
                        <p className="text-xs text-muted-foreground">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Account Information</h2>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="mr-2"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-6">
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email_notifications"
                          name="email_notifications"
                          type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email_notifications" className="font-medium">
                          Email Notifications
                        </label>
                        <p className="text-muted-foreground">
                          Receive email notifications when someone views your card.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing_emails"
                          name="marketing_emails"
                          type="checkbox"
                        checked={marketingEmails}
                        onChange={(e) => setMarketingEmails(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketing_emails" className="font-medium">
                          Marketing Emails
                        </label>
                        <p className="text-muted-foreground">
                          Receive updates about new features and promotions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="contact_saved"
                          name="contact_saved"
                          type="checkbox"
                        checked={contactSavedAlerts}
                        onChange={(e) => setContactSavedAlerts(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="contact_saved" className="font-medium">
                          Contact Saved Alerts
                        </label>
                        <p className="text-muted-foreground">
                          Get notified when someone saves your contact information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </div>
              </TabsContent>
              
              <TabsContent value="billing" className="mt-0 space-y-6">
                  <h2 className="text-xl font-semibold">Billing Information</h2>
                  
                  <div className="bg-card-foreground/5 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        {!isLoadingSubscription ? (
                          <p className="text-muted-foreground">
                            {subscriptionData.plan !== 'Free' ? (
                              <>{subscriptionData.plan} (${subscriptionData.plan === 'Glow Up' ? '19.99' : '5.99'}/month)</>
                            ) : (
                              <>Zero Bucks Given (Free)</>
                            )}
                          </p>
                        ) : (
                          <p className="text-muted-foreground">Loading subscription details...</p>
                        )}
                        
                        {subscriptionData.status === 'active' && subscriptionData.currentPeriodEnd && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Your plan renews on {new Date(subscriptionData.currentPeriodEnd).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {subscriptionData.status === 'active' ? (
                        <Button variant="outline" onClick={handleCancelSubscription} disabled={isCanceling}>
                          {isCanceling ? 'Processing...' : 'Cancel Subscription'}
                        </Button>
                      ) : (
                        <Link href="/#pricing">
                          <Button variant="outline">
                            Upgrade
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    {subscriptionData.status === 'active' ? (
                      <div className="flex items-center space-x-2">
                        <div className="bg-card-foreground/10 p-2 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Visa - Expires 12/25</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Update
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-muted-foreground">No payment method added yet.</p>
                        <Button variant="outline" size="sm">
                          Add Payment Method
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Billing History</h3>
                    {subscriptionData.status === 'active' ? (
                      <div className="border rounded-md divide-y">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{subscriptionData.plan} Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${subscriptionData.plan === 'Glow Up' ? '19.99' : '5.99'}</p>
                            <p className="text-xs text-green-500">Paid</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No billing history available.</p>
                    )}
                  </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
} 