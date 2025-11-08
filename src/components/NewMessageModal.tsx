import { useState } from 'react';
import { X, Search, UserCircle, Users, Send, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface NewMessageModalProps {
  onClose: () => void;
  onSend: (recipientId: string, message: string) => void;
}

// Mock users
const mockUsers = [
  {
    id: 'user-1',
    name: 'Coach Sarah Martinez',
    role: 'Coach',
    avatar: 'SM',
    isOnline: true,
    specialty: 'Admin Trail',
  },
  {
    id: 'user-2',
    name: 'Coach Michael Lee',
    role: 'Coach',
    avatar: 'ML',
    isOnline: false,
    specialty: 'Developer Trail',
  },
  {
    id: 'user-3',
    name: 'Alex Chen',
    role: 'Peer',
    avatar: 'AC',
    isOnline: true,
    trail: 'Admin Trail',
  },
  {
    id: 'user-4',
    name: 'Jordan Taylor',
    role: 'Peer',
    avatar: 'JT',
    isOnline: false,
    trail: 'Developer Trail',
  },
  {
    id: 'user-5',
    name: 'Morgan Davis',
    role: 'Peer',
    avatar: 'MD',
    isOnline: true,
    trail: 'Admin Trail',
  },
  {
    id: 'user-6',
    name: 'Riley Thompson',
    role: 'Peer',
    avatar: 'RT',
    isOnline: true,
    trail: 'Developer Trail',
  },
  {
    id: 'user-7',
    name: 'Casey White',
    role: 'Peer',
    avatar: 'CW',
    isOnline: false,
    trail: 'Admin Trail',
  },
  {
    id: 'user-8',
    name: 'Sam Green',
    role: 'Peer',
    avatar: 'SG',
    isOnline: true,
    trail: 'Architect Trail',
  },
];

export function NewMessageModal({ onClose, onSend }: NewMessageModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [message, setMessage] = useState('');

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const coaches = filteredUsers.filter((u) => u.role === 'Coach');
  const peers = filteredUsers.filter((u) => u.role === 'Peer');

  const handleSend = () => {
    if (!selectedUser || !message.trim()) return;
    onSend(selectedUser.id, message);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">New Message</h2>
            <p className="text-sm text-gray-600">
              {selectedUser ? `Messaging ${selectedUser.name}` : 'Select a recipient'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!selectedUser ? (
            <div className="p-6">
              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="mb-2">
                      <strong>Connect with your learning community:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Message coaches for personalized guidance</li>
                      <li>Ask peers for help or share tips</li>
                      <li>Earn +5 points for your first message</li>
                      <li>Quick replies (within 24h) earn +3 points</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>

              {/* Coaches */}
              {coaches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCircle className="w-5 h-5 text-[#F9A03F]" />
                    <h3 className="text-gray-900">Coaches</h3>
                    <Badge variant="outline" className="text-xs">{coaches.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {coaches.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#F9A03F] text-white">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-900">{user.name}</span>
                              {user.isOnline && (
                                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                  Online
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{user.specialty}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Peers */}
              {peers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-[#7EB5C1]" />
                    <h3 className="text-gray-900">Peers</h3>
                    <Badge variant="outline" className="text-xs">{peers.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {peers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#7EB5C1] text-white">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-900">{user.name}</span>
                              {user.isOnline && (
                                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                  Online
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{user.trail}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No users found</p>
                  <p className="text-sm text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              {/* Selected User */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback
                      className={
                        selectedUser.role === 'Coach'
                          ? 'bg-[#F9A03F] text-white'
                          : 'bg-[#7EB5C1] text-white'
                      }
                    >
                      {selectedUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {selectedUser.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">{selectedUser.name}</div>
                  <div className="text-sm text-gray-600">
                    {selectedUser.role === 'Coach'
                      ? selectedUser.specialty
                      : selectedUser.trail}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedUser(null)}
                >
                  Change
                </Button>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-gray-900 mb-2">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="w-full"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  {message.length}/1000 characters
                </p>
              </div>

              {/* Quick Templates */}
              <div className="mt-6">
                <label className="block text-gray-900 mb-2 text-sm">Quick Templates</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      setMessage('Hi! I have a quick question about the trail material...')
                    }
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-colors text-sm"
                  >
                    💬 Ask a Question
                  </button>
                  <button
                    onClick={() =>
                      setMessage('Hey! Would you like to study together?')
                    }
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-colors text-sm"
                  >
                    👥 Study Together
                  </button>
                  <button
                    onClick={() =>
                      setMessage('Thanks for your help! Really appreciate it.')
                    }
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-colors text-sm"
                  >
                    🙏 Say Thanks
                  </button>
                  <button
                    onClick={() =>
                      setMessage('I found this resource helpful and wanted to share...')
                    }
                    className="text-left p-3 border border-gray-200 rounded-lg hover:border-[#3B6A52] hover:bg-green-50 transition-colors text-sm"
                  >
                    📚 Share Resource
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedUser && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Back
            </Button>
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-[#3B6A52] hover:bg-[#2d5440] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message (+5 pts)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
