'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

// Sample analytics data for demonstration
const analyticsData = {
  totalViews: 124,
  contactSaves: 18,
  websiteClicks: 37,
  socialClicks: 42,
  averageViewTime: '1m 24s',
  conversionRate: '14.5%',
  topLocations: [
    { name: 'New York', count: 32 },
    { name: 'San Francisco', count: 28 },
    { name: 'Chicago', count: 15 },
    { name: 'Miami', count: 12 },
    { name: 'Other', count: 37 }
  ],
  dailyViews: [
    { date: '2023-05-01', views: 4 },
    { date: '2023-05-02', views: 6 },
    { date: '2023-05-03', views: 8 },
    { date: '2023-05-04', views: 5 },
    { date: '2023-05-05', views: 12 },
    { date: '2023-05-06', views: 10 },
    { date: '2023-05-07', views: 7 },
    { date: '2023-05-08', views: 9 },
    { date: '2023-05-09', views: 11 },
    { date: '2023-05-10', views: 14 },
    { date: '2023-05-11', views: 16 },
    { date: '2023-05-12', views: 12 },
    { date: '2023-05-13', views: 10 }
  ],
  cardPerformance: [
    { 
      name: 'Personal Card', 
      views: 78, 
      saves: 12, 
      websiteClicks: 22, 
      socialClicks: 25 
    },
    { 
      name: 'Work Card', 
      views: 46, 
      saves: 6, 
      websiteClicks: 15, 
      socialClicks: 17 
    }
  ]
};

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCard, setSelectedCard] = useState('all');

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

  // Helper function to render a simple bar chart
  const renderBarChart = (data: { date: string; views: number }[]) => {
    const maxViews = Math.max(...data.map(item => item.views));
    
    return (
      <div className="flex items-end h-40 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-black rounded-t"
              style={{ height: `${(item.views / maxViews) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-mono">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track performance metrics for your digital cards</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white text-black rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold">Performance Overview</h2>
            <div className="flex flex-wrap gap-4">
              <div>
                <select
                  value={selectedCard}
                  onChange={(e) => setSelectedCard(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Cards</option>
                  <option value="personal">Personal Card</option>
                  <option value="work">Work Card</option>
                </select>
              </div>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm ${timeRange === '7d' ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button
                  className={`px-3 py-1 text-sm ${timeRange === '30d' ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
                <button
                  className={`px-3 py-1 text-sm ${timeRange === '90d' ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={() => setTimeRange('90d')}
                >
                  90D
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Views</h3>
            <p className="text-4xl font-bold">{analyticsData.totalViews}</p>
            <div className="mt-4 text-sm">
              <span className="text-green-600">↑ 12%</span>
              <span className="text-gray-500 ml-1">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Saves</h3>
            <p className="text-4xl font-bold">{analyticsData.contactSaves}</p>
            <div className="mt-4 text-sm">
              <span className="text-green-600">↑ 8%</span>
              <span className="text-gray-500 ml-1">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Website Clicks</h3>
            <p className="text-4xl font-bold">{analyticsData.websiteClicks}</p>
            <div className="mt-4 text-sm">
              <span className="text-green-600">↑ 15%</span>
              <span className="text-gray-500 ml-1">vs. previous period</span>
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Social Media Clicks</h3>
            <p className="text-4xl font-bold">{analyticsData.socialClicks}</p>
            <div className="mt-4 text-sm">
              <span className="text-green-600">↑ 20%</span>
              <span className="text-gray-500 ml-1">vs. previous period</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Over Time */}
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Views Over Time</h3>
            <div className="h-64">
              {renderBarChart(analyticsData.dailyViews)}
            </div>
          </div>
          
          {/* Locations */}
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Top Locations</h3>
            <div className="space-y-4">
              {analyticsData.topLocations.map((location, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm">{location.name}</p>
                    <p className="text-sm font-medium">{location.count} views</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full" 
                      style={{ width: `${(location.count / analyticsData.totalViews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Performance */}
        <div className="bg-white text-black rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-lg font-medium mb-4">Card Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saves</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website Clicks</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Clicks</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.cardPerformance.map((card, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.saves}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.websiteClicks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.socialClicks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {((card.saves / card.views) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Average View Time</h3>
            <p className="text-3xl font-bold">{analyticsData.averageViewTime}</p>
            <p className="text-sm text-gray-500 mt-2">Time spent viewing your cards</p>
          </div>
          
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold">{analyticsData.conversionRate}</p>
            <p className="text-sm text-gray-500 mt-2">Views that resulted in saves</p>
          </div>
          
          <div className="bg-white text-black rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Engagement Score</h3>
            <p className="text-3xl font-bold">8.4/10</p>
            <p className="text-sm text-gray-500 mt-2">Based on clicks and interaction</p>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Unlock Advanced Analytics</h2>
              <p className="text-gray-300 mb-4 md:mb-0">
                Upgrade to Glow Up for detailed insights, export capabilities, and real-time tracking.
              </p>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 