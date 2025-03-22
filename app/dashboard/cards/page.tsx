'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import CardCreator from '../../../components/cards/CardCreator';
import CardDisplay from '../../../components/cards/CardDisplay';

// Sample card data for demonstration
const sampleCards = [
  {
    id: '1',
    name: 'John Doe',
    jobTitle: 'Full Stack Developer',
    company: 'LUXORA',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    bio: 'Passionate about creating exceptional digital experiences with clean, maintainable code.',
    theme: 'minimal' as const,
    profileImage: null,
    companyLogo: null
  },
  {
    id: '2',
    name: 'Jane Smith',
    jobTitle: 'UX Designer',
    company: 'Design Studio',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    website: 'https://janesmith.design',
    instagram: 'https://instagram.com/janesmith',
    bio: 'Creating beautiful and functional user experiences.',
    theme: 'gradient' as const,
    profileImage: null,
    companyLogo: null
  }
];

export default function CardsPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cards from local storage on initial render
  useEffect(() => {
    const loadCards = () => {
      const savedCards = localStorage.getItem('luxora-cards');
      if (savedCards) {
        try {
          const parsedCards = JSON.parse(savedCards);
          setCards(parsedCards);
        } catch (error) {
          console.error('Failed to parse saved cards:', error);
          setCards(sampleCards);
        }
      } else {
        setCards(sampleCards);
      }
      setIsLoading(false);
    };

    loadCards();
  }, []);

  // Save cards to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('luxora-cards', JSON.stringify(cards));
    }
  }, [cards, isLoading]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Function to handle saving a new card
  const handleSaveCard = (cardData: any) => {
    // Add the new card to the cards array
    setCards(prevCards => [...prevCards, cardData]);
    
    // Show success notification
    setNotification({
      message: `Card "${cardData.name}" has been created successfully!`,
      type: 'success'
    });
    
    // Return to the cards list view
    setIsCreating(false);
  };

  // Function to prompt for delete confirmation
  const confirmDelete = (cardId: string, cardName: string) => {
    setDeleteConfirmation({ id: cardId, name: cardName });
  };

  // Function to handle deleting a card
  const handleDeleteCard = () => {
    if (!deleteConfirmation) return;
    
    // Remove the card from the cards array
    setCards(prevCards => prevCards.filter(card => card.id !== deleteConfirmation.id));
    
    // Show success notification
    setNotification({
      message: `Card "${deleteConfirmation.name}" has been deleted.`,
      type: 'success'
    });
    
    // Clear the delete confirmation
    setDeleteConfirmation(null);
  };

  // Function to cancel delete
  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Function to share a card
  const shareCard = (cardId: string, cardName: string) => {
    // In a real app, this would generate a shareable link
    const shareableLink = `https://luxora.com/card/${cardId}`;
    
    // Copy the link to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setNotification({
          message: `Link for "${cardName}" copied to clipboard!`,
          type: 'success'
        });
      })
      .catch(() => {
        setNotification({
          message: 'Failed to copy link. Please try again.',
          type: 'error'
        });
      });
  };

  // Function to navigate to the new card editor
  const navigateToNewCardEditor = () => {
    router.push('/dashboard/cards/new');
  };

  return (
    <div className="container mx-auto py-4 px-4">
      {/* Notification */}
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
          {notification.message}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Card</h3>
            <p className="mb-6">
              Are you sure you want to delete the card "{deleteConfirmation.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCard}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : !isCreating ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-mono font-bold">YOUR DIGITAL CARDS</h1>
              <p className="text-muted-foreground mt-1">Create and manage your digital business cards</p>
            </div>
            
            <Button onClick={navigateToNewCardEditor}>
              Create New Card
            </Button>
          </div>
          
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map(card => (
                <div key={card.id} className="bg-card rounded-lg shadow-sm overflow-hidden border border-border hover:shadow-md transition-shadow">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-medium">{card.name}</h3>
                    <p className="text-sm text-muted-foreground">{card.jobTitle} {card.company ? `at ${card.company}` : ''}</p>
                  </div>
                  <div className="p-6 flex justify-center">
                    <div className="w-full max-w-[220px]">
                      <CardDisplay card={card} />
                    </div>
                  </div>
                  <div className="p-4 border-t border-border flex justify-between">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => shareCard(card.id, card.name)}
                      >
                        Share
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => confirmDelete(card.id, card.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg shadow-sm border border-border">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">You don't have any digital cards yet</h2>
                <p className="text-muted-foreground mb-6">
                  Create your first digital business card to start networking like a pro.
                </p>
                <Button onClick={navigateToNewCardEditor}>
                  Create Your First Card
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-mono font-bold">CREATE YOUR DIGITAL CARD</h1>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <CardCreator onSave={handleSaveCard} />
        </div>
      )}
    </div>
  );
} 