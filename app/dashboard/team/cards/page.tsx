'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import TeamCardCreator from '../../../../components/cards/TeamCardCreator';
import CardDisplay from '../../../../components/cards/CardDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../../../../components/ui/alert-dialog';
import { Share2, Trash2, Copy, Users, UserPlus, Building } from 'lucide-react';

export default function TeamCardsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [masterCard, setMasterCard] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  
  // Load cards and master card from localStorage on component mount
  useEffect(() => {
    // Load team member cards
    const savedCards = localStorage.getItem('teamCards');
    if (savedCards) {
      try {
        const parsedCards = JSON.parse(savedCards);
        setCards(parsedCards);
      } catch (error) {
        console.error('Error parsing saved cards:', error);
      }
    }
    
    // Load master card
    const savedMasterCard = localStorage.getItem('teamMasterCard');
    if (savedMasterCard) {
      try {
        const parsedMasterCard = JSON.parse(savedMasterCard);
        setMasterCard(parsedMasterCard);
        
        // Extract company data from master card
        setCompanyData({
          companyName: parsedMasterCard.company,
          department: parsedMasterCard.department,
          companyPhone: parsedMasterCard.companyPhone,
          fax: parsedMasterCard.fax,
          address: parsedMasterCard.address,
          website: parsedMasterCard.website,
          theme: parsedMasterCard.theme,
          backgroundColor: parsedMasterCard.backgroundColor,
          accentColor: parsedMasterCard.accentColor,
          fontStyle: parsedMasterCard.fontStyle,
          enableShadow: parsedMasterCard.enableShadow,
          enableRounded: parsedMasterCard.enableRounded,
          enableBorder: parsedMasterCard.enableBorder,
        });
      } catch (error) {
        console.error('Error parsing master card:', error);
      }
    }
  }, []);
  
  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('teamCards', JSON.stringify(cards));
  }, [cards]);
  
  // Save master card to localStorage whenever it changes
  useEffect(() => {
    if (masterCard) {
      localStorage.setItem('teamMasterCard', JSON.stringify(masterCard));
    }
  }, [masterCard]);
  
  const handleSaveMasterCard = (cardData: any) => {
    // Set the card as the master card
    const masterCardData = {
      ...cardData,
      id: 'team-master-card',
      isMasterCard: true
    };
    
    setMasterCard(masterCardData);
    
    // Extract company data for team member cards
    setCompanyData({
      companyName: cardData.company,
      department: cardData.department,
      companyPhone: cardData.companyPhone,
      fax: cardData.fax,
      address: cardData.address,
      website: cardData.website,
      theme: cardData.theme,
      backgroundColor: cardData.backgroundColor,
      accentColor: cardData.accentColor,
      fontStyle: cardData.fontStyle,
      enableShadow: cardData.enableShadow,
      enableRounded: cardData.enableRounded,
      enableBorder: cardData.enableBorder,
    });
    
    setNotification({
      type: 'success',
      message: 'Team master card created successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleSaveTeamMemberCard = (cardData: any) => {
    setCards(prevCards => [...prevCards, cardData]);
    
    setNotification({
      type: 'success',
      message: 'Team member card saved successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleDeleteCard = (cardId: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    
    setNotification({
      type: 'success',
      message: 'Card deleted successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleDeleteMasterCard = () => {
    setMasterCard(null);
    localStorage.removeItem('teamMasterCard');
    
    setNotification({
      type: 'success',
      message: 'Team master card deleted successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleShareCard = (card: any) => {
    // In a real app, this would generate a shareable link
    const shareableLink = `https://luxora.com/card/${card.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setNotification({
          type: 'success',
          message: 'Shareable link copied to clipboard!'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        setNotification({
          type: 'error',
          message: 'Failed to copy link to clipboard'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };
  
  // Determine the default tab based on whether we have a master card
  const defaultTab = masterCard ? 'member' : 'team';
  
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono">Team Cards</h1>
            <p className="text-muted-foreground mt-1">Create and manage digital cards for your team</p>
          </div>
        </div>
        
        {/* Notification */}
        {notification && (
          <div className={`p-4 mb-6 rounded-md ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {notification.message}
          </div>
        )}
        
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="team" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>Team Card</span>
            </TabsTrigger>
            <TabsTrigger value="member" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Member Card</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Manage Cards ({cards.length})</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Team Master Card Tab */}
          <TabsContent value="team">
            {masterCard ? (
              <div className="bg-card shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Team Master Card</h2>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleShareCard(masterCard)}
                        title="Share Card"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Delete Card"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the team master card. This action cannot be undone.
                              Note that deleting the master card will not affect existing team member cards.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteMasterCard}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Company:</span> {masterCard.company}</p>
                        {masterCard.department && <p><span className="font-medium">Department:</span> {masterCard.department}</p>}
                        {masterCard.companyPhone && <p><span className="font-medium">Phone:</span> {masterCard.companyPhone}</p>}
                        {masterCard.fax && <p><span className="font-medium">Fax:</span> {masterCard.fax}</p>}
                        {masterCard.address && <p><span className="font-medium">Address:</span> {masterCard.address}</p>}
                        {masterCard.website && <p><span className="font-medium">Website:</span> {masterCard.website}</p>}
                      </div>
                      
                      <div className="mt-6">
                        <Button onClick={() => {
                          const memberTab = document.querySelector('[data-value="member"]');
                          if (memberTab instanceof HTMLElement) {
                            memberTab.click();
                          }
                        }}>
                          Add Team Member
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-full max-w-[280px]">
                        <CardDisplay card={masterCard} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-muted/30 p-4 rounded-md mb-6">
                  <h3 className="text-lg font-medium mb-2">Create a Team Card</h3>
                  <p className="text-muted-foreground">
                    Start by creating a master card for your team. This will contain your company information
                    that will be used as a template for all team member cards.
                  </p>
                </div>
                <TeamCardCreator onSave={handleSaveMasterCard} />
              </div>
            )}
          </TabsContent>
          
          {/* Team Member Card Tab */}
          <TabsContent value="member">
            {!masterCard ? (
              <div className="text-center py-12 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Create a Team Card First</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You need to create a team card first to establish your company information.
                  This will be used as a template for all team member cards.
                </p>
                <Button onClick={() => {
                  const teamTab = document.querySelector('[data-value="team"]');
                  if (teamTab instanceof HTMLElement) {
                    teamTab.click();
                  }
                }}>
                  Create Team Card
                </Button>
              </div>
            ) : (
              <div>
                <div className="bg-muted/30 p-4 rounded-md mb-6">
                  <h3 className="text-lg font-medium mb-2">Add Team Member Card</h3>
                  <p className="text-muted-foreground">
                    Create a card for a team member using your company information from the team card.
                    You only need to fill in the individual's details.
                  </p>
                </div>
                <TeamCardCreator onSave={handleSaveTeamMemberCard} existingCompanyData={companyData} />
              </div>
            )}
          </TabsContent>
          
          {/* Manage Cards Tab */}
          <TabsContent value="manage">
            {cards.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">No team member cards yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first team member card to get started.
                </p>
                <Button onClick={() => {
                  const memberTab = document.querySelector('[data-value="member"]');
                  if (memberTab instanceof HTMLElement) {
                    memberTab.click();
                  }
                }}>
                  Create a Member Card
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <div key={card.id} className="bg-card shadow rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                      <h3 className="font-medium">{card.name}</h3>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleShareCard(card)}
                          title="Share Card"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              title="Delete Card"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the card for {card.name}. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCard(card.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="p-4 flex justify-center">
                      <div className="w-full max-w-[280px]">
                        <CardDisplay card={card} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 