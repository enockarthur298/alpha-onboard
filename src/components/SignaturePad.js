'use client';

import { useRef, useState } from 'react';

export default function SignaturePad({ onSave, onClear }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    setIsDrawing(true);
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    
    // Start a new path
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw line
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
    setHasSigned(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    if (onClear) onClear();
  };

  const handleSave = () => {
    if (!hasSigned) return;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSave) onSave(dataUrl);
  };

  // Set canvas size to match its display size
  const setCanvasSize = (element) => {
    if (!element) return;
    
    const canvas = element;
    const rect = canvas.getBoundingClientRect();
    
    // Set the canvas size to match its display size
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Restore the image data if it exists
      if (imageData) {
        ctx.putImageData(imageData, 0, 0);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 overflow-hidden">
        <canvas
          ref={(el) => {
            if (el) {
              canvasRef.current = el;
              setCanvasSize(el);
            }
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.preventDefault();
            startDrawing(e.touches[0]);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            draw(e.touches[0]);
          }}
          onTouchEnd={stopDrawing}
          className="w-full h-48 touch-none cursor-crosshair"
        />
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasSigned}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Signature
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasSigned}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
