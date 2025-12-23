'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Gift, 
  ChevronRight,
  SquareCheckBigIcon
} from 'lucide-react';
import Image from 'next/image';
import { getAssetPath } from '../lib/config';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Benefits & Rewards', href: '/rewards', icon: Gift },
    { name: 'Service Center', href: '/services', icon: SquareCheckBigIcon },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-stone-200 z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-stone-200">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <Image 
              src={getAssetPath('/Standard Icon.svg')}
              width={36}
              height={36}
              alt='logo'
              />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800">Phoenix One</h1>
            <p className="text-sm text-stone-600">EPC Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 shadow-sm'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-600' : 'text-stone-500'}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              <ChevronRight 
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-amber-600 scale-110' : 'text-stone-400 group-hover:translate-x-1'
                }`} 
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-stone-700">System Online</span>
          </div>
          <p className="text-xs text-stone-600">All systems operational</p>
        </div>
      </div>
    </div>
  );
}