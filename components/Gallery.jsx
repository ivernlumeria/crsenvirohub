'use client';

import React from 'react';

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Mining Site - PE 32614 Aerial View',
      permit: 'PE 32614',
      date: '2025-01-15',
      type: 'Aerial Survey',
      thumbnail: '🛰️',
    },
    {
      id: 2,
      title: 'Vegetation Survey - PE 31452',
      permit: 'PE 31452',
      date: '2025-01-14',
      type: 'Environmental',
      thumbnail: '🌱',
    },
    {
      id: 3,
      title: 'Site Infrastructure - PE 24047',
      permit: 'PE 24047',
      date: '2025-01-13',
      type: 'Infrastructure',
      thumbnail: '🏗️',
    },
    {
      id: 4,
      title: 'Water Quality Testing - PE 19330',
      permit: 'PE 19330',
      date: '2025-01-12',
      type: 'Environmental',
      thumbnail: '💧',
    },
    {
      id: 5,
      title: 'Biodiversity Assessment - PE 32614',
      permit: 'PE 32614',
      date: '2025-01-10',
      type: 'Assessment',
      thumbnail: '🦗',
    },
    {
      id: 6,
      title: 'Stakeholder Meeting - PE 31452',
      permit: 'PE 31452',
      date: '2025-01-08',
      type: 'Documentation',
      thumbnail: '👥',
    },
    {
      id: 7,
      title: 'Site Boundary Markers - PE 24047',
      permit: 'PE 24047',
      date: '2025-01-05',
      type: 'Documentation',
      thumbnail: '🚩',
    },
    {
      id: 8,
      title: 'Environmental Monitoring - PE 19330',
      permit: 'PE 19330',
      date: '2024-12-30',
      type: 'Monitoring',
      thumbnail: '📊',
    },
    {
      id: 9,
      title: 'Reclamation Progress - PE 32614',
      permit: 'PE 32614',
      date: '2024-12-25',
      type: 'Reclamation',
      thumbnail: '🌿',
    },
  ];

  const types = ['All', 'Aerial Survey', 'Environmental', 'Infrastructure', 'Assessment', 'Documentation', 'Monitoring'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Photo Gallery</h2>
        <p className="text-purple-100">Site photos, aerial surveys, and environmental monitoring imagery</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {types.map((type, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              type === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer"
          >
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-6xl">
              {item.thumbnail}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{item.permit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  {item.type}
                </span>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition">
                    👁️
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition">
                    ⬇️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload New Photos */}
      <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition">
        <p className="text-4xl mb-3">📸</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Photos</h3>
        <p className="text-gray-600 mb-4">Add new site photos, surveys, or monitoring imagery</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition">
          Upload Photos
        </button>
      </div>

      {/* Gallery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
          <p className="text-3xl mb-2">📸</p>
          <p className="text-gray-600 text-sm">Total Photos</p>
          <p className="text-2xl font-bold text-gray-800">9</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-gray-600 text-sm">Photo Types</p>
          <p className="text-2xl font-bold text-gray-800">6</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
          <p className="text-3xl mb-2">🗓️</p>
          <p className="text-gray-600 text-sm">Latest Update</p>
          <p className="text-2xl font-bold text-gray-800">Jan 15</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
          <p className="text-3xl mb-2">📍</p>
          <p className="text-gray-600 text-sm">Permits Documented</p>
          <p className="text-2xl font-bold text-gray-800">4</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
