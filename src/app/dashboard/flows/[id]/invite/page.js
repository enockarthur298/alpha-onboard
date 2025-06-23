'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Mail, MessageSquare, Check, ArrowLeft, Share2 } from 'lucide-react';

export default function ClientInvitePage() {
  const router = useRouter();
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const [flow, setFlow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for the flow
  useEffect(() => {
    // In a real app, you would fetch the flow data based on the ID
    const fetchFlow = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setFlow({
          id,
          name: 'Website Redesign Onboarding',
          clientName: 'Acme Corp',
          inviteLink: `https://alphaonboard.app/join/${id}`,
          status: 'active',
          created: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error fetching flow:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlow();
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(flow?.inviteLink || '');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaEmail = () => {
    const subject = `Join ${flow?.name} on AlphaOnboard`;
    const body = `Hi there,\n\nI've created an onboarding flow for you on AlphaOnboard. Please click the link below to get started:\n\n${flow?.inviteLink}\n\nBest regards,\n[Your Name]`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    const text = `Hi there! I've created an onboarding flow for you on AlphaOnboard. Click here to get started: ${flow?.inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaMessenger = () => {
    const text = `Hi there! I've created an onboarding flow for you on AlphaOnboard. Click here to get started: ${flow?.inviteLink}`;
    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(flow?.inviteLink)}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!flow) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Flow not found</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The requested onboarding flow could not be found.</p>
        <button
          onClick={() => router.push('/dashboard/flows')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Flows
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invite Client: {flow.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Share the onboarding link with your client to get started
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="invite-link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Client Onboarding Link
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow">
                <input
                  type="text"
                  id="invite-link"
                  readOnly
                  value={flow.inviteLink}
                  className="block w-full rounded-l-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12"
                />
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Share this link with your client to start the onboarding process
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Share via</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <button
                onClick={shareViaEmail}
                className="relative flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Send invite via email</p>
                </div>
              </button>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="relative flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Copy Link</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Copy to clipboard</p>
                </div>
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareViaWhatsApp}
                className="relative flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share via WhatsApp</p>
                </div>
              </button>

              {/* Messenger */}
              <button
                onClick={shareViaMessenger}
                className="relative flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Messenger</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share via Messenger</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push(`/dashboard/flows/${id}`)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
