/**
 * MERCH STORE - TRANSITION TRAILS SHOP
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Shop
 * URL Path: /s/shop
 * Primary Audiences: Visitor (view only), Learner (full access with points redemption)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: Product2 (Standard Salesforce Product)
 * Key Fields:
 * - Name (Text, 255) - Product name
 * - ProductCode (Text, 100) - SKU (e.g., "HOODIE-TEAL-L")
 * - Description (Long Text Area) - Product description
 * - Family (Picklist) - Apparel, Accessories, Drinkware, Stationery
 * - IsActive (Checkbox)
 * - StockKeepingUnit (Text, 180)
 * - QuantityUnitOfMeasure (Picklist) - Each
 * 
 * Custom Fields on Product2:
 * - Points_Value__c (Number) - Points redeemable (1 point = $0.10 discount)
 * - Image_URL__c (URL) - Product image from Salesforce Files
 * - Available_Sizes__c (Multi-Select Picklist) - S, M, L, XL, 2XL
 * - Available_Colors__c (Multi-Select Picklist) - Teal, Sky Blue, Forest Green, etc.
 * - Stock_Quantity__c (Number) - Current inventory
 * - Member_Only__c (Checkbox) - Requires authenticated learner
 * - Featured__c (Checkbox) - Show prominently on homepage
 * - Stripe_Price_ID__c (Text, 100) - Stripe price object ID
 * 
 * Related Object: PricebookEntry (Standard)
 * Fields: Product2Id, UnitPrice, IsActive, Pricebook2Id
 * 
 * Related Object: Order__c (Custom object for order tracking)
 * Fields:
 * - Order_Number__c (Auto-Number) - ORD-{00000}
 * - Purchaser__c (Lookup: User)
 * - Total_Amount__c (Currency) - Final price after discounts
 * - Points_Redeemed__c (Number) - Points used for discount
 * - Points_Discount__c (Currency) - Dollar value of points
 * - Order_Date__c (DateTime)
 * - Status__c (Picklist) - Pending, Paid, Shipped, Delivered, Cancelled
 * - Stripe_Payment_Intent_ID__c (Text, 100) - Stripe transaction reference
 * - Stripe_Session_ID__c (Text, 150) - Stripe checkout session
 * - Shipping_Address__c (Text Area)
 * - Tracking_Number__c (Text, 100)
 * 
 * Related Object: Order_Item__c (Order line items)
 * Fields:
 * - Order__c (Master-Detail: Order__c)
 * - Product__c (Lookup: Product2)
 * - Quantity__c (Number)
 * - Unit_Price__c (Currency)
 * - Selected_Size__c (Picklist)
 * - Selected_Color__c (Picklist)
 * - Subtotal__c (Formula) - Quantity * Unit_Price
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * - [CMS:shop_hero_title] → "Transition Trails Shop"
 * - [CMS:shop_hero_description] → "Celebrate your journey with official gear"
 * - [CMS:shop_member_discount_banner] → Member discount messaging
 * - [CMS:shop_points_redemption_info] → How to redeem points
 * 
 * Product Images:
 * - Stored as ContentVersion in Salesforce Files
 * - Product2.Image_URL__c → Public link to image
 * - Naming convention: product-{sku}-{view}.png (e.g., product-hoodie-teal-front.png)
 * 
 * =============================================================================
 * STRIPE PAYMENT INTEGRATION
 * =============================================================================
 * 
 * Payment Flow:
 * 1. User selects product, size, color, quantity
 * 2. Optionally redeems points (100 points = $10 discount)
 * 3. Clicks "Checkout" → Triggers Flow: Create_Stripe_Checkout_Session
 * 4. Apex creates Stripe Checkout Session with product details
 * 5. User redirected to Stripe hosted checkout page
 * 6. After payment → Stripe webhook fires → Updates Order__c.Status__c = 'Paid'
 * 7. Success page shows order confirmation
 * 
 * Apex Implementation:
 * 
 * StripeCheckoutController.cls:
 * - createCheckoutSession(productId, quantity, pointsToRedeem, size, color)
 *   → Returns Stripe session URL for redirect
 * 
 * - processWebhook(webhookPayload)
 *   → Validates Stripe webhook signature
 *   → Updates Order__c status
 *   → Deducts points from user balance
 *   → Sends confirmation email
 * 
 * Named Credential:
 * - Name: Stripe_API
 * - URL: https://api.stripe.com
 * - Authentication: Custom (API key in header)
 * - Header: Authorization: Bearer {!$Credential.Password}
 * 
 * Custom Metadata:
 * - Stripe_Configuration__mdt
 *   - Publishable_Key__c (visible to client)
 *   - Webhook_Secret__c (for signature validation)
 *   - Success_URL__c → /s/shop/success?session_id={CHECKOUT_SESSION_ID}
 *   - Cancel_URL__c → /s/shop?cancelled=true
 * 
 * Stripe Product Setup:
 * - Each Product2 maps to a Stripe Product
 * - Product2.Stripe_Price_ID__c stores the Stripe Price object ID
 * - Prices created in Stripe dashboard or via API
 * - Mode: Payment (one-time), not Subscription
 * 
 * =============================================================================
 * POINTS REDEMPTION SYSTEM
 * =============================================================================
 * 
 * Points Conversion Rate:
 * - 100 points = $10.00 discount (0.10 per point)
 * - Stored in Custom Setting: Points_Configuration__c.Dollar_Per_Point__c
 * 
 * Redemption Rules:
 * - Maximum: 50% of product price can be covered by points
 * - Minimum purchase: $5.00 after points discount
 * - Points deducted only after successful payment (webhook confirmation)
 * 
 * Implementation:
 * - User selects points slider (0 - available points)
 * - Real-time price calculation: finalPrice = basePrice - (points * 0.10)
 * - Stripe session includes: line_items with discounted price
 * - On webhook success: Create Points_Transaction__c (Type = 'Redeemed', Points = -pointsUsed)
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Flow: Create_Stripe_Checkout_Session
 *    Trigger: "Checkout" button click
 *    Input: productId, quantity, pointsToRedeem, size, color, userId
 *    Actions:
 *      - Validate points balance (User.Total_Points__c >= pointsToRedeem)
 *      - Calculate final price
 *      - Create Order__c record (Status = 'Pending')
 *      - Create Order_Item__c records
 *      - Call Apex: StripeCheckoutController.createCheckoutSession()
 *      - Redirect user to Stripe session URL
 * 
 * 2. Flow: Process_Stripe_Webhook
 *    Trigger: Platform Event from Apex (Stripe_Webhook_Event__e)
 *    Event Types: checkout.session.completed, payment_intent.succeeded
 *    Actions:
 *      - Update Order__c.Status__c = 'Paid'
 *      - Update Order__c.Stripe_Payment_Intent_ID__c
 *      - Create Points_Transaction__c (if points used)
 *      - Update Product2.Stock_Quantity__c (decrement)
 *      - Send confirmation email
 *      - Award purchase bonus points (+10% of spend)
 * 
 * 3. Trigger: OrderTrigger (After Update)
 *    Condition: Status__c changed to 'Paid'
 *    Action: Send order confirmation email with order details
 * 
 * =============================================================================
 * MEMBER DISCOUNTS
 * =============================================================================
 * 
 * Member Pricing:
 * - Learners (authenticated users) get 10% off all products
 * - Calculated in checkout flow
 * - Field: Order__c.Member_Discount_Applied__c (Checkbox)
 * - Member discount stacks with points redemption
 * 
 * Example Calculation:
 * - Base price: $45.00 (hoodie)
 * - Member discount (10%): -$4.50 → $40.50
 * - Points redeemed (200 points): -$20.00 → $20.50
 * - Final Stripe charge: $20.50
 * 
 * =============================================================================
 * VISITOR EXPERIENCE
 * =============================================================================
 * 
 * Visitors (unauthenticated) can:
 * - Browse all products
 * - View product details
 * - See full prices (no member discount)
 * - Click "Buy Now" → Prompted to log in or sign up
 * 
 * Conversion trigger:
 * - "Members save 10% + earn points!" banner
 * - Locked checkout flow redirects to registration
 * 
 * =============================================================================
 * INVENTORY MANAGEMENT
 * =============================================================================
 * 
 * Stock Tracking:
 * - Product2.Stock_Quantity__c decremented on successful order
 * - Out of stock: Product card shows "Out of Stock" badge
 * - Low stock (< 10): "Only X left!" urgency message
 * - Restock alerts: Admin receives notification when stock < 5
 * 
 * Admin Panel:
 * - Update stock quantities
 * - Upload new product images
 * - Set featured products
 * - View order analytics
 * 
 * =============================================================================
 * ORDER HISTORY & TRACKING
 * =============================================================================
 * 
 * User can view order history:
 * - Component: <OrderHistory> (separate tab or page)
 * - Query: SELECT * FROM Order__c WHERE Purchaser__c = :currentUserId
 * - Shows: Order number, date, items, total, status, tracking link
 * 
 * Shipping Integration (Future):
 * - ShipStation API for fulfillment
 * - Tracking numbers from webhook
 * - Email notifications on shipment
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Components → LWC:
 * - <MerchStore> → <c-merch-store>
 * - <ProductDetail> → <c-product-detail>
 * - <ExplorationPointsMeter> → <c-exploration-points-meter>
 * - <MemberGear> → <c-member-gear> (member-only products tab)
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Product cards have alt text on images
 * - Size/color selectors keyboard navigable
 * - Cart icon shows item count (aria-live)
 * - Checkout button disabled until valid selection
 * - Form validation with clear error messages
 * 
 * =============================================================================
 */

