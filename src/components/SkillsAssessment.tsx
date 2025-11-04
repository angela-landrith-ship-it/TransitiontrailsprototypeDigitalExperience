import { ArrowLeft, TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { PageType } from '../App';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SkillsAssessmentProps {
  onNavigate: (page: PageType) => void;
}

export function SkillsAssessment({ onNavigate }: SkillsAssessmentProps) {
  const skillsData = [
    { skill: 'Salesforce Admin', current: 75, target: 90, baseline: 40 },
    { skill: 'Apex', current: 60, target: 85, baseline: 20 },
    { skill: 'Process Builder', current: 85, target: 90, baseline: 30 },
    { skill: 'Reports', current: 70, target: 80, baseline: 45 },
    { skill: 'Lightning', current: 55, target: 85, baseline: 25 },
    { skill: 'Data Model', current: 80, target: 90, baseline: 50 },
  ];

  const radarData = skillsData.map(s => ({
    skill: s.skill,
    current: s.current,
    target: s.target
  }));

  const assessmentHistory = [
    { date: 'Jan 15', overall: 42 },
    { date: 'Jan 29', overall: 58 },
    { date: 'Feb 12', overall: 68 },
    { date: 'Feb 26', overall: 71 },
  ];

  const upcomingAssessments = [
    { name: 'Mid-Program Assessment', date: 'March 1, 2025', type: 'Comprehensive' },
    { name: 'Flow Builder Quiz', date: 'March 8, 2025', type: 'Topic-Specific' },
    { name: 'Final Certification Prep', date: 'April 15, 2025', type: 'Certification' },
  ];

  const recommendations = [
    {
      title: 'Focus on Lightning Experience',
      description: 'Your Lightning skills are below target. Spend 30 minutes daily on Lightning modules.',
      priority: 'high',
      estimatedTime: '2 weeks'
    },
    {
      title: 'Advance Apex Knowledge',
      description: 'Good progress! Continue with advanced Apex patterns and best practices.',
      priority: 'medium',
      estimatedTime: '3 weeks'
    },
    {
      title: 'Maintain Process Builder Expertise',
      description: 'You\'re excelling here! Consider mentoring peers in this area.',
      priority: 'low',
      estimatedTime: 'Ongoing'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('learner')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl text-gray-900 mb-2">Skills Assessment</h2>
        <p className="text-gray-600">Track your progress and identify areas for improvement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-[#3B6A52]" />
            <span className="text-3xl text-gray-900">71%</span>
          </div>
          <h3 className="text-gray-900 mb-1">Overall Score</h3>
          <p className="text-sm text-[#3B6A52]">↑ 29% from baseline</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-10 h-10 text-[#F9A03F]" />
            <span className="text-3xl text-gray-900">83%</span>
          </div>
          <h3 className="text-gray-900 mb-1">Target Progress</h3>
          <p className="text-sm text-gray-600">17% to program goal</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-10 h-10 text-[#2C6975]" />
            <span className="text-3xl text-gray-900">4/6</span>
          </div>
          <h3 className="text-gray-900 mb-1">Skills at Target</h3>
          <p className="text-sm text-gray-600">2 skills need focus</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Skills Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar 
                name="Current" 
                dataKey="current" 
                stroke="#2C6975" 
                fill="#7EB5C1" 
                fillOpacity={0.6} 
              />
              <Radar 
                name="Target" 
                dataKey="target" 
                stroke="#F9A03F" 
                fill="#F9A03F" 
                fillOpacity={0.2} 
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#7EB5C1]"></div>
              <span className="text-gray-600">Current Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#F9A03F]/40"></div>
              <span className="text-gray-600">Target Level</span>
            </div>
          </div>
        </div>

        {/* Progress Over Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assessmentHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="overall" fill="#2C6975" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-gray-900 mb-6">Detailed Skills Breakdown</h3>
        <div className="space-y-6">
          {skillsData.map((skill, idx) => {
            const improvement = skill.current - skill.baseline;
            const toTarget = skill.target - skill.current;
            const onTrack = skill.current >= skill.target * 0.8;

            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-gray-900">{skill.skill}</h4>
                    <p className="text-sm text-gray-600">
                      +{improvement}% from baseline • {toTarget}% to target
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{skill.current}%</span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      onTrack ? 'bg-[#3B6A52] text-white' : 'bg-[#F9A03F] text-white'
                    }`}>
                      {onTrack ? 'On Track' : 'Needs Focus'}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-[#2C6975] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${skill.current}%` }}
                    ></div>
                  </div>
                  <div 
                    className="absolute top-0 h-3 w-1 bg-[#F9A03F]"
                    style={{ left: `${skill.target}%` }}
                  >
                    <div className="absolute -top-6 -left-4 text-xs text-[#F9A03F]">Target</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-gray-900 mb-6">Personalized Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-gray-200 hover:border-[#2C6975] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-gray-900">{rec.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'medium' ? 'bg-[#F9A03F]/20 text-[#F9A03F]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-xs text-gray-500">Estimated time: {rec.estimatedTime}</p>
                </div>
                <button className="ml-4 text-[#2C6975] hover:underline text-sm whitespace-nowrap">
                  Start Learning →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Assessments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-[#2C6975]" />
          <span>Upcoming Assessments</span>
        </h3>
        <div className="space-y-3">
          {upcomingAssessments.map((assessment, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-gray-900 mb-1">{assessment.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{assessment.date}</span>
                  <span>•</span>
                  <span className="px-2 py-1 rounded-full bg-white text-xs">{assessment.type}</span>
                </div>
              </div>
              <button className="bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                Prepare
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
