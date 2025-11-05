import { ShoppingBag, Filter, Search, Star, Lock, Sparkles, TrendingUp, Gift, Percent, ArrowRight, X, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExplorationPointsMeter } from './ExplorationPointsMeter';
import { ProductDetail } from './ProductDetail';
import { MemberGear } from './MemberGear';

interface Product {
  id: string;
  name: string;
  category: 'apparel' | 'accessories' | 'drinkware' | 'stationery';
  price: number;
  pointsValue: number; // Points that can be redeemed for discount
  image: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  stockQty: number;
  memberOnly?: boolean;
  featured?: boolean;
}

interface MerchStoreProps {
  isAuthenticated?: boolean;
  currentPoints?: number;
  onPointsRedeem?: (points: number) => void;
  onAddToCart?: (productId: string) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Trail Spirit Hoodie',
    category: 'apparel',
    price: 45,
    pointsValue: 450,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium hoodie featuring the Transition Trails logo. Soft cotton blend, perfect for coding sessions or trail walks.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Evergreen', 'Sky Blue', 'Charcoal'],
    stockQty: 24,
    featured: true
  },
  {
    id: '2',
    name: 'Trailblazer Mug',
    category: 'drinkware',
    price: 18,
    pointsValue: 180,
    image: 'https://images.unsplash.com/photo-1761384595903-9b339edd72ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtdWclMjBkcmlua3dhcmUlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzYyMzEzNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ceramic mug with badge tier designs. Microwave and dishwasher safe. 12oz capacity.',
    colors: ['White', 'Trail Cream'],
    stockQty: 48,
    featured: true
  },
  {
    id: '3',
    name: 'Learning Journey Notebook',
    category: 'stationery',
    price: 12,
    pointsValue: 120,
    image: 'https://images.unsplash.com/photo-1683270496324-a847d3533af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMHN0YXRpb25lcnklMjBkZXNrfGVufDF8fHx8MTc2MjMxMzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hardcover notebook with dotted pages. Track your progress, sketch flows, or journal your tech journey.',
    stockQty: 36,
  },
  {
    id: '4',
    name: 'Pathfinder T-Shirt',
    category: 'apparel',
    price: 28,
    pointsValue: 280,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Soft cotton tee with minimalist trail design. Perfect for casual wear or community events.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Evergreen', 'Amber', 'White'],
    stockQty: 32,
  },
  {
    id: '5',
    name: 'Badge Collection Sticker Pack',
    category: 'accessories',
    price: 8,
    pointsValue: 80,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Set of 12 vinyl stickers featuring all badge tiers and Penny AI. Weatherproof and laptop-ready.',
    stockQty: 60,
  },
  {
    id: '6',
    name: 'Trail Master Hoodie (Limited Edition)',
    category: 'apparel',
    price: 65,
    pointsValue: 650,
    image: 'https://images.unsplash.com/photo-1635439714465-3ed3e6a122e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwbWVyY2hhbmRpc2UlMjBhcHBhcmVsJTIwaG9vZGllfGVufDF8fHx8MTc2MjMxMzQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Exclusive hoodie with embroidered badge icons. Only available to Trail Master tier members.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Teal', 'Black'],
    stockQty: 12,
    memberOnly: true,
    featured: true
  },
];

