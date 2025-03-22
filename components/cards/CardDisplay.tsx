'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import QRCode from 'react-qr-code';

// Function to generate vCard format
const generateVCard = (card: any) => {
  let vCard = 'BEGIN:VCARD\nVERSION:3.0\n';
  
  // Parse the name into components (assuming format is "First Last")
  const nameParts = card.name.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');
  
  // Add structured name (last name, first name, middle name, prefix, suffix)
  vCard += `N:${lastName};${firstName};;;\n`;
  
  // Add formatted name
  vCard += `FN:${card.name}\n`;
  
  // Add profile image if available
  if (card.profileImage) {
    // For external image URLs, we can reference them directly
    // Note: Some contact apps may not support this format and might require base64 encoding
    vCard += `PHOTO;VALUE=URI:${card.profileImage}\n`;
  }
  
  // Add job title, company, and department
  if (card.jobTitle || card.company || card.department) {
    vCard += 'ORG:';
    if (card.company) vCard += card.company;
    // Add department as part of the ORG field (separated by semicolon)
    if (card.department) vCard += `;${card.department}`;
    vCard += '\n';
    
    if (card.jobTitle) vCard += `TITLE:${card.jobTitle}\n`;
  }
  
  // Add contact information
  if (card.email) vCard += `EMAIL;TYPE=INTERNET:${card.email}\n`;
  if (card.phone) vCard += `TEL;TYPE=CELL:${card.phone}\n`;
  if (card.companyPhone) vCard += `TEL;TYPE=WORK:${card.companyPhone}\n`;
  if (card.fax) vCard += `TEL;TYPE=FAX:${card.fax}\n`;
  if (card.website) vCard += `URL:${card.website}\n`;
  if (card.address) vCard += `ADR;TYPE=WORK:;;${card.address};;;;\n`;
  
  // Add social media
  if (card.linkedin) vCard += `X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin}\n`;
  if (card.twitter) vCard += `X-SOCIALPROFILE;TYPE=twitter:${card.twitter}\n`;
  if (card.instagram) vCard += `X-SOCIALPROFILE;TYPE=instagram:${card.instagram}\n`;
  if (card.facebook) vCard += `X-SOCIALPROFILE;TYPE=facebook:${card.facebook}\n`;
  if (card.snapchat) vCard += `X-SOCIALPROFILE;TYPE=snapchat:${card.snapchat}\n`;
  if (card.wechat) vCard += `X-SOCIALPROFILE;TYPE=wechat:${card.wechat}\n`;
  if (card.discord) vCard += `X-SOCIALPROFILE;TYPE=discord:${card.discord}\n`;
  if (card.twitch) vCard += `X-SOCIALPROFILE;TYPE=twitch:${card.twitch}\n`;
  if (card.tiktok) vCard += `X-SOCIALPROFILE;TYPE=tiktok:${card.tiktok}\n`;
  if (card.youtube) vCard += `X-SOCIALPROFILE;TYPE=youtube:${card.youtube}\n`;
  if (card.pinterest) vCard += `X-SOCIALPROFILE;TYPE=pinterest:${card.pinterest}\n`;
  if (card.reddit) vCard += `X-SOCIALPROFILE;TYPE=reddit:${card.reddit}\n`;
  if (card.tumblr) vCard += `X-SOCIALPROFILE;TYPE=tumblr:${card.tumblr}\n`;
  if (card.behance) vCard += `X-SOCIALPROFILE;TYPE=behance:${card.behance}\n`;
  if (card.dribbble) vCard += `X-SOCIALPROFILE;TYPE=dribbble:${card.dribbble}\n`;
  
  // Add messaging platforms
  if (card.whatsapp) vCard += `X-SOCIALPROFILE;TYPE=whatsapp:${card.whatsapp}\n`;
  if (card.signal) vCard += `X-SOCIALPROFILE;TYPE=signal:${card.signal}\n`;
  if (card.telegram) vCard += `X-SOCIALPROFILE;TYPE=telegram:${card.telegram}\n`;
  if (card.sms) vCard += `X-SOCIALPROFILE;TYPE=sms:${card.sms}\n`;
  
  // Add note/bio if available
  if (card.bio) vCard += `NOTE:${card.bio}\n`;
  
  // End vCard
  vCard += 'END:VCARD';
  
  return vCard;
};

interface CardDisplayProps {
  card: {
    id: string;
    name: string;
    jobTitle?: string;
    company?: string;
    email: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    snapchat?: string;
    wechat?: string;
    discord?: string;
    twitch?: string;
    tiktok?: string;
    youtube?: string;
    pinterest?: string;
    reddit?: string;
    tumblr?: string;
    behance?: string;
    dribbble?: string;
    bio?: string;
    theme: 'minimal' | 'gradient' | 'dark' | 'light';
    profileImage?: string | null;
    companyLogo?: string | null;
    whatsapp?: string;
    signal?: string;
    telegram?: string;
    sms?: string;
    department?: string;
    companyPhone?: string;
    fax?: string;
    address?: string;
  };
}

