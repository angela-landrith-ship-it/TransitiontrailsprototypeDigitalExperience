import { useState } from 'react';
import { Calendar, Users, CheckCircle2, Clock, MoreVertical, Folder } from 'lucide-react';
import { Badge } from './ui/badge';
import { TeamWorkspaceModal } from './TeamWorkspaceModal';

interface TeamProject {
  id: string;
  projectName: string;
  partnerName: string;
  role: 'Tech Lead' | 'Developer' | 'Tester';
  status: 'Planning' | 'In Progress' | 'Review' | 'Complete';
  nextMilestone: string;
  lastUpdate: string;
  progress: number;
}

const mockTeamProjects: TeamProject[] = [
  {
    id: '1',
    projectName: 'Volunteer Management System',
    partnerName: 'Green Earth Foundation',
    role: 'Tech Lead',
    status: 'In Progress',
    nextMilestone: 'Sprint 2 Demo',
    lastUpdate: '2 hours ago',
    progress: 65
  },
  {
    id: '2',
    projectName: 'Data Migration & Cleanup',
    partnerName: 'Tech for Good Alliance',
    role: 'Developer',
    status: 'Review',
    nextMilestone: 'UAT Review',
    lastUpdate: '1 day ago',
    progress: 90
  },
  {
    id: '3',
    projectName: 'Donor Impact Dashboard',
    partnerName: 'Green Earth Foundation',
    role: 'Developer',
    status: 'Complete',
    nextMilestone: 'Portfolio review',
    lastUpdate: '3 days ago',
    progress: 100
  }
];

export function TeamProjects() {
  const [selectedProject, setSelectedProject] = useState<TeamProject | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-gray-100 text-gray-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Review':
        return 'bg-[#F9A03F]/10 text-[#F9A03F]';
      case 'Complete':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Tech Lead':
        return 'bg-[#2C6975]/10 text-[#2C6975]';
      case 'Developer':
        return 'bg-[#7EB5C1]/10 text-[#2C6975]';
      case 'Tester':
        return 'bg-[#3B6A52]/10 text-[#3B6A52]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Projects</span>
            <Folder className="w-5 h-5 text-[#2C6975]" />
          </div>
          <p className="text-3xl text-gray-900">2</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completed</span>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl text-gray-900">1</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Team Contributions</span>
            <Users className="w-5 h-5 text-[#F9A03F]" />
          </div>
          <p className="text-3xl text-gray-900">47</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Points Earned</span>
            <span className="text-2xl">🏆</span>
          </div>
          <p className="text-3xl text-gray-900">180</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl text-gray-900">My Team Projects</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Next Milestone
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTeamProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{project.projectName}</p>
                      <p className="text-sm text-gray-600">{project.partnerName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getRoleColor(project.role)}>
                      {project.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-[#2C6975] h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.nextMilestone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{project.lastUpdate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {mockTeamProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl text-gray-900 mb-2">No Team Projects Yet</h3>
          <p className="text-gray-600 mb-6">
            Join a Partner Project to start collaborating with other learners
          </p>
          <button className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors">
            Browse Partner Projects
          </button>
        </div>
      )}

      {/* Team Workspace Modal */}
      {selectedProject && (
        <TeamWorkspaceModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
