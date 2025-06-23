'use client';

import { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronDown, 
  FileText, 
  Link as LinkIcon, 
  PenLine,
  CheckCircle2,
  Loader2,
  X,
  Upload,
  UserCog,
  MessageSquare,
  ListChecks,
  SkipForward,
  RefreshCw,
  Send
} from 'lucide-react';
import ServiceProviderPanel from '@/components/ServiceProviderPanel';
import { useParams, useRouter } from 'next/navigation';
import SignaturePad from '@/components/SignaturePad';
import FileUpload from '@/components/FileUpload';

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ClientOnboardingPage() {
  const { flowId, clientId } = useParams();
  const router = useRouter();
  
  // Service provider panel state
  const [showServicePanel, setShowServicePanel] = useState(false);
  const [servicePanelTab, setServicePanelTab] = useState('overview');
  const [clientMessage, setClientMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  
  // Toggle service provider panel
  const toggleServicePanel = (tab = 'overview') => {
    setServicePanelTab(tab);
    setShowServicePanel(!showServicePanel);
  };
  
  // Handle sending a message to the client
  const handleSendMessage = (clientId, message) => {
    // In a real app, this would send a message to the client via API
    const newMessage = {
      id: Date.now(),
      sender: 'service-provider',
      content: message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessageHistory([...messageHistory, newMessage]);
    // Show success message or update UI
  };
  
  // Handle task reordering
  const handleTaskReorder = (newTaskOrder) => {
    // In a real app, this would update the task order via API
    setTasks(newTaskOrder);
    // Show success message
  };
  
  // Handle skipping a task
  const handleSkipTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'skipped', completed: true }
        : task
    ));
    // Show success message
  };
  
  // Handle reassigning a task
  const handleReassignTask = (taskId) => {
    // In a real app, this would reassign the task to another team member
    console.log(`Reassigning task ${taskId}`);
    // Show success message
  };
  
  // Mock client data - in a real app, this would come from an API
  const [client, setClient] = useState({
    id: clientId,
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    status: 'in_progress',
    progress: 30,
  });
  
  // State for form data and UI
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock tasks data - replace with API call
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Complete Personal Information',
      description: 'Fill out your personal details and contact information.',
      type: 'form',
      completed: true,
      expanded: false,
      formFields: [
        { 
          id: 'fullName', 
          label: 'Full Name', 
          type: 'text', 
          value: 'John Doe', 
          required: true,
          placeholder: 'Enter your full name'
        },
        { 
          id: 'email', 
          label: 'Email', 
          type: 'email', 
          value: 'john@example.com', 
          required: true,
          placeholder: 'Enter your email address'
        },
        { 
          id: 'phone', 
          label: 'Phone Number', 
          type: 'tel', 
          value: '', 
          required: false,
          placeholder: 'Enter your phone number'
        },
      ]
    },
    {
      id: 'task-2',
      title: 'Upload Required Documents',
      description: 'Upload the required identification documents (ID, proof of address, etc.)',
      type: 'file_upload',
      completed: false,
      expanded: true,
      acceptedFileTypes: 'image/*,.pdf,.doc,.docx',
      maxFileSize: 10, // MB
      files: []
    },
    {
      id: 'task-3',
      title: 'Sign Service Agreement',
      description: 'Review and sign the service agreement to proceed.',
      type: 'signature',
      completed: false,
      expanded: false,
      signature: null
    },
    {
      id: 'task-4',
      title: 'Review Resources',
      description: 'Check out these helpful resources to get started with our platform.',
      type: 'link',
      completed: false,
      expanded: false,
      links: [
        { 
          id: 'link-1', 
          title: 'Getting Started Guide', 
          url: '#',
          description: 'Learn how to make the most of our platform'
        },
        { 
          id: 'link-2', 
          title: 'FAQ', 
          url: '#',
          description: 'Find answers to common questions'
        },
        { 
          id: 'link-3', 
          title: 'Contact Support', 
          url: '#',
          description: 'Get help from our support team'
        },
      ]
    }
  ]);

  useEffect(() => {
    // Calculate progress based on completed tasks
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    setProgress(Math.round((completedTasks / totalTasks) * 100) || 0);
    setIsLoading(false);
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock tasks data - in a real app, this would come from an API
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        setProgress(Math.round((completedTasks / totalTasks) * 100) || 0);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, expanded: !task.expanded } 
        : { ...task, expanded: false }
    ));
  };
  
  const toggleTaskCompletion = (taskId, completed) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed, expanded: !completed } 
        : task
    ));
    
    // In a real app, you would update the task status via an API
    // updateTaskStatus(flowId, clientId, taskId, completed);
  };

  const updateFormField = (taskId, fieldId, value) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            formFields: task.formFields.map(field =>
              field.id === fieldId ? { ...field, value } : field
            )
          }
        : task
    ));
  };

  const handleSignatureSave = (taskId, signature) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, signature, completed: true } 
        : task
    ));
    
    setSuccess('Signature saved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleFileUpload = (taskId, files) => {
    try {
      // In a real app, you would upload files to a server here
      console.log('Uploading files for task:', taskId, files);
      
      // Update task with uploaded files
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              files: [...(task.files || []), ...files],
              completed: files.length > 0 // Mark as completed if files are uploaded
            } 
          : task
      ));
      
      // Update form data with file information
      setFormData(prev => ({
        ...prev,
        [`${taskId}_files`]: files
      }));
      
      setSuccess('Files uploaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to upload files. Please try again.');
      setTimeout(() => setError(''), 5000);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { text: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'in-progress': { text: 'In Progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'not-started': { text: 'Not Started', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
    };
    
    const { text, color } = statusMap[status] || statusMap['not-started'];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {text}
      </span>
    );
  };

  const getTaskIcon = (type) => {
    const iconMap = {
      'form': <FileText className="h-5 w-5 text-blue-500" />,
      'file': <Upload className="h-5 w-5 text-green-500" />,
      'signature': <PenLine className="h-5 w-5 text-purple-500" />,
      'link': <LinkIcon className="h-5 w-5 text-orange-500" />
    };
    
    return iconMap[type] || <FileText className="h-5 w-5 text-gray-400" />;
  };

  const renderTaskContent = (task) => {
    if (!task.expanded) return null;
    
    switch (task.type) {
      case 'form':
        return (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            {task.formFields.map((field) => (
              <div key={field.id} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {field.description}
                  </p>
                )}
                <input
                  type={field.type}
                  value={field.value || ''}
                  onChange={(e) => updateFormField(task.id, field.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  // In a real app, you would save the form data
                  const allFieldsFilled = task.formFields.every(
                    field => !field.required || (field.value && field.value.trim() !== '')
                  );
                  
                  if (allFieldsFilled) {
                    toggleTaskCompletion(task.id, true);
                    setSuccess('Information saved successfully');
                    setTimeout(() => setSuccess(''), 3000);
                  } else {
                    setError('Please fill in all required fields');
                    setTimeout(() => setError(''), 3000);
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Information
              </button>
            </div>
          </div>
        );
        
      case 'file_upload':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please upload the required documents. Accepted formats: {task.acceptedFileTypes} (max {task.maxFileSize}MB)
            </p>
            
            <FileUpload 
              accept={task.acceptedFileTypes}
              maxSize={task.maxFileSize}
              onUpload={(files) => handleFileUpload(task.id, files)}
              onError={(error) => setError(error)}
            />
            
            {task.files && task.files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uploaded Files
                </h4>
                <ul className="space-y-2">
                  {task.files.map((file, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center min-w-0">
                        <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        <div className="ml-3 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          // In a real app, you would handle file removal
                          setTasks(tasks.map(t => 
                            t.id === task.id 
                              ? { 
                                  ...t, 
                                  files: t.files.filter((_, i) => i !== index),
                                  completed: t.files.length > 1 // Keep completed if there are still files
                                } 
                              : t
                          ));
                        }}
                        className="ml-4 flex-shrink-0 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
                {task.files.length > 0 && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => toggleTaskCompletion(task.id, true)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 'signature':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please sign in the box below. Click "Save Signature" when done.
            </p>
            
            <SignaturePad 
              onSave={(signature) => handleSignatureSave(task.id, signature)}
              onClear={() => {
                setTasks(tasks.map(t => 
                  t.id === task.id 
                    ? { ...t, signature: null, completed: false } 
                    : t
                ));
              }}
            />
            
            {success && task.signature && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-300">
                  {success}
                </p>
              </div>
            )}
          </div>
        );
        
      case 'link':
        return (
          <div className="mt-4">
            <ul className="space-y-3">
              {task.links.map(link => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                        <LinkIcon className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-auto flex-shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => toggleTaskCompletion(task.id, true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Mark as Reviewed
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === activeTab);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
      {/* Service Provider Panel Toggle */}
      <button
        onClick={() => toggleServicePanel()}
        className="fixed right-6 bottom-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-10"
      >
        <UserCog className="h-5 w-5 mr-2" />
        Service Panel
      </button>
      
      {/* Service Provider Panel */}
      {showServicePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl h-full overflow-y-auto">
            <ServiceProviderPanel 
              clientId={clientId}
              tasks={tasks}
              onReassignTask={handleReassignTask}
              onMessageClient={handleSendMessage}
              onTaskReorder={handleTaskReorder}
              onSkipTask={handleSkipTask}
            />
          </div>
        </div>
      )}
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
      >
        <ChevronDown className="h-4 w-4 mr-1 transform rotate-90" />
        Back to welcome
      </button>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Onboarding Progress
          </h2>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {progress}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'all'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setActiveTab('in-progress')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'in-progress'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'completed'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Tasks list */}
      <div className="space-y-4">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        )}
        
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 ${
              task.expanded ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
            }`}
          >
            <div 
              className={`px-6 py-4 cursor-pointer transition-colors ${
                task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div 
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                    }`}
                  >
                    {task.completed && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-base font-medium ${
                      task.completed 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center">
                      {task.completed && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 mr-3">
                          Completed
                        </span>
                      )}
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          task.expanded ? 'transform rotate-180' : ''
                        }`} 
                        aria-hidden="true" 
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Task content */}
            {task.expanded && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                {renderTaskContent(task)}
              </div>
            )}
          </div>
        ))}
      </div>
        
      {/* Completion message */}
      {progress === 100 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-100 dark:border-blue-800/50 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Onboarding Complete!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You've successfully completed all the onboarding tasks. Our team will review your information and get back to you shortly.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}