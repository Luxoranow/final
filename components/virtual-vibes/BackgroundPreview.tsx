'use client';

import { Button } from './ui/button';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface BackgroundPreviewProps {
  background: any;
  onClose: () => void;
  onDownload: () => void;
  qrCodePlaceholder: string;
}

export default function BackgroundPreview({
  background,
  onClose,
  onDownload,
  qrCodePlaceholder
}: BackgroundPreviewProps) {
  if (!background) return null;

  return (
    <div className="bg-card shadow rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Download Background</h2>
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
          <Image 
            src={background.imagePath} 
            alt={background.name}
            fill
            className="object-cover" 
          />
          <div className={`absolute ${
            background.qrPosition === 'top-left' ? 'top-4 left-4' :
            background.qrPosition === 'top-right' ? 'top-4 right-4' :
            background.qrPosition === 'bottom-left' ? 'bottom-4 left-4' :
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
        </div>
        
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">
            Your background is ready to download with the QR code positioned at the {background.qrPosition.replace('-', ' ')}.
          </p>
          <Button 
            onClick={onDownload}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Background
          </Button>
        </div>
      </div>
    </div>
  );
} 