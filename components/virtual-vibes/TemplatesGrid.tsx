'use client';

import Image from 'next/image';

interface TemplatesGridProps {
  templates: any[];
  onSelectTemplate: (template: any) => void;
  qrCodePlaceholder: string;
}

export default function TemplatesGrid({
  templates,
  onSelectTemplate,
  qrCodePlaceholder
}: TemplatesGridProps) {
  return (
    <div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="bg-card rounded-lg shadow-sm overflow-hidden relative cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => onSelectTemplate(template)}
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
            <div className="p-3">
              <h3 className="font-medium text-sm text-center">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 