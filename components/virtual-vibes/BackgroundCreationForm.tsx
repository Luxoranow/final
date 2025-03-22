'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface BackgroundCreationFormProps {
  onCancel: () => void;
  onSubmit: (formData: {
    name: string;
    template: any;
    card: string;
    imagePath: string;
    qrPosition: string;
    customImage: string | null;
  }) => void;
  backgroundTemplates: any[];
  qrCodePlaceholder: string;
}

export default function BackgroundCreationForm({
  onCancel,
  onSubmit,
  backgroundTemplates,
  qrCodePlaceholder
}: BackgroundCreationFormProps) {
  const [newBackgroundName, setNewBackgroundName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState('');
  const [qrPosition, setQrPosition] = useState('bottom-right');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedTemplateData = backgroundTemplates.find(t => t.id === selectedTemplate);
    
    onSubmit({
      name: newBackgroundName,
      template: selectedTemplateData,
      card: selectedCard,
      imagePath: selectedTemplateData ? selectedTemplateData.imagePath : (customImage || '/backgrounds/1.jpg'),
      qrPosition: qrPosition,
      customImage: customImage
    });
  };

  return (
    <div className="bg-card shadow rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold font-mono">Create a New Virtual Background</h2>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
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
                    {/* Add small QR code indicator */}
                    <div className="absolute bottom-2 right-2">
                      <div className="bg-white p-1 rounded-md shadow-sm border border-gray-200">
                        <Image 
                          src={qrCodePlaceholder}
                          alt="QR Code"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
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
  );
} 