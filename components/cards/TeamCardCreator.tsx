'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import CardDisplay from './CardDisplay';

type CardTheme = 'minimal' | 'gradient' | 'dark' | 'light';

interface TeamCardFormData {
  // Company Information
  companyName: string;
  department: string;
  companyPhone: string;
  fax: string;
  address: string;
  website: string;
  
  // Individual Information
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  
  // Social Media
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  
  // Appearance
  theme: CardTheme;
  backgroundColor: string;
  accentColor: string;
  fontStyle: string;
  enableShadow: boolean;
  enableRounded: boolean;
  enableBorder: boolean;
}

interface TeamCardCreatorProps {
  onSave?: (cardData: any) => void;
  existingCompanyData?: Partial<TeamCardFormData>;
}

export default function TeamCardCreator({ onSave, existingCompanyData }: TeamCardCreatorProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState('company');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Common input class
  const inputClass = "appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-[#A6A6A6] text-black";
  
  // Textarea specific class with #A6A6A6 background
  const textareaClass = "appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-[#A6A6A6] text-black";
  
  // Initial form data - use existing company data if provided
  const [formData, setFormData] = useState<TeamCardFormData>({
    // Company Information
    companyName: existingCompanyData?.companyName || '',
    department: existingCompanyData?.department || '',
    companyPhone: existingCompanyData?.companyPhone || '',
    fax: existingCompanyData?.fax || '',
    address: existingCompanyData?.address || '',
    website: existingCompanyData?.website || '',
    
    // Individual Information
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    
    // Social Media
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    
    // Appearance
    theme: existingCompanyData?.theme || 'minimal',
    backgroundColor: existingCompanyData?.backgroundColor || '#ffffff',
    accentColor: existingCompanyData?.accentColor || '#000000',
    fontStyle: existingCompanyData?.fontStyle || 'sans',
    enableShadow: existingCompanyData?.enableShadow || false,
    enableRounded: existingCompanyData?.enableRounded || true,
    enableBorder: existingCompanyData?.enableBorder || true,
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
        id: `team-card-${Date.now()}`, // Generate a unique ID
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
        theme: formData.theme as 'minimal' | 'gradient' | 'dark' | 'light',
        profileImage,
        companyLogo,
        // Add company information
        department: formData.department,
        companyPhone: formData.companyPhone,
        fax: formData.fax,
        address: formData.address,
        // Add appearance settings
        backgroundColor: formData.backgroundColor,
        accentColor: formData.accentColor,
        fontStyle: formData.fontStyle,
        enableShadow: formData.enableShadow,
        enableRounded: formData.enableRounded,
        enableBorder: formData.enableBorder,
        // Add team-specific flag
        isTeamCard: true,
      };
      
      // In a real app, you would save the card to your database
      console.log('Submitting team card data:', cardData);
      
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(cardData);
      }
      
      setMessage({
        type: 'success',
        text: 'Team member card created successfully!'
      });
      
      // Reset individual information but keep company data
      setFormData(prev => ({
        ...prev,
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        facebook: '',
      }));
      
      setProfileImage(null);
      
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

  // Create a preview card object from the form data
  const previewCard = {
    id: 'preview',
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
    theme: formData.theme,
    profileImage: profileImage,
    companyLogo: companyLogo,
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
  };

  return (
    <div className="bg-card shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center mb-2 border border-gray-200 overflow-hidden">
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
                            id="companyLogo"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
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
                        placeholder="Enter company name"
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
                        placeholder="Enter department"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="companyPhone" className="block text-sm font-semibold">
                        Company Phone
                      </label>
                      <input
                        type="text"
                        id="companyPhone"
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter company phone"
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
                        placeholder="Enter fax number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-semibold">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter company address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-sm font-semibold">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter company website"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Individual Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'individual' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('individual')}
                >
                  <span>Team Member Information</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'individual' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSection === 'individual' && (
                  <div className="p-4 space-y-4">
                    {/* Profile Picture */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">
                        Profile Photo
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
                        <p className="text-sm text-center text-black mb-2">Upload team member photo</p>
                        <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-black/90 transition-colors">
                          Upload Photo
                          <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={() => setProfileImage(null)}
                            className="text-sm text-red-500 mt-2 hover:underline"
                          >
                            Remove Photo
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
                        placeholder="Enter full name"
                        required
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
                        placeholder="Enter job title"
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
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Social Media Section */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left text-base font-semibold flex justify-between items-center ${expandedSection === 'social' ? 'bg-secondary/50' : 'bg-card'}`}
                  onClick={() => toggleSection('social')}
                >
                  <span>Socials</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${expandedSection === 'social' ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSection === 'social' && (
                  <div className="p-4 space-y-4">
                    <h4 className="text-sm font-semibold mb-2">Select Social Platforms</h4>
                    {/* Social media grid */}
                    <div className="grid grid-cols-5 gap-2">
                      {/* LinkedIn */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => {
                            const updatedFormData = { ...formData };
                            updatedFormData.linkedin = updatedFormData.linkedin ? '' : 'https://linkedin.com/in/';
                            setFormData(updatedFormData);
                          }}
                          className={`w-16 h-16 rounded-md ${formData.linkedin ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.linkedin ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </button>
                        <span className="text-xs text-center">LinkedIn</span>
                      </div>
                      
                      {/* Twitter */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => {
                            const updatedFormData = { ...formData };
                            updatedFormData.twitter = updatedFormData.twitter ? '' : 'https://twitter.com/';
                            setFormData(updatedFormData);
                          }}
                          className={`w-16 h-16 rounded-md ${formData.twitter ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.twitter ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </button>
                        <span className="text-xs text-center">Twitter</span>
                      </div>
                      
                      {/* Instagram */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => {
                            const updatedFormData = { ...formData };
                            updatedFormData.instagram = updatedFormData.instagram ? '' : 'https://instagram.com/';
                            setFormData(updatedFormData);
                          }}
                          className={`w-16 h-16 rounded-md ${formData.instagram ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.instagram ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </button>
                        <span className="text-xs text-center">Instagram</span>
                      </div>
                      
                      {/* Facebook */}
                      <div className="flex flex-col items-center">
                        <button 
                          type="button"
                          onClick={() => {
                            const updatedFormData = { ...formData };
                            updatedFormData.facebook = updatedFormData.facebook ? '' : 'https://facebook.com/';
                            setFormData(updatedFormData);
                          }}
                          className={`w-16 h-16 rounded-md ${formData.facebook ? 'bg-gray-700 ring-2 ring-primary' : 'bg-gray-50'} flex items-center justify-center mb-1 hover:bg-gray-100 transition-colors`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.facebook ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </button>
                        <span className="text-xs text-center">Facebook</span>
                      </div>
                    </div>
                    
                    {/* Input fields for the selected social platforms */}
                    <div className="mt-4 space-y-4">
                      {formData.linkedin && (
                        <div className="space-y-2">
                          <label htmlFor="linkedin" className="block text-sm font-semibold text-black">
                            LinkedIn URL
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="linkedin"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleChange}
                              className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>
                      )}
                      
                      {formData.twitter && (
                        <div className="space-y-2">
                          <label htmlFor="twitter" className="block text-sm font-semibold text-black">
                            Twitter URL
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="twitter"
                              name="twitter"
                              value={formData.twitter}
                              onChange={handleChange}
                              className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>
                      )}
                      
                      {formData.instagram && (
                        <div className="space-y-2">
                          <label htmlFor="instagram" className="block text-sm font-semibold text-black">
                            Instagram URL
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="instagram"
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleChange}
                              className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              placeholder="https://instagram.com/username"
                            />
                          </div>
                        </div>
                      )}
                      
                      {formData.facebook && (
                        <div className="space-y-2">
                          <label htmlFor="facebook" className="block text-sm font-semibold text-black">
                            Facebook URL
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="facebook"
                              name="facebook"
                              value={formData.facebook}
                              onChange={handleChange}
                              className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              placeholder="https://facebook.com/username"
                            />
                          </div>
                        </div>
                      )}
                      
                      {!formData.linkedin && !formData.twitter && !formData.instagram && !formData.facebook && (
                        <div className="text-center text-sm text-muted-foreground">
                          Click on icons to add your social media profiles
                        </div>
                      )}
                    </div>
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
                  <span>Card Appearance</span>
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
                    <div className="bg-[#A6A6A6] rounded-md p-4">
                      <p className="text-sm text-black mb-4">Customize the appearance of your card</p>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="theme" className="block text-sm font-semibold text-black">
                            Card Theme
                          </label>
                          <select
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                          >
                            <option value="minimal">Minimal</option>
                            <option value="gradient">Gradient</option>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="backgroundColor" className="block text-sm font-semibold text-black">
                              Background Color
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="backgroundColor"
                                name="backgroundColor"
                                value={formData.backgroundColor}
                                onChange={handleChange}
                                className="h-8 w-8 border-0 p-0"
                              />
                              <input
                                type="text"
                                value={formData.backgroundColor}
                                onChange={handleChange}
                                name="backgroundColor"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="accentColor" className="block text-sm font-semibold text-black">
                              Accent Color
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="accentColor"
                                name="accentColor"
                                value={formData.accentColor}
                                onChange={handleChange}
                                className="h-8 w-8 border-0 p-0"
                              />
                              <input
                                type="text"
                                value={formData.accentColor}
                                onChange={handleChange}
                                name="accentColor"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="fontStyle" className="block text-sm font-semibold text-black">
                            Font Style
                          </label>
                          <select
                            id="fontStyle"
                            name="fontStyle"
                            value={formData.fontStyle}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white text-black"
                          >
                            <option value="sans">Sans-serif</option>
                            <option value="serif">Serif</option>
                            <option value="mono">Monospace</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="block text-sm font-semibold text-black">Card Effects</p>
                          <div className="flex flex-wrap gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="enableShadow"
                                checked={formData.enableShadow}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="ml-2 text-sm text-black">Shadow</span>
                            </label>
                            
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="enableRounded"
                                checked={formData.enableRounded}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="ml-2 text-sm text-black">Rounded Corners</span>
                            </label>
                            
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="enableBorder"
                                checked={formData.enableBorder}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <span className="ml-2 text-sm text-black">Border</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-white text-black hover:bg-gray-100"
                >
                  {isSaving ? 'Creating Card...' : 'Create Team Member Card'}
                </Button>
              </div>
              
              {/* Success/Error Message */}
              {message && (
                <div className={`mt-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
          
          {/* Preview Section */}
          <div className="bg-[#A6A6A6] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Card Preview</h3>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardDisplay card={previewCard} />
            </div>
            <p className="text-xs text-center mt-4 text-black">This is how your card will appear to others</p>
          </div>
        </div>
      </div>
    </div>
  );
} 