'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';

export default function MasterTemplatePage() {
  const router = useRouter();

  const handleBackToTeam = () => {
    router.push('/dashboard/team');
  };

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackToTeam}
          className="flex items-center mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO TEAM
        </Button>
        <h1 className="text-2xl font-mono font-bold">MASTER TEMPLATE</h1>
      </div>

      <div className="border border-border rounded-md p-6 mt-4">
        <h2 className="text-xl font-bold mb-2">This page is currently under maintenance</h2>
        <p className="text-muted-foreground">The master template editor is being updated. Please check back later.</p>
      </div>
    </div>
  );
} 