export function MerchStore({ 
  isAuthenticated = false, 
  currentPoints = 0,
  onPointsRedeem,
  onAddToCart 
}: MerchStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showMemberGear, setShowMemberGear] = useState(false);
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'apparel', name: 'Apparel', icon: ShoppingBag },
    { id: 'accessories', name: 'Accessories', icon: Star },
    { id: 'drinkware', name: 'Drinkware', icon: Gift },
    { id: 'stationery', name: 'Stationery', icon: Filter },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isAccessible = !product.memberOnly || isAuthenticated;
    return matchesCategory && matchesSearch && isAccessible;
  });

  const featuredProducts = mockProducts.filter(p => p.featured && (!p.memberOnly || isAuthenticated));

  const calculateDiscount = (price: number) => {
    if (!isAuthenticated) return 0;
    const memberDiscount = price * 0.15; // 15% member discount
    return memberDiscount;
  };

  const calculatePointsDiscount = (pointsValue: number) => {
    // 10 points = $1
    return pointsValue / 10;
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#3B6A52] to-[#2C6975] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <Badge className="bg-[#F9A03F] text-white mb-4 px-4 py-1.5">
                Official Merch
              </Badge>
              <h1 className="text-5xl mb-4">Wear Your Trail</h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                Official Transition Trails merchandise. Show your Trail Spirit and support the community.
              </p>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                    Member Discount: 15% Off All Items
                  </Badge>
                  <Badge className="bg-[#F9A03F]/20 text-white px-4 py-2 text-sm">
                    {currentPoints} Points Available
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white px-4 py-2 text-sm border border-white/30">
                    🛍️ Shop Now • Free Shipping Over $50
                  </Badge>
                </div>
              )}
            </div>
            
            {isAuthenticated && (
              <div className="hidden lg:block">
                <ExplorationPointsMeter
                  currentPoints={currentPoints}
                  maxPoints={500}
                  variant="circular"
                  size="md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Visitor Enrollment CTA Banner */}
        {!isAuthenticated && (
          <div className="mb-8 bg-gradient-to-r from-[#F9A03F] to-[#e89135] rounded-xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-xl">Unlock Member Benefits!</h3>
                </div>
                <p className="text-white/90 mb-4 max-w-2xl">
                  Join Transition Trails Academy to get <strong>15% off all merch</strong> + earn points to redeem for FREE gear!
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✓ 15% Member Discount
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✓ Earn Points for Free Merch
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✓ Exclusive Member-Only Items
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✓ Early Access to New Drops
                  </Badge>
                </div>
                <button className="px-6 py-3 bg-white text-[#F9A03F] rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
                  <span>Join the Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden lg:block ml-6">
                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🎁</div>
                    <div className="text-xs text-white/80">Member</div>
                    <div className="text-xs text-white/80">Rewards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search merch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F] bg-white"
              />
            </div>

            {/* Cart */}
            <button className="px-6 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Cart ({cart.length})</span>
            </button>

            {/* Member Gear */}
            {isAuthenticated && (
              <button
                onClick={() => setShowMemberGear(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Members Only</span>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#3B6A52] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        {selectedCategory === 'all' && featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-[#F9A03F]" />
              <h2 className="text-2xl text-gray-900">Featured Items</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAuthenticated={isAuthenticated}
                  currentPoints={currentPoints}
                  onClick={() => setSelectedProduct(product)}
                  onAddToCart={() => setCart([...cart, product.id])}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">
            {selectedCategory === 'all' ? 'All Items' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAuthenticated={isAuthenticated}
                currentPoints={currentPoints}
                onClick={() => setSelectedProduct(product)}
                onAddToCart={() => setCart([...cart, product.id])}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No products found</p>
            </div>
          )}
        </div>

        {/* Penny's Recommendations */}
        <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#7EB5C1]/5 border-2 border-[#7EB5C1]/30 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-gray-900 mb-2">
                {isAuthenticated ? "Penny's Recommendation" : "Welcome to the Trail Shop!"}
              </h3>
              {isAuthenticated ? (
                <>
                  <p className="text-gray-700 mb-4">
                    "That Trail Spirit Hoodie screams Trail Spirit! You have {currentPoints} points — 
                    {currentPoints >= 450 
                      ? " enough to get it free! 🎉" 
                      : ` you're ${450 - currentPoints} points away from getting it free.`
                    }"
                  </p>
                  <button className="px-4 py-2 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors text-sm">
                    View Recommended Items
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    "Welcome! Browse our Trail gear and show your spirit. Members get 15% off everything plus the chance to earn FREE merch through points. Join the Academy to unlock member benefits!"
                  </p>
                  <button className="px-4 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors text-sm">
                    Learn About Member Benefits
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isAuthenticated={isAuthenticated}
          currentPoints={currentPoints}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            setCart([...cart, selectedProduct.id]);
            setSelectedProduct(null);
          }}
          onPointsRedeem={onPointsRedeem}
        />
      )}

      {/* Member Gear Modal */}
      {showMemberGear && (
        <MemberGear
          currentPoints={currentPoints}
          onClose={() => setShowMemberGear(false)}
          onProductSelect={(product) => {
            setShowMemberGear(false);
            setSelectedProduct(product);
          }}
        />
      )}
    </div>
  );
}

// Product Card Component
function ProductCard({ 
  product, 
  isAuthenticated, 
  currentPoints,
  onClick,
  onAddToCart
}: { 
  product: Product; 
  isAuthenticated: boolean; 
  currentPoints: number;
  onClick: () => void;
  onAddToCart: () => void;
}) {
  const memberDiscount = product.price * 0.15;
  const discountedPrice = product.price - memberDiscount;
  const canRedeemFull = currentPoints >= product.pointsValue;

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#F9A03F]/30 transition-all group text-left"
      style={{
        transform: 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 160, 63, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.memberOnly && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-[#F9A03F] text-white">
              <Lock className="w-3 h-3 mr-1" />
              Members Only
            </Badge>
          </div>
        )}
        {product.stockQty < 10 && (
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
        <div className="space-y-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price}</span>
                <Badge className="bg-green-500/10 text-green-700 text-xs">
                  <Percent className="w-3 h-3 mr-1" />
                  15% off
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {canRedeemFull ? (
                  <span className="text-[#F9A03F]">
                    ✨ Redeem {product.pointsValue} points (FREE!)
                  </span>
                ) : (
                  <span className="text-gray-600">
                    Or {product.pointsValue} points
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl text-gray-900">${product.price}</span>
              </div>
              <div className="bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded px-2 py-1">
                <p className="text-xs text-gray-700">
                  <strong className="text-[#F9A03F]">Members save ${memberDiscount.toFixed(2)}</strong> on this item
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
