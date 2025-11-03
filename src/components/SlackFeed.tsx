export function SlackFeed() {
  const messages = [
    {
      id: 1,
      author: 'Coach Sarah',
      avatar: '👩‍🏫',
      message: 'Great progress on your latest assignment! Keep it up.',
      time: '10 min ago',
      channel: 'coaching'
    },
    {
      id: 2,
      author: 'Team Lead',
      avatar: '👨‍💼',
      message: 'Reminder: Standup at 2 PM today',
      time: '1 hour ago',
      channel: 'team-updates'
    },
    {
      id: 3,
      author: 'Jamie',
      avatar: '👤',
      message: 'Anyone available for a quick code review?',
      time: '2 hours ago',
      channel: 'cohort-help'
    }
  ];

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className="pb-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center text-lg">
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-900">{msg.author}</p>
                <p className="text-xs text-gray-500">{msg.time}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
              <p className="text-xs text-[#2C6975] mt-1">#{msg.channel}</p>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full text-sm text-[#2C6975] hover:underline text-center py-2">
        View all messages in Slack →
      </button>
    </div>
  );
}
