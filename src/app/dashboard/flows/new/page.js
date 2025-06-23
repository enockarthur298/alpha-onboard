'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Plus, Upload, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function NewOnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    dueDate: '',
    enableReminders: true,
    enableClientReminders: true,
    logo: null,
    primaryColor: '#3b82f6',
    welcomeMessage: 'Welcome to our onboarding process!',
    tasks: [
      { id: 1, title: 'Complete company profile', completed: false },
      { id: 2, title: 'Upload required documents', completed: false },
      { id: 3, title: 'Sign service agreement', completed: false },
    ],
    forms: [],
    files: [],
    contracts: [],
  });
  const [newTask, setNewTask] = useState('');
  const [expandedSection, setExpandedSection] = useState('tasks');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: URL.createObjectURL(file)
      }));
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        { id: Date.now(), title: newTask, completed: false }
      ]
    }));
    setNewTask('');
  };

  const toggleTask = (taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitting onboarding flow:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Redirect to dashboard or success page
    router.push('/dashboard/flows');
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Add Tasks to Your Onboarding Flow</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter a task"
                  className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addTask}
                  className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-2 mt-4">
                {formData.tasks.map(task => (
                  <div key={task.id} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                    >
                      {task.completed && <Check size={14} className="text-white" />}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Add Forms and Documents</h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <button 
                  className="w-full p-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800"
                  onClick={() => toggleSection('forms')}
                >
                  <div className="flex items-center">
                    <FileText className="mr-2" size={20} />
                    <span>Add Form</span>
                  </div>
                  {expandedSection === 'forms' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'forms' && (
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-500 mb-4">Create a new form to collect information from clients</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      + Create New Form
                    </button>
                  </div>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <button 
                  className="w-full p-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800"
                  onClick={() => toggleSection('files')}
                >
                  <div className="flex items-center">
                    <Upload className="mr-2" size={20} />
                    <span>File Upload</span>
                  </div>
                  {expandedSection === 'files' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'files' && (
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-500 mb-4">Request files from your clients</p>
                    <label className="block">
                      <span className="sr-only">Choose files</span>
                      <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        onChange={(e) => handleFileUpload(e, 'fileUploads')}
                        multiple
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <button 
                  className="w-full p-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800"
                  onClick={() => toggleSection('contracts')}
                >
                  <div className="flex items-center">
                    <FileText className="mr-2" size={20} />
                    <span>Contract</span>
                  </div>
                  {expandedSection === 'contracts' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'contracts' && (
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-500 mb-4">Add a contract for clients to sign</p>
                    <div className="space-y-4">
                      <button className="w-full py-2 px-4 border border-dashed rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                        + Upload Contract
                      </button>
                      <div className="text-center text-sm text-gray-500">or</div>
                      <button className="w-full py-2 px-4 border border-dashed rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                        Generate with AI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Project Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Website Redesign Project"
                  required
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="enableReminders" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Automated Reminders
                  </label>
                  <p className="text-xs text-gray-500">Send automated reminders to clients</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="enableReminders"
                    name="enableReminders"
                    checked={formData.enableReminders}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="enableClientReminders" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Deadline Reminders
                  </label>
                  <p className="text-xs text-gray-500">Send reminders when deadlines are approaching</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="enableClientReminders"
                    name="enableClientReminders"
                    checked={formData.enableClientReminders}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Customize Branding</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                  {formData.logo ? (
                    <img 
                      src={formData.logo} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload size={32} />
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'logo')}
                    />
                    <span className="text-white text-sm font-medium">Upload Logo</span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">Recommended size: 512x512px</p>
              </div>

              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    {formData.primaryColor.toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Welcome Message
                </label>
                <textarea
                  id="welcomeMessage"
                  name="welcomeMessage"
                  value={formData.welcomeMessage}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a welcome message for your clients"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Onboarding Flow</h1>
        <p className="text-gray-600 dark:text-gray-400">Set up a new client onboarding process</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  currentStep >= step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                {step}
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {step === 1 ? 'Tasks' : step === 2 ? 'Forms' : step === 3 ? 'Settings' : 'Branding'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg border ${
            currentStep === 1 
              ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Back
        </button>
        
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Check className="mr-2" size={18} />
            Publish & Generate Client Link
          </button>
        )}
      </div>
    </div>
  );
}
