'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Check, 
  FileText, 
  Upload, 
  PenLine,
  Clock,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

export default function OnboardingChecklistPage() {
  const { clientId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  // Mock data - in a real app, this would come from your API
  const [checklistData, setChecklistData] = useState({
    tasks: [
      {
        id: 'task-1',
        title: 'Complete Personal Information',
        description: 'Fill out your personal and company details',
        type: 'form',
        deadline: '2025-07-01',
        status: 'pending',
        formFields: [
          {
            id: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true,
            value: ''
          },
          {
            id: 'companyName',
            label: 'Company Name',
            type: 'text',
            required: true,
            value: ''
          },
          {
            id: 'phone',
            label: 'Phone Number',
            type: 'tel',
            required: true,
            value: ''
          }
        ]
      },
      {
        id: 'task-2',
        title: 'Upload Required Documents',
        description: 'Please upload the following documents',
        type: 'file_upload',
        deadline: '2025-07-05',
        status: 'pending',
        requiredFiles: [
          {
            id: 'business-license',
            name: 'Business License',
            description: 'A copy of your current business license',
            accepted: ['.pdf', '.jpg', '.png'],
            maxSize: 5 // MB
          },
          {
            id: 'tax-document',
            name: 'Tax Document',
            description: 'Your most recent tax document',
            accepted: ['.pdf'],
            maxSize: 5 // MB
          }
        ],
        uploadedFiles: []
      },
      {
        id: 'task-3',
        title: 'Sign Service Agreement',
        description: 'Review and sign the service agreement',
        type: 'signature',
        deadline: '2025-07-10',
        status: 'pending',
        document: {
          title: 'Service Agreement',
          url: '#',
          signature: null
        }
      },
      {
        id: 'task-4',
        title: 'Review Important Resources',
        description: 'Check these important links and resources',
        type: 'links',
        deadline: '2025-07-15',
        status: 'pending',
        links: [
          {
            id: 'link-1',
            title: 'Getting Started Guide',
            url: '#',
            isRequired: true,
            visited: false
          },
          {
            id: 'link-2',
            title: 'Terms of Service',
            url: '#',
            isRequired: true,
            visited: false
          }
        ]
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, fetch client and tasks data from your API
        // const response = await fetch(`/api/clients/${clientId}`);
        // const data = await response.json();
        
        setClient({
          id: clientId,
          name: 'John Doe',
          company: 'Acme Inc',
          email: 'john@acme.com'
        });
        
        setTasks(checklistData.tasks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clientId, checklistData.tasks]);

  useEffect(() => {
    // Calculate progress
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    setProgress(Math.round((completedTasks / totalTasks) * 100));
  }, [tasks]);

  const handleFormSubmit = async (taskId, formData) => {
    // In a real app, submit to your API
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed', formFields: formData }
        : task
    ));
  };

  const handleFileUpload = async (taskId, files) => {
    // In a real app, upload files to your storage
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, uploadedFiles: [...task.uploadedFiles, ...files] }
        : task
    ));
  };

  const handleSignature = async (taskId, signature) => {
    // In a real app, save signature and document
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed', document: { ...task.document, signature } }
        : task
    ));
  };

  const handleLinkVisit = async (taskId, linkId) => {
    // In a real app, track link visits
    setTasks(tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            links: task.links.map(link =>
              link.id === linkId
                ? { ...link, visited: true }
                : link
            )
          }
        : task
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Onboarding Checklist
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{progress}%</p>
            </div>
            <div className="w-64 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {task.status === 'completed' ? (
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Task Content based on type */}
              <div className="mt-6">
                {task.type === 'form' && (
                  <div className="space-y-4">
                    {task.formFields.map((field) => (
                      <div key={field.id}>
                        <label 
                          htmlFor={field.id}
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={field.value}
                          onChange={(e) => {
                            const updatedFields = task.formFields.map(f =>
                              f.id === field.id ? { ...f, value: e.target.value } : f
                            );
                            handleFormSubmit(task.id, updatedFields);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {task.type === 'file_upload' && (
                  <div className="space-y-4">
                    {task.requiredFiles.map((file) => (
                      <div 
                        key={file.id}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="mt-4 text-center">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </h4>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {file.description}
                          </p>
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Accepted formats: {file.accepted.join(', ')} (Max: {file.maxSize}MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept={file.accepted.join(',')}
                          onChange={(e) => handleFileUpload(task.id, Array.from(e.target.files))}
                          className="hidden"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {task.type === 'signature' && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.document.title}
                        </h4>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View Document
                        </button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                        <div className="flex items-center justify-center">
                          <PenLine className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                          Click here to sign document
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {task.type === 'links' && (
                  <div className="space-y-4">
                    {task.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkVisit(task.id, link.id)}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {link.title}
                            </p>
                            {link.isRequired && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Required reading
                              </p>
                            )}
                          </div>
                        </div>
                        {link.visited ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
