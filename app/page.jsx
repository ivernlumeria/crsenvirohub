'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Overview from '@/components/Overview';
import Progress from '@/components/Progress';
import Documents from '@/components/Documents';
import Gallery from '@/components/Gallery';
import dynamic from 'next/dynamic';

// Dynamic import for map to avoid SSR issues
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

function PageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get('tab') || 'overview';

  const renderContent = () => {
    switch (tab) {
      case 'overview':
        return <Overview />;
      case 'progress':
        return <Progress />;
      case 'map':
        return <InteractiveMap />;
      case 'documents':
        return <Documents />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={tab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === 'map' ? (
          renderContent()
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8">
            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">CRS Environmental Hub</h4>
              <p className="text-gray-600 text-sm">Environmental compliance management for Classic Real Stones S.A.R.L.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="?tab=overview" className="hover:text-green-600">Overview</a></li>
                <li><a href="?tab=map" className="hover:text-green-600">Map</a></li>
                <li><a href="?tab=documents" className="hover:text-green-600">Documents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
              <p className="text-gray-600 text-sm">
                📍 Madagascar<br />
                📧 office.rajaonary@gmail.com<br />
                📞 +261 (0) XXX XXX XXX
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 Classic Real Stones S.A.R.L. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
}
