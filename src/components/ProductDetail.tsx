import { X, ShoppingBag, Sparkles, TrendingUp, Check, ChevronLeft, ChevronRight, Percent, Star } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Slider } from './ui/slider';

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
}

interface ProductDetailProps {
  product: Product;
  isAuthenticated: boolean;
  currentPoints: number;
  onClose: () => void;
  onAddToCart: () => void;
  onPointsRedeem?: (points: number) => void;
}

export function ProductDetail({
  product,
  isAuthenticated,
  currentPoints,
  onClose,
  onAddToCart,
  onPointsRedeem
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [pointsToRedeem, setPointsToRedeem] = useState([0]);
  const [showCheckout, setShowCheckout] = useState(false);

  const memberDiscount = isAuthenticated ? product.price * 0.15 : 0;
  const basePrice = product.price - memberDiscount;
  
  // 10 points = $1
  const maxRedeemablePoints = Math.min(currentPoints, product.pointsValue);
  const pointsDiscountDollars = (pointsToRedeem[0] / 10);
  const finalPrice = Math.max(0, basePrice - pointsDiscountDollars);

  const canAffordWithPoints = currentPoints >= product.pointsValue;
  const pointsNeeded = product.pointsValue - currentPoints;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Product Image */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Gallery Placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-[#F9A03F] transition-colors"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selector */}
              {product.sizes && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedSize === size
                            ? 'border-[#3B6A52] bg-[#3B6A52] text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-[#3B6A52] bg-[#3B6A52] text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Retail Price</span>
                  <span className="text-sm text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Member Discount (15%)</span>
                      <span className="text-sm text-green-600">-${memberDiscount.toFixed(2)}</span>
                    </div>

                    {pointsToRedeem[0] > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Points Redeemed ({pointsToRedeem[0]} pts)</span>
                        <span className="text-sm text-[#F9A03F]">-${pointsDiscountDollars.toFixed(2)}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded px-3 py-2">
                    <p className="text-sm text-gray-700">
                      <strong className="text-[#F9A03F]">Members save ${memberDiscount.toFixed(2)}</strong> (15% off)
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Plus earn points for FREE merch!
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="text-lg text-gray-900">Total</span>
                  <span className="text-2xl text-gray-900">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Visitor Member Benefits CTA */}
              {!isAuthenticated && (
                <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-[#F9A03F]" />
                    <h4 className="text-sm text-gray-900">Unlock Member Benefits</h4>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Save ${memberDiscount.toFixed(2)} with 15% member discount</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Earn {product.pointsValue} points (worth ${(product.pointsValue / 10).toFixed(2)})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Redeem points for FREE merch in the future</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors text-sm">
                    Join the Academy to Save
                  </button>
                </div>
              )}

              {/* Points Redemption Slider */}
              {isAuthenticated && (
                <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#F9A03F]" />
                      <h4 className="text-sm text-gray-900">Use Your Points</h4>
                    </div>
                    <span className="text-sm text-gray-600">{currentPoints} available</span>
                  </div>

                  {canAffordWithPoints ? (
                    <div className="space-y-3">
                      <p className="text-sm text-[#F9A03F]">
                        ✨ You can get this FREE with points!
                      </p>
                      <Slider
                        value={pointsToRedeem}
                        onValueChange={setPointsToRedeem}
                        max={maxRedeemablePoints}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Points to redeem</span>
                        <span className="text-[#F9A03F]">{pointsToRedeem[0]} points</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        Keep learning! Earn {pointsNeeded} more points to unlock your discount.
                      </p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#F9A03F] rounded-full transition-all"
                          style={{ width: `${(currentPoints / product.pointsValue) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{currentPoints} pts</span>
                        <span>{product.pointsValue} pts needed</span>
                      </div>
                    </div>
                  )}

                  {/* Penny Tip */}
                  <div className="mt-3 p-3 bg-white/50 rounded-lg border border-[#F9A03F]/20">
                    <p className="text-xs text-gray-700 italic">
                      💡 <span className="text-gray-900">Penny's tip:</span> "Try saving some points — new merch drops soon!"
                    </p>
                  </div>
                </div>
              )}

              {/* Stock Info */}
              {product.stockQty < 10 && (
                <div className="flex items-center space-x-2 text-sm text-red-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Only {product.stockQty} left in stock!</span>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCheckout(true);
                  }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{finalPrice === 0 ? 'Redeem with Points' : 'Add to Cart'}</span>
                </button>
                
                {finalPrice === 0 && (
                  <div className="flex items-center justify-center px-4">
                    <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                      <Check className="w-5 h-5 mr-2" />
                      FREE!
                    </Badge>
                  </div>
                )}
              </div>

              {/* Penny Widget */}
              <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#7EB5C1]/5 border border-[#7EB5C1]/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">Penny says:</p>
                    <p className="text-sm text-gray-700">
                      {finalPrice === 0 
                        ? "Amazing! You've earned this free merch through your hard work. You deserve it! 🎉"
                        : canAffordWithPoints
                        ? `Want to use your points for this item? You've earned ${currentPoints} points!`
                        : `You're ${pointsNeeded} points away from getting this free. Complete another course to get closer!`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Confirmation Modal */}
        {showCheckout && (
          <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 rounded-full bg-green-500 mx-auto mb-4 flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">Added to Cart!</h3>
              <p className="text-gray-600 mb-6">
                {product.name} has been added to your cart.
                {pointsToRedeem[0] > 0 && (
                  <span className="block mt-2 text-[#F9A03F]">
                    {pointsToRedeem[0]} points will be redeemed at checkout.
                  </span>
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    onClose();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onAddToCart();
                    if (pointsToRedeem[0] > 0 && onPointsRedeem) {
                      onPointsRedeem(pointsToRedeem[0]);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