export default function CardDisplay({ card }: CardDisplayProps) {
  const [showQR, setShowQR] = useState(false);
  
  // Generate vCard data
  const vCardData = generateVCard(card);
  
  // Function to download vCard
  const downloadVCard = () => {
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (card.theme) {
      case 'gradient':
        return {
          container: 'bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground',
          header: 'border-primary/20',
          name: 'text-foreground',
          title: 'text-foreground/80',
          divider: 'bg-primary/20',
          icon: 'text-primary',
          link: 'text-primary hover:text-primary/80',
          button: 'bg-primary/10 hover:bg-primary/20 text-foreground',
          bio: 'text-foreground/90',
        };
      case 'dark':
        return {
          container: 'bg-black text-white',
          header: 'border-white/20',
          name: 'text-white',
          title: 'text-white/80',
          divider: 'bg-white/20',
          icon: 'text-white',
          link: 'text-white hover:text-white/80',
          button: 'bg-white/10 hover:bg-white/20 text-white',
          bio: 'text-white/90',
        };
      case 'light':
        return {
          container: 'bg-white text-black',
          header: 'border-black/10',
          name: 'text-black',
          title: 'text-black/70',
          divider: 'bg-black/10',
          icon: 'text-black',
          link: 'text-black hover:text-black/80',
          button: 'bg-black/5 hover:bg-black/10 text-black',
          bio: 'text-black/90',
        };
      default: // minimal
        return {
          container: 'bg-background text-foreground',
          header: 'border-border',
          name: 'text-foreground',
          title: 'text-muted-foreground',
          divider: 'bg-border',
          icon: 'text-primary',
          link: 'text-primary hover:text-primary/80',
          button: 'bg-secondary hover:bg-secondary/80 text-foreground',
          bio: 'text-foreground/90',
        };
    }
  };
  
  const styles = getThemeStyles();

  return (
    <div className="relative">
      {showQR ? (
        <div className={`aspect-[9/16] rounded-lg overflow-hidden shadow-md ${styles.container} flex flex-col items-center justify-center p-6`}>
          <button 
            className={`absolute top-4 right-4 text-sm font-medium ${styles.link}`}
            onClick={() => setShowQR(false)}
          >
            Back to Card
          </button>
          
          <div className="text-center mb-6">
            <h3 className={`text-xl font-bold ${styles.name}`}>Scan to Connect</h3>
            <p className={`text-sm ${styles.title}`}>with {card.name}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg mb-6">
            <QRCode 
              value={vCardData} 
              size={200} 
              level="M"
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>
          
          <Button 
            onClick={downloadVCard} 
            className={`${styles.button} mb-4 w-full`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download vCard
          </Button>
          
          <p className={`text-xs text-center ${styles.title}`}>
            Scan the QR code to save contact information directly to your phone.
          </p>
        </div>
      ) : (
        <div className={`aspect-[9/16] rounded-lg overflow-hidden shadow-md ${styles.container} flex flex-col`}>
          {/* Card Header */}
          <div className="relative pt-12 px-6 pb-6 flex flex-col items-center text-center">
            {card.profileImage ? (
              <div className="w-20 h-20 rounded-full bg-white/90 mb-4 flex items-center justify-center">
                <img src={card.profileImage} alt={card.name} className="w-full h-full object-cover rounded-full" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-white/90 mb-4 flex items-center justify-center text-2xl font-bold text-gray-800">
                {card.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <h3 className={`text-xl font-bold ${styles.name}`}>{card.name}</h3>
            {card.jobTitle && (
              <p className={`text-sm ${styles.title}`}>
                {card.jobTitle}
              </p>
            )}
            {card.company && (
              <p className={`text-sm ${styles.title}`}>
                {card.company}
              </p>
            )}
            
            {card.companyLogo && (
              <div className="mt-2 w-16 h-16 flex items-center justify-center">
                <img src={card.companyLogo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
              </div>
            )}
            
            <button 
              className={`absolute top-3 right-3 rounded-full p-2 ${styles.button}`}
              onClick={() => setShowQR(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
          </div>
          
          {/* Card Body */}
          <div className="flex-1 px-6 overflow-y-auto">
            {card.bio && (
              <div className="mb-6">
                <p className="text-sm text-center">{card.bio}</p>
              </div>
            )}
            
            {/* Contact Information */}
            {(card.email || card.phone || card.website) && (
              <>
                <div className={`h-px w-full ${styles.divider} my-4`}></div>
                
                <div className="text-center mb-2">
                  <h4 className={`text-sm font-medium ${styles.name}`}>Contact Information</h4>
                </div>
                
                <div className="space-y-4">
                  {card.email && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${card.email}`} className={`text-sm ${styles.link}`}>
                        {card.email}
                      </a>
                    </div>
                  )}
                  
                  {card.phone && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${card.phone}`} className={`text-sm ${styles.link}`}>
                        {card.phone}
                      </a>
                    </div>
                  )}
                  
                  {card.website && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={card.website} className={`text-sm ${styles.link}`} target="_blank" rel="noopener noreferrer">
                        {card.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Company */}
            {(card.company || card.jobTitle || card.department || card.companyPhone || card.fax || card.address) && (
              <>
                <div className={`h-px w-full ${styles.divider} my-4`}></div>
                
                <div className="text-center mb-2">
                  <h4 className={`text-sm font-medium ${styles.name}`}>Company</h4>
                </div>
                
                <div className="space-y-2 mb-4">
                  {card.company && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className={`text-sm ${styles.title}`}>
                        {card.company}
                      </span>
                    </div>
                  )}
                  
                  {card.jobTitle && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className={`text-sm ${styles.title}`}>
                        {card.jobTitle}
                      </span>
                    </div>
                  )}
                  
                  {card.department && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className={`text-sm ${styles.title}`}>
                        {card.department}
                      </span>
                    </div>
                  )}
                  
                  {card.companyPhone && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${card.companyPhone}`} className={`text-sm ${styles.link}`}>
                        {card.companyPhone}
                      </a>
                    </div>
                  )}
                  
                  {card.fax && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span className={`text-sm ${styles.title}`}>
                        {card.fax}
                      </span>
                    </div>
                  )}
                  
                  {card.address && (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${styles.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className={`text-sm ${styles.title}`}>
                        {card.address}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Messaging Platforms */}
            {(card.whatsapp || card.signal || card.telegram || card.discord || card.sms) && (
              <>
                <div className={`h-px w-full ${styles.divider} my-4`}></div>
                
                <div className="text-center mb-2">
                  <h4 className={`text-sm font-medium ${styles.name}`}>Messaging Platforms</h4>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {card.whatsapp && (
                    <a href={`https://wa.me/${card.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.link} title="WhatsApp">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.881-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.172.198-.297.297-.496.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                      </svg>
                    </a>
                  )}
                  {card.signal && (
                    <a href={`https://signal.me/#p/${card.signal}`} target="_blank" rel="noopener noreferrer" className={styles.link} title="Signal">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zm-1.13 4.641c-2.37.628-4.118 2.786-4.118 5.334 0 3.046 2.472 5.518 5.518 5.518 2.55 0 4.706-1.748 5.334-4.118l-1.997-.416c-.406 1.374-1.67 2.379-3.165 2.379-1.82 0-3.299-1.478-3.299-3.299 0-1.496 1.005-2.76 2.379-3.165l-.652-2.233zm2.26 0l.652 2.233c1.374.406 2.379 1.67 2.379 3.165 0 1.82-1.478 3.299-3.299 3.299-1.496 0-2.76-1.005-3.165-2.379l-1.997.416c.628 2.37 2.786 4.118 5.334 4.118 3.046 0 5.518-2.472 5.518-5.518 0-2.55-1.748-4.706-4.118-5.334l-.304 0z"/>
                      </svg>
                    </a>
                  )}
                  {card.telegram && (
                    <a href={`https://t.me/${card.telegram}`} target="_blank" rel="noopener noreferrer" className={styles.link} title="Telegram">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                  )}
                  {card.discord && (
                    <a href={`https://discord.com/users/${card.discord}`} target="_blank" rel="noopener noreferrer" className={styles.link} title="Discord">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </a>
                  )}
                  {card.sms && (
                    <a href={`sms:${card.sms}`} target="_blank" rel="noopener noreferrer" className={styles.link} title="SMS">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </a>
                  )}
                </div>
              </>
            )}
            
            {/* Social Media Platforms */}
            {(card.linkedin || card.twitter || card.instagram || card.facebook) && (
              <>
                <div className={`h-px w-full ${styles.divider} my-4`}></div>
                
                <div className="text-center mb-2">
                  <h4 className={`text-sm font-medium ${styles.name}`}>Social Media</h4>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {card.linkedin && (
                    <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link} title="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  
                  {card.twitter && (
                    <a href={card.twitter} target="_blank" rel="noopener noreferrer" className={styles.link} title="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  
                  {card.instagram && (
                    <a href={card.instagram} target="_blank" rel="noopener noreferrer" className={styles.link} title="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                  )}
                  
                  {card.facebook && (
                    <a href={card.facebook} target="_blank" rel="noopener noreferrer" className={styles.link} title="Facebook">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}