import { ShoppingBag, Filter, Search, Star, Lock, Sparkles, TrendingUp, Gift, Percent, ArrowRight, X, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExplorationPointsMeter } from './ExplorationPointsMeter';
import { ProductDetail } from './ProductDetail';
import { MemberGear } from './MemberGear';
import transitionTrailsLogo from 'figma:asset/9a4ab37fd35580740e0a1287c7b07dbd9912a379.png';

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
    name: 'Transition Trails Classic Hoodie',
    category: 'apparel',
    price: 45,
    pointsValue: 450,
    image: 'https://images.unsplash.com/photo-1627137727320-4a7c6782102a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFsJTIwaG9vZGllJTIwYXBwYXJlbHxlbnwxfHx8fDE3NjI1NTI3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium hoodie with embroidered Transition Trails logo on the chest. Ultra-soft cotton blend in signature Teal color.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Teal (#2C6975)', 'Sky Blue (#7EB5C1)', 'Forest Green (#3B6A52)'],
    stockQty: 24,
    featured: true
  },
  {
    id: '2',
    name: 'Transition Trails Trail Mug',
    category: 'drinkware',
    price: 18,
    pointsValue: 180,
    image: 'https://images.unsplash.com/photo-1640038382256-7db69d81cb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwY29mZmVlJTIwbXVnJTIwd2hpdGV8ZW58MXx8fHwxNzYyNTQxMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ceramic mug featuring the Transition Trails mountain and trail logo in rich teal. Perfect for your morning coffee or tea. 12oz.',
    colors: ['Cream (#F5F3E8)', 'White with Teal Logo'],
    stockQty: 48,
    featured: true
  },
  {
    id: '3',
    name: 'Transition Trails Journey Notebook',
    category: 'stationery',
    price: 12,
    pointsValue: 120,
    image: 'https://images.unsplash.com/photo-1611571741792-edb58d0ceb67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkY292ZXIlMjBub3RlYm9vayUyMGpvdXJuYWx8ZW58MXx8fHwxNzYyNTUyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hardcover notebook with Transition Trails branding and dotted pages. Document your learning journey. 160 pages.',
    stockQty: 36,
  },
  {
    id: '4',
    name: 'Transition Trails Pathfinder Tee',
    category: 'apparel',
    price: 28,
    pointsValue: 280,
    image: 'https://images.unsplash.com/photo-1666358085449-a10a39f33942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFsJTIwdHNoaXJ0JTIwY2FzdWFsfGVufDF8fHx8MTc2MjU1MjcwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Soft cotton tee with minimalist Transition Trails mountain logo. Comfortable fit for everyday wear or community events.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Forest Green (#3B6A52)', 'Orange Sunrise (#F9A03F)', 'Cream (#F5F3E8)'],
    stockQty: 32,
  },
  {
    id: '5',
    name: 'Transition Trails Sticker Pack',
    category: 'accessories',
    price: 8,
    pointsValue: 80,
    image: 'https://images.unsplash.com/photo-1761276297637-4418549ead2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHN0aWNrZXIlMjBwYWNrfGVufDF8fHx8MTc2MjU1MjcwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Set of 12 vinyl stickers featuring the Transition Trails logo, badge tiers, and Penny AI. Weatherproof, perfect for laptops.',
    stockQty: 60,
  },
  {
    id: '6',
    name: 'Transition Trails Trail Master Hoodie',
    category: 'apparel',
    price: 65,
    pointsValue: 650,
    image: 'https://images.unsplash.com/photo-1745825219087-802850857308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9vZGllJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjI1NDM1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Limited Edition premium hoodie with embroidered Transition Trails logo and Trail Master badge. Exclusive member-only design.',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Signature Teal (#2C6975)', 'Midnight Black'],
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
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#3B6A52] to-[#2C6975] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={transitionTrailsLogo} 
                  alt="Transition Trails Logo" 
                  className="w-20 h-20 rounded-xl shadow-lg bg-white/10 p-2"
                />
                <div>
                  <Badge className="bg-[#F9A03F] text-white mb-2 px-4 py-1.5">
                    Official Merch
                  </Badge>
                  <h1 className="text-5xl">Wear Your Trail</h1>
                </div>
              </div>
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
                    "The Transition Trails Classic Hoodie is perfect for you! You have {currentPoints} points — 
                    {currentPoints >= 450 
                      ? " enough to get it free! 🎉" 
                      : ` you're ${450 - currentPoints} points away from getting it free.`
                    } Show your Trail Spirit!"
                  </p>
                  <button className="px-4 py-2 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors text-sm">
                    View Recommended Items
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    "Welcome to the official Transition Trails shop! Browse our gear featuring our iconic mountain and trail logo. Members get 15% off everything plus the chance to earn FREE merch through points. Join the Academy to unlock member benefits!"
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
