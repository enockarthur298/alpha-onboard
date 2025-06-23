'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, FileText, BarChart } from 'lucide-react';

export default function DashboardPage() {
  // State to track loading status and user flows
  const [isLoading, setIsLoading] = useState(true);
  const [hasFlows, setHasFlows] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch user flows from an API
    // For now, we'll simulate an API call
    const fetchUserFlows = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo purposes, let's randomly decide if user has flows
        // In production, this would be determined by actual API data
        // You can change this to true/false to test different views
        const userHasFlows = false; // Change to true to see DashboardMainView
        
        setHasFlows(userHasFlows);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching flows:', error);
        setIsLoading(false);
      }
    };

    fetchUserFlows();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Conditionally render based on whether the user has flows
  return hasFlows ? <DashboardMainView /> : <WelcomeScreen />;
}

function WelcomeScreen() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Content Column */}
          <div className="md:col-span-3 p-8 sm:p-12 lg:p-16">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                Getting Started
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AlphaOnboard</span>! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
              Let's create your first onboarding flow to start managing clients efficiently and professionally.
            </p>
            
            <Link 
              href="/dashboard/flows/new" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-5 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create New Onboarding Flow
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
          </div>
          
          {/* Visual Column with Decorative Elements */}
          <div className="hidden md:block md:col-span-2 relative bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/20"></div>
              <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-white/10"></div>
              <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/10"></div>
              <svg className="absolute bottom-0 right-0" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0Z" fill="white" fillOpacity="0.1"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Steps Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Three simple steps to get started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            number={1} 
            title="Create Flow" 
            description="Set up your custom onboarding process with our easy-to-use builder." 
          />
          <StepCard 
            number={2} 
            title="Invite Clients" 
            description="Send personalized invitations to your clients to start the process." 
          />
          <StepCard 
            number={3} 
            title="Track Progress" 
            description="Monitor your clients' progress and get notified when they complete tasks." 
          />
        </div>
      </div>
    </div>
  );
}

function DashboardMainView() {
  // Mock data for the dashboard
  const recentActivity = [
    { id: 1, client: 'Acme Corp', action: 'Completed onboarding', time: '2 hours ago', status: 'completed' },
    { id: 2, client: 'Globex Inc', action: 'Started onboarding', time: '1 day ago', status: 'in-progress' },
    { id: 3, client: 'Soylent Corp', action: 'Invitation sent', time: '2 days ago', status: 'pending' },
  ];

  const clientStatus = {
    total: 24,
    completed: 8,
    inProgress: 10,
    notStarted: 6
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Dashboard Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{clientStatus.total}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Clients</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{clientStatus.inProgress}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{clientStatus.completed}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : 
                      activity.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                      'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      {activity.status === 'completed' ? '✅' : activity.status === 'in-progress' ? '🔄' : '⏳'}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.client} <span className="text-gray-500">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-right">
            <a href="/dashboard/activity" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              View all activity
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link 
              href="/dashboard/flows/new"
              className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Create New Flow</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Set up a new onboarding process</p>
              </div>
            </Link>
            <Link 
              href="/dashboard/clients/invite"
              className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Invite New Client</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add a client to an existing flow</p>
              </div>
            </Link>
            <Link 
              href="/dashboard/analytics"
              className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">View Analytics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">See onboarding metrics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col items-start">
        <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-lg text-white mb-5 shadow-md">
          {number}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
