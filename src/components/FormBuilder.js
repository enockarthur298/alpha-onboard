'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';

export default function FormBuilder({ 
  fields: initialFields = [], 
  onSubmit, 
  onCancel,
  readOnly = false,
  defaultValues = {}
}) {
  const [fields, setFields] = useState(initialFields);
  const [activeField, setActiveField] = useState(null);
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({
    type: 'text',
    label: '',
    required: true,
    placeholder: '',
    options: [],
    description: ''
  });

  const { 
    control, 
    handleSubmit, 
    register, 
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({ defaultValues });

  // Watch all form values
  const formValues = watch();

  // Update form values when defaultValues change
  useEffect(() => {
    if (Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Number' },
    { value: 'tel', label: 'Phone' },
    { value: 'date', label: 'Date' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'file', label: 'File Upload' },
  ];

  const addField = () => {
    if (!newField.label) return;
    
    const fieldId = `field-${Date.now()}`;
    const field = {
      id: fieldId,
      ...newField,
      options: newField.type === 'select' || newField.type === 'radio' || newField.type === 'checkbox' 
        ? newField.options || [] 
        : undefined
    };
    
    setFields([...fields, field]);
    setNewField({
      type: 'text',
      label: '',
      required: true,
      placeholder: '',
      options: [],
      description: ''
    });
    setIsAddingField(false);
    setActiveField(fieldId);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
    if (activeField === id) {
      setActiveField(null);
    }
  };

  const moveField = (fromIndex, toIndex) => {
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFields(newFields);
  };

  const renderFieldInputs = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
        return (
          <input
            type={field.type}
            id={field.id}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : ''
            }`}
            placeholder={field.placeholder}
            disabled={readOnly}
            {...register(field.id, { 
              required: field.required ? 'This field is required' : false
            })}
          />
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            rows={3}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : ''
            }`}
            placeholder={field.placeholder}
            disabled={readOnly}
            {...register(field.id, { 
              required: field.required ? 'This field is required' : false
            })}
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors[field.id] ? 'border-red-500' : ''
            }`}
            disabled={readOnly}
            {...register(field.id, { 
              required: field.required ? 'This field is required' : false
            })}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2 mt-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  id={`${field.id}-${index}`}
                  type="radio"
                  value={option}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={readOnly}
                  {...register(field.id, { 
                    required: field.required ? 'This field is required' : false
                  })}
                />
                <label 
                  htmlFor={`${field.id}-${index}`} 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2 mt-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  id={`${field.id}-${index}`}
                  type="checkbox"
                  value={option}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={readOnly}
                  {...register(`${field.id}.${index}`)}
                />
                <label 
                  htmlFor={`${field.id}-${index}`} 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case 'file':
        return (
          <div className="mt-1">
            <FileUpload 
              accept={field.accept || '*'} 
              maxSize={field.maxSize || 5}
              onUpload={(files) => {
                setValue(field.id, files);
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderFieldPreview = (field, index) => {
    return (
      <div 
        key={field.id}
        className={`border rounded-md p-4 mb-4 ${
          activeField === field.id 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
        }`}
        onClick={() => setActiveField(field.id)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center">
              {!readOnly && (
                <button 
                  type="button" 
                  className="mr-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    // Handle drag start
                  }}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              )}
              <div>
                <label 
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {field.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-2">
              {renderFieldInputs(field)}
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors[field.id].message}
                </p>
              )}
            </div>
          </div>
          
          {!readOnly && (
            <div className="ml-2 flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {!readOnly && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          {isAddingField ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Field Type
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Full Name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={newField.description}
                  onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Help text or instructions"
                />
              </div>
              
              {(newField.type === 'select' || newField.type === 'radio' || newField.type === 'checkbox') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Options (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={newField.options?.join('\n') || ''}
                    onChange={(e) => {
                      const options = e.target.value.split('\n').filter(option => option.trim() !== '');
                      setNewField({ ...newField, options });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Option 1\nOption 2\nOption 3"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id={`required-${newField.id}`}
                    type="checkbox"
                    checked={newField.required}
                    onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`required-${newField.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Required
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingField(false)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addField}
                    disabled={!newField.label}
                    className={`px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      newField.label 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-300 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Add Field
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingField(true)}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </button>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {fields.length > 0 ? (
          fields.map((field, index) => renderFieldPreview(field, index))
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No fields added yet. {!readOnly && 'Click "Add Field" to get started.'}
            </p>
          </div>
        )}
      </div>
      
      {!readOnly && fields.length > 0 && (
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Form
          </button>
        </div>
      )}
    </div>
  );
}
