'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, MessageSquare, ListChecks, SkipForward, RefreshCw, Send } from 'lucide-react';

export default function ServiceProviderPanel({ clientId, tasks, onReassignTask, onMessageClient, onTaskReorder, onSkipTask }) {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate metrics
  const completedTasks = tasks?.filter(task => task.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Find potential bottlenecks (tasks not completed that are blocking others)
  const bottlenecks = tasks?.filter(task => !task.completed && task.blocksOtherTasks) || [];
  
  // Get recent activity
  const recentActivity = [
    { id: 1, type: 'task_completed', taskId: 'task-1', timestamp: '2023-06-20T10:30:00Z' },
    { id: 2, type: 'document_uploaded', taskId: 'task-2', timestamp: '2023-06-20T09:15:00Z' },
    { id: 3, type: 'signature_required', taskId: 'task-3', timestamp: '2023-06-19T16:45:00Z' },
  ];

  // Simulate fetching client data
  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setClient({
          id: clientId,
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Acme Inc',
          status: 'in_progress',
          lastActive: '2023-06-20T10:45:00Z'
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    onMessageClient(clientId, message);
    setMessage('');
    // Show success message or update UI
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="animate-spin h-6 w-6 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {client?.name}'s Onboarding
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {client?.company} • {client?.email}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'tasks'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'messages'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Messages
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Progress Overview</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {completedTasks} of {totalTasks} tasks completed ({completionRate}%)
              </p>
            </div>

            {/* Bottlenecks */}
            {bottlenecks.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Potential Bottlenecks
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <ul className="list-disc pl-5 space-y-1">
                        {bottlenecks.map(task => (
                          <li key={task.id}>
                            {task.title} is blocking other tasks
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {activity.type === 'task_completed' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {activity.type === 'document_uploaded' && (
                        <Upload className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.type === 'signature_required' && (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.type === 'task_completed' && 'Task completed'}
                        {activity.type === 'document_uploaded' && 'Document uploaded'}
                        {activity.type === 'signature_required' && 'Signature required'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Tasks</h3>
              <button
                onClick={() => onTaskReorder(tasks)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ListChecks className="-ml-0.5 mr-2 h-4 w-4" />
                Reorder Tasks
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {tasks.map((task) => (
                  <li key={task.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center mr-3 ${
                          task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {task.completed && (
                            <CheckCircle className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            task.completed 
                              ? 'text-gray-500 dark:text-gray-400 line-through' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {task.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!task.completed && (
                          <button
                            onClick={() => onSkipTask(task.id)}
                            className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                            title="Skip task"
                          >
                            <SkipForward className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onReassignTask(task.id)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          title="Reassign task"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Send Message</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="-ml-0.5 mr-2 h-4 w-4" />
                Send
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Message History</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No messages yet. Send a message to start the conversation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
