import { Trophy, Target, BookOpen, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { SkillsChart } from './SkillsChart';
import { SlackFeed } from './SlackFeed';

export function LearnerHome() {
  const missions = [
    { id: 1, title: 'Salesforce Admin Essentials', type: 'Trail Mission', progress: 75, color: '#2C6975' },
    { id: 2, title: 'Data Modeling Fundamentals', type: 'Trail Mission', progress: 45, color: '#7EB5C1' },
    { id: 3, title: 'Process Automation Basics', type: 'Trail Mission', progress: 90, color: '#3B6A52' },
  ];

  const dailyMissions = [
    { id: 1, title: 'Complete 2 Trailhead Modules', progress: 50, due: 'Today' },
    { id: 2, title: 'Submit Code Review', progress: 100, due: 'Completed' },
    { id: 3, title: 'Attend Team Standup', progress: 100, due: 'Completed' },
  ];

  const capstones = [
    { id: 1, title: 'Build Contact Management App', progress: 60, deadline: '2 weeks' },
    { id: 2, title: 'Design Process Automation Flow', progress: 30, deadline: '3 weeks' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-2xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">Welcome back, Alex!</h2>
            <p className="text-blue-100 mb-4">Salesforce Admin & Development Program • Cohort Spring 2025</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Progress</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-[#F9A03F] h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <button className="bg-white text-[#2C6975] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View in Salesforce
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Trophy className="w-24 h-24 text-[#F9A03F] opacity-80" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Trail Missions */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#2C6975]" />
                <span>Trail Missions</span>
              </h3>
              <a href="#" className="text-sm text-[#2C6975] hover:underline">View All</a>
            </div>
            <div className="grid gap-4">
              {missions.map((mission) => (
                <div key={mission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#7EB5C1]/10 text-[#2C6975] text-xs mb-2">
                        {mission.type}
                      </span>
                      <h4 className="text-gray-900 mb-2">{mission.title}</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ width: `${mission.progress}%`, backgroundColor: mission.color }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{mission.progress}%</span>
                      </div>
                    </div>
                    <ProgressRing progress={mission.progress} size={60} color={mission.color} />
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors">
                      Continue
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Missions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#F9A03F]" />
                <span>Daily Missions</span>
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {dailyMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      mission.progress === 100 ? 'bg-[#3B6A52] border-[#3B6A52]' : 'border-gray-300'
                    }`}>
                      {mission.progress === 100 && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${mission.progress === 100 ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {mission.title}
                      </p>
                      <p className="text-xs text-gray-500">{mission.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Capstone Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-[#F9A03F]" />
                <span>Capstone Projects</span>
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {capstones.map((capstone) => (
                <div key={capstone.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <ProgressRing progress={capstone.progress} size={50} color="#F9A03F" />
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {capstone.deadline}
                    </div>
                  </div>
                  <h4 className="text-gray-900 mb-2">{capstone.title}</h4>
                  <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    View Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Skills Assessment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#3B6A52]" />
                <span>Skills Assessment</span>
              </h3>
            </div>
            <SkillsChart />
            <button className="w-full mt-4 bg-[#3B6A52] text-white px-4 py-2 rounded-lg hover:bg-[#2d5240] transition-colors text-sm">
              Take Assessment
            </button>
          </div>

          {/* Slack Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#2C6975]" />
                <span>Team Updates</span>
              </h3>
            </div>
            <SlackFeed />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#2C6975]">Support</a>
            <a href="#" className="hover:text-[#2C6975]">Resources</a>
            <a href="#" className="hover:text-[#2C6975]">Policies</a>
            <a href="#" className="hover:text-[#2C6975]">Contact</a>
          </div>
          <p>© Transition Trails 2025</p>
        </div>
      </footer>
    </div>
  );
}
