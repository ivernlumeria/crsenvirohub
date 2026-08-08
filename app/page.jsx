'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

const DocumentsHub = dynamic(() => import('@/components/DocumentsHub'), {
  ssr: false,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CRS Environmental Hub</h1>
            <p className="text-blue-100 mt-1">
              Permit Management & Environmental Compliance Dashboard
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded font-medium transition ${
                activeTab === 'map'
                  ? 'bg-white text-blue-800'
                  : 'bg-blue-700 text-white hover:bg-blue-600'
              }`}
            >
              🗺️ Map
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded font-medium transition ${
                activeTab === 'documents'
                  ? 'bg-white text-blue-800'
                  : 'bg-blue-700 text-white hover:bg-blue-600'
              }`}
            >
              📄 Documents
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'map' ? <InteractiveMap /> : <DocumentsHub />}
      </div>
    </div>
  );
}