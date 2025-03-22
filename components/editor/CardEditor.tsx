'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
  Divider,
  Avatar,
  Stack,
  LinearProgress,
  Tooltip,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import RedditIcon from '@mui/icons-material/Reddit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import BookIcon from '@mui/icons-material/Book';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';
import PaletteIcon from '@mui/icons-material/Palette';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import FaxIcon from '@mui/icons-material/Print';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { supabase } from '@/lib/supabase';

// Define smaller font sizes for the editor
const editorStyles = {
  heading: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  },
  subheading: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  },
  body: {
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  },
  caption: {
    fontSize: '0.7rem',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  },
  input: {
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
  },
  button: {
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  accordion: {
    mb: 2,
  },
};

// Color themes for the card
const colorThemes = [
  { 
    name: 'Classic', 
    primary: '#000000', 
    secondary: '#ffffff', 
    accent: '#f0f0f0',
    text: '#000000',
    buttonBg: '#f0f0f0',
    buttonHover: '#ffffff'
  },
  { 
    name: 'Ocean', 
    primary: '#1a3a5f', 
    secondary: '#ffffff', 
    accent: '#e0f0ff',
    text: '#1a3a5f',
    buttonBg: '#e0f0ff',
    buttonHover: '#ffffff'
  },
  { 
    name: 'Forest', 
    primary: '#2e5d3b', 
    secondary: '#ffffff', 
    accent: '#e0f5e6',
    text: '#2e5d3b',
    buttonBg: '#e0f5e6',
    buttonHover: '#ffffff'
  },
  { 
    name: 'Sunset', 
    primary: '#8b3a3a', 
    secondary: '#ffffff', 
    accent: '#ffe0e0',
    text: '#8b3a3a',
    buttonBg: '#ffe0e0',
    buttonHover: '#ffffff'
  },
  { 
    name: 'Lavender', 
    primary: '#5d3b8b', 
    secondary: '#ffffff', 
    accent: '#f0e6ff',
    text: '#5d3b8b',
    buttonBg: '#f0e6ff',
    buttonHover: '#ffffff'
  },
  { 
    name: 'Midnight', 
    primary: '#121212', 
    secondary: '#ffffff', 
    accent: '#2d2d2d',
    text: '#ffffff',
    buttonBg: '#2d2d2d',
    buttonHover: '#3d3d3d'
  }
];

// Define types for the card data
interface CardData {
  id?: string; // Optional ID field for existing cards
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    photo: string | null;
  };
  company: {
    name: string;
    address: string;
    phone: string;
    fax: string;
    website: string;
    logo: string | null;
  };
  socials: {
    id: string;
    platform: string;
    url: string;
  }[];
  messaging: {
    id: string;
    platform: string;
    contact: string;
  }[];
  custom: {
    id: string;
    label: string;
    url: string;
  }[];
  theme: string;
}

// For development/testing - use a default user ID when not authenticated
const DEFAULT_TEST_USER_ID = '00000000-0000-0000-0000-000000000000';

// Social media platforms with icons
const socialPlatforms = [
  { name: 'Facebook', icon: <FacebookIcon /> },
  { name: 'Twitter', icon: <TwitterIcon /> },
  { name: 'LinkedIn', icon: <LinkedInIcon /> },
  { name: 'Instagram', icon: <InstagramIcon /> },
  { name: 'YouTube', icon: <YouTubeIcon /> },
  { name: 'TikTok', icon: <MusicNoteIcon /> },
  { name: 'Snapchat', icon: <PhotoCameraIcon /> },
  { name: 'Pinterest', icon: <PinterestIcon /> },
  { name: 'Threads', icon: <ChatIcon /> },
  { name: 'BeReal', icon: <PhotoCameraIcon /> },
  { name: 'Clubhouse', icon: <ChatIcon /> },
  { name: 'Reddit', icon: <RedditIcon /> },
  { name: 'Substack', icon: <BookIcon /> },
  { name: 'Medium', icon: <BookIcon /> },
  { name: 'Patreon', icon: <MusicNoteIcon /> },
  { name: 'Twitch', icon: <MusicNoteIcon /> },
  { name: 'OnlyFans', icon: <MusicNoteIcon /> },
  { name: 'Etsy', icon: <StoreIcon /> },
  { name: 'Amazon Live', icon: <ShoppingCartIcon /> },
  { name: 'Shopify', icon: <ShoppingCartIcon /> },
  { name: 'Website', icon: <LanguageIcon /> }
];

// Messaging platforms with icons
const messagingPlatforms = [
  { name: 'WhatsApp', icon: <WhatsAppIcon /> },
  { name: 'Telegram', icon: <TelegramIcon /> },
  { name: 'Discord', icon: <ChatIcon /> },
  { name: 'WeChat', icon: <ChatIcon /> },
  { name: 'SMS', icon: <SmsIcon /> },
  { name: 'Phone', icon: <PhoneIcon /> }
];

