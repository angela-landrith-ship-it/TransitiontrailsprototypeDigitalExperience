import { ArrowLeft, Calendar, CheckCircle, Circle, Trophy, Flame } from 'lucide-react';
import { PageType } from '../App';

interface DailyMissionsProps {
  onNavigate: (page: PageType) => void;
}

export function DailyMissions({ onNavigate }: DailyMissionsProps) {
  const today = [
    { id: 1, title: 'Complete 2 Trailhead Modules', category: 'Learning', progress: 50, total: 2, completed: 1, points: 100 },
    { id: 2, title: 'Submit Code Review', category: 'Development', progress: 100, total: 1, completed: 1, points: 150 },
    { id: 3, title: 'Attend Team Standup', category: 'Collaboration', progress: 100, total: 1, completed: 1, points: 50 },
    { id: 4, title: 'Practice Flow Builder', category: 'Skills', progress: 0, total: 30, completed: 0, points: 75, unit: 'min' },
  ];

  const upcoming = [
    { day: 'Tuesday', missions: [
      { title: 'Complete Assignment 3', category: 'Learning' },
      { title: 'Review Peer Code', category: 'Collaboration' },
      { title: 'Study for Quiz', category: 'Assessment' },
    ]},
    { day: 'Wednesday', missions: [
      { title: 'Attend Workshop', category: 'Learning' },
      { title: 'Complete Practice Exercises', category: 'Skills' },
    ]},
  ];

  const streakDays = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: false, today: true },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('learner')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl text-gray-900 mb-2">Daily Missions</h2>
        <p className="text-gray-600">Complete daily tasks to stay on track and build momentum</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/80 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-10 h-10" />
            <span className="text-4xl">4</span>
          </div>
          <h3 className="text-white mb-1">Day Streak</h3>
          <p className="text-sm text-white/80">Keep it going!</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-10 h-10 text-[#2C6975]" />
            <span className="text-4xl text-gray-900">250</span>
          </div>
          <h3 className="text-gray-900 mb-1">Points Today</h3>
          <p className="text-sm text-gray-600">of 400 target</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-10 h-10 text-[#3B6A52]" />
            <span className="text-4xl text-gray-900">3/4</span>
          </div>
          <h3 className="text-gray-900 mb-1">Completed</h3>
          <p className="text-sm text-gray-600">75% done</p>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-gray-900 mb-4">This Week's Streak</h3>
        <div className="flex justify-between">
          {streakDays.map((day, idx) => (
            <div key={idx} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                day.completed ? 'bg-[#3B6A52] text-white' :
                day.today ? 'border-2 border-[#F9A03F] text-[#F9A03F]' :
                'border-2 border-gray-200 text-gray-400'
              }`}>
                {day.completed && <CheckCircle className="w-6 h-6" />}
                {day.today && !day.completed && <Circle className="w-6 h-6" />}
              </div>
              <p className="text-xs text-gray-600">{day.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Missions */}
      <div className="mb-8">
        <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-[#2C6975]" />
          <span>Today's Missions - Monday</span>
        </h3>
        <div className="space-y-4">
          {today.map((mission) => (
            <div key={mission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    mission.progress === 100 ? 'bg-[#3B6A52] border-[#3B6A52]' : 'border-gray-300'
                  }`}>
                    {mission.progress === 100 && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className={`text-gray-900 ${mission.progress === 100 ? 'line-through text-gray-500' : ''}`}>
                        {mission.title}
                      </h4>
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                        {mission.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>{mission.completed}/{mission.total} {mission.unit || 'completed'}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-[#F9A03F]" />
                        <span>{mission.points} points</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 max-w-md">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-[#3B6A52] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${mission.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{mission.progress}%</span>
                    </div>
                  </div>
                </div>
                {mission.progress < 100 && (
                  <button className="ml-4 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                    Continue
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Missions */}
      <div>
        <h3 className="text-gray-900 mb-4">Upcoming This Week</h3>
        <div className="space-y-6">
          {upcoming.map((day, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-gray-900 mb-4">{day.day}</h4>
              <div className="space-y-3">
                {day.missions.map((mission, mIdx) => (
                  <div key={mIdx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Circle className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 text-sm text-gray-700">{mission.title}</span>
                    <span className="px-2 py-1 rounded-full bg-white text-gray-600 text-xs">
                      {mission.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
