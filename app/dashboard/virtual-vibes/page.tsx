'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import { Upload, X, Check, Download } from 'lucide-react';

// Categories for the background images
const backgroundCategories = {
  'Professional': [1, 2, 3, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  'Abstract': [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  'Nature': [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
  'City': [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
  'Gradient': [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
  'Minimal': [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  'Creative': [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 9]
};

// Sample QR code image (placeholder)
const qrCodePlaceholder = '/images/qr-placeholder.svg';

// Generate background templates from the categories
const generateBackgroundTemplates = () => {
  let templates: Array<{
    id: string;
    name: string;
    category: string;
    thumbnail: string;
    imagePath: string;
  }> = [];
  
  Object.entries(backgroundCategories).forEach(([category, imageIds]) => {
    imageIds.forEach(id => {
      templates.push({
        id: id.toString(),
        name: `Background ${id}`,
        category: category,
        thumbnail: `/backgrounds/${id}.jpg`,
        imagePath: `/backgrounds/${id}.jpg`
      });
    });
  });
  
  return templates;
};

// Sample user backgrounds
const userBackgrounds = [
  {
    id: '1',
    name: 'My Office Background',
    template: 'Minimal',
    created: '2 days ago',
    card: 'Personal Card',
    imagePath: '/backgrounds/77.jpg',
    qrPosition: 'bottom-right'
  },
  {
    id: '2',
    name: 'Team Meeting Background',
    template: 'Gradient',
    created: '1 week ago',
    card: 'Work Card',
    imagePath: '/backgrounds/63.jpg',
    qrPosition: 'top-left'
  }
];

export default function VirtualVibesPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'my-backgrounds'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newBackgroundName, setNewBackgroundName] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [qrPosition, setQrPosition] = useState('bottom-right');
  const [backgroundTemplates, setBackgroundTemplates] = useState(generateBackgroundTemplates());
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myBackgrounds, setMyBackgrounds] = useState(userBackgrounds);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewBackground, setPreviewBackground] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [quickCreateMode, setQuickCreateMode] = useState(false);
  const [selectedTemplateData, setSelectedTemplateData] = useState<any>(null);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleCreateBackground = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create a new background object
      const newBackground = {
        id: Date.now().toString(),
        name: newBackgroundName,
        template: selectedTemplateData ? selectedTemplateData.category : 'Custom',
        created: 'Just now',
        card: selectedCard === 'personal' ? 'Personal Card' : 'Work Card',
        imagePath: selectedTemplateData ? selectedTemplateData.imagePath : (customImage || '/backgrounds/1.jpg'),
        qrPosition: qrPosition
      };
      
      // Add to user backgrounds
      setMyBackgrounds(prev => [newBackground, ...prev]);
      
      // Reset form and state
      setIsCreating(false);
      setNewBackgroundName('');
      setSelectedTemplate(null);
      setSelectedCard('');
      setCustomImage(null);
      setQuickCreateMode(false);
      setSelectedTemplateData(null);
      setIsSubmitting(false);
      
      // Show success message
      setSuccessMessage("Your new virtual background has been created successfully.");
      
      // Switch to My Backgrounds tab
      setActiveTab('my-backgrounds');
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeCustomImage = () => {
    setCustomImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuickSelect = (template: any) => {
    setSelectedTemplateData(template);
    setSelectedTemplate(template.id);
    setQuickCreateMode(true);
    // Pre-fill background name with template name
    setNewBackgroundName(template.name);
  };

  const handleQuickCreate = () => {
    if (newBackgroundName && selectedCard) {
      handleCreateBackground(new Event('submit') as any);
    }
  };

  const handlePreviewBackground = (background: any) => {
    setPreviewBackground(background);
    setShowPreview(true);
  };

  const handleDownloadBackground = () => {
    if (!previewBackground) return;
    
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = previewBackground.imagePath;
    link.download = `${previewBackground.name.replace(/\s+/g, '-')}-background.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    setSuccessMessage("Your background is ready to download. Check your downloads folder.");
    
    // Close preview after a short delay
    setTimeout(() => {
      setShowPreview(false);
    }, 2000);
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono">Virtual Vibes</h1>
            <p className="text-muted-foreground mt-1">Create and manage your virtual backgrounds</p>
          </div>
          
          {!isCreating && !quickCreateMode && !showPreview && (
            <Button onClick={() => setIsCreating(true)}>
              Create New Background
            </Button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        
        {isCreating ? (
          // Background creation form
          <div className="bg-card shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create a New Virtual Background</h2>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            
            <form onSubmit={handleCreateBackground}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="backgroundName" className="block text-sm font-medium mb-1">
                    Background Name
                  </label>
                  <input
                    type="text"
                    id="backgroundName"
                    value={newBackgroundName}
                    onChange={(e) => setNewBackgroundName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                    placeholder="Enter background name"
                    required
                  />
                </div>

                {/* Custom Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Upload Your Own Background
                  </label>
                  <div className="mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={triggerFileInput}
                      className="flex items-center"
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>

                  {customImage && (
                    <div className="relative mb-4 border border-border rounded-md overflow-hidden">
                      <div className="aspect-video relative">
                        <Image 
                          src={customImage} 
                          alt="Custom background" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeCustomImage}
                        className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground mb-4">
                    {customImage ? 'Custom image uploaded. You can also select from our templates below.' : 'Upload your own image or select from our templates below.'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Template
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                    {backgroundTemplates.map(template => (
                      <div 
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setCustomImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                          selectedTemplate === template.id ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <div className="aspect-video relative">
                          <Image 
                            src={template.thumbnail} 
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-2 text-center text-sm">
                          {template.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardSelect" className="block text-sm font-medium mb-1">
                    Link to Card
                  </label>
                  <select
                    id="cardSelect"
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                    required
                  >
                    <option value="">Select a card</option>
                    <option value="personal">Personal Card</option>
                    <option value="work">Work Card</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    QR Code Position
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(position => (
                      <div 
                        key={position}
                        onClick={() => setQrPosition(position)}
                        className={`cursor-pointer p-3 rounded-md border ${
                          qrPosition === position ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <div className="text-center capitalize">
                          {position.replace('-', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={!((selectedTemplate || customImage) && selectedCard && newBackgroundName) || isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Background'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : quickCreateMode ? (
          // Quick Create Mode - Streamlined creation form
          <div className="bg-card shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Background</h2>
              <Button variant="outline" onClick={() => {
                setQuickCreateMode(false);
                setSelectedTemplateData(null);
                setSelectedTemplate(null);
              }}>
                Cancel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {selectedTemplateData && (
                  <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
                    <Image 
                      src={selectedTemplateData.thumbnail} 
                      alt={selectedTemplateData.name}
                      fill
                      className="object-cover" 
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="quickBackgroundName" className="block text-sm font-medium mb-1">
                    Background Name
                  </label>
                  <input
                    type="text"
                    id="quickBackgroundName"
                    value={newBackgroundName}
                    onChange={(e) => setNewBackgroundName(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                    placeholder="Enter background name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="quickCardSelect" className="block text-sm font-medium mb-1">
                    Link to Card
                  </label>
                  <select
                    id="quickCardSelect"
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                    required
                  >
                    <option value="">Select a card</option>
                    <option value="personal">Personal Card</option>
                    <option value="work">Work Card</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    QR Code Position
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(position => (
                      <div 
                        key={position}
                        onClick={() => setQrPosition(position)}
                        className={`cursor-pointer p-2 rounded-md border ${
                          qrPosition === position ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <div className="text-center text-sm capitalize">
                          {position.replace('-', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleQuickCreate}
                    disabled={!(selectedCard && newBackgroundName) || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Background'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : showPreview ? (
          // Background Preview with Download Option
          <div className="bg-card shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Download Background</h2>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Back
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
                {previewBackground && (
                  <>
                    <Image 
                      src={previewBackground.imagePath} 
                      alt={previewBackground.name}
                      fill
                      className="object-cover" 
                    />
                    <div className={`absolute ${
                      previewBackground.qrPosition === 'top-left' ? 'top-4 left-4' :
                      previewBackground.qrPosition === 'top-right' ? 'top-4 right-4' :
                      previewBackground.qrPosition === 'bottom-left' ? 'bottom-4 left-4' :
                      'bottom-4 right-4'
                    }`}>
                      <div className="bg-white p-3 rounded-md shadow-lg border-2 border-gray-200">
                        <Image 
                          src={qrCodePlaceholder}
                          alt="QR Code"
                          width={120}
                          height={120}
                          priority
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="text-center">
                <p className="mb-4 text-muted-foreground">
                  Your background is ready to download with the QR code positioned at the {previewBackground?.qrPosition.replace('-', ' ')}.
                </p>
                <Button 
                  onClick={handleDownloadBackground}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Background
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-border mb-6">
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'templates'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Templates
              </button>
              <button
                onClick={() => setActiveTab('my-backgrounds')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'my-backgrounds'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                My Backgrounds
              </button>
            </div>
            
            {activeTab === 'templates' ? (
              // Templates Tab without category filters
              <div>
                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {backgroundTemplates.map(template => (
                    <div 
                      key={template.id} 
                      className="bg-card rounded-lg shadow-sm overflow-hidden relative cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => handleQuickSelect(template)}
                    >
                      <div className="aspect-video relative">
                        <Image 
                          src={template.thumbnail} 
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                        {/* Simple hover overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-center">{template.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // My Backgrounds Tab
              myBackgrounds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myBackgrounds.map(background => (
                    <div key={background.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
                      <div className="aspect-video relative">
                        <Image 
                          src={background.imagePath} 
                          alt={background.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{background.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Template: {background.template}</p>
                          <p>Card: {background.card}</p>
                          <p>Created: {background.created}</p>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePreviewBackground(background)}
                            className="flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setMyBackgrounds(prev => prev.filter(bg => bg.id !== background.id));
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-2">You don't have any backgrounds yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create your first virtual background to enhance your video calls.
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    Create Your First Background
                  </Button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
} 