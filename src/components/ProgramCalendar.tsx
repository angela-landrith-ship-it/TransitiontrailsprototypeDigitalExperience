import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Video, Users, MessageCircle, Clock, ExternalLink, Plus, ChevronLeft, ChevronRight, FileText, Play } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProgramCalendarProps {
  onNavigate: (view: string) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'standup' | 'campfire' | 'coaching' | 'class' | 'office-hours';
  date: Date;
  time: string;
  duration: string;
  location: string;
  host?: string;
  description?: string;
  recurring?: string;
  meetingLink?: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  status: 'upcoming' | 'completed';
}

export function ProgramCalendar({ onNavigate }: ProgramCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Sample events for the program
  const events: CalendarEvent[] = [
    // Past events with recordings and transcripts
    {
      id: 'past-1',
      title: 'Weekly Stand-up',
      type: 'standup',
      date: new Date(2025, 10, 3), // Nov 3, 2025 (Monday - past)
      time: '9:00 AM',
      duration: '30 min',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Quick sync with the cohort to share updates and blockers',
      recurring: 'Every Monday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      recordingUrl: 'https://stream.microsoft.com/video/abc123',
      transcriptUrl: 'https://stream.microsoft.com/video/abc123/transcript',
      status: 'completed'
    },
    {
      id: 'past-2',
      title: '1:1 Coaching Session',
      type: 'coaching',
      date: new Date(2025, 9, 29), // Oct 29, 2025 (past)
      time: '2:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Personal coaching session to discuss progress, solve problems, and develop skills',
      recurring: 'Weekly',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      recordingUrl: 'https://stream.microsoft.com/video/def456',
      transcriptUrl: 'https://stream.microsoft.com/video/def456/transcript',
      status: 'completed'
    },
    {
      id: 'past-3',
      title: 'Campfire Session',
      type: 'campfire',
      date: new Date(2025, 9, 30), // Oct 30, 2025 (past)
      time: '4:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Collaborative learning session where we share experiences and insights',
      recurring: 'Every Wednesday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      recordingUrl: 'https://stream.microsoft.com/video/ghi789',
      transcriptUrl: 'https://stream.microsoft.com/video/ghi789/transcript',
      status: 'completed'
    },
    {
      id: 'past-4',
      title: 'Salesforce Admin Fundamentals',
      type: 'class',
      date: new Date(2025, 9, 31), // Oct 31, 2025 (past)
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Microsoft Teams',
      host: 'Michael Chen',
      description: 'Deep dive into Salesforce administration concepts',
      recurring: 'Weekly',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      recordingUrl: 'https://stream.microsoft.com/video/jkl012',
      transcriptUrl: 'https://stream.microsoft.com/video/jkl012/transcript',
      status: 'completed'
    },
    // Upcoming events
    {
      id: '1',
      title: 'Weekly Stand-up',
      type: 'standup',
      date: new Date(2025, 10, 10), // Nov 10, 2025 (Monday)
      time: '9:00 AM',
      duration: '30 min',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Quick sync with the cohort to share updates and blockers',
      recurring: 'Every Monday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Campfire Session',
      type: 'campfire',
      date: new Date(2025, 10, 12), // Nov 12, 2025 (Wednesday)
      time: '4:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Collaborative learning session where we share experiences and insights',
      recurring: 'Every Wednesday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '3',
      title: '1:1 Coaching Session',
      type: 'coaching',
      date: new Date(2025, 10, 11), // Nov 11, 2025 (Tuesday)
      time: '2:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Personal coaching session to discuss progress, solve problems, and develop skills',
      recurring: 'Weekly',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Salesforce Admin Fundamentals',
      type: 'class',
      date: new Date(2025, 10, 13), // Nov 13, 2025 (Thursday)
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Microsoft Teams',
      host: 'Michael Chen',
      description: 'Deep dive into Salesforce administration concepts',
      recurring: 'Weekly',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Office Hours',
      type: 'office-hours',
      date: new Date(2025, 10, 14), // Nov 14, 2025 (Friday)
      time: '3:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      description: 'Drop-in session for questions and support',
      recurring: 'Every Friday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '6',
      title: 'Weekly Stand-up',
      type: 'standup',
      date: new Date(2025, 10, 17), // Nov 17, 2025 (Monday)
      time: '9:00 AM',
      duration: '30 min',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      recurring: 'Every Monday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '7',
      title: '1:1 Coaching Session',
      type: 'coaching',
      date: new Date(2025, 10, 18), // Nov 18, 2025 (Tuesday)
      time: '2:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      recurring: 'Weekly',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    },
    {
      id: '8',
      title: 'Campfire Session',
      type: 'campfire',
      date: new Date(2025, 10, 19), // Nov 19, 2025 (Wednesday)
      time: '4:00 PM',
      duration: '1 hour',
      location: 'Microsoft Teams',
      host: 'Sarah Johnson',
      recurring: 'Every Wednesday',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'upcoming'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'standup':
        return {
          bg: 'bg-[#7EB5C1]/10',
          border: 'border-[#7EB5C1]',
          text: 'text-[#2C6975]',
          icon: 'bg-[#7EB5C1]'
        };
      case 'campfire':
        return {
          bg: 'bg-[#F9A03F]/10',
          border: 'border-[#F9A03F]',
          text: 'text-[#F9A03F]',
          icon: 'bg-[#F9A03F]'
        };
      case 'coaching':
        return {
          bg: 'bg-[#2C6975]/10',
          border: 'border-[#2C6975]',
          text: 'text-[#2C6975]',
          icon: 'bg-[#2C6975]'
        };
      case 'class':
        return {
          bg: 'bg-[#3B6A52]/10',
          border: 'border-[#3B6A52]',
          text: 'text-[#3B6A52]',
          icon: 'bg-[#3B6A52]'
        };
      case 'office-hours':
        return {
          bg: 'bg-purple-100',
          border: 'border-purple-400',
          text: 'text-purple-700',
          icon: 'bg-purple-400'
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-400',
          text: 'text-gray-700',
          icon: 'bg-gray-400'
        };
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'standup':
        return <Users className="w-4 h-4" />;
      case 'campfire':
        return <MessageCircle className="w-4 h-4" />;
      case 'coaching':
        return <Video className="w-4 h-4" />;
      case 'class':
        return <CalendarIcon className="w-4 h-4" />;
      case 'office-hours':
        return <Clock className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  // Get events for selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events
      .filter(event => event.status === 'upcoming' && event.date >= today && event.date <= nextWeek)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Check if date has events
  const hasEvents = (date: Date) => {
    return events.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateEvents = getEventsForDate(selectedDate);
  const upcomingEvents = getUpcomingEvents();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('my-program')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-gray-900">Program Calendar</h1>
                <p className="text-sm text-gray-600">The Guided Trail • Spring 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar & Book with Coach */}
          <div className="lg:col-span-2 space-y-6">
            {viewMode === 'calendar' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">November 2025</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="px-4 py-2 text-sm text-[#2C6975] hover:bg-[#2C6975]/10 rounded-lg transition-colors">
                      Today
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  modifiers={{
                    hasEvents: (date) => hasEvents(date)
                  }}
                  modifiersClassNames={{
                    hasEvents: 'bg-[#2C6975]/10 font-bold'
                  }}
                />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">
                      Events on {selectedDate ? formatDateShort(selectedDate) : 'Selected Date'}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'event' : 'events'}
                    </span>
                  </div>

                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => {
                        const colors = getEventColor(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`p-4 rounded-lg border-l-4 ${colors.bg} ${colors.border}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
                                  {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-gray-900">{event.title}</h4>
                                    <span className="px-2 py-0.5 bg-[#5558AF] text-white text-xs rounded flex items-center space-x-1">
                                      <Video className="w-2.5 h-2.5" />
                                      <span>Teams</span>
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{event.time}</span>
                                    </span>
                                    <span>•</span>
                                    <span>{event.duration}</span>
                                    {event.host && (
                                      <>
                                        <span>•</span>
                                        <span>{event.host}</span>
                                      </>
                                    )}
                                  </div>
                                  {event.description && (
                                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                  )}
                                  {event.status === 'completed' && (
                                    <div className="flex items-center space-x-2 mt-2">
                                      {event.recordingUrl && (
                                        <a
                                          href={event.recordingUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center space-x-1 text-xs text-[#2C6975] hover:underline"
                                        >
                                          <Play className="w-3 h-3" />
                                          <span>Recording</span>
                                        </a>
                                      )}
                                      {event.transcriptUrl && (
                                        <>
                                          <span className="text-gray-400">•</span>
                                          <a
                                            href={event.transcriptUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-1 text-xs text-[#2C6975] hover:underline"
                                          >
                                            <FileText className="w-3 h-3" />
                                            <span>Transcript</span>
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {event.status === 'upcoming' ? (
                                <a
                                  href={event.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-3 px-3 py-1.5 bg-[#2C6975] text-white rounded-lg text-sm hover:bg-[#234d56] transition-colors flex items-center space-x-1"
                                >
                                  <Video className="w-3 h-3" />
                                  <span>Join</span>
                                </a>
                              ) : (
                                <div className="ml-3 flex flex-col space-y-1">
                                  {event.recordingUrl && (
                                    <a
                                      href={event.recordingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-[#3B6A52] text-white rounded-lg text-xs hover:bg-[#2d5240] transition-colors flex items-center space-x-1 whitespace-nowrap"
                                    >
                                      <Play className="w-3 h-3" />
                                      <span>Recording</span>
                                    </a>
                                  )}
                                  {event.transcriptUrl && (
                                    <a
                                      href={event.transcriptUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-xs hover:bg-gray-700 transition-colors flex items-center space-x-1 whitespace-nowrap"
                                    >
                                      <FileText className="w-3 h-3" />
                                      <span>Transcript</span>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No events scheduled for this date</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {viewMode === 'list' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                    <TabsTrigger value="past">Past Sessions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    <div className="space-y-3">
                      {events.filter(e => e.status === 'upcoming').map((event) => {
                        const colors = getEventColor(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`p-4 rounded-lg border-l-4 ${colors.bg} ${colors.border}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
                                  {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-gray-900">{event.title}</h4>
                                    {event.recurring && (
                                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                                        {event.recurring}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                    <span>{formatDateShort(event.date)}</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{event.time}</span>
                                    </span>
                                    <span>•</span>
                                    <span>{event.duration}</span>
                                    {event.host && (
                                      <>
                                        <span>•</span>
                                        <span>{event.host}</span>
                                      </>
                                    )}
                                  </div>
                                  {event.description && (
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                  )}
                                </div>
                              </div>
                              <a
                                href={event.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-3 px-3 py-1.5 bg-[#2C6975] text-white rounded-lg text-sm hover:bg-[#234d56] transition-colors flex items-center space-x-1"
                              >
                                <Video className="w-3 h-3" />
                                <span>Join</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past">
                    <div className="space-y-3">
                      {events.filter(e => e.status === 'completed').map((event) => {
                        const colors = getEventColor(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`p-4 rounded-lg border-l-4 ${colors.bg} ${colors.border}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
                                  {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-gray-900">{event.title}</h4>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                                      Completed
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                    <span>{formatDateShort(event.date)}</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{event.time}</span>
                                    </span>
                                    <span>•</span>
                                    <span>{event.duration}</span>
                                    {event.host && (
                                      <>
                                        <span>•</span>
                                        <span>{event.host}</span>
                                      </>
                                    )}
                                  </div>
                                  {event.description && (
                                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                  )}
                                  <div className="flex items-center space-x-3 pt-2 border-t border-gray-200">
                                    {event.recordingUrl && (
                                      <a
                                        href={event.recordingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 text-sm text-[#2C6975] hover:underline"
                                      >
                                        <Play className="w-4 h-4" />
                                        <span>View Recording</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                    {event.transcriptUrl && (
                                      <a
                                        href={event.transcriptUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 text-sm text-[#2C6975] hover:underline"
                                      >
                                        <FileText className="w-4 h-4" />
                                        <span>View Transcript</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Book with Coach CTA */}
            <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white mb-2">Need Extra Coaching Time?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Book additional 1:1 sessions with your coach Sarah Johnson. Perfect for deep dives into specific topics or extra project support.
                  </p>
                  <button className="px-4 py-2 bg-white text-[#2C6975] rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Book Coaching Session</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="ml-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Events & Legend */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Upcoming This Week</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const colors = getEventColor(event.type);
                  return (
                    <div key={event.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600">
                            {formatDateShort(event.date)} • {event.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Recordings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Recent Recordings</h3>
              <div className="space-y-3">
                {events.filter(e => e.status === 'completed').slice(0, 3).map((event) => {
                  const colors = getEventColor(event.type);
                  return (
                    <div key={event.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg ${colors.icon} text-white flex items-center justify-center flex-shrink-0`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {formatDateShort(event.date)}
                          </p>
                          <div className="flex items-center space-x-2">
                            {event.recordingUrl && (
                              <a
                                href={event.recordingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-xs text-[#2C6975] hover:underline"
                              >
                                <Play className="w-3 h-3" />
                                <span>Recording</span>
                              </a>
                            )}
                            {event.transcriptUrl && (
                              <>
                                <span className="text-gray-400 text-xs">•</span>
                                <a
                                  href={event.transcriptUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-xs text-[#2C6975] hover:underline"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>Transcript</span>
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Types Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7EB5C1] text-white flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Weekly Stand-up</p>
                    <p className="text-xs text-gray-500">Every Monday, 30 min</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F9A03F] text-white flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Campfire Session</p>
                    <p className="text-xs text-gray-500">Every Wednesday, 1 hour</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">1:1 Coaching</p>
                    <p className="text-xs text-gray-500">Weekly, 1 hour</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3B6A52] text-white flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Classes</p>
                    <p className="text-xs text-gray-500">Varies by week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-400 text-white flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Office Hours</p>
                    <p className="text-xs text-gray-500">Every Friday, 1 hour</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <a 
                  href="https://outlook.office.com/calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <ExternalLink className="w-4 h-4 text-[#2C6975]" />
                  <span className="text-sm text-gray-900">View in Microsoft Calendar</span>
                </a>
                <button 
                  onClick={() => {
                    const nextEvent = upcomingEvents[0];
                    if (nextEvent?.meetingLink) {
                      window.open(nextEvent.meetingLink, '_blank');
                    }
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <Video className="w-4 h-4 text-[#2C6975]" />
                  <span className="text-sm text-gray-900">Join Next Session</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <Play className="w-4 h-4 text-[#2C6975]" />
                  <span className="text-sm text-gray-900">View All Recordings</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <CalendarIcon className="w-4 h-4 text-[#2C6975]" />
                  <span className="text-sm text-gray-900">Download iCal Feed</span>
                </button>
              </div>
            </div>

            {/* Microsoft Stream Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#5558AF] text-white flex items-center justify-center flex-shrink-0">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-900 mb-1">About Recordings</h4>
                  <p className="text-xs text-gray-600">
                    All sessions are recorded and automatically uploaded to Microsoft Stream. Transcripts are generated within 24 hours of the session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
