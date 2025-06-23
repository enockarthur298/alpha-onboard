'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientWelcomePage() {
  const router = useRouter();
  const [client, setClient] = useState({
    id: 'client-123',
    name: 'John Doe',
    company: 'Acme Inc.',
    flowId: 'flow-abc',
    welcomeMessage: 'Welcome to our onboarding process! We\'re excited to work with you and make this process as smooth as possible. Please follow the steps to complete your onboarding.',
    serviceProvider: {
      name: 'Alpha Consulting',
      logo: '/logo.png'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch client data from API
    const fetchClientData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, you would fetch client data here
        // const response = await fetch(`/api/clients/${clientId}`);
        // const data = await response.json();
        // setClient(data);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching client data:', error);
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="flex items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
              Client Portal
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{client.name}</span>!
          </h1>
          
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0 h-12 w-12 bg-white dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center">
              {/* In a real app, this would be the service provider's logo */}
              <span className="text-xl font-bold text-blue-600">A</span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {client.serviceProvider.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your onboarding partner
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 mb-8 shadow-md">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {client.welcomeMessage}
            </p>
          </div>
          
          <Link 
            href={`/portal/onboarding/${client.id}`}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-5 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Onboarding
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What to Expect</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Complete forms with your information</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Upload required documents</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Sign necessary agreements</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Review important resources</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions or need assistance with your onboarding process, please don't hesitate to reach out.
          </p>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Contact Support
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
