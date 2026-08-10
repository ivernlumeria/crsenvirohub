'use client';

import React from 'react';
import Link from 'next/link';

const Navigation = ({ activeTab }) => {
  const tabs = [
    { id: 'overview', label: '📊 Overview', href: '/?tab=overview' },
    { id: 'progress', label: '📈 Progress', href: '/?tab=progress' },
    { id: 'map', label: '🗺️ Map', href: '/?tab=map' },
    { id: 'documents', label: '📄 Documents', href: '/?tab=documents' },
    { id: 'gallery', label: '🖼️ Gallery', href: '/?tab=gallery' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">CRS Environmental Hub</h1>
              <p className="text-xs text-gray-500">Permit Management Dashboard</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="hidden md:flex gap-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
