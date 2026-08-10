'use client';

import React, { useState } from 'react';

const Documents = () => {
  const [documents] = useState([
    {
      id: 1,
      name: 'Annual Compliance Report 2024',
      type: 'PDF',
      size: '2.4 MB',
      date: '2025-01-15',
      permit: 'PE 31452',
      category: 'Compliance',
    },
    {
      id: 2,
      name: 'Environmental Impact Assessment',
      type: 'PDF',
      size: '5.1 MB',
      date: '2025-01-10',
      permit: 'PE 32614',
      category: 'Assessment',
    },
    {
      id: 3,
      name: 'Permit Renewal Application',
      type: 'DOCX',
      size: '1.8 MB',
      date: '2025-01-08',
      permit: 'PE 19330',
      category: 'Application',
    },
    {
      id: 4,
      name: 'Baseline Study - Biodiversity',
      type: 'PDF',
      size: '3.2 MB',
      date: '2024-12-20',
      permit: 'PE 24047',
      category: 'Study',
    },
    {
      id: 5,
      name: 'Site Inspection Report',
      type: 'PDF',
      size: '1.5 MB',
      date: '2024-12-15',
      permit: 'PE 24047',
      category: 'Inspection',
    },
    {
      id: 6,
      name: 'Stakeholder Engagement Minutes',
      type: 'DOCX',
      size: '0.8 MB',
      date: '2024-12-10',
      permit: 'PE 32614',
      category: 'Correspondence',
    },
  ]);

  const getFileIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF':
        return '📄';
      case 'DOCX':
        return '📝';
      case 'XLS':
        return '📊';
      case 'IMG':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const categories = ['All', 'Compliance', 'Assessment', 'Application', 'Study', 'Inspection', 'Correspondence'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Documents</h2>
        <p className="text-orange-100">Manage compliance reports, permits, and correspondence</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-orange-500 transition">
        <p className="text-4xl mb-3">📤</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Documents</h3>
        <p className="text-gray-600 mb-4">Drag and drop your files here or click to select</p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold">
          Choose Files
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              cat === 'All'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-3xl">{getFileIcon(doc.type)}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">{doc.name}</h4>
                <div className="flex gap-3 mt-1 text-sm text-gray-500">
                  <span>{doc.permit}</span>
                  <span>•</span>
                  <span>{doc.category}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{doc.type}</p>
                <p className="text-xs text-gray-500">{doc.size}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  👁️
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  ⬇️
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  🔗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google Drive Link */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📁 More Documents</h3>
        <p className="text-blue-800 mb-4">Large files and photos are stored in our Google Drive folder</p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Open Google Drive Folder →
        </a>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Documents</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">6</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Size</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">14.8 MB</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Last Updated</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">2025-01-15</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Categories</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">6</p>
        </div>
      </div>
    </div>
  );
};

export default Documents;
