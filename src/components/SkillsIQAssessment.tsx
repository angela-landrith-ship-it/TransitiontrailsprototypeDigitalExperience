import { TrendingUp, Award, Calendar } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PageType } from '../App';

interface SkillsIQAssessmentProps {
  onNavigate: (page: PageType) => void;
}

export function SkillsIQAssessment({ onNavigate }: SkillsIQAssessmentProps) {
  const radarData = [
    { skill: 'Salesforce Admin', value: 75 },
    { skill: 'Apex', value: 60 },
    { skill: 'Process Builder', value: 85 },
    { skill: 'Reports', value: 70 },
    { skill: 'Lightning', value: 55 },
  ];

  const scoreProgressData = [
    { date: 'Jan 15', score: 152 },
    { date: 'Feb 15', score: 178 },
  ];

  const skillBreakdown = [
    { name: 'Salesforce Admin', score: 185, maxScore: 200, color: '#2C6975' },
    { name: 'Process Automation', score: 192, maxScore: 200, color: '#2C6975' },
    { name: 'Data Management', score: 165, maxScore: 200, color: '#2C6975' },
    { name: 'Reporting', score: 171, maxScore: 200, color: '#2C6975' },
  ];

  const daysUntilAssessment = 14;
  const nextAssessmentDate = 'March 15, 2025';
  const latestScore = 178;
  const proficiencyLevel = 'Proficient';
  const scoreChange = '+26 pts';
  const lastAssessmentDate = 'Feb 15, 2025';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span>Pluralsight IQ Skills Assessments</span>
        </h3>
        <button 
          onClick={() => onNavigate('skills-assessment')}
          className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm"
        >
          Take Assessment
        </button>
      </div>

      {/* Next Assessment Due */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Next Assessment Due</span>
            </p>
            <p className="text-gray-900">{nextAssessmentDate}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl text-[#2C6975]">{daysUntilAssessment}</p>
            <p className="text-sm text-gray-600">days left</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Latest Assessment Score */}
        <div>
          <h4 className="text-sm text-gray-600 mb-3">Latest Assessment Score</h4>
          <div className="flex items-end space-x-3 mb-2">
            <span className="text-5xl text-[#2C6975]">{latestScore}</span>
            <span className="inline-block px-3 py-1 rounded-full bg-[#3B6A52] text-white text-sm mb-2">
              {proficiencyLevel}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{lastAssessmentDate}</p>
          <p className="text-sm text-[#3B6A52] flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>{scoreChange}</span>
          </p>
        </div>

        {/* Score Progress Chart */}
        <div>
          <h4 className="text-sm text-gray-600 mb-3">Score Progress</h4>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={scoreProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                domain={[100, 200]} 
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2C6975" 
                strokeWidth={2}
                dot={{ fill: '#2C6975', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Breakdown and Radar Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Latest Assessment Breakdown */}
        <div>
          <h4 className="text-sm text-gray-600 mb-4">Latest Assessment Breakdown</h4>
          <div className="space-y-4">
            {skillBreakdown.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.score}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(skill.score / skill.maxScore) * 100}%`,
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress Radar */}
        <div>
          <h4 className="text-sm text-gray-600 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Skills Progress</span>
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: '#6B7280', fontSize: 11 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar 
                name="Skills" 
                dataKey="value" 
                stroke="#2C6975" 
                fill="#7EB5C1" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
