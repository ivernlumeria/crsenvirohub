'use client';

import React from 'react';

const Overview = () => {
  const permits = [
    {
      id: 'PE32614',
      name: 'PE 32614',
      status: 'Active',
      expiryDate: '2025-06-30',
      area: '2,450 hectares',
      color: '#FF6B6B',
    },
    {
      id: 'PE31452',
      name: 'PE 31452',
      status: 'Active',
      expiryDate: '2025-08-15',
      area: '1,850 hectares',
      color: '#4ECDC4',
    },
    {
      id: 'PE24047',
      name: 'PE 24047',
      status: 'Active',
      expiryDate: '2025-10-20',
      area: '3,100 hectares',
      color: '#45B7D1',
    },
    {
      id: 'PE19330',
      name: 'PE 19330',
      status: 'Pending Renewal',
      expiryDate: '2025-04-10',
      area: '1,620 hectares',
      color: '#FFA07A',
    },
  ];

  const stats = [
    {
      label: 'Active Permits',
      value: '4',
      icon: '📋',
      color: 'bg-green-50',
    },
    {
      label: 'Total Area',
      value: '9,020 ha',
      icon: '📍',
      color: 'bg-blue-50',
    },
    {
      label: 'Compliance Status',
      value: '95%',
      icon: '✅',
      color: 'bg-emerald-50',
    },
    {
      label: 'Pending Actions',
      value: '2',
      icon: '⚠️',
      color: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Environmental Compliance Dashboard</h2>
        <p className="text-green-100">Manage and monitor all permit boundaries and compliance activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Permits Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Permit Boundaries</h3>
          <p className="text-gray-500 text-sm mt-1">Active mining permits under management</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Permit ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Area</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Map</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {permits.map((permit) => (
                <tr key={permit.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: permit.color }}
                      />
                      <span className="font-semibold text-gray-800">{permit.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{permit.area}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        permit.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {permit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{permit.expiryDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition">
          📊 Generate Report
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition">
          📋 Download Permits
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition">
          📝 New Compliance Record
        </button>
      </div>
    </div>
  );
};

export default Overview;
