'use client';

export default function ClientLayout({ children, params }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
