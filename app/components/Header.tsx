'use client';

import { Search, Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark" />
            <input
              type="text"
              placeholder="Search projects, clients, or files..."
              className="w-full pl-10 pr-4 py-2 text-dark bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-stone-200">
            <div className="text-right">
              <p className="text-sm font-medium text-stone-800">John Smith</p>
              <p className="text-xs text-stone-600">Senior EPC Manager</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-third rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}