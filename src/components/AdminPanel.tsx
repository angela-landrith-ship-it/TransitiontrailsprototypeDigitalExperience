import { CheckCircle2, AlertCircle, Settings, Database, MessageSquare, RefreshCw } from 'lucide-react';

export function AdminPanel() {
  const integrations = [
    {
      id: 1,
      name: 'Replit',
      icon: '⚡',
      status: 'connected',
      lastSync: '5 minutes ago',
      description: 'Code execution and project hosting'
    },
    {
      id: 2,
      name: 'Slack',
      icon: '💬',
      status: 'connected',
      lastSync: '2 minutes ago',
      description: 'Team communication and notifications'
    },
    {
      id: 3,
      name: 'Pluralsight',
      icon: '📚',
      status: 'connected',
      lastSync: '1 hour ago',
      description: 'Learning content and skill assessments'
    },
    {
      id: 4,
      name: 'Salesforce',
      icon: '☁️',
      status: 'connected',
      lastSync: '10 minutes ago',
      description: 'CRM and learner record management'
    }
  ];

  const syncEvents = [
    { id: 1, event: 'User data synced from Salesforce', time: '10 min ago', status: 'success' },
    { id: 2, event: 'Pluralsight progress updated for 5 learners', time: '1 hour ago', status: 'success' },
    { id: 3, event: 'Slack notification sent to cohort', time: '2 hours ago', status: 'success' },
    { id: 4, event: 'Replit project created for new learner', time: '3 hours ago', status: 'success' },
    { id: 5, event: 'Assignment completion synced to Salesforce', time: '4 hours ago', status: 'success' },
  ];

  const cohorts = [
    { id: 1, name: 'Spring 2025 - Salesforce Admin', learners: 15, startDate: 'Jan 15, 2025', status: 'active' },
    { id: 2, name: 'Spring 2025 - Salesforce Developer', learners: 12, startDate: 'Jan 15, 2025', status: 'active' },
    { id: 3, name: 'Winter 2025 - Mixed Track', learners: 8, startDate: 'Dec 1, 2024', status: 'active' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">Admin Panel</h2>
        <p className="text-gray-600">System integrations, user management, and data sync</p>
      </div>

      {/* Integration Status Cards */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5 text-[#2C6975]" />
          <span>Integration Status</span>
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{integration.icon}</div>
                {integration.status === 'connected' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#3B6A52]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#F9A03F]" />
                )}
              </div>
              <h4 className="text-gray-900 mb-1">{integration.name}</h4>
              <p className="text-xs text-gray-500 mb-3">{integration.description}</p>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Last sync:</span>
                  <span className="text-xs text-gray-700">{integration.lastSync}</span>
                </div>
                <button className="w-full mt-3 flex items-center justify-center space-x-2 text-[#2C6975] text-sm hover:underline">
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cohort Management */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Active Cohorts</h3>
            <button className="bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors text-sm">
              Create Cohort
            </button>
          </div>
          <div className="space-y-3">
            {cohorts.map((cohort) => (
              <div key={cohort.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{cohort.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>{cohort.learners} learners</span>
                      </span>
                      <span>Started: {cohort.startDate}</span>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#3B6A52] text-white text-xs">
                    {cohort.status}
                  </span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-[#2C6975] hover:underline">View Details</button>
                  <span className="text-gray-300">•</span>
                  <button className="text-sm text-[#2C6975] hover:underline">Manage Users</button>
                  <span className="text-gray-300">•</span>
                  <button className="text-sm text-[#2C6975] hover:underline">Edit Settings</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">User Management</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-700">Add New Learner</span>
              <span className="text-[#2C6975]">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-700">Add Coach</span>
              <span className="text-[#2C6975]">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-700">Bulk Import Users</span>
              <span className="text-[#2C6975]">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-700">Role Permissions</span>
              <span className="text-[#2C6975]">→</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm text-gray-900 mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Learners</span>
                <span className="text-sm text-gray-900">35</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Coaches</span>
                <span className="text-sm text-gray-900">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Administrators</span>
                <span className="text-sm text-gray-900">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Event Log */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Data Sync Timeline</h3>
          <button className="text-sm text-[#2C6975] hover:underline">View All Logs</button>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
          <div className="space-y-4 relative">
            {syncEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4 pl-10 relative">
                <div className="absolute left-2.5 w-3 h-3 rounded-full bg-[#3B6A52] border-2 border-white"></div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">{event.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#3B6A52]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#2C6975]" />
            <span>System Settings</span>
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors text-left">
            <div className="text-2xl mb-2">🔐</div>
            <p className="text-sm text-gray-900 mb-1">API Keys</p>
            <p className="text-xs text-gray-500">Manage integration credentials</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors text-left">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-gray-900 mb-1">Reports</p>
            <p className="text-xs text-gray-500">Export data and analytics</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="text-sm text-gray-900 mb-1">General</p>
            <p className="text-xs text-gray-500">Portal configuration</p>
          </button>
        </div>
      </div>
    </div>
  );
}
