'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ClientWelcomePage() {
  const { flowId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [clientData, setClientData] = useState(null);
  const [flowData, setFlowData] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API call
        setFlowData({
          id: flowId,
          name: 'Website Redesign Project',
          welcomeMessage: 'Thank you for choosing our services! Please complete the onboarding process to get started.',
          logo: '/logo.png', // Path to logo or use a default
          primaryColor: '#3b82f6', // blue-500
        });
        
        setClientData({
          id: 'client-123',
          name: 'Alex Johnson',
          email: 'alex@example.com',
        });
        
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [flowId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!flowData || !clientData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Onboarding Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the requested onboarding flow. Please check the link and try again.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        {flowData.logo && (
          <div className="flex justify-center mb-6">
            <img 
              src={flowData.logo} 
              alt="Company Logo" 
              className="h-16 w-auto" 
            />
          </div>
        )}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
          Welcome, {clientData.name.split(' ')[0]}!
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {flowData.welcomeMessage}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {flowData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete the following steps to get started with your onboarding process.
            </p>
          </div>
          
          <div className="space-y-4 mb-10">
            {[
              'Complete your profile information',
              'Sign required documents',
              'Upload necessary files',
              'Review and submit your application'
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ready to get started?
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  This should take about 10 minutes to complete.
                </p>
              </div>
              <Link
                href={`/client/${flowId}/onboarding/${clientData.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                style={{ backgroundColor: flowData.primaryColor }}
              >
                Start Onboarding
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
