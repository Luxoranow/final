'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import CardDisplay from './CardDisplay';

type CardTheme = 'minimal' | 'gradient' | 'dark' | 'light';

interface CardFormData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  snapchat: string;
  wechat: string;
  discord: string;
  twitch: string;
  tiktok: string;
  youtube: string;
  pinterest: string;
  reddit: string;
  tumblr: string;
  behance: string;
  dribbble: string;
  bio: string;
  theme: CardTheme;
  companyName: string;
  department: string;
  companyPhone: string;
  fax: string;
  address: string;
  whatsapp: string;
  signal: string;
  telegram: string;
  sms: string;
  backgroundColor: string;
  accentColor: string;
  fontStyle: string;
  enableShadow: boolean;
  enableRounded: boolean;
  enableBorder: boolean;
  profileImage?: string;
  // Call-to-action fields
  enableCta1: boolean;
  cta1Type: string;
  cta1Text: string;
  cta1Link: string;
  enableCta2: boolean;
  cta2Type: string;
  cta2Text: string;
  cta2Link: string;
}

interface CardCreatorProps {
  onSave?: (cardData: any) => void;
}

export default function CardCreator({ onSave }: CardCreatorProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState('personal');
  const [selectedMessagingPlatforms, setSelectedMessagingPlatforms] = useState<string[]>([]);
  const [selectedSocialPlatforms, setSelectedSocialPlatforms] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Common input class
  const inputClass = "appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-[#A6A6A6] text-black";
  
  // Textarea specific class with #A6A6A6 background
  const textareaClass = "appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-[#A6A6A6] text-black";
  
  // Initial form data
  const [formData, setFormData] = useState<CardFormData>({
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    snapchat: '',
    wechat: '',
    discord: '',
    twitch: '',
    tiktok: '',
    youtube: '',
    pinterest: '',
    reddit: '',
    tumblr: '',
    behance: '',
    dribbble: '',
    bio: '',
    theme: 'minimal',
    companyName: '',
    department: '',
    companyPhone: '',
    fax: '',
    address: '',
    whatsapp: '',
    signal: '',
    telegram: '',
    sms: '',
    backgroundColor: '#ffffff',
    accentColor: '#000000',
    fontStyle: 'sans',
    enableShadow: false,
    enableRounded: true,
    enableBorder: true,
    profileImage: '',
    // Call-to-action fields
    enableCta1: false,
    cta1Type: 'website',
    cta1Text: 'Visit Website',
    cta1Link: '',
    enableCta2: false,
    cta2Type: 'contact',
    cta2Text: 'Contact Me',
    cta2Link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Create the card data
      const cardData = {
        id: `card-${Date.now()}`, // Generate a unique ID
        name: formData.fullName,
        jobTitle: formData.jobTitle,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        instagram: formData.instagram,
        facebook: formData.facebook,
        snapchat: formData.snapchat,
        wechat: formData.wechat,
        discord: formData.discord,
        twitch: formData.twitch,
        tiktok: formData.tiktok,
        youtube: formData.youtube,
        pinterest: formData.pinterest,
        reddit: formData.reddit,
        tumblr: formData.tumblr,
        behance: formData.behance,
        dribbble: formData.dribbble,
        bio: formData.bio,
        theme: formData.theme as 'minimal' | 'gradient' | 'dark' | 'light',
        profileImage,
        companyLogo,
        // Add messaging platforms
        whatsapp: formData.whatsapp,
        signal: formData.signal,
        telegram: formData.telegram,
        sms: formData.sms,
        // Add company information
        department: formData.department,
        companyPhone: formData.companyPhone,
        fax: formData.fax,
        address: formData.address,
      };
      
      // In a real app, you would save the card to your database
      console.log('Submitting card data:', cardData);
      
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(cardData);
      }
      
      setMessage({
        type: 'success',
        text: 'Digital card created successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to create card. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection('');
    } else {
      setExpandedSection(section);
    }
  };

  const selectMessagingPlatform = (platform: string) => {
    setSelectedMessagingPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const selectSocialPlatform = (platform: string) => {
    setSelectedSocialPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  // Create a preview card object from the form data
  const previewCard = {
    id: 'preview',
    name: formData.fullName,
    jobTitle: formData.jobTitle,
    company: formData.companyName || formData.company,
    email: formData.email,
    phone: formData.phone,
    website: formData.website,
    linkedin: formData.linkedin,
    twitter: formData.twitter,
    instagram: formData.instagram,
    facebook: formData.facebook,
    snapchat: formData.snapchat,
    wechat: formData.wechat,
    discord: formData.discord,
    twitch: formData.twitch,
    tiktok: formData.tiktok,
    youtube: formData.youtube,
    pinterest: formData.pinterest,
    reddit: formData.reddit,
    tumblr: formData.tumblr,
    behance: formData.behance,
    dribbble: formData.dribbble,
    bio: formData.bio,
    theme: formData.theme,
    whatsapp: formData.whatsapp,
    signal: formData.signal,
    telegram: formData.telegram,
    sms: formData.sms,
    department: formData.department,
    companyPhone: formData.companyPhone,
    fax: formData.fax,
    address: formData.address,
    backgroundColor: formData.backgroundColor,
    accentColor: formData.accentColor,
    fontStyle: formData.fontStyle,
    enableShadow: formData.enableShadow,
    enableRounded: formData.enableRounded,
    enableBorder: formData.enableBorder,
    // Add profile image and company logo
    profileImage: profileImage,
    companyLogo,
    // Call-to-action fields
    enableCta1: formData.enableCta1,
    cta1Type: formData.cta1Type,
    cta1Text: formData.cta1Text,
    cta1Link: formData.cta1Link,
    enableCta2: formData.enableCta2,
    cta2Type: formData.cta2Type,
    cta2Text: formData.cta2Text,
    cta2Link: formData.cta2Link
  };

  return (
    <div className="bg-card shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'personal' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('personal')}
                >
                  <span>Personal</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'personal' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'personal' && (
                  <div className="p-4 space-y-4">
                    {/* Profile Picture */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Profile Picture
                      </label>
                      <div className="bg-[#A6A6A6] rounded-md p-6 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 border border-gray-200 overflow-hidden">
                          {profileImage ? (
                            <img 
                              src={profileImage} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-center text-black mb-2">Upload your best selfie</p>
                        <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-black/90 transition-colors">
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={() => setProfileImage(null)}
                            className="text-sm text-red-500 mt-2 hover:underline"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-sm font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClass}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="jobTitle" className="block text-sm font-semibold">
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter your job title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bio" className="block text-sm font-semibold">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Drop a quick 'about me.' Keep it short, snappy, and iconic."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your digits for the VIP list"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-sm font-semibold">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Drop your personal website or portfolio link"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Company Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'company' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('company')}
                >
                  <span>Company</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'company' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'company' && (
                  <div className="p-4 space-y-4">
                    {/* Company Logo */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Company Logo
                      </label>
                      <div className="bg-[#A6A6A6] rounded-md p-6 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 border border-gray-200 overflow-hidden">
                          {companyLogo ? (
                            <img 
                              src={companyLogo} 
                              alt="Company Logo" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-center text-black mb-2">Upload your company logo</p>
                        <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-black/90 transition-colors">
                          Upload Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </label>
                        {companyLogo && (
                          <button
                            type="button"
                            onClick={() => setCompanyLogo(null)}
                            className="text-sm text-red-500 mt-2 hover:underline"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter your company name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-semibold">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Where do you rep? Drop your squad name here"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="companyPhone" className="block text-sm font-semibold">
                        Company Phone
                      </label>
                      <input
                        type="tel"
                        id="companyPhone"
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="The official hotline"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="fax" className="block text-sm font-semibold">
                        Fax
                      </label>
                      <input
                        type="text"
                        id="fax"
                        name="fax"
                        value={formData.fax}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="For the old school cool"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-semibold">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Where the magic happens—drop your HQ address"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Messaging Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'messaging' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('messaging')}
                >
                  <span>Messaging</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'messaging' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'messaging' && (
                  <div className="p-4">
                    <div className="grid grid-cols-5 gap-2">
                      {/* WhatsApp */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectMessagingPlatform('whatsapp')}
                          className={`w-16 h-16 rounded-md ${selectedMessagingPlatforms.includes('whatsapp') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedMessagingPlatforms.includes('whatsapp') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">WhatsApp</span>
                      </div>
                      
                      {/* Signal */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectMessagingPlatform('signal')}
                          className={`w-16 h-16 rounded-md ${selectedMessagingPlatforms.includes('signal') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedMessagingPlatforms.includes('signal') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Signal</span>
                      </div>
                      
                      {/* Telegram */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectMessagingPlatform('telegram')}
                          className={`w-16 h-16 rounded-md ${selectedMessagingPlatforms.includes('telegram') ? 'bg-primary ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedMessagingPlatforms.includes('telegram') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Telegram</span>
                      </div>
                      
                      {/* Discord */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectMessagingPlatform('discord')}
                          className={`w-16 h-16 rounded-md ${selectedMessagingPlatforms.includes('discord') ? 'bg-primary ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedMessagingPlatforms.includes('discord') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Discord</span>
                      </div>
                      
                      {/* SMS */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectMessagingPlatform('sms')}
                          className={`w-16 h-16 rounded-md ${selectedMessagingPlatforms.includes('sms') ? 'bg-primary ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedMessagingPlatforms.includes('sms') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">SMS</span>
                      </div>
                    </div>
                    
                    {/* Input field for the selected messaging platform */}
                    {selectedMessagingPlatforms.length > 0 && (
                      <div className="mt-4 p-4 bg-[#A6A6A6] rounded-md">
                        <div className="flex items-center mb-4">
                          <h4 className="text-sm font-semibold text-black">Messaging Platform Details</h4>
                          <button 
                            type="button" 
                            onClick={() => setSelectedMessagingPlatforms([])}
                            className="ml-auto text-black hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {selectedMessagingPlatforms.map(platform => (
                            <div key={platform} className="space-y-2">
                              <label htmlFor={`${platform}-input`} className="block text-sm font-medium text-black capitalize">
                                {platform === 'whatsapp' ? 'WhatsApp Number' :
                                 platform === 'signal' ? 'Signal Number' :
                                 platform === 'telegram' ? 'Telegram Username' :
                                 platform === 'discord' ? 'Discord Username' :
                                 platform === 'sms' ? 'SMS Number' : `${platform}`}
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  id={`${platform}-input`}
                                  name={platform}
                                  value={formData[platform as keyof typeof formData] as string}
                                  onChange={handleChange}
                                  className={inputClass}
                                  placeholder={
                                    platform === 'whatsapp' ? '+1 (555) 123-4567' :
                                    platform === 'signal' ? '+1 (555) 123-4567' :
                                    platform === 'telegram' ? '@username' :
                                    platform === 'discord' ? 'username#1234' :
                                    platform === 'sms' ? '+1 (555) 123-4567' : ''
                                  }
                                />
                                <button 
                                  type="button"
                                  onClick={() => selectMessagingPlatform(platform)}
                                  className="ml-2 p-1 text-black hover:text-gray-700"
                                  title="Remove this platform"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <p className="text-xs text-black mt-1">
                                {platform === 'whatsapp' && 'Enter your WhatsApp number with country code'}
                                {platform === 'signal' && 'Enter your Signal number with country code'}
                                {platform === 'telegram' && 'Enter your Telegram username with @ symbol'}
                                {platform === 'discord' && 'Enter your Discord username with discriminator'}
                                {platform === 'sms' && 'Enter your phone number with country code'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedMessagingPlatforms.length === 0 && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Click on an icon to add your messaging details
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Social Links Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'socials' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('socials')}
                >
                  <span>Socials</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'socials' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'socials' && (
                  <div className="p-4 space-y-4">
                    <h4 className="text-sm font-semibold mb-2">Select Social Platforms</h4>
                    {/* Social media grid */}
                    <div className="grid grid-cols-5 gap-2">
                      {/* LinkedIn */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('linkedin')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('linkedin') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('linkedin') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11v9" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h.01" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">LinkedIn</span>
                      </div>
                      
                      {/* Twitter */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('twitter')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('twitter') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('twitter') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Twitter</span>
                      </div>
                      
                      {/* Instagram */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('instagram')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('instagram') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('instagram') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 7.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                            <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 17.5a6 6 0 10-9 0" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Instagram</span>
                      </div>
                      
                      {/* Facebook */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('facebook')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('facebook') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('facebook') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Facebook</span>
                      </div>
                      
                      {/* Snapchat */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('snapchat')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('snapchat') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('snapchat') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Snapchat</span>
                      </div>
                      
                      {/* WeChat */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('wechat')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('wechat') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('wechat') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">WeChat</span>
                      </div>
                      
                      {/* Discord */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('discord')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('discord') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('discord') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Discord</span>
                      </div>
                      
                      {/* Twitch */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('twitch')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('twitch') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('twitch') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h-2l-6-6V4h16v10l-2 2h-3.25L9.75 17zm.5-5h-2.5m7.5 0h-2.5" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Twitch</span>
                      </div>
                      
                      {/* TikTok */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('tiktok')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('tiktok') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('tiktok') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11.5v-7m0 7l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16.5a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">TikTok</span>
                      </div>
                      
                      {/* YouTube */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('youtube')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('youtube') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('youtube') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM8 11l5.333-3L8 5v6z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">YouTube</span>
                      </div>
                      
                      {/* Pinterest */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('pinterest')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('pinterest') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('pinterest') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Pinterest</span>
                      </div>
                      
                      {/* Reddit */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('reddit')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('reddit') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('reddit') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 8A3.5 3.5 0 0114 4.5h-4A3.5 3.5 0 016.5 8v8a3.5 3.5 0 003.5 3.5h4a3.5 3.5 0 003.5-3.5V8z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 8v8m4-8v8" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Reddit</span>
                      </div>
                      
                      {/* Tumblr */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('tumblr')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('tumblr') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('tumblr') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Tumblr</span>
                      </div>
                      
                      {/* Behance */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('behance')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('behance') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('behance') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Behance</span>
                      </div>
                      
                      {/* Dribbble */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => selectSocialPlatform('dribbble')}
                          className={`w-16 h-16 rounded-md ${selectedSocialPlatforms.includes('dribbble') ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedSocialPlatforms.includes('dribbble') ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </button>
                        <span className="text-xs text-center">Dribbble</span>
                      </div>
                    </div>
                    
                    {/* Input field for the selected social platform */}
                    {selectedSocialPlatforms.length > 0 && (
                      <div className="mt-4 p-4 bg-[#A6A6A6] rounded-md">
                        <div className="flex items-center mb-4">
                          <h4 className="text-sm font-semibold text-black">Social Platform Details</h4>
                          <button 
                            type="button" 
                            onClick={() => setSelectedSocialPlatforms([])}
                            className="ml-auto text-black hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {selectedSocialPlatforms.map(platform => (
                            <div key={platform} className="space-y-2">
                              <label htmlFor={`${platform}-input`} className="block text-sm font-medium text-black capitalize">
                                {platform === 'linkedin' ? 'LinkedIn URL' :
                                 platform === 'twitter' ? 'Twitter URL' :
                                 platform === 'instagram' ? 'Instagram URL' :
                                 platform === 'facebook' ? 'Facebook URL' :
                                 platform === 'snapchat' ? 'Snapchat Username' :
                                 platform === 'wechat' ? 'WeChat ID' :
                                 platform === 'discord' ? 'Discord Username' :
                                 platform === 'twitch' ? 'Twitch Channel' :
                                 platform === 'tiktok' ? 'TikTok Username' :
                                 platform === 'youtube' ? 'YouTube Channel' :
                                 platform === 'pinterest' ? 'Pinterest Username' :
                                 platform === 'reddit' ? 'Reddit Username' :
                                 platform === 'tumblr' ? 'Tumblr URL' :
                                 platform === 'behance' ? 'Behance URL' :
                                 platform === 'dribbble' ? 'Dribbble URL' : `${platform} URL`}
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  id={`${platform}-input`}
                                  name={platform}
                                  value={formData[platform as keyof typeof formData] as string}
                                  onChange={handleChange}
                                  className={inputClass}
                                  placeholder={
                                    platform === 'linkedin' ? 'https://linkedin.com/in/username' :
                                    platform === 'twitter' ? 'https://twitter.com/username' :
                                    platform === 'instagram' ? 'https://instagram.com/username' :
                                    platform === 'facebook' ? 'https://facebook.com/username' :
                                    platform === 'snapchat' ? 'username' :
                                    platform === 'wechat' ? 'wechat_id' :
                                    platform === 'discord' ? 'username#1234' :
                                    platform === 'twitch' ? 'https://twitch.tv/username' :
                                    platform === 'tiktok' ? 'https://tiktok.com/@username' :
                                    platform === 'youtube' ? 'https://youtube.com/c/channelname' :
                                    platform === 'pinterest' ? 'https://pinterest.com/username' :
                                    platform === 'reddit' ? 'u/username' :
                                    platform === 'tumblr' ? 'https://username.tumblr.com' :
                                    platform === 'behance' ? 'https://behance.net/username' :
                                    platform === 'dribbble' ? 'https://dribbble.com/username' : ''
                                  }
                                />
                                <button 
                                  type="button"
                                  onClick={() => selectSocialPlatform(platform)}
                                  className="ml-2 p-1 text-black hover:text-gray-700"
                                  title="Remove this platform"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <p className="text-xs text-black mt-1">
                                {platform === 'linkedin' && 'Enter your full LinkedIn profile URL'}
                                {platform === 'twitter' && 'Enter your Twitter profile URL'}
                                {platform === 'instagram' && 'Enter your Instagram profile URL'}
                                {platform === 'facebook' && 'Enter your Facebook profile URL'}
                                {platform === 'snapchat' && 'Enter your Snapchat username without @ symbol'}
                                {platform === 'wechat' && 'Enter your WeChat ID for others to add you'}
                                {platform === 'discord' && 'Enter your Discord username with discriminator'}
                                {platform === 'twitch' && 'Enter your Twitch channel URL'}
                                {platform === 'tiktok' && 'Enter your TikTok profile URL or @username'}
                                {platform === 'youtube' && 'Enter your YouTube channel URL'}
                                {platform === 'pinterest' && 'Enter your Pinterest profile URL or username'}
                                {platform === 'reddit' && 'Enter your Reddit username with u/ prefix'}
                                {platform === 'tumblr' && 'Enter your Tumblr blog URL'}
                                {platform === 'behance' && 'Enter your Behance profile URL'}
                                {platform === 'dribbble' && 'Enter your Dribbble profile URL'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!selectedSocialPlatforms.length && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Click on icons to add your social media profiles
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Appearance Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'appearance' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('appearance')}
                >
                  <span>Appearance</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'appearance' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'appearance' && (
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="theme" className="block text-sm font-semibold">
                        Card Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="minimal">Minimal</option>
                        <option value="gradient">Gradient</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Card Colors
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="backgroundColor" className="block text-xs font-semibold text-gray-500 mb-1">
                            Background Color
                          </label>
                          <input
                            type="color"
                            id="backgroundColor"
                            name="backgroundColor"
                            value={formData.backgroundColor}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="accentColor" className="block text-xs font-semibold text-gray-500 mb-1">
                            Accent Color
                          </label>
                          <input
                            type="color"
                            id="accentColor"
                            name="accentColor"
                            value={formData.accentColor}
                            onChange={handleChange}
                            className="h-10 w-full rounded-md border border-border"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="fontStyle" className="block text-sm font-semibold">
                        Font Style
                      </label>
                      <select
                        id="fontStyle"
                        name="fontStyle"
                        value={formData.fontStyle}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="sans">Sans-serif</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Monospace</option>
                        <option value="modern">Modern</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Card Effects
                      </label>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="enableShadow"
                            name="enableShadow"
                            checked={formData.enableShadow}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="enableShadow" className="ml-2 block text-sm font-semibold">
                            Enable shadow effect
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="enableRounded"
                            name="enableRounded"
                            checked={formData.enableRounded}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="enableRounded" className="ml-2 block text-sm font-semibold">
                            Rounded corners
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="enableBorder"
                            name="enableBorder"
                            checked={formData.enableBorder}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="enableBorder" className="ml-2 block text-sm font-semibold">
                            Show border
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Custom Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'custom' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('custom')}
                >
                  <span>Custom</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'custom' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'custom' && (
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Custom Colors
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="primaryColor" className="block text-xs font-semibold text-gray-500 mb-1">
                            Primary Color
                          </label>
                          <input
                            type="color"
                            id="primaryColor"
                            name="primaryColor"
                            className="h-10 w-full rounded-md border border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="secondaryColor" className="block text-xs font-semibold text-gray-500 mb-1">
                            Secondary Color
                          </label>
                          <input
                            type="color"
                            id="secondaryColor"
                            name="secondaryColor"
                            className="h-10 w-full rounded-md border border-border"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Call-to-Action Section */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold">
                        Call-to-Action Buttons
                      </label>
                      <p className="text-xs text-gray-500">Add buttons to encourage specific actions from your contacts</p>
                      
                      {/* First CTA */}
                      <div className="border border-border rounded-md p-4">
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id="enableCta1"
                            name="enableCta1"
                            checked={formData.enableCta1}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="enableCta1" className="ml-2 block text-sm font-semibold">
                            Primary Call-to-Action
                          </label>
                        </div>
                        
                        {formData.enableCta1 && (
                          <div className="space-y-3 pl-6">
                            <div>
                              <label htmlFor="cta1Type" className="block text-sm font-semibold mb-1">
                                Button Type
                              </label>
                              <select
                                id="cta1Type"
                                name="cta1Type"
                                value={formData.cta1Type}
                                onChange={handleChange}
                                className={inputClass}
                              >
                                <option value="website">Website</option>
                                <option value="contact">Contact</option>
                                <option value="social">Social Media</option>
                                <option value="download">Download</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="cta1Text" className="block text-sm font-semibold mb-1">
                                Button Text
                              </label>
                              <input
                                type="text"
                                id="cta1Text"
                                name="cta1Text"
                                value={formData.cta1Text}
                                onChange={handleChange}
                                placeholder={
                                  formData.cta1Type === 'meeting' ? 'Book a Meeting' :
                                  formData.cta1Type === 'review' ? 'Leave a Review' :
                                  formData.cta1Type === 'project' ? 'View My Project' :
                                  'Click Here'
                                }
                                className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cta1Link" className="block text-sm font-semibold mb-1">
                                Button Link
                              </label>
                              <input
                                type="url"
                                id="cta1Link"
                                name="cta1Link"
                                value={formData.cta1Link}
                                onChange={handleChange}
                                placeholder={
                                  formData.cta1Type === 'meeting' ? 'https://calendly.com/yourusername' :
                                  formData.cta1Type === 'review' ? 'https://trustpilot.com/review/yourcompany' :
                                  formData.cta1Type === 'project' ? 'https://yourportfolio.com/project' :
                                  'https://'
                                }
                                className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Second CTA */}
                      <div className="border border-border rounded-md p-4">
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id="enableCta2"
                            name="enableCta2"
                            checked={formData.enableCta2}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="enableCta2" className="ml-2 block text-sm font-semibold">
                            Secondary Call-to-Action
                          </label>
                        </div>
                        
                        {formData.enableCta2 && (
                          <div className="space-y-3 pl-6">
                            <div>
                              <label htmlFor="cta2Type" className="block text-sm font-semibold mb-1">
                                Button Type
                              </label>
                              <select
                                id="cta2Type"
                                name="cta2Type"
                                value={formData.cta2Type}
                                onChange={handleChange}
                                className={inputClass}
                              >
                                <option value="website">Website</option>
                                <option value="contact">Contact</option>
                                <option value="social">Social Media</option>
                                <option value="download">Download</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="cta2Text" className="block text-sm font-semibold mb-1">
                                Button Text
                              </label>
                              <input
                                type="text"
                                id="cta2Text"
                                name="cta2Text"
                                value={formData.cta2Text}
                                onChange={handleChange}
                                placeholder={
                                  formData.cta2Type === 'meeting' ? 'Book a Meeting' :
                                  formData.cta2Type === 'review' ? 'Leave a Review' :
                                  formData.cta2Type === 'project' ? 'View My Project' :
                                  'Click Here'
                                }
                                className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cta2Link" className="block text-sm font-semibold mb-1">
                                Button Link
                              </label>
                              <input
                                type="url"
                                id="cta2Link"
                                name="cta2Link"
                                value={formData.cta2Link}
                                onChange={handleChange}
                                placeholder={
                                  formData.cta2Type === 'meeting' ? 'https://calendly.com/yourusername' :
                                  formData.cta2Type === 'review' ? 'https://trustpilot.com/review/yourcompany' :
                                  formData.cta2Type === 'project' ? 'https://yourportfolio.com/project' :
                                  'https://'
                                }
                                className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Advanced Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'advanced' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('advanced')}
                >
                  <span>Advanced</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'advanced' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'advanced' && (
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="cardLayout" className="block text-sm font-semibold">
                        Card Layout
                      </label>
                      <select
                        id="cardLayout"
                        name="cardLayout"
                        className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        <option value="standard">Standard</option>
                        <option value="compact">Compact</option>
                        <option value="expanded">Expanded</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Animation Effects
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="enableAnimations"
                          name="enableAnimations"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="enableAnimations" className="ml-2 block text-sm font-semibold">
                          Enable card animations
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Privacy Settings
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="privateCard"
                          name="privateCard"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="privateCard" className="ml-2 block text-sm font-semibold">
                          Make this card private (password protected)
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {message && (
                <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {message.text}
                </div>
              )}
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? 'Saving...' : 'Save Card'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Preview Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Preview</h3>
              <p className="text-sm text-muted-foreground">This is how your card will look</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-secondary/20 rounded-lg p-4">
              <div className="w-full max-w-[300px]">
                <CardDisplay card={previewCard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 