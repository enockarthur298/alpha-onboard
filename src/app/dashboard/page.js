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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to AlphaOnboard! 🎉
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's create your first onboarding flow to start managing clients efficiently.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 text-left">
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
        
        <Link 
          href="/dashboard/flows/new" 
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
        >
          Create New Onboarding Flow
          <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
        </Link>
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
    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-medium text-blue-600 dark:text-blue-400">
          {number}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
