'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

// Sample contacts data for demonstration
const contactsData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Innovate Tech',
    title: 'Marketing Director',
    cardScanned: 'Personal Card',
    dateAdded: '2023-05-10T14:30:00Z',
    lastInteraction: '2023-05-15T09:45:00Z',
    notes: 'Met at TechCrunch conference. Interested in collaboration.',
    tags: ['conference', 'potential-client']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '+1 (555) 987-6543',
    company: 'Global Solutions Inc.',
    title: 'CTO',
    cardScanned: 'Work Card',
    dateAdded: '2023-05-08T11:20:00Z',
    lastInteraction: '2023-05-12T16:15:00Z',
    notes: 'Discussed potential partnership for Q3.',
    tags: ['partnership', 'tech']
  },
  {
    id: '3',
    name: 'Jessica Williams',
    email: 'j.williams@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Creative Designs',
    title: 'Lead Designer',
    cardScanned: 'Personal Card',
    dateAdded: '2023-05-05T09:15:00Z',
    lastInteraction: '2023-05-11T13:30:00Z',
    notes: 'Interested in freelance opportunities.',
    tags: ['design', 'freelance']
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Finance Pro',
    title: 'Investment Advisor',
    cardScanned: 'Work Card',
    dateAdded: '2023-05-03T15:45:00Z',
    lastInteraction: '2023-05-09T10:00:00Z',
    notes: 'Looking for networking opportunities in fintech.',
    tags: ['finance', 'networking']
  },
  {
    id: '5',
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    phone: '+1 (555) 456-7890',
    company: 'Health Innovations',
    title: 'Research Director',
    cardScanned: 'Personal Card',
    dateAdded: '2023-05-01T13:10:00Z',
    lastInteraction: '2023-05-07T14:20:00Z',
    notes: 'Shared research interests in health tech.',
    tags: ['health', 'research']
  }
];

export default function ContactsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState(contactsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterCard, setFilterCard] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will prevent flash of content before redirect
  }

  // Filter contacts based on search term and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === '' || 
      contact.tags.includes(filterTag);
    
    const matchesCard = filterCard === '' || 
      contact.cardScanned === filterCard;
    
    return matchesSearch && matchesTag && matchesCard;
  });

  // Get all unique tags from contacts
  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)));
  
  // Get all unique card types from contacts
  const allCardTypes = Array.from(new Set(contacts.map(contact => contact.cardScanned)));

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle adding a new note to a contact
  const handleAddNote = () => {
    if (selectedContact && newNote.trim() !== '') {
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === selectedContact 
            ? { 
                ...contact, 
                notes: contact.notes + '\n' + newNote.trim(),
                lastInteraction: new Date().toISOString()
              }
            : contact
        )
      );
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  // Get the selected contact details
  const getSelectedContactDetails = () => {
    return contacts.find(contact => contact.id === selectedContact);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-mono">Contacts</h1>
            <p className="text-muted-foreground mt-1">Manage people who have scanned your digital cards</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white text-black rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Tags</option>
                {allTags.map((tag, index) => (
                  <option key={index} value={tag}>{tag}</option>
                ))}
              </select>
              <select
                value={filterCard}
                onChange={(e) => setFilterCard(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Cards</option>
                {allCardTypes.map((card, index) => (
                  <option key={index} value={card}>{card}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="lg:col-span-2">
            <div className="bg-white text-black rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map((contact) => (
                        <tr 
                          key={contact.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedContact === contact.id ? 'bg-gray-50' : ''}`}
                          onClick={() => setSelectedContact(contact.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {contact.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.company}</div>
                            <div className="text-sm text-gray-500">{contact.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              {contact.cardScanned}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contact.dateAdded)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-black hover:text-gray-700 mr-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Export contact logic would go here
                                alert(`Exporting ${contact.name}'s contact info`);
                              }}
                            >
                              Export
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                setContacts(contacts.filter(c => c.id !== contact.id));
                                if (selectedContact === contact.id) {
                                  setSelectedContact(null);
                                }
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No contacts found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <div className="bg-white text-black rounded-lg p-6 shadow-sm">
                {(() => {
                  const contact = getSelectedContactDetails();
                  if (!contact) return null;
                  
                  return (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold">{contact.name}</h2>
                        <div className="flex space-x-2">
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              // Edit contact logic would go here
                              alert(`Editing ${contact.name}`);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Email:</span> {contact.email}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Phone:</span> {contact.phone}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Company:</span> {contact.company}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Title:</span> {contact.title}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Interaction Details</h3>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Card Scanned:</span> {contact.cardScanned}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Date Added:</span> {formatDate(contact.dateAdded)}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Last Interaction:</span> {formatDate(contact.lastInteraction)}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                            <button 
                              className="text-xs text-black hover:underline"
                              onClick={() => setIsAddingNote(true)}
                            >
                              + Add Note
                            </button>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm whitespace-pre-line">{contact.notes}</p>
                            
                            {isAddingNote && (
                              <div className="mt-2 space-y-2">
                                <textarea
                                  value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}
                                  placeholder="Add a new note..."
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-[#A6A6A6] text-black"
                                  rows={3}
                                />
                                <div className="flex justify-end space-x-2">
                                  <button 
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                    onClick={() => {
                                      setIsAddingNote(false);
                                      setNewNote('');
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    className="text-xs bg-black text-white px-2 py-1 rounded"
                                    onClick={handleAddNote}
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {contact.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                            <button 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-300"
                              onClick={() => {
                                // Add tag logic would go here
                                alert('Adding new tag');
                              }}
                            >
                              + Add Tag
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white text-black rounded-lg p-6 shadow-sm text-center">
                <p className="text-gray-500">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Export All Contacts Button */}
        <div className="mt-8 flex justify-end">
          <Button 
            variant="outline"
            onClick={() => {
              // Export all contacts logic would go here
              alert('Exporting all contacts');
            }}
          >
            Export All Contacts
          </Button>
        </div>
      </div>
    </div>
  );
} 