export default function CardEditor() {
  // Add mounted state
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Use a separate useEffect for client-side only code
  useEffect(() => {
    setMounted(true);
    
    // Check authentication status
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Auth check error:', error);
          // For development, use a default user ID
          setUserId(DEFAULT_TEST_USER_ID);
        } else if (user) {
          console.log('User authenticated:', user.id);
          setUserId(user.id);
        } else {
          console.log('No authenticated user, using default test ID');
          setUserId(DEFAULT_TEST_USER_ID);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setUserId(DEFAULT_TEST_USER_ID);
      } finally {
        setAuthChecked(true);
      }
    };
    
    // Test Supabase connection when component mounts
    const testSupabaseConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase.from('cards').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection test failed:', error);
        } else {
          console.log('Supabase connection test successful:', data);
        }
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
      }
    };
    
    checkAuth();
    testSupabaseConnection();
  }, []);
  
  // Initialize with example data for better user experience
  const [cardData, setCardData] = useState<CardData>({
    personal: {
      name: 'Aylen Montenegro',
      title: 'Chief Email Officer',
      email: 'aylen@luxoranow.com',
      phone: '305-926-2998',
      photo: null,
    },
    company: {
      name: 'LUXORA',
      address: '1 Big Cloud, Miami, FL 33183',
      phone: '786-302-5228',
      fax: '305-456-8962',
      website: 'www.luxoranow.com',
      logo: null,
    },
    socials: [
      { id: '1', platform: 'Facebook', url: 'https://facebook.com/luxora' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/luxora' },
      { id: '3', platform: 'YouTube', url: 'https://youtube.com/luxora' },
      { id: '4', platform: 'TikTok', url: 'https://tiktok.com/@luxora' }
    ],
    messaging: [
      { id: '1', platform: 'Discord', contact: 'luxora' },
      { id: '2', platform: 'SMS', contact: '3059262998' }
    ],
    custom: [
      { id: '1', label: 'BOOK A MEETING', url: 'https://calendly.com/luxora/meeting' }
    ],
    theme: 'Classic'
  });

  // State for expanded accordion sections
  const [expanded, setExpanded] = useState<string | false>('personal');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [typingEffect, setTypingEffect] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrHovered, setQrHovered] = useState(false);
  const [showQrInPreview, setShowQrInPreview] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);

  // Simulate typing effect on initial load
  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setTypingEffect(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Handle accordion expansion
  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle personal info changes
  const handlePersonalChange = (field: keyof typeof cardData.personal) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      personal: {
        ...cardData.personal,
        [field]: e.target.value,
      },
    });
  };

  // Handle company info changes
  const handleCompanyChange = (field: keyof typeof cardData.company) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      company: {
        ...cardData.company,
        [field]: e.target.value,
      },
    });
  };

  // Add a new social media link with a specific platform
  const addSocialWithPlatform = (platform: string) => {
    setCardData({
      ...cardData,
      socials: [
        ...cardData.socials,
        { id: Date.now().toString(), platform, url: '' },
      ],
    });
    // Expand the socials section if it's not already expanded
    if (expanded !== 'socials') {
      setExpanded('socials');
    }
  };

  // Add a new social media link with empty fields
  const addSocial = () => {
    setCardData({
      ...cardData,
      socials: [
        ...cardData.socials,
        { id: Date.now().toString(), platform: '', url: '' },
      ],
    });
  };

  // Update a social media link
  const updateSocial = (id: string, field: 'platform' | 'url', value: string) => {
    setCardData({
      ...cardData,
      socials: cardData.socials.map(social => 
        social.id === id ? { ...social, [field]: value } : social
      ),
    });
  };

  // Remove a social media link
  const removeSocial = (id: string) => {
    setCardData({
      ...cardData,
      socials: cardData.socials.filter(social => social.id !== id),
    });
  };

  // Add a new messaging contact with a specific platform
  const addMessagingWithPlatform = (platform: string) => {
    setCardData({
      ...cardData,
      messaging: [
        ...cardData.messaging,
        { id: Date.now().toString(), platform, contact: '' },
      ],
    });
    // Expand the messaging section if it's not already expanded
    if (expanded !== 'messaging') {
      setExpanded('messaging');
    }
  };

  // Update a messaging contact
  const updateMessaging = (id: string, field: 'platform' | 'contact', value: string) => {
    setCardData({
      ...cardData,
      messaging: cardData.messaging.map(msg => 
        msg.id === id ? { ...msg, [field]: value } : msg
      ),
    });
  };

  // Remove a messaging contact
  const removeMessaging = (id: string) => {
    setCardData({
      ...cardData,
      messaging: cardData.messaging.filter(msg => msg.id !== id),
    });
  };

  // Add a custom call-to-action
  const addCustomField = () => {
    setCardData({
      ...cardData,
      custom: [
        ...cardData.custom,
        { id: Date.now().toString(), label: '', url: '' },
      ],
    });
  };

  // Update a custom call-to-action
  const updateCustomField = (id: string, field: 'label' | 'url', value: string) => {
    setCardData({
      ...cardData,
      custom: cardData.custom.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Remove a custom call-to-action
  const removeCustomField = (id: string) => {
    setCardData({
      ...cardData,
      custom: cardData.custom.filter(item => item.id !== id),
    });
  };

  // Handle photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      // Create a local URL for the file for preview
      const localUrl = URL.createObjectURL(file);
      console.log('Created local URL for photo:', localUrl);
      
      // Convert the image to base64 for storage and vCard
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64String = event.target.result as string;
          
          // Update the state with both the local URL (for preview) and base64 (for storage)
          setCardData(prevData => {
            console.log('Updating cardData with photo');
            return {
              ...prevData,
              personal: {
                ...prevData.personal,
                photo: base64String, // Store as base64 for better compatibility
              },
            };
          });
        }
      };
      
      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling photo upload:', error);
    }
  };
  
  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      // Create a local URL for the file for preview
      const localUrl = URL.createObjectURL(file);
      console.log('Created local URL for logo:', localUrl);
      
      // Convert the image to base64 for storage and vCard
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64String = event.target.result as string;
          
          // Update the state with the base64 string
          setCardData(prevData => {
            console.log('Updating cardData with logo');
            return {
              ...prevData,
              company: {
                ...prevData.company,
                logo: base64String, // Store as base64 for better compatibility
              },
            };
          });
        }
      };
      
      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling logo upload:', error);
    }
  };

  // Handle theme change
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      theme: event.target.value
    });
  };

  // Get current theme
  const getCurrentTheme = () => {
    return colorThemes.find(theme => theme.name === cardData.theme) || colorThemes[0];
  };

  // Get social media icon based on platform name
  const getSocialIcon = (platform: string) => {
    const theme = getCurrentTheme();
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'twitter':
        return <TwitterIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'linkedin':
        return <LinkedInIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'instagram':
        return <InstagramIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'youtube':
        return <YouTubeIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'pinterest':
        return <PinterestIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'reddit':
        return <RedditIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'tiktok':
        return <MusicNoteIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'snapchat':
        return <PhotoCameraIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'website':
        return <LanguageIcon fontSize="small" sx={{ color: theme.primary }} />;
      default:
        return <LanguageIcon fontSize="small" sx={{ color: theme.primary }} />;
    }
  };

  // Get messaging icon based on platform name
  const getMessagingIcon = (platform: string) => {
    const theme = getCurrentTheme();
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <WhatsAppIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'telegram':
        return <TelegramIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'discord':
        return <ChatIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'wechat':
        return <ChatIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'sms':
        return <SmsIcon fontSize="small" sx={{ color: theme.primary }} />;
      case 'phone':
        return <PhoneIcon fontSize="small" sx={{ color: theme.primary }} />;
      default:
        return <ChatIcon fontSize="small" sx={{ color: theme.primary }} />;
    }
  };

  // Generate vCard format for QR code
  const generateVCardData = () => {
    // Start vCard
    let vCard = 'BEGIN:VCARD\nVERSION:3.0\n';
    
    // Add personal information
    if (cardData.personal.name) {
      // Add full name
      vCard += `FN:${cardData.personal.name}\n`;
      
      // Add structured name - try to split into components
      // Format: Last;First;Middle;Prefix;Suffix
      const nameParts = cardData.personal.name.split(' ');
      let firstName = '';
      let lastName = '';
      
      if (nameParts.length === 1) {
        // Only one name provided
        firstName = nameParts[0];
      } else if (nameParts.length === 2) {
        // Likely first and last name
        firstName = nameParts[0];
        lastName = nameParts[1];
      } else if (nameParts.length > 2) {
        // Multiple parts - assume first name is first part, last name is last part
        firstName = nameParts[0];
        lastName = nameParts[nameParts.length - 1];
      }
      
      vCard += `N:${lastName};${firstName};;;\n`;
    }
    
    if (cardData.personal.title) vCard += `TITLE:${cardData.personal.title}\n`;
    if (cardData.personal.email) vCard += `EMAIL:${cardData.personal.email}\n`;
    if (cardData.personal.phone) vCard += `TEL;TYPE=CELL:${cardData.personal.phone}\n`;
    
    // Add company information
    if (cardData.company.name) vCard += `ORG:${cardData.company.name}\n`;
    if (cardData.company.address) vCard += `ADR;TYPE=WORK:;;${cardData.company.address};;;;\n`;
    if (cardData.company.phone) vCard += `TEL;TYPE=WORK:${cardData.company.phone}\n`;
    if (cardData.company.fax) vCard += `TEL;TYPE=FAX:${cardData.company.fax}\n`;
    if (cardData.company.website) vCard += `URL:${cardData.company.website}\n`;
    
    // Add social media as URLs
    cardData.socials.forEach(social => {
      if (social.url) vCard += `URL;TYPE=${social.platform}:${social.url}\n`;
    });
    
    // Add custom fields as notes
    if (cardData.custom.length > 0) {
      let notes = 'Custom Information:\\n';
      cardData.custom.forEach(custom => {
        notes += `${custom.label}: ${custom.url}\\n`;
      });
      vCard += `NOTE:${notes}\n`;
    }
    
    // Add messaging platforms as notes
    if (cardData.messaging.length > 0) {
      let messagingNote = 'Messaging:\\n';
      cardData.messaging.forEach(msg => {
        messagingNote += `${msg.platform}: ${msg.contact}\\n`;
      });
      vCard += `NOTE:${messagingNote}\n`;
    }
    
    // End vCard
    vCard += 'END:VCARD';
    
    return vCard;
  };

  // Sanitize card data before saving to ensure proper format
  const sanitizeCardData = (data: CardData): CardData => {
    // Create a deep copy to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(data)) as CardData;
    
    // Ensure all string fields are strings (not null or undefined)
    sanitized.personal.name = sanitized.personal.name || '';
    sanitized.personal.title = sanitized.personal.title || '';
    sanitized.personal.email = sanitized.personal.email || '';
    sanitized.personal.phone = sanitized.personal.phone || '';
    
    sanitized.company.name = sanitized.company.name || '';
    sanitized.company.address = sanitized.company.address || '';
    sanitized.company.phone = sanitized.company.phone || '';
    sanitized.company.fax = sanitized.company.fax || '';
    sanitized.company.website = sanitized.company.website || '';
    
    // Ensure arrays are properly initialized
    sanitized.socials = Array.isArray(sanitized.socials) ? sanitized.socials : [];
    sanitized.messaging = Array.isArray(sanitized.messaging) ? sanitized.messaging : [];
    sanitized.custom = Array.isArray(sanitized.custom) ? sanitized.custom : [];
    
    // Ensure theme is valid
    sanitized.theme = sanitized.theme || 'Classic';
    
    return sanitized;
  };

  // Save card data to localStorage as a fallback
  const saveCardToLocalStorage = (cardData: CardData) => {
    try {
      const sanitizedData = sanitizeCardData(cardData);
      localStorage.setItem('luxora_card_backup', JSON.stringify(sanitizedData));
      console.log('Card data saved to localStorage as backup');
      return true;
    } catch (err) {
      console.error('Failed to save card to localStorage:', err);
      return false;
    }
  };

  // Load card data from localStorage
  const loadCardFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('luxora_card_backup');
      if (savedData) {
        const parsedData = JSON.parse(savedData) as CardData;
        console.log('Loaded card data from localStorage');
        return parsedData;
      }
    } catch (err) {
      console.error('Failed to load card from localStorage:', err);
    }
    return null;
  };

  // Save the card data
  const saveCard = async () => {
    try {
      setSaving(true);
      setSaveSuccess(false);
      setSaveError(false);
      
      console.log('Starting card save process...');
      
      // Always save to localStorage as a backup
      saveCardToLocalStorage(cardData);
      
      // Use the userId from state (which might be the default test ID)
      if (!userId) {
        console.error('No user ID available');
        setSaveError(true);
        alert('Authentication error: No user ID available.\nYour card has been backed up locally.');
        return;
      }
      
      // Create a card name from the personal name or a default
      const cardName = cardData.personal.name || 'Untitled Card';
      
      console.log('Preparing card data for user:', userId);
      
      // Sanitize the card data before saving
      const sanitizedCardData = sanitizeCardData(cardData);
      console.log('Sanitized card data:', sanitizedCardData);
      
      // Try to save directly with Supabase client instead of using the API
      // This will work with the anon key for the current authenticated user
      let result;
      
      // Prepare the record for Supabase
      const cardRecord = {
        user_id: userId,
        name: cardName,
        data: sanitizedCardData,
        updated_at: new Date().toISOString(),
      };
      
      if (cardData.id) {
        // Update existing card
        console.log('Updating existing card with ID:', cardData.id);
        result = await supabase
          .from('cards')
          .update(cardRecord)
          .eq('id', cardData.id)
          .select();
      } else {
        // Insert new card
        console.log('Creating new card');
        result = await supabase
          .from('cards')
          .insert(cardRecord)
          .select();
      }
      
      const { data, error } = result;
      
      if (error) {
        console.error('Error saving card:', error);
        
        // Check for specific error types
        if (error.code === '42P01') {
          alert('Error: Database table "cards" not found. Please make sure you have created the necessary tables in your Supabase project.');
        } else if (error.code === '42501' || (error.message && error.message.includes('permission denied'))) {
          alert('Error: Permission denied. Make sure you have the correct Row Level Security (RLS) policies set up in your Supabase project.');
        } else {
          // Safely extract error message or provide a fallback
          const errorMessage = error.message || (typeof error === 'string' ? error : 'Unknown error');
          alert(`Error saving card: ${errorMessage}\n\nYour card has been backed up locally.`);
        }
        
        setSaveError(true);
        return;
      }
      
      console.log('Card saved successfully:', data);
      
      // Update the card data with the returned ID if it's a new card
      if (data && data.length > 0 && !cardData.id) {
        console.log('Updating state with new card ID:', data[0].id);
        setCardData({
          ...cardData,
          id: data[0].id
        } as CardData);
      }
      
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving card:', error);
      
      // Enhanced error logging
      console.error('Error type:', typeof error);
      try {
        console.error('Error stringified:', JSON.stringify(error));
      } catch (e) {
        console.error('Error could not be stringified');
      }
      
      // Handle different error types
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
        alert(`Error saving card: ${error.message}\n\nYour card has been backed up locally.`);
      } else if (error === null) {
        alert('Error saving card: Null error received\n\nYour card has been backed up locally.');
      } else if (error === undefined) {
        alert('Error saving card: Undefined error received\n\nYour card has been backed up locally.');
      } else if (typeof error === 'string') {
        alert(`Error saving card: ${error}\n\nYour card has been backed up locally.`);
      } else if (typeof error === 'object' && error !== null) {
        // Use any type to bypass TypeScript errors
        const errorObj: any = error;
        const message = errorObj?.message || errorObj?.error || errorObj?.description || 'Unknown object error';
        alert(`Error saving card: ${message}\n\nYour card has been backed up locally.`);
      } else {
        alert('An unknown error occurred while saving the card. Check the console for details.\n\nYour card has been backed up locally.');
      }
      
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  // Card preview component
  const CardPreview = () => {
    const theme = getCurrentTheme();
    
    // Don't render modals during server-side rendering
    if (!mounted) {
      return (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            height: '100%',
            backgroundColor: '#ffffff',
            border: `1px solid ${theme.primary}`,
            color: theme.text,
            position: 'relative',
            overflow: 'auto'
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              ...editorStyles.heading,
              textAlign: 'center',
              mb: 3,
              color: theme.primary,
              letterSpacing: '0.15em',
              fontWeight: 'bold',
            }}
          >
            LIVE PREVIEW
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
            <Typography variant="body1">Loading preview...</Typography>
          </Box>
        </Paper>
      );
    }
    
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          height: '100%',
          backgroundColor: '#ffffff',
          border: `1px solid ${theme.primary}`,
          color: theme.text,
          position: 'relative',
          overflow: 'auto'
        }}
      >
        {/* QR Code Modal */}
        {showQrModal && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            onClick={() => setShowQrModal(false)}
          >
            <Paper
              elevation={5}
              sx={{
                p: 4,
                maxWidth: 400,
                width: '90%',
                backgroundColor: theme.secondary,
                border: `2px solid ${theme.primary}`,
                borderRadius: 0,
                position: 'relative',
                boxShadow: '6px 6px 0px #000000',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: theme.primary,
                }}
                onClick={() => setShowQrModal(false)}
              >
                <CloseIcon />
              </IconButton>
              
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  mb: 3,
                  color: theme.primary,
                  fontFamily: 'monospace',
                }}
              >
                YOUR DIGITAL BUSINESS CARD
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: '#ffffff',
                    border: `2px solid ${theme.primary}`,
                    mb: 3,
                  }}
                >
                  <QRCodeSVG
                    value={generateVCardData()}
                    size={200}
                    bgColor={'#ffffff'}
                    fgColor={theme.primary}
                    level={'H'}
                    includeMargin={true}
                  />
                </Box>
                
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    mb: 3,
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: theme.primary,
                  }}
                >
                  Scan this QR code to save this contact to your phone
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 0,
                      border: `1px solid ${theme.primary}`,
                      color: theme.primary,
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      '&:hover': {
                        backgroundColor: theme.accent,
                        borderColor: theme.primary,
                      },
                    }}
                  >
                    DOWNLOAD
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 0,
                      backgroundColor: theme.primary,
                      color: theme.secondary,
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      '&:hover': {
                        backgroundColor: '#333333',
                      },
                    }}
                  >
                    SHARE
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
        
        {/* Send Modal */}
        {showSendModal && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
            onClick={() => setShowSendModal(false)}
          >
            <Paper
              elevation={5}
              sx={{
                p: 4,
                maxWidth: 400,
                width: '90%',
                backgroundColor: theme.secondary,
                border: `2px solid ${theme.primary}`,
                borderRadius: 0,
                position: 'relative',
                boxShadow: '6px 6px 0px #000000',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: theme.primary,
                }}
                onClick={() => setShowSendModal(false)}
              >
                <CloseIcon />
              </IconButton>
              
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  mb: 3,
                  color: theme.primary,
                  fontFamily: 'monospace',
                }}
              >
                SEND YOUR CARD
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<SmsIcon />}
                  fullWidth
                  onClick={() => {
                    // Generate SMS link with vCard data
                    const message = `Here's my digital business card: ${cardData.personal.name} - ${cardData.personal.title}`;
                    const smsLink = `sms:?body=${encodeURIComponent(message)}`;
                    window.open(smsLink, '_blank');
                    setShowSendModal(false);
                  }}
                  sx={{
                    borderRadius: 0,
                    border: `2px solid ${theme.primary}`,
                    color: theme.primary,
                    backgroundColor: theme.buttonBg,
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: theme.buttonHover,
                      borderColor: theme.primary,
                    },
                  }}
                >
                  SEND VIA TEXT MESSAGE
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  fullWidth
                  onClick={() => {
                    // Generate email link with vCard data - avoid template literals with whitespace
                    const subject = `Digital Business Card: ${cardData.personal.name}`;
                    
                    // Create email body without template literals to avoid hydration issues
                    let bodyParts = [];
                    bodyParts.push("Here's my digital business card:");
                    bodyParts.push("");
                    bodyParts.push(`Name: ${cardData.personal.name}`);
                    bodyParts.push(`Title: ${cardData.personal.title}`);
                    
                    if (cardData.personal.email) {
                      bodyParts.push(`Email: ${cardData.personal.email}`);
                    }
                    
                    if (cardData.personal.phone) {
                      bodyParts.push(`Phone: ${cardData.personal.phone}`);
                    }
                    
                    if (cardData.company.name) {
                      bodyParts.push(`Company: ${cardData.company.name}`);
                    }
                    
                    if (cardData.company.website) {
                      bodyParts.push(`Website: ${cardData.company.website}`);
                    }
                    
                    const body = bodyParts.join('\n');
                    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoLink, '_blank');
                    setShowSendModal(false);
                  }}
                  sx={{
                    borderRadius: 0,
                    border: `2px solid ${theme.primary}`,
                    color: theme.primary,
                    backgroundColor: theme.buttonBg,
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: theme.buttonHover,
                      borderColor: theme.primary,
                    },
                  }}
                >
                  SEND VIA EMAIL
                </Button>
                
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: theme.primary,
                    mt: 1,
                  }}
                >
                  Choose how you want to share your digital business card
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            ...editorStyles.heading,
            textAlign: 'center',
            mb: 3,
            color: theme.primary,
            letterSpacing: '0.15em',
            fontWeight: 'bold',
          }}
        >
          LIVE PREVIEW
        </Typography>
        
        {/* Action Buttons Row */}
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
            mt: 1
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<QRCodeSVG value={generateVCardData()} size={16} bgColor={'#ffffff'} fgColor={theme.primary} />}
            onClick={() => setShowQrModal(true)}
            sx={{ 
              borderRadius: 0,
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
              backgroundColor: theme.buttonBg,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
              py: 0.5,
              px: 1,
              minWidth: 0,
              '&:hover': {
                backgroundColor: theme.buttonHover,
                borderColor: theme.primary,
              },
            }}
          >
            QR CODE
          </Button>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<ShareIcon fontSize="small" />}
            onClick={() => setShowSendModal(true)}
            sx={{ 
              borderRadius: 0,
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
              backgroundColor: theme.buttonBg,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
              py: 0.5,
              px: 1,
              minWidth: 0,
              '&:hover': {
                backgroundColor: theme.buttonHover,
                borderColor: theme.primary,
              },
            }}
          >
            SEND
          </Button>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon fontSize="small" />}
            sx={{ 
              borderRadius: 0,
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
              backgroundColor: theme.buttonBg,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
              py: 0.5,
              px: 1,
              minWidth: 0,
              '&:hover': {
                backgroundColor: theme.buttonHover,
                borderColor: theme.primary,
              },
            }}
          >
            ADD TO WALLET
          </Button>
        </Box>
        
        {/* Personal Information Section */}
        <Box sx={{ 
          mb: 2,
          p: 1.5,
          border: `1px solid ${theme.primary}`,
          backgroundColor: '#ffffff',
          position: 'relative',
        }}>
          <Typography 
            variant="subtitle2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              pb: 0.5,
              mb: 1,
              fontSize: '0.8rem',
              textAlign: 'center'
            }}
          >
            PERSONAL
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 1,
                border: `2px solid ${theme.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '50%'
              }}
            >
              {cardData.personal.photo ? (
                <Box 
                  component="img"
                  src={cardData.personal.photo}
                  alt={cardData.personal.name}
                  sx={{ 
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              ) : (
                <Typography variant="caption" sx={{ color: theme.text }}>
                  {cardData.personal.name ? cardData.personal.name.charAt(0) : 'No photo'}
                </Typography>
              )}
            </Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                color: theme.primary,
                textTransform: 'uppercase',
                fontSize: '1.2rem',
                mb: 0.5
              }}
            >
              {cardData.personal.name || 'YOUR NAME'}
            </Typography>
            <Typography 
              variant="subtitle1" 
              gutterBottom
              sx={{ 
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                color: theme.primary,
                mb: 0,
                fontSize: '0.85rem'
              }}
            >
              {cardData.personal.title || 'YOUR TITLE'}
            </Typography>
          </Box>
          
          <Grid container spacing={0.5} justifyContent="center">
            {cardData.personal.email && (
              <Grid item xs={12}>
                <Typography 
                  variant="body2" 
                  gutterBottom
                  sx={{ 
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: theme.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  <Box component="span" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    minWidth: 30,
                    fontWeight: 'bold'
                  }}>
                    <EmailIcon fontSize="small" sx={{ color: theme.primary }} />
                  </Box> 
                  <Box component="span">{cardData.personal.email}</Box>
                </Typography>
              </Grid>
            )}
            {cardData.personal.phone && (
              <Grid item xs={12}>
                <Typography 
                  variant="body2" 
                  gutterBottom
                  sx={{ 
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: theme.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  <Box component="span" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    minWidth: 30,
                    fontWeight: 'bold'
                  }}>
                    <PhoneIcon fontSize="small" sx={{ color: theme.primary }} />
                  </Box> 
                  <Box component="span">{cardData.personal.phone}</Box>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        
        {/* Company Information Section */}
        {(cardData.company.name || cardData.company.logo || cardData.company.address || 
          cardData.company.phone || cardData.company.fax || cardData.company.website) && (
          <Box sx={{ 
            mb: 2,
            p: 1.5,
            border: `1px solid ${theme.primary}`,
            backgroundColor: '#ffffff',
            position: 'relative',
          }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: theme.primary,
                borderBottom: `1px solid ${theme.primary}`,
                pb: 0.5,
                mb: 1,
                fontSize: '0.8rem',
                textAlign: 'center'
              }}
            >
              COMPANY
            </Typography>
            
            {(cardData.company.name || cardData.company.logo) && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1.5 }}>
                {cardData.company.logo && (
                  <Box 
                    component="img"
                    src={cardData.company.logo}
                    alt={cardData.company.name}
                    sx={{ 
                      maxWidth: 120,
                      maxHeight: 40,
                      mb: 0.5
                    }}
                  />
                )}
                {cardData.company.name && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      color: theme.primary,
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  >
                    {cardData.company.name}
                  </Typography>
                )}
              </Box>
            )}
            
            <Grid container spacing={0.5} justifyContent="center">
              {cardData.company.address && (
                <Grid item xs={12}>
                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      color: theme.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Box component="span" sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: 30,
                      fontWeight: 'bold'
                    }}>
                      <BusinessIcon fontSize="small" sx={{ color: theme.primary }} />
                    </Box> 
                    <Box component="span">{cardData.company.address}</Box>
                  </Typography>
                </Grid>
              )}
              {cardData.company.phone && (
                <Grid item xs={12}>
                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      color: theme.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Box component="span" sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: 30,
                      fontWeight: 'bold'
                    }}>
                      <PhoneIcon fontSize="small" sx={{ color: theme.primary }} />
                    </Box> 
                    <Box component="span">{cardData.company.phone}</Box>
                  </Typography>
                </Grid>
              )}
              {cardData.company.fax && (
                <Grid item xs={12}>
                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      color: theme.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Box component="span" sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: 30,
                      fontWeight: 'bold'
                    }}>
                      <FaxIcon fontSize="small" sx={{ color: theme.primary }} />
                    </Box> 
                    <Box component="span">{cardData.company.fax}</Box>
                  </Typography>
                </Grid>
              )}
              {cardData.company.website && (
                <Grid item xs={12}>
                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      color: theme.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Box component="span" sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: 30,
                      fontWeight: 'bold'
                    }}>
                      <LanguageIcon fontSize="small" sx={{ color: theme.primary }} />
                    </Box> 
                    <Box component="span">{cardData.company.website}</Box>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
        
        {/* Social Media with improved styling */}
        {cardData.socials.length > 0 && (
          <Box sx={{ 
            mb: 2,
            p: 1.5,
            border: `1px solid ${theme.primary}`,
            backgroundColor: '#ffffff',
          }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: theme.primary,
                borderBottom: `1px solid ${theme.primary}`,
                pb: 0.5,
                mb: 1,
                fontSize: '0.8rem',
                textAlign: 'center'
              }}
            >
              SOCIALS
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {cardData.socials.map(social => (
                <Grid item key={social.id}>
                  <Box
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: theme.primary,
                      p: 0.75,
                      borderRadius: '4px',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      }
                    }}
                  >
                    <Box sx={{ fontSize: '1.75rem', mb: 0.5 }}>
                      {getSocialIcon(social.platform)}
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {social.platform}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {/* Messaging with improved styling */}
        {cardData.messaging.length > 0 && (
          <Box sx={{ 
            mb: 2,
            p: 1.5,
            border: `1px solid ${theme.primary}`,
            backgroundColor: '#ffffff',
          }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: theme.primary,
                borderBottom: `1px solid ${theme.primary}`,
                pb: 0.5,
                mb: 1,
                fontSize: '0.8rem',
                textAlign: 'center'
              }}
            >
              MESSAGING
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {cardData.messaging.map(msg => {
                // Generate appropriate URL based on platform
                let url = '#';
                switch(msg.platform.toLowerCase()) {
                  case 'whatsapp':
                    url = `https://wa.me/${msg.contact.replace(/\D/g, '')}`;
                    break;
                  case 'telegram':
                    url = `https://t.me/${msg.contact.replace('@', '')}`;
                    break;
                  case 'discord':
                    url = `https://discord.com/users/${msg.contact}`;
                    break;
                  case 'sms':
                    url = `sms:${msg.contact}`;
                    break;
                  case 'phone':
                    url = `tel:${msg.contact}`;
                    break;
                  default:
                    url = `#${msg.platform.toLowerCase()}:${msg.contact}`;
                }
                
                return (
                  <Grid item key={msg.id}>
                    <Box
                      component="a"
                      href={url}
                      target={url.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: theme.primary,
                        p: 0.75,
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }
                      }}
                    >
                      <Box sx={{ fontSize: '1.75rem', mb: 0.5 }}>
                        {getMessagingIcon(msg.platform)}
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.6rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {msg.platform}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
        
        {/* Custom Buttons with improved styling */}
        {cardData.custom.length > 0 && (
          <Box sx={{ 
            mb: 2,
            p: 1.5,
            border: `1px solid ${theme.primary}`,
            backgroundColor: '#ffffff',
          }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: theme.primary,
                borderBottom: `1px solid ${theme.primary}`,
                pb: 0.5,
                mb: 1,
                fontSize: '0.8rem',
                textAlign: 'center'
              }}
            >
              CUSTOM BUTTONS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              {cardData.custom.map(item => (
                <Button
                  key={item.id}
                  variant="outlined"
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    borderRadius: 0,
                    border: `1px solid ${theme.primary}`,
                    color: theme.primary,
                    backgroundColor: theme.buttonBg,
                    '&:hover': {
                      backgroundColor: theme.buttonHover,
                      borderColor: theme.primary
                    },
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    py: 0.5
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>
        )}
        
        {/* Enhanced footer */}
        <Box sx={{ 
          mt: 'auto', 
          pt: 2,
          borderTop: `2px solid ${theme.primary}`,
          position: 'relative',
          textAlign: 'center',
          backgroundColor: '#ffffff'
        }}>
          <Typography 
            variant="caption" 
            align="center" 
            sx={{ 
              display: 'block',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              color: theme.primary,
              fontWeight: 'bold',
            }}
          >
            LUXORA DIGITAL BUSINESS CARD
          </Typography>
        </Box>
      </Paper>
    );
  };

  // Return null during server-side rendering
  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mb: 4
        }}
      >
        DIGITAL CARD EDITOR
      </Typography>
      
      <Grid container spacing={4}>
        {/* Editor Column */}
        <Grid item xs={12} md={7}>
          {/* Personal Information */}
          <Accordion 
            expanded={expanded === 'personal'} 
            onChange={handleAccordionChange('personal')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                PERSONAL
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                {/* Photo upload - moved to the top */}
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      mb: 1
                    }}
                  >
                    PROFILE PHOTO
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80,
                        border: '1px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        borderRadius: '50%'
                      }}
                    >
                      {cardData.personal.photo ? (
                        <Box 
                          component="img"
                          src={cardData.personal.photo}
                          alt={cardData.personal.name}
                          sx={{ 
                            maxWidth: '100%',
                            maxHeight: '100%'
                          }}
                        />
                      ) : (
                        <Typography variant="caption" sx={{ color: '#666666' }}>
                          {cardData.personal.name ? cardData.personal.name.charAt(0) : 'No photo'}
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ 
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                        borderRadius: 0
                      }}
                    >
                      UPLOAD PHOTO
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </Button>
                  </Box>
                </Box>

                <TextField
                  label="NAME"
                  fullWidth
                  value={cardData.personal.name}
                  onChange={handlePersonalChange('name')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="TITLE"
                  fullWidth
                  value={cardData.personal.title}
                  onChange={handlePersonalChange('title')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="EMAIL"
                  fullWidth
                  type="email"
                  value={cardData.personal.email}
                  onChange={handlePersonalChange('email')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="PHONE"
                  fullWidth
                  value={cardData.personal.phone}
                  onChange={handlePersonalChange('phone')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          
          {/* Company Information */}
          <Accordion 
            expanded={expanded === 'company'} 
            onChange={handleAccordionChange('company')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                COMPANY
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                {/* Logo upload - moved to the top */}
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{ 
                      ...editorStyles.input
                    }}
                  >
                    COMPANY LOGO
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80,
                        border: '1px solid #000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      {cardData.company.logo ? (
                        <Box 
                          component="img"
                          src={cardData.company.logo}
                          alt={cardData.company.name}
                          sx={{ 
                            maxWidth: '100%',
                            maxHeight: '100%'
                          }}
                        />
                      ) : (
                        <Typography variant="caption" sx={{ color: '#666666' }}>
                          No logo
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ 
                        ...editorStyles.input
                      }}
                    >
                      UPLOAD LOGO
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </Button>
                  </Box>
                </Box>

                <TextField
                  label="COMPANY NAME"
                  fullWidth
                  value={cardData.company.name}
                  onChange={handleCompanyChange('name')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="ADDRESS"
                  fullWidth
                  multiline
                  rows={2}
                  value={cardData.company.address}
                  onChange={handleCompanyChange('address')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="PHONE"
                  fullWidth
                  value={cardData.company.phone}
                  onChange={handleCompanyChange('phone')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="FAX"
                  fullWidth
                  value={cardData.company.fax}
                  onChange={handleCompanyChange('fax')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
                <TextField
                  label="WEBSITE"
                  fullWidth
                  value={cardData.company.website}
                  onChange={handleCompanyChange('website')}
                  InputLabelProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                  InputProps={{
                    sx: { 
                      ...editorStyles.input
                    }
                  }}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          
          {/* Social Media */}
          <Accordion 
            expanded={expanded === 'socials'} 
            onChange={handleAccordionChange('socials')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                SOCIALS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Social Media Icons - All using the same Chip design */}
              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {socialPlatforms.map((platform) => (
                  <Chip
                    key={platform.name}
                    icon={platform.icon}
                    label={platform.name}
                    onClick={() => addSocialWithPlatform(platform.name)}
                    sx={{ 
                      borderRadius: 0,
                      border: '1px solid #000000',
                      backgroundColor: '#f0f0f0',
                      '&:hover': {
                        backgroundColor: '#ffffff'
                      },
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      height: 'auto',
                      py: 0.5,
                      transition: 'all 0.2s',
                      boxShadow: '2px 2px 0px #000000',
                      '&:active': {
                        boxShadow: '1px 1px 0px #000000',
                        transform: 'translate(1px, 1px)'
                      }
                    }}
                  />
                ))}
              </Box>
              
              {cardData.socials.length > 0 ? (
                <Stack spacing={2}>
                  {cardData.socials.map((social, index) => (
                    <Box key={social.id} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      p: 1,
                      border: '1px solid #000000',
                      backgroundColor: '#f5f5f5'
                    }}>
                      <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                        <TextField
                          label="PLATFORM"
                          value={social.platform}
                          onChange={(e) => updateSocial(social.id, 'platform', e.target.value)}
                          sx={{ 
                            flexBasis: '40%',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 0,
                              fontFamily: 'monospace',
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                          InputProps={{
                            sx: { 
                              ...editorStyles.input
                            },
                            startAdornment: (() => {
                              const platformObj = socialPlatforms.find(p => p.name === social.platform);
                              return platformObj ? React.cloneElement(platformObj.icon, { fontSize: 'small', sx: { mr: 1 } }) : null;
                            })()
                          }}
                        />
                        <TextField
                          label="URL"
                          value={social.url}
                          onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                          sx={{ 
                            flexBasis: '60%',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 0,
                              fontFamily: 'monospace',
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                          InputProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                        />
                      </Box>
                      <IconButton 
                        onClick={() => removeSocial(social.id)}
                        sx={{ 
                          color: '#ff0000',
                          p: 1,
                          border: '1px solid #ff0000',
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.1)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography 
                  variant="body2" 
                  align="center"
                  sx={{ 
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    my: 2,
                    border: '1px dashed #000000',
                    p: 2
                  }}
                >
                  Click an icon above to add a social media profile
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
          
          {/* Messaging */}
          <Accordion 
            expanded={expanded === 'messaging'} 
            onChange={handleAccordionChange('messaging')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                MESSAGING
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Messaging Platform Icons */}
              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {messagingPlatforms.map((platform) => (
                  <Chip
                    key={platform.name}
                    icon={platform.icon}
                    label={platform.name}
                    onClick={() => addMessagingWithPlatform(platform.name)}
                    sx={{ 
                      borderRadius: 0,
                      border: '1px solid #000000',
                      backgroundColor: '#f0f0f0',
                      '&:hover': {
                        backgroundColor: '#ffffff'
                      },
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      height: 'auto',
                      py: 0.5,
                      transition: 'all 0.2s',
                      boxShadow: '2px 2px 0px #000000',
                      '&:active': {
                        boxShadow: '1px 1px 0px #000000',
                        transform: 'translate(1px, 1px)'
                      }
                    }}
                  />
                ))}
              </Box>
              
              {cardData.messaging.length > 0 ? (
                <Stack spacing={2}>
                  {cardData.messaging.map((msg, index) => (
                  <Box key={msg.id} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    p: 1,
                    border: '1px solid #000000',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                      <TextField
                        label="PLATFORM"
                        value={msg.platform}
                        onChange={(e) => updateMessaging(msg.id, 'platform', e.target.value)}
                        sx={{ 
                          flexBasis: '40%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            fontFamily: 'monospace',
                          }
                        }}
                        InputLabelProps={{
                          sx: { 
                            ...editorStyles.input
                          }
                        }}
                        InputProps={{
                          sx: { 
                            ...editorStyles.input
                          },
                          startAdornment: (() => {
                            const platformObj = messagingPlatforms.find(p => p.name === msg.platform);
                            return platformObj ? React.cloneElement(platformObj.icon, { fontSize: 'small', sx: { mr: 1 } }) : null;
                          })()
                        }}
                      />
                      <TextField
                        label="CONTACT"
                        value={msg.contact}
                        onChange={(e) => updateMessaging(msg.id, 'contact', e.target.value)}
                        sx={{ 
                          flexBasis: '60%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            fontFamily: 'monospace',
                          }
                        }}
                        InputLabelProps={{
                          sx: { 
                            ...editorStyles.input
                          }
                        }}
                        InputProps={{
                          sx: { 
                            ...editorStyles.input
                          }
                        }}
                      />
                    </Box>
                    <IconButton 
                      onClick={() => removeMessaging(msg.id)}
                      sx={{ 
                        color: '#ff0000',
                        p: 1,
                        border: '1px solid #ff0000',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography 
                variant="body2" 
                align="center"
                sx={{ 
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  my: 2,
                  border: '1px dashed #000000',
                  p: 2
                }}
              >
                Click an icon above to add a messaging platform
              </Typography>
            )}
            </AccordionDetails>
          </Accordion>
          
          {/* Custom Call-to-Action Buttons */}
          <Accordion 
            expanded={expanded === 'custom'} 
            onChange={handleAccordionChange('custom')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                CUSTOM
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}
              >
                Add custom call-to-action buttons with links
              </Typography>
              
              {cardData.custom.length > 0 ? (
                <Stack spacing={2}>
                  {cardData.custom.map((item, index) => (
                    <Box key={item.id} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      p: 1,
                      border: '1px solid #000000',
                      backgroundColor: '#f5f5f5'
                    }}>
                      <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                        <TextField
                          label="BUTTON TEXT"
                          value={item.label}
                          onChange={(e) => updateCustomField(item.id, 'label', e.target.value)}
                          sx={{ 
                            flexBasis: '40%',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 0,
                              fontFamily: 'monospace',
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                          InputProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                        />
                        <TextField
                          label="URL"
                          value={item.url}
                          onChange={(e) => updateCustomField(item.id, 'url', e.target.value)}
                          sx={{ 
                            flexBasis: '60%',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 0,
                              fontFamily: 'monospace',
                            }
                          }}
                          InputLabelProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                          InputProps={{
                            sx: { 
                              ...editorStyles.input
                            }
                          }}
                        />
                      </Box>
                      <IconButton 
                        onClick={() => removeCustomField(item.id)}
                        sx={{ 
                          color: '#ff0000',
                          p: 1,
                          border: '1px solid #ff0000',
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.1)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography 
                  variant="body2" 
                  align="center"
                  sx={{ 
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    my: 2,
                    border: '1px dashed #000000',
                    p: 2
                  }}
                >
                  No custom buttons added yet
                </Typography>
              )}
              
              <Button
                startIcon={<AddIcon />}
                onClick={addCustomField}
                fullWidth
                variant="outlined"
                sx={{ 
                  mt: 2,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  borderRadius: 0,
                  fontWeight: 'bold',
                  border: '1px solid #000000',
                  color: '#000000',
                  backgroundColor: '#f0f0f0',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    borderColor: '#000000'
                  },
                  py: 1,
                  boxShadow: '2px 2px 0px #000000',
                  '&:active': {
                    boxShadow: '1px 1px 0px #000000',
                    transform: 'translate(1px, 1px)'
                  }
                }}
              >
                ADD CUSTOM BUTTON
              </Button>
            </AccordionDetails>
          </Accordion>
          
          {/* Color Theme */}
          <Accordion 
            expanded={expanded === 'theme'} 
            onChange={handleAccordionChange('theme')}
            sx={editorStyles.accordion}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography 
                variant="h6"
                sx={{ 
                  ...editorStyles.heading
                }}
              >
                THEME
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Choose a theme for your digital business card. The theme will determine the colors and overall look of your card.
              </Typography>
                
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  aria-label="color-theme"
                  name="color-theme"
                  value={cardData.theme}
                  onChange={handleThemeChange}
                >
                  <Grid container spacing={2}>
                    {colorThemes.map((theme) => (
                      <Grid item xs={12} sm={6} key={theme.name}>
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            border: cardData.theme === theme.name ? `2px solid ${theme.primary}` : '1px solid #e0e0e0',
                            p: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: theme.primary,
                              backgroundColor: 'rgba(0, 0, 0, 0.02)'
                            }
                          }}
                          onClick={() => setCardData({...cardData, theme: theme.name})}
                        >
                          <FormControlLabel 
                            value={theme.name}
                            control={
                              <Radio 
                                sx={{ 
                                  color: theme.primary,
                                  '&.Mui-checked': {
                                    color: theme.primary,
                                  }
                                }} 
                              />
                            }
                            label={
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography 
                                  sx={{ 
                                    fontFamily: 'monospace',
                                    letterSpacing: '0.05em',
                                    fontWeight: 'bold',
                                    mb: 1
                                  }}
                                >
                                  {theme.name.toUpperCase()}
                                </Typography>
                                <Box 
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <Box 
                                    sx={{ 
                                      width: 30, 
                                      height: 30, 
                                      backgroundColor: theme.primary,
                                      border: '1px solid #000000'
                                    }} 
                                  />
                                  <Box 
                                    sx={{ 
                                      width: 30, 
                                      height: 30, 
                                      backgroundColor: theme.secondary,
                                      border: '1px solid #000000'
                                    }} 
                                  />
                                  <Box 
                                    sx={{ 
                                      width: 30, 
                                      height: 30, 
                                      backgroundColor: theme.accent,
                                      border: '1px solid #000000'
                                    }} 
                                  />
                                </Box>
                              </Box>
                            }
                            sx={{ 
                              m: 0,
                              width: '100%',
                              '& .MuiFormControlLabel-label': {
                                width: '100%'
                              }
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={saveCard}
              disabled={saving}
              sx={{ 
                minWidth: 200,
                py: 1.5,
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: 0,
                ...editorStyles.button,
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}
            >
              {saving ? <CircularProgress size={24} color="inherit" /> : 'SAVE CARD'}
            </Button>
            {saveSuccess && (
              <Typography 
                variant="body2" 
                color="success.main" 
                sx={{ mt: 2, fontFamily: 'monospace' }}
              >
                Card saved successfully!
              </Typography>
            )}
            {saveError && (
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  color="error" 
                  sx={{ fontFamily: 'monospace' }}
                >
                  Error saving card. Please try again.
                </Typography>
                
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => {
                    const backupData = loadCardFromLocalStorage();
                    if (backupData) {
                      setCardData(backupData);
                      alert('Card data recovered from local backup!');
                    } else {
                      alert('No backup data found.');
                    }
                  }}
                  sx={{ 
                    mt: 1,
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    borderRadius: 0,
                    fontSize: '0.7rem'
                  }}
                >
                  RECOVER FROM BACKUP
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        
        {/* Preview Column */}
        <Grid item xs={12} md={5}>
          <CardPreview />
        </Grid>
      </Grid>
    </Box>
  );
} 
