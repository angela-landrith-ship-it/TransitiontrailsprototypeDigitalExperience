import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export function SkillsChart() {
  const data = [
    { skill: 'Salesforce Admin', value: 75 },
    { skill: 'Apex', value: 60 },
    { skill: 'Process Builder', value: 85 },
    { skill: 'Reports', value: 70 },
    { skill: 'Lightning', value: 55 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
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
  );
}
