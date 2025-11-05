import { Package, TrendingUp, Trophy, Sparkles, ChevronRight, Calendar, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Order {
  id: string;
  date: Date;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  pointsRedeemed: number;
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

interface OrderHistoryProps {
  orders?: Order[];
  currentPoints: number;
  totalPointsEarned: number;
  totalPointsSpent: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    date: new Date('2025-10-28'),
    items: [
      { name: 'Trail Spirit Hoodie', quantity: 1, price: 38.25 }
    ],
    total: 38.25,
    pointsRedeemed: 450,
    status: 'delivered',
    trackingNumber: 'TT-1234567890'
  },
  {
    id: 'ORD-2025-002',
    date: new Date('2025-10-15'),
    items: [
      { name: 'Trailblazer Mug', quantity: 2, price: 15.30 },
      { name: 'Badge Sticker Pack', quantity: 1, price: 6.80 }
    ],
    total: 22.10,
    pointsRedeemed: 180,
    status: 'delivered',
    trackingNumber: 'TT-0987654321'
  },
  {
    id: 'ORD-2025-003',
    date: new Date('2025-11-02'),
    items: [
      { name: 'Learning Journey Notebook', quantity: 1, price: 10.20 }
    ],
    total: 10.20,
    pointsRedeemed: 0,
    status: 'shipped',
    trackingNumber: 'TT-1122334455'
  }
];

export function OrderHistory({ 
  orders = mockOrders,
  currentPoints = 1250,
  totalPointsEarned = 2380,
  totalPointsSpent = 630
}: OrderHistoryProps) {
  // Calculate points flow data for chart
  const pointsFlowData = [
    { month: 'Aug', earned: 420, spent: 0 },
    { month: 'Sep', earned: 680, spent: 0 },
    { month: 'Oct', earned: 750, spent: 450 },
    { month: 'Nov', earned: 530, spent: 180 },
  ];

  // Calculate earned vs spent
  const earnedVsSpentData = [
    { category: 'Earned', value: totalPointsEarned, fill: '#3B6A52' },
    { category: 'Spent', value: totalPointsSpent, fill: '#F9A03F' },
    { category: 'Available', value: currentPoints, fill: '#7EB5C1' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">My Merch Orders</h2>
        <Badge className="bg-[#F9A03F] text-white">
          <Trophy className="w-4 h-4 mr-1" />
          {currentPoints} points available
        </Badge>
      </div>

      {/* Points Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#3B6A52] to-[#2C6975] text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Total Earned</span>
            <TrendingUp className="w-5 h-5 text-white/60" />
          </div>
          <div className="text-3xl mb-1">{totalPointsEarned}</div>
          <div className="text-white/80 text-xs">All-time points</div>
        </div>

        <div className="bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Total Spent</span>
            <Package className="w-5 h-5 text-white/60" />
          </div>
          <div className="text-3xl mb-1">{totalPointsSpent}</div>
          <div className="text-white/80 text-xs">On merch purchases</div>
        </div>

        <div className="bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Available Now</span>
            <Trophy className="w-5 h-5 text-white/60" />
          </div>
          <div className="text-3xl mb-1">{currentPoints}</div>
          <div className="text-white/80 text-xs">Ready to redeem</div>
        </div>
      </div>

      {/* Earned vs Spent Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg text-gray-900 mb-4">Points Flow</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earnedVsSpentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Points Over Time */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg text-gray-900 mb-4">Points Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pointsFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="earned" 
                stroke="#3B6A52" 
                strokeWidth={2}
                dot={{ fill: '#3B6A52', r: 4 }}
                name="Earned"
              />
              <Line 
                type="monotone" 
                dataKey="spent" 
                stroke="#F9A03F" 
                strokeWidth={2}
                dot={{ fill: '#F9A03F', r: 4 }}
                name="Spent"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg text-gray-900 mb-4">Order History</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#7EB5C1] transition-colors">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="text-sm text-gray-900">Order #{order.id}</h4>
                    <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.date.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg text-gray-900">${order.total.toFixed(2)}</div>
                  {order.pointsRedeemed > 0 && (
                    <div className="text-xs text-[#F9A03F]">
                      {order.pointsRedeemed} points redeemed
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </span>
                    </div>
                    <span className="text-gray-600">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Tracking & Penny Message */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                {order.trackingNumber && (
                  <div className="text-xs text-gray-600">
                    Tracking: <span className="text-gray-900">{order.trackingNumber}</span>
                  </div>
                )}
                
                {order.status === 'delivered' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1 flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700">Delivered</span>
                  </div>
                )}
              </div>

              {/* Penny's Message */}
              {order.status === 'delivered' && idx === 0 && (
                <div className="mt-3 bg-[#7EB5C1]/10 border border-[#7EB5C1]/30 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 italic">
                      <span className="text-gray-900">Penny says:</span> "Your {order.items[0].name.toLowerCase()} is on its way! Can't wait to see you rocking that Trail Spirit! 🎉"
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No orders yet</p>
            <p className="text-sm text-gray-500">Start shopping to see your order history here</p>
          </div>
        )}
      </div>
    </div>
  );
}
