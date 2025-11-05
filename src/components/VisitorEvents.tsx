import { Calendar, Clock, Users, MapPin, ExternalLink, Video, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface VisitorEventsProps {
  onEnroll: () => void;
}

export function VisitorEvents({ onEnroll }: VisitorEventsProps) {
  const [rsvpedEvents, setRsvpedEvents] = useState<number[]>([]);

  const handleRSVP = (eventId: number) => {
    if (!rsvpedEvents.includes(eventId)) {
      setRsvpedEvents([...rsvpedEvents, eventId]);
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Introduction to Salesforce for Nonprofits',
      type: 'Webinar',
      date: 'Nov 8, 2025',
      time: '2:00 PM - 3:30 PM EST',
      host: 'Sarah Martinez, Senior Learning Coach',
      attendees: 47,
      maxAttendees: 100,
      description: 'Learn the basics of Salesforce and discover how it powers mission-driven organizations worldwide.',
      topics: ['Salesforce fundamentals', 'Nonprofit use cases', 'Getting started guide'],
      location: 'Virtual (Zoom)',
      color: '#2C6975',
      public: true
    },
    {
      id: 2,
      title: 'Meet Penny: AI-Powered Learning Assistant',
      type: 'Workshop',
      date: 'Nov 12, 2025',
      time: '4:00 PM - 5:00 PM EST',
      host: 'Penny AI Team',
      attendees: 32,
      maxAttendees: 50,
      description: 'Interactive session with Penny, our AI learning guide. Learn how AI can accelerate your learning journey.',
      topics: ['AI-assisted learning', 'Personalized guidance', 'Live Q&A with Penny'],
      location: 'Virtual (Zoom)',
      color: '#F9A03F',
      public: true
    },
    {
      id: 3,
      title: 'Community Open House',
      type: 'Social Event',
      date: 'Nov 15, 2025',
      time: '6:00 PM - 7:30 PM EST',
      host: 'Transition Trails Team',
      attendees: 68,
      maxAttendees: 150,
      description: 'Meet current learners, coaches, and program alumni. Ask questions and learn about the full Academy experience.',
      topics: ['Networking', 'Program overview', 'Success stories', 'Live demos'],
      location: 'Virtual (Zoom)',
      color: '#7EB5C1',
      public: true
    },
    {
      id: 4,
      title: 'Career Pathways in Tech',
      type: 'Panel Discussion',
      date: 'Nov 20, 2025',
      time: '3:00 PM - 4:30 PM EST',
      host: 'Industry Professionals Panel',
      attendees: 89,
      maxAttendees: 200,
      description: 'Hear from tech professionals who transitioned into Salesforce careers. Learn about job opportunities and career growth.',
      topics: ['Career transitions', 'Job market insights', 'Salary expectations', 'Networking tips'],
      location: 'Virtual (Zoom)',
      color: '#3B6A52',
      public: true
    }
  ];

  const pastEvents = [
    {
      id: 101,
      title: 'Intro to Trail of Mastery Program',
      date: 'Oct 28, 2025',
      attendees: 124,
      recording: true
    },
    {
      id: 102,
      title: 'Nonprofit Tech Trends 2025',
      date: 'Oct 15, 2025',
      attendees: 96,
      recording: true
    },
    {
      id: 103,
      title: 'Success Stories: From Learner to Professional',
      date: 'Oct 5, 2025',
      attendees: 142,
      recording: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Visitor Banner */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5" />
            <div>
              <p className="text-sm">Public Events & Workshops</p>
              <p className="text-xs text-white/80">Free access to community events for all visitors</p>
            </div>
          </div>
          <button
            onClick={onEnroll}
            className="px-6 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Community Events</h1>
          <p className="text-gray-600">Join free workshops, webinars, and networking sessions</p>
        </div>

        {/* Penny Event Recommendations */}
        <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#7EB5C1]/5 border-2 border-[#7EB5C1]/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center flex-shrink-0 ring-4 ring-[#7EB5C1]/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-gray-900">Penny's Event Picks</h3>
                <Badge className="bg-[#7EB5C1] text-white text-xs">Recommended</Badge>
              </div>
              <p className="text-gray-700 mb-3">
                Based on your interest in Salesforce, I recommend starting with "Introduction to Salesforce for Nonprofits" 
                on Nov 8. It's perfect for beginners and will help you understand if this is the right path for you!
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#2C6975] text-white">Salesforce Intro - Nov 8</Badge>
                <Badge className="bg-[#F9A03F] text-white">Meet Penny - Nov 12</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                <div 
                  className="h-2"
                  style={{ backgroundColor: event.color }}
                ></div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl text-gray-900">{event.title}</h3>
                        <Badge style={{ backgroundColor: `${event.color}20`, color: event.color }}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      
                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{event.attendees} / {event.maxAttendees} attending</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Host:</span> {event.host}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.topics.map((topic, idx) => (
                            <Badge key={idx} className="bg-gray-100 text-gray-700 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {rsvpedEvents.includes(event.id) ? (
                        <>
                          <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
                            <div className="flex items-center justify-center space-x-2 mb-1">
                              <Trophy className="w-4 h-4" />
                              <span className="text-sm font-medium">You're Registered!</span>
                            </div>
                            <p className="text-xs">Check your email for details</p>
                          </div>
                          <button className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center justify-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span>Join Meeting</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleRSVP(event.id)}
                          className="px-4 py-3 text-white rounded-lg hover:opacity-90 transition-all text-sm"
                          style={{ backgroundColor: event.color }}
                        >
                          RSVP for Event
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Add to Calendar
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Event Capacity</span>
                      <span>{Math.round((event.attendees / event.maxAttendees) * 100)}% filled</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${(event.attendees / event.maxAttendees) * 100}%`,
                          backgroundColor: event.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Event Recordings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Video className="w-5 h-5 text-[#2C6975]" />
                  <Badge className="bg-[#2C6975]/10 text-[#2C6975] text-xs">Recording Available</Badge>
                </div>
                <h3 className="text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees} attended</span>
                  </p>
                </div>
                <button className="w-full py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center justify-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch Recording</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white rounded-xl p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl mb-3">Want Private Coaching Sessions?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Enrolled learners get access to weekly 1:1 coaching sessions, private workshops, 
            and exclusive community events.
          </p>
          <button
            onClick={onEnroll}
            className="px-8 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all inline-flex items-center space-x-2"
          >
            <span>Enroll in the Academy</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
