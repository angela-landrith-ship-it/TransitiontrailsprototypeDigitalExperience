import { Users, TrendingUp, Send, ExternalLink, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function CoachDashboard() {
  const learners = [
    { id: 1, name: 'Alex Johnson', program: 'Salesforce Admin', progress: 68, lastActive: '2 hours ago', status: 'on-track' },
    { id: 2, name: 'Sam Chen', program: 'Salesforce Developer', progress: 82, lastActive: '1 day ago', status: 'on-track' },
    { id: 3, name: 'Jordan Kim', program: 'Salesforce Admin', progress: 45, lastActive: '5 hours ago', status: 'needs-support' },
    { id: 4, name: 'Taylor Brooks', program: 'Salesforce Admin', progress: 91, lastActive: '30 min ago', status: 'excelling' },
    { id: 5, name: 'Morgan Lee', program: 'Salesforce Developer', progress: 55, lastActive: '3 days ago', status: 'at-risk' },
  ];

  const cohortData = [
    { week: 'Week 1', avgProgress: 20, engagement: 95 },
    { week: 'Week 2', avgProgress: 35, engagement: 90 },
    { week: 'Week 3', avgProgress: 52, engagement: 88 },
    { week: 'Week 4', avgProgress: 68, engagement: 92 },
  ];

  const assignmentData = [
    { assignment: 'Module 1', completed: 18, pending: 2 },
    { assignment: 'Module 2', completed: 15, pending: 5 },
    { assignment: 'Module 3', completed: 12, pending: 8 },
    { assignment: 'Capstone', completed: 5, pending: 15 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelling': return 'bg-[#3B6A52]';
      case 'on-track': return 'bg-[#7EB5C1]';
      case 'needs-support': return 'bg-[#F9A03F]';
      case 'at-risk': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excelling': return 'Excelling';
      case 'on-track': return 'On Track';
      case 'needs-support': return 'Needs Support';
      case 'at-risk': return 'At Risk';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">Coach Dashboard</h2>
        <p className="text-gray-600">Spring 2025 Cohort • 20 Active Learners</p>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]">
              <option>All Programs</option>
              <option>Salesforce Admin</option>
              <option>Salesforce Developer</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]">
              <option>All Status</option>
              <option>Excelling</option>
              <option>On Track</option>
              <option>Needs Support</option>
              <option>At Risk</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-4 h-4" />
              <span>Assign Learning</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#2C6975]" />
            <span>Cohort Progress Over Time</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avgProgress" stroke="#2C6975" strokeWidth={3} name="Avg Progress %" />
              <Line type="monotone" dataKey="engagement" stroke="#F9A03F" strokeWidth={3} name="Engagement %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Assignment Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assignmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="assignment" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="completed" fill="#3B6A52" name="Completed" />
              <Bar dataKey="pending" fill="#F9A03F" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learner Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Learner Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Learner</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {learners.map((learner) => (
                <tr key={learner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white">
                        {learner.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-900">{learner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {learner.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-[#2C6975] h-2 rounded-full"
                            style={{ width: `${learner.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{learner.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${getStatusColor(learner.status)}`}>
                      {getStatusText(learner.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {learner.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-[#2C6975] hover:text-[#234f57]" title="View in Salesforce">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="text-[#2C6975] hover:text-[#234f57]" title="Send Message">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slack Integration Panel */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent Team Communications</h3>
          <button className="text-sm text-[#2C6975] hover:underline">Open Slack</button>
        </div>
        <div className="space-y-3">
          {[
            { channel: 'cohort-spring-25', message: 'Great job on this week\'s assignments everyone!', time: '1h ago' },
            { channel: 'coaching-questions', message: 'Jordan asked about Process Builder flows', time: '3h ago' },
            { channel: 'team-announcements', message: 'New resources added to the learning portal', time: '1d ago' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-[#2C6975]">#{item.channel}</p>
                <p className="text-sm text-gray-700">{item.message}</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
