'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { Building, Users, UserPlus } from 'lucide-react';

// Sample team data for demonstration
const sampleTeamMembers = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Admin',
    cardCount: 1,
    lastActive: '2 days ago'
  },
  {
    id: '2',
    name: 'Taylor Smith',
    email: 'taylor@example.com',
    role: 'Member',
    cardCount: 1,
    lastActive: '5 days ago'
  }
];

export default function TeamPage() {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isInvitingMember, setIsInvitingMember] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [hasTeam, setHasTeam] = useState(false);
  const [masterCard, setMasterCard] = useState<any>(null);
  const [teamCards, setTeamCards] = useState<any[]>([]);

  // Simulate loading team data and check for master card
  useEffect(() => {
    // Load team data
    const timer = setTimeout(() => {
      setHasTeam(true);
      setTeamName('LUXORA Marketing');
      setTeamMembers(sampleTeamMembers);
    }, 1000);
    
    // Load master card if it exists
    const savedMasterCard = localStorage.getItem('teamMasterCard');
    if (savedMasterCard) {
      try {
        const parsedMasterCard = JSON.parse(savedMasterCard);
        setMasterCard(parsedMasterCard);
      } catch (error) {
        console.error('Error parsing master card:', error);
      }
    }
    
    // Load team cards
    const savedTeamCards = localStorage.getItem('teamCards');
    if (savedTeamCards) {
      try {
        const parsedCards = JSON.parse(savedTeamCards);
        setTeamCards(parsedCards);
      } catch (error) {
        console.error('Error parsing team cards:', error);
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      setHasTeam(true);
      setIsCreatingTeam(false);
    }
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      // In a real app, this would send an invitation
      setIsInvitingMember(false);
      setInviteEmail('');
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono">Team Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage your team's digital presence</p>
          </div>
          
          {hasTeam && (
            <div className="flex space-x-2">
              <Link href="/dashboard/team/cards">
                <Button variant="outline" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Team Cards
                </Button>
              </Link>
              <Link href="/dashboard/team/master-template">
                <Button variant="outline" className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Master Template
                </Button>
              </Link>
              <Button
                onClick={() => setIsInvitingMember(true)}
                variant="outline"
                className="flex items-center"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </div>
          )}
        </div>

        {isCreatingTeam ? (
          // Team creation form
          <div className="bg-card shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create a New Team</h2>
            <form onSubmit={handleCreateTeam}>
              <div className="mb-4">
                <label htmlFor="teamName" className="block text-sm font-medium mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md"
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreatingTeam(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Team
                </Button>
              </div>
            </form>
          </div>
        ) : !hasTeam ? (
          // No team yet
          <div className="text-center py-12 bg-card rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">You don't have a team yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create a team to collaborate with colleagues and manage digital cards together.
            </p>
            <Button onClick={() => setIsCreatingTeam(true)}>
              Create a Team
            </Button>
          </div>
        ) : (
          // Team exists
          <>
            {/* Team Card Overview (if exists) */}
            {masterCard && (
              <div className="bg-card shadow rounded-lg overflow-hidden mb-8">
                <div className="p-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Team Card</h2>
                    </div>
                    <Link href="/dashboard/team/cards">
                      <Button variant="outline" size="sm">
                        Edit Team Card
                      </Button>
                    </Link>
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
                        {masterCard.website && <p><span className="font-medium">Website:</span> {masterCard.website}</p>}
                      </div>
                      
                      <div className="mt-6">
                        <Link href="/dashboard/team/cards">
                          <Button variant="outline" className="flex items-center">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Team Member Card
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Card Status</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Team Member Cards:</span> {teamCards.length}</p>
                        <p><span className="font-medium">Last Updated:</span> {new Date(masterCard.id.split('-')[2] * 1).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mt-6">
                        <Link href="/dashboard/team/cards?tab=manage">
                          <Button variant="outline" className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Manage Team Cards
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Create Team Card CTA (if no master card) */}
            {!masterCard && (
              <div className="bg-card shadow rounded-lg overflow-hidden mb-8">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    <h2 className="text-xl font-semibold">Team Card</h2>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create a team card to establish your company's digital identity and make it easy to create consistent cards for all team members.
                  </p>
                  <Link href="/dashboard/team/cards">
                    <Button className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Create Team Card
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Team Overview */}
            <div className="bg-card shadow rounded-lg overflow-hidden mb-8">
              <div className="p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{teamName}</h2>
                  <Button variant="outline" size="sm">
                    Edit Team
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-muted-foreground">Team Members</p>
                    <p className="text-2xl font-semibold">{teamMembers.length}</p>
                  </div>
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-muted-foreground">Total Cards</p>
                    <p className="text-2xl font-semibold">
                      {teamCards.length}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="/dashboard/team/cards">
                      <Button variant="outline">
                        Team Cards
                      </Button>
                    </Link>
                    <Button onClick={() => setIsInvitingMember(true)}>
                      Invite Member
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Invite Member Form */}
            {isInvitingMember && (
              <div className="bg-card shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Invite Team Member</h2>
                <form onSubmit={handleInviteMember}>
                  <div className="mb-4">
                    <label htmlFor="inviteEmail" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="inviteEmail"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsInvitingMember(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Send Invitation
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Team Members List */}
            <div className="bg-card shadow rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold">Team Members</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Cards
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {member.cardCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {member.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 