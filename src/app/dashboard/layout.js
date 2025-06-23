'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, FileText, Users, Settings, ChevronRight, LayoutTemplate } from 'lucide-react';
import './dashboard.css';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  // In a real app, you would check if the user is authenticated here
  // and redirect to login if not
  // useEffect(() => {
  //   const isAuthenticated = /* check auth status */;
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen fixed">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">AlphaOnboard</h1>
          </div>
          <nav className="mt-6">
            <NavItem 
              icon={<Home size={20} />} 
              text="Home" 
              href="/dashboard" 
              active={isActive('/dashboard')}
            />
            <NavItem 
              icon={<LayoutTemplate size={20} />} 
              text="Onboarding Flows" 
              href="/dashboard/flows" 
              active={pathname?.startsWith('/dashboard/flows')}
            />
            <NavItem 
              icon={<Users size={20} />} 
              text="Clients" 
              href="/dashboard/clients" 
              active={isActive('/dashboard/clients')}
            />
            <NavItem 
              icon={<Settings size={20} />} 
              text="Settings" 
              href="/dashboard/settings" 
              active={isActive('/dashboard/settings')}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, text, href, active = false }) {
  return (
    <Link href={href}>
      <div className={`flex items-center px-6 py-3 ${
        active 
          ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white' 
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      } transition-colors`}>
        <span className={`${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} mr-3`}>
          {icon}
        </span>
        <span className="font-medium">{text}</span>
        <ChevronRight size={16} className={`ml-auto ${active ? 'text-blue-400' : 'text-gray-400'}`} />
      </div>
    </Link>
  );
}
