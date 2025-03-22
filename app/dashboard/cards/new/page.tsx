'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import CardEditor from '../../../../components/editor/CardEditor';

export default function NewCardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Use effect for client-side only code
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackToAllCards = () => {
    router.push('/dashboard/cards');
  };

  if (!mounted) {
    return null; // Return nothing during server-side rendering
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-mono font-bold">CREATE YOUR DIGITAL CARD</h1>
          <p className="text-muted-foreground mt-1">Design your perfect digital business card</p>
        </div>
        
        <Button variant="outline" onClick={handleBackToAllCards}>
          Back to All Cards
        </Button>
      </div>
      
      {mounted && <CardEditor />}
    </div>
  );
} 