'use client';

import React from 'react';

const Progress = () => {
  const tasks = [
    {
      id: 1,
      title: 'Environmental Impact Assessment - PE 32614',
      dueDate: '2025-03-15',
      progress: 85,
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Annual Compliance Report - PE 31452',
      dueDate: '2025-02-28',
      progress: 100,
      status: 'Completed',
      priority: 'High',
    },
    {
      id: 3,
      title: 'Site Inspection - PE 24047',
      dueDate: '2025-04-10',
      progress: 45,
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 4,
      title: 'Renewal Application - PE 19330',
      dueDate: '2025-04-10',
      progress: 20,
      status: 'Not Started',
      priority: 'Critical',
    },
    {
      id: 5,
      title: 'Baseline Study Update',
      dueDate: '2025-05-30',
      progress: 60,
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 6,
      title: 'Stakeholder Engagement Report',
      dueDate: '2025-06-15',
      progress: 35,
      status: 'In Progress',
      priority: 'Low',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 bg-red-50';
      case 'High':
        return 'text-orange-600 bg-orange-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Compliance Progress</h2>
        <p className="text-blue-100">Track all environmental compliance activities and deadlines</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-600">1</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-gray-600 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-blue-600">4</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-gray-600 text-sm">Not Started</p>
          <p className="text-3xl font-bold text-orange-600">1</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <p className="text-gray-600 text-sm">Overall Progress</p>
          <p className="text-3xl font-bold text-purple-600">52%</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
                <div className="flex gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-sm font-semibold text-gray-800">{task.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getProgressColor(task.progress)}`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Upcoming Deadlines</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-2 bg-orange-500 rounded-full" />
            <div className="flex-1 pb-4 border-b border-gray-200">
              <p className="font-semibold text-gray-800">Feb 28, 2025</p>
              <p className="text-gray-600 text-sm">Annual Compliance Report Due</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-orange-500 rounded-full" />
            <div className="flex-1 pb-4 border-b border-gray-200">
              <p className="font-semibold text-gray-800">Mar 15, 2025</p>
              <p className="text-gray-600 text-sm">Environmental Impact Assessment Due</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 bg-red-500 rounded-full" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Apr 10, 2025</p>
              <p className="text-gray-600 text-sm">Permit Renewal Application Deadline (PE 19330)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
