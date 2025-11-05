import { Calendar, CheckCircle, Trophy, Award } from 'lucide-react';
import { Badge } from './ui/badge';

interface EventStamp {
  id: string;
  name: string;
  date: Date;
  points: number;
  icon: string;
  category: 'workshop' | 'webinar' | 'community';
}

interface EventCreditsProps {
  events: EventStamp[];
  totalPoints: number;
}

const stampIcons = {
  workshop: '🛠️',
  webinar: '🎓',
  community: '👥'
};

export function EventCredits({ events, totalPoints }: EventCreditsProps) {
  const streakCount = calculateStreak(events);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-900">Event Participation</h3>
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-[#F9A03F]" />
          <span className="text-sm text-gray-700">{totalPoints} points earned</span>
        </div>
      </div>

      {/* Streak Indicator */}
      {streakCount > 0 && (
        <div className="bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 border border-[#F9A03F]/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
              <span className="text-white text-xl">🔥</span>
            </div>
            <div>
              <p className="text-sm text-gray-900">
                <span className="text-lg text-[#F9A03F]">{streakCount}</span> Event Streak!
              </p>
              <p className="text-xs text-gray-600">Keep attending to maintain your streak</p>
            </div>
          </div>
        </div>
      )}

      {/* Event Stamps */}
      <div>
        <h4 className="text-sm text-gray-700 mb-3">Event Stamps</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {events.slice(0, 6).map((event) => (
            <div
              key={event.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-[#7EB5C1] transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-2xl">{stampIcons[event.category]}</div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-gray-900 mb-1 line-clamp-2">{event.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <Badge className="bg-[#F9A03F]/10 text-[#F9A03F] text-xs">
                  +{event.points}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {events.length > 6 && (
          <button className="w-full mt-3 px-4 py-2 text-sm text-[#2C6975] hover:bg-gray-50 rounded-lg transition-colors">
            View all {events.length} events →
          </button>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm text-gray-700 mb-3 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-[#2C6975]" />
          <span>Recent Activity</span>
        </h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{stampIcons[event.category]}</span>
                <span className="text-gray-700">{event.name}</span>
              </div>
              <span className="text-[#F9A03F]">+{event.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateStreak(events: EventStamp[]): number {
  if (events.length === 0) return 0;
  
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  let streak = 0;
  let lastDate: Date | null = null;

  for (const event of sortedEvents) {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (!lastDate) {
      streak = 1;
      lastDate = eventDate;
    } else {
      const daysDiff = Math.floor((lastDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 7) {
        streak++;
        lastDate = eventDate;
      } else {
        break;
      }
    }
  }

  return streak;
}

// Event Feed Component
export function EventFeed() {
  const upcomingEvents = [
    {
      id: '1',
      name: 'Trail Talk: Building on Experience Cloud',
      date: new Date('2025-11-08'),
      time: '2:00 PM EST',
      points: 5,
      capacity: { current: 24, max: 30 },
      registered: false
    },
    {
      id: '2',
      name: 'Penny AI Workshop: Effective Prompting',
      date: new Date('2025-11-10'),
      time: '1:00 PM EST',
      points: 10,
      capacity: { current: 15, max: 25 },
      registered: false
    },
    {
      id: '3',
      name: 'Community Showcase: Capstone Presentations',
      date: new Date('2025-11-12'),
      time: '3:00 PM EST',
      points: 5,
      capacity: { current: 30, max: 50 },
      registered: true
    }
  ];

  const pastEvents = [
    {
      id: '4',
      name: 'Getting Started with Salesforce',
      date: new Date('2025-10-28'),
      points: 5,
      attended: true
    },
    {
      id: '5',
      name: 'Nonprofit Tech Trends 2025',
      date: new Date('2025-10-21'),
      points: 5,
      attended: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-[#7EB5C1] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{event.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <span>{event.time}</span>
                  </div>
                </div>
                <Badge className="bg-[#F9A03F]/10 text-[#F9A03F]">
                  +{event.points} pts
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{event.capacity.current} / {event.capacity.max} registered</span>
                    <span>{Math.round((event.capacity.current / event.capacity.max) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#7EB5C1] rounded-full"
                      style={{ width: `${(event.capacity.current / event.capacity.max) * 100}%` }}
                    />
                  </div>
                </div>

                {event.registered ? (
                  <Badge className="bg-green-500 text-white">
                    Registered ✓
                  </Badge>
                ) : (
                  <button className="px-4 py-2 bg-[#3B6A52] text-white text-sm rounded-lg hover:bg-[#2d5240] transition-colors">
                    RSVP
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div>
        <h3 className="text-lg text-gray-900 mb-4">Past Events</h3>
        <div className="space-y-2">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-900">{event.name}</p>
                  <p className="text-xs text-gray-500">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-700 text-xs">
                +{event.points} pts earned
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
