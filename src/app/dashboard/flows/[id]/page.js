'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  Edit, 
  Share2,
  Mail,
  MessageSquare,
  Copy,
  Check,
  Settings,
  Trash2
} from 'lucide-react';

export default function FlowDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [flow, setFlow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for the flow
  useEffect(() => {
    const fetchFlow = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setFlow({
          id,
          name: 'Website Redesign Onboarding',
          status: 'active',
          clients: 3,
          tasks: 12,
          completedTasks: 9,
          progress: 75,
          created: '2025-06-15T10:30:00Z',
          lastUpdated: '2025-06-19T14:45:00Z',
          description: 'Onboarding process for the new website redesign project with Acme Corp.',
          inviteLink: `https://alphaonboard.app/join/${id}`,
        });
      } catch (error) {
        console.error('Error fetching flow:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlow();
  }, [id]);

  const handleInviteClick = () => {
    router.push(`/dashboard/flows/${id}/invite`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this flow? This action cannot be undone.')) {
      // Simulate delete API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/flows');
    }
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
        <Link
          href="/dashboard/flows"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Flows
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{flow.name}</h1>
            <span className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${
              flow.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : flow.status === 'completed'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {flow.status.charAt(0).toUpperCase() + flow.status.slice(1)}
            </span>
          </div>
          <p className="ml-9 text-gray-600 dark:text-gray-400">{flow.description}</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={handleInviteClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Invite Client
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Tasks completed</span>
                <span className="font-medium">{flow.completedTasks} of {flow.tasks}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${flow.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Active clients</span>
                </div>
                <span className="font-medium">{flow.clients}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Last updated</span>
                </div>
                <span className="font-medium">
                  {new Date(flow.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={handleInviteClick}
              className="w-full flex items-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Invite Client</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Share the onboarding link</p>
              </div>
            </button>

            <button className="w-full flex items-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Send Message</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Notify all clients</p>
              </div>
            </button>

            <button className="w-full flex items-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Settings className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Flow Settings</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure automation & rules</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Task completed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client signed the contract</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item} hour{item !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              View all activity
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Once you delete this flow, there is no going back. Please be certain.
          </p>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 text-right">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete this flow
          </button>
        </div>
      </div>
    </div>
  );
}
