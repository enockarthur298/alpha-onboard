'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import '../globals.css';

export default function PortalLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // In a real app, you would check if the client is authenticated here
  // and redirect to login if not
  // useEffect(() => {
  //   const isAuthenticated = /* check auth status */;
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/portal/welcome" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                AlphaOnboard
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Portal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AlphaOnboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
