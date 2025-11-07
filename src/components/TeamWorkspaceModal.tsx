import { X, Plus, MessageSquare, FileText, ExternalLink, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PennyAssistantMode } from './PennyAssistantMode';

interface TeamWorkspaceModalProps {
  project: {
    id: string;
    projectName: string;
    partnerName: string;
    role: string;
    status: string;
  };
  onClose: () => void;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'inprogress' | 'done';
  priority?: 'low' | 'medium' | 'high';
}

export function TeamWorkspaceModal({ project, onClose }: TeamWorkspaceModalProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design custom object schema', assignee: 'Sarah Chen', status: 'done' },
    { id: '2', title: 'Build volunteer registration flow', assignee: 'You', status: 'inprogress', priority: 'high' },
    { id: '3', title: 'Create reporting dashboards', assignee: 'Marcus Johnson', status: 'inprogress' },
    { id: '4', title: 'Write user documentation', assignee: 'Unassigned', status: 'todo', priority: 'medium' },
    { id: '5', title: 'UAT with partner stakeholders', assignee: 'Unassigned', status: 'todo' }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTaskTitle,
        assignee: 'Unassigned',
        status: 'todo'
      }]);
      setNewTaskTitle('');
    }
  };

  const handleMoveTask = (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    inprogress: tasks.filter(t => t.status === 'inprogress'),
    done: tasks.filter(t => t.status === 'done')
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-[#F9A03F]/10 text-[#F9A03F]';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">{project.projectName}</h2>
            <p className="text-gray-600">{project.partnerName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="kanban" className="w-full">
              <TabsList className="bg-gray-100 p-1 rounded-lg mb-6">
                <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                <TabsTrigger value="notes">Shared Notes</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="kanban">
                {/* Kanban Board */}
                <div className="grid grid-cols-3 gap-4">
                  {/* To Do Column */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Circle className="w-4 h-4 text-gray-400" />
                        <h3 className="text-gray-900">To Do</h3>
                        <Badge className="bg-gray-200 text-gray-600 text-xs">
                          {tasksByStatus.todo.length}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tasksByStatus.todo.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onMove={(status) => handleMoveTask(task.id, status)}
                          getPriorityColor={getPriorityColor}
                        />
                      ))}
                      
                      {/* Add Task Input */}
                      <div className="p-3 bg-white rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="text"
                          placeholder="Add new task..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                          className="w-full text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <h3 className="text-gray-900">In Progress</h3>
                        <Badge className="bg-blue-200 text-blue-700 text-xs">
                          {tasksByStatus.inprogress.length}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tasksByStatus.inprogress.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onMove={(status) => handleMoveTask(task.id, status)}
                          getPriorityColor={getPriorityColor}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <h3 className="text-gray-900">Done</h3>
                        <Badge className="bg-green-200 text-green-700 text-xs">
                          {tasksByStatus.done.length}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {tasksByStatus.done.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onMove={(status) => handleMoveTask(task.id, status)}
                          getPriorityColor={getPriorityColor}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Team Notes</h3>
                  <textarea
                    className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] resize-none"
                    placeholder="Add team notes, meeting summaries, or important decisions..."
                    defaultValue="Sprint Planning Notes (Week 2)

Key Decisions:
- Using custom objects for Volunteer and Event tracking
- Implementing auto-response flows for volunteer confirmations
- Dashboard to show volunteer hours and impact metrics

Next Steps:
- Sarah: Complete object schema by EOW
- Marcus: Build registration flow
- Team: UAT session with partner scheduled for Friday"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last edited by Sarah Chen, 2 hours ago</span>
                    <button className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm">
                      Save Notes
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="files">
                <div className="space-y-3">
                  {[
                    { name: 'Object Schema Diagram.pdf', size: '2.4 MB', uploadedBy: 'Sarah Chen' },
                    { name: 'Volunteer Flow Design.png', size: '1.8 MB', uploadedBy: 'You' },
                    { name: 'Partner Requirements.docx', size: '156 KB', uploadedBy: 'Marcus Johnson' }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-[#2C6975]" />
                        <div>
                          <p className="text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-600">{file.size} • Uploaded by {file.uploadedBy}</p>
                        </div>
                      </div>
                      <button className="px-3 py-2 text-sm text-[#2C6975] hover:bg-white rounded-lg transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                  
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#2C6975] hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 text-gray-600">
                    <Plus className="w-5 h-5" />
                    <span>Upload File</span>
                  </button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Quick Links */}
            <div className="mt-6 flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ExternalLink className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Open Slack Channel</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Message Team</span>
              </button>
            </div>
          </div>

          {/* Penny Assistant Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
            <PennyAssistantMode 
              projectName={project.projectName}
              projectStatus={project.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  onMove, 
  getPriorityColor 
}: { 
  task: Task; 
  onMove: (status: 'todo' | 'inprogress' | 'done') => void;
  getPriorityColor: (priority?: string) => string;
}) {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-900 mb-2">{task.title}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">{task.assignee}</span>
        {task.priority && (
          <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
            {task.priority}
          </Badge>
        )}
      </div>
      
      {/* Move buttons */}
      <div className="mt-2 flex gap-1">
        {task.status !== 'todo' && (
          <button
            onClick={() => onMove('todo')}
            className="flex-1 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            To Do
          </button>
        )}
        {task.status !== 'inprogress' && (
          <button
            onClick={() => onMove('inprogress')}
            className="flex-1 text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
          >
            In Progress
          </button>
        )}
        {task.status !== 'done' && (
          <button
            onClick={() => onMove('done')}
            className="flex-1 text-xs px-2 py-1 bg-green-100 hover:bg-green-200 rounded transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
