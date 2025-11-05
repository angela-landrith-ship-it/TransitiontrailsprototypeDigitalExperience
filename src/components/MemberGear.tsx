import { X, Lock, Crown, Trophy, Star, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  pointsValue: number;
  image: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  stockQty: number;
  memberOnly?: boolean;
  requiredTier?: 'trailblazer' | 'pathfinder' | 'trail-master';
}

interface MemberGearProps {
  currentPoints: number;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

const memberOnlyProducts: Product[] = [
  {
    id: 'm1',
    name: 'Trail Master Hoodie (Limited Edition)',
    category: 'apparel',
    price: 65,
    pointsValue: 650,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Exclusive hoodie with embroidered badge icons on sleeve. Premium heavyweight fabric. Only available to Trail Master tier members.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Teal', 'Black', 'Charcoal'],
    stockQty: 12,
    memberOnly: true,
    requiredTier: 'trail-master'
  },
  {
    id: 'm2',
    name: 'Pathfinder Custom Name Mug',
    category: 'drinkware',
    price: 28,
    pointsValue: 280,
    image: 'https://images.unsplash.com/photo-1761384595903-9b339edd72ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjBkcmlua3dhcmUlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzYyMzEzNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Personalized ceramic mug with your name and badge tier. Custom laser engraving. Available to Pathfinder tier and above.',
    colors: ['White', 'Evergreen', 'Teal'],
    stockQty: 25,
    memberOnly: true,
    requiredTier: 'pathfinder'
  },
  {
    id: 'm3',
    name: 'Trailblazer Exclusive Tote Bag',
    category: 'accessories',
    price: 35,
    pointsValue: 350,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Canvas tote with internal laptop sleeve. Features subtle badge design. Early access for Trailblazer members.',
    colors: ['Natural', 'Evergreen'],
    stockQty: 18,
    memberOnly: true,
    requiredTier: 'trailblazer'
  },
  {
    id: 'm4',
    name: 'Founder\'s Edition Notebook Set',
    category: 'stationery',
    price: 42,
    pointsValue: 420,
    image: 'https://images.unsplash.com/photo-1683270496324-a847d3533af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMHN0YXRpb25lcnklMjBkZXNrfGVufDF8fHx8MTc2MjMxMzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Limited edition set of 3 notebooks with gold foil stamping. Numbered series. Pathfinder tier exclusive.',
    stockQty: 8,
    memberOnly: true,
    requiredTier: 'pathfinder'
  },
  {
    id: 'm5',
    name: 'Trail Master Challenge Coin',
    category: 'accessories',
    price: 55,
    pointsValue: 550,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Heavy metal challenge coin with 3D design. Comes with display case. Trail Master tier only.',
    stockQty: 5,
    memberOnly: true,
    requiredTier: 'trail-master'
  },
  {
    id: 'm6',
    name: 'Early Access: Spring Collection Drop',
    category: 'apparel',
    price: 0,
    pointsValue: 0,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Get early access to our Spring 2025 collection before public launch. New hoodies, tees, and accessories coming soon!',
    stockQty: 999,
    memberOnly: true,
    requiredTier: 'trailblazer'
  }
];

export function MemberGear({ currentPoints, onClose, onProductSelect }: MemberGearProps) {
  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case 'trail-master': return Crown;
      case 'pathfinder': return Trophy;
      case 'trailblazer': return Star;
      default: return Lock;
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'trail-master': return '#2C6975';
      case 'pathfinder': return '#3B6A52';
      case 'trailblazer': return '#F9A03F';
      default: return '#7EB5C1';
    }
  };

  const getTierName = (tier?: string) => {
    switch (tier) {
      case 'trail-master': return 'Trail Master';
      case 'pathfinder': return 'Pathfinder';
      case 'trailblazer': return 'Trailblazer';
      default: return 'Member';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Members Only Gear</h2>
                <p className="text-white/80 text-sm">Exclusive merch for Trailblazers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Penny Introduction */}
          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white">
                  "Trailblazers get early access to exclusive merch! These items are limited edition and designed specifically for our community members."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberOnlyProducts.map((product) => {
              const TierIcon = getTierIcon(product.requiredTier);
              const tierColor = getTierColor(product.requiredTier);
              const tierName = getTierName(product.requiredTier);

              return (
                <button
                  key={product.id}
                  onClick={() => onProductSelect(product)}
                  className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#F9A03F]/30 transition-all group text-left"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Tier Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: tierColor }}
                      >
                        <TierIcon className="w-3 h-3 mr-1" />
                        {tierName}
                      </Badge>
                    </div>

                    {/* Limited Stock */}
                    {product.stockQty < 20 && product.stockQty > 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 text-white text-xs">
                          Only {product.stockQty} left!
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-gray-900 mb-2 group-hover:text-[#2C6975] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    {product.price > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg text-gray-900">
                            ${(product.price * 0.85).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          {currentPoints >= product.pointsValue ? (
                            <span className="text-[#F9A03F]">
                              ✨ Redeem {product.pointsValue} points
                            </span>
                          ) : (
                            <span className="text-gray-600">
                              {product.pointsValue} points
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Badge className="bg-[#F9A03F] text-white">
                          Coming Soon
                        </Badge>
                        <p className="text-xs text-gray-600">
                          Be the first to access new drops
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 mb-2">About Members Only Gear</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    • <strong>Limited Edition:</strong> These items are produced in small batches and may not return once sold out.
                  </p>
                  <p>
                    • <strong>Quality Guaranteed:</strong> Premium materials and construction with our Trail Spirit guarantee.
                  </p>
                  <p>
                    • <strong>Early Access:</strong> Members see new drops 48 hours before the public store.
                  </p>
                  <p>
                    • <strong>Points Redemption:</strong> Use your earned points for additional discounts or free items!
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
