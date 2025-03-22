'use client';

import { Button } from './ui/button';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface MyBackgroundsGridProps {
  backgrounds: any[];
  onPreview: (background: any) => void;
  onDelete: (backgroundId: string) => void;
  onCreateNew: () => void;
  qrCodePlaceholder: string;
}

export default function MyBackgroundsGrid({
  backgrounds,
  onPreview,
  onDelete,
  onCreateNew,
  qrCodePlaceholder
}: MyBackgroundsGridProps) {
  if (backgrounds.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">You don't have any backgrounds yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Create your first virtual background to enhance your video calls.
        </p>
        <Button onClick={onCreateNew}>
          Create Your First Background
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {backgrounds.map(background => (
        <div key={background.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video relative">
            <Image 
              src={background.imagePath} 
              alt={background.name}
              fill
              className="object-cover"
            />
            {/* Add QR code overlay */}
            <div className={`absolute ${
              background.qrPosition === 'top-left' ? 'top-2 left-2' :
              background.qrPosition === 'top-right' ? 'top-2 right-2' :
              background.qrPosition === 'bottom-left' ? 'bottom-2 left-2' :
              'bottom-2 right-2'
            }`}>
              <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
                <Image 
                  src={qrCodePlaceholder}
                  alt="QR Code"
                  width={60}
                  height={60}
                />
              </div>
            </div>
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
                onClick={() => onPreview(background)}
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
                  onClick={() => onDelete(background.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 