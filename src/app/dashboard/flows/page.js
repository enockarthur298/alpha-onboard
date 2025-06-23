'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, MoreHorizontal, FileText, Users, Clock, CheckCircle, Share2 } from 'lucide-react';

export default function FlowsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for onboarding flows
  const [flows, setFlows] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      status: 'active',
      clients: 5,
      tasks: 12,
      progress: 75,
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      name: 'Marketing Campaign',
      status: 'draft',
      clients: 0,
      tasks: 8,
      progress: 0,
      lastUpdated: '1 day ago',
    },
    {
      id: 3,
      name: 'Product Launch',
      status: 'completed',
      clients: 15,
      tasks: 20,
      progress: 100,
      lastUpdated: '1 week ago',
    },
  ]);

  const filteredFlows = flows.filter(flow =>
    flow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();

  const handleInviteClick = (e, flowId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/dashboard/flows/${flowId}/invite`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Onboarding Flows</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your client onboarding processes</p>
        </div>
        <Link
          href="/dashboard/flows/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          New Flow
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search flows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Sort
            </button>
          </div>
        </div>

        {filteredFlows.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No flows found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Get started by creating a new flow'}
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Link
                  href="/dashboard/flows/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus size={16} className="mr-2" />
                  New Flow
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="grid gap-4">
              {filteredFlows.map((flow) => (
                <div key={flow.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400">
                          {flow.name}
                        </h3>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                          flow.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : flow.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {flow.status.charAt(0).toUpperCase() + flow.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Users className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          {flow.clients} {flow.clients === 1 ? 'client' : 'clients'}
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          {flow.tasks} tasks
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          Updated {flow.lastUpdated}
                        </div>
                        <button 
                          onClick={(e) => handleInviteClick(e, flow.id)}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Share2 size={16} className="mr-1" />
                          Invite
                        </button>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Progress: {flow.progress}%
                          </span>
                          {flow.progress === 100 && (
                            <span className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Completed
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className={`h-2 rounded-full ${
                              flow.progress === 100 
                                ? 'bg-green-500' 
                                : flow.progress > 50 
                                ? 'bg-blue-500' 
                                : 'bg-yellow-500'
                            }`} 
                            style={{ width: `${flow.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      <button 
                        type="button" 
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                        <span className="sr-only">View options</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
