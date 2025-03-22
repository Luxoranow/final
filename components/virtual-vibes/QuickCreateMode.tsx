'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface QuickCreateModeProps {
  onCancel: () => void;
  onSubmit: (formData: {
    name: string;
    card: string;
    qrPosition: string;
  }) => void;
  templateData: any;
  qrCodePlaceholder: string;
}

export default function QuickCreateMode({
  onCancel,
  onSubmit,
  templateData,
  qrCodePlaceholder
}: QuickCreateModeProps) {
  const [newBackgroundName, setNewBackgroundName] = useState(templateData?.name || '');
  const [selectedCard, setSelectedCard] = useState('');
  const [qrPosition, setQrPosition] = useState('bottom-right');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickCreate = () => {
    if (newBackgroundName && selectedCard) {
      setIsSubmitting(true);
      onSubmit({
        name: newBackgroundName,
        card: selectedCard,
        qrPosition: qrPosition
      });
    }
  };

  return (
    <div className="bg-card shadow rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create Background</h2>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {templateData && (
            <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
              <Image 
                src={templateData.thumbnail} 
                alt={templateData.name}
                fill
                className="object-cover" 
              />
              {/* Add QR code preview */}
              <div className={`absolute ${
                qrPosition === 'top-left' ? 'top-4 left-4' :
                qrPosition === 'top-right' ? 'top-4 right-4' :
                qrPosition === 'bottom-left' ? 'bottom-4 left-4' :
                'bottom-4 right-4'
              }`}>
                <div className="bg-white p-2 rounded-md shadow-lg border-2 border-gray-200">
                  <Image 
                    src={qrCodePlaceholder}
                    alt="QR Code"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
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
  );
} 