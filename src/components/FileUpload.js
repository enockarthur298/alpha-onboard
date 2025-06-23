'use client';

import { useState, useCallback } from 'react';
import { Upload, X, FileText, Loader2, CheckCircle2 } from 'lucide-react';

export default function FileUpload({ 
  accept = '*', 
  maxSize = 5, // in MB
  multiple = true,
  onUpload,
  onError
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file) => {
    // Check file size (convert MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      if (onError) {
        onError(`File size exceeds ${maxSize}MB`);
      }
      return false;
    }

    // Check file type if accept is specified
    if (accept !== '*' && accept.split(',').every(ext => !file.name.toLowerCase().endsWith(ext.trim().toLowerCase()))) {
      if (onError) {
        onError(`Invalid file type. Accepted types: ${accept}`);
      }
      return false;
    }

    return true;
  };

  const handleFiles = useCallback((fileList) => {
    const newFiles = [];
    
    // Convert FileList to array and validate each file
    Array.from(fileList).forEach(file => {
      if (validateFile(file)) {
        newFiles.push({
          file,
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          progress: 0
        });
      }
    });

    if (newFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Auto-upload files
      if (onUpload) {
        uploadFiles(newFiles);
      }
    }
  }, [onUpload, onError, accept, maxSize]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset the input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const removeFile = (id) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadFiles = async (filesToUpload) => {
    setIsUploading(true);
    
    try {
      // Simulate file upload progress
      for (const file of filesToUpload) {
        await new Promise((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
              clearInterval(interval);
              
              // Update file status to uploaded
              setFiles(prevFiles => 
                prevFiles.map(f => 
                  f.id === file.id 
                    ? { ...f, status: 'uploaded', progress: 100 }
                    : f
                )
              );
              
              resolve();
            } else {
              // Update progress
              setFiles(prevFiles => 
                prevFiles.map(f => 
                  f.id === file.id 
                    ? { ...f, progress: Math.min(progress, 100) }
                    : f
                )
              );
              setUploadProgress(progress);
            }
          }, 100);
        });
      }
      
      if (onUpload) {
        onUpload(filesToUpload);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      if (onError) {
        onError('Failed to upload files. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-dashed rounded-lg transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex text-sm text-gray-600 dark:text-gray-300 justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                multiple={multiple}
                accept={accept}
                onChange={handleFileInput}
                disabled={isUploading}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept !== '*' ? `Supports ${accept}` : 'Any file type'} up to {maxSize}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {isUploading ? 'Uploading...' : 'Selected files'}
          </h4>
          <ul className="space-y-2">
            {files.map((file) => (
              <li 
                key={file.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0 p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatFileSize(file.size)}</span>
                      {file.status === 'uploading' && (
                        <span className="mx-2">•</span>
                      )}
                      {file.status === 'uploading' && (
                        <span>Uploading...</span>
                      )}
                      {file.status === 'uploaded' && (
                        <span className="inline-flex items-center text-green-600 dark:text-green-400 ml-2">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center ml-4">
                  {file.status === 'uploading' && (
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="ml-3 p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    disabled={file.status === 'uploading'}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
