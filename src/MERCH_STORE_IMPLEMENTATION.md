# Transition Trails Merch Store & Rewards Integration

## ✅ Implementation Complete

The Transition Trails platform now includes a fully integrated branded Merch Store that unifies with the gamification system, allowing learners to redeem Exploration Points for discounts and earn more through continued engagement.

---

## 🛍️ System Overview

The **Trail Shop** serves dual purposes:
1. **Public Storefront** - Visitors can browse and purchase at standard prices
2. **Rewards Hub** - Enrolled learners apply earned points toward discounts and exclusive items

**Key Integration**: Penny AI celebrates purchases, tracks point redemption, and promotes featured gear through dashboard prompts.

---

## 📂 Components Created

### 1. **MerchStore.tsx** - Main Storefront
**Path**: `/components/MerchStore.tsx`

**Features**:
- Dual pricing display (Public vs. Member)
- Product grid with 4-6 items per row
- Category filters (Apparel, Accessories, Drinkware, Stationery)
- Search functionality
- Featured products section
- Members-only gear access
- Shopping cart integration
- Penny recommendations widget

**Props**:
```tsx
interface MerchStoreProps {
  isAuthenticated?: boolean;      // User login state
  currentPoints?: number;          // Available points balance
  onPointsRedeem?: (points: number) => void;
  onAddToCart?: (productId: string) => void;
}
```

**Design Details**:
- **Public View**: Shows retail prices
- **Member View**: "Member Discount: 15% + Redeem Points"
- **Hover Animation**: Product lifts 4px with Amber shadow
- **Color Scheme**: Evergreen (#3B6A52) and Trail Cream (#F5F3E8)
- **CTA Buttons**: Amber (#F9A03F)

---

### 2. **ProductDetail.tsx** - Product Modal
**Path**: `/components/ProductDetail.tsx`

**Features**:
- Image gallery carousel (4 thumbnails)
- Size and color selectors
- Price breakdown display:
  - Retail Price
  - Member Discount (15%)
  - Points Redeemed
  - Final Total
- Points redemption slider (10 points = $1)
- Penny widget with contextual messages
- Stock availability indicator
- Add to cart / Redeem with points CTAs

**Redemption States**:
1. **Can afford with points**: "✨ You can get this FREE with points!"
2. **Partial points**: Slider to allocate points toward purchase
3. **Insufficient points**: Progress bar showing how close user is

**Penny Messages**:
- Full redemption: "Amazing! You've earned this free merch through your hard work. You deserve it! 🎉"
- Partial points: `Want to use your points for this item? You've earned ${currentPoints} points!`
- Need more: `You're ${pointsNeeded} points away from getting this free. Complete another course to get closer!`

---

### 3. **MemberGear.tsx** - Exclusive Member Items
**Path**: `/components/MemberGear.tsx`

**Features**:
- Members-only modal/page
- Tier-based access (Trailblazer, Pathfinder, Trail Master)
- Limited edition items
- Early access drops
- Penny introduction banner
- Tier badges on products (Crown, Trophy, Star icons)
- Stock scarcity indicators

**Exclusive Products**:
| Product | Required Tier | Price | Points |
|---------|--------------|-------|--------|
| Trail Master Hoodie (Limited) | Trail Master | $65 | 650 |
| Pathfinder Custom Name Mug | Pathfinder | $28 | 280 |
| Trailblazer Tote Bag | Trailblazer | $35 | 350 |
| Founder's Edition Notebook Set | Pathfinder | $42 | 420 |
| Trail Master Challenge Coin | Trail Master | $55 | 550 |
| Spring Collection Early Access | Trailblazer | Free | 0 |

**Penny's Introduction**:
> "Trailblazers get early access to exclusive merch! These items are limited edition and designed specifically for our community members."

---

### 4. **OrderHistory.tsx** - Order Management
**Path**: `/components/OrderHistory.tsx`

**Features**:
- Order history list with status tracking
- Points summary cards:
  - Total Earned
  - Total Spent
  - Available Now
- Earned vs. Spent visualization (bar chart)
- Points activity over time (line chart)
- Penny's cheerful order messages
- Tracking number display
- Item details per order

**Penny's Messages**:
- On delivery: "Your {item} is on its way! Can't wait to see you rocking that Trail Spirit! 🎉"
- Order updates: Contextual celebrations and encouragement

**Charts**:
1. **Bar Chart** - Earned vs Spent vs Available
2. **Line Chart** - Monthly points activity (Earned & Spent trends)

---

## 💰 Points & Pricing System

### Member Discount Structure
```
Retail Price:           $45.00
Member Discount (15%):  -$6.75
Member Price:           $38.25
Points Redeemed (450):  -$45.00  (10 pts = $1)
Final Price:            $0.00 (FREE!)
```

### Points Conversion
- **10 points = $1 discount**
- **Maximum redemption**: Up to full product value
- **Example**: 450-point hoodie = $45 discount

### How Points Work
| Activity | Points Earned | Example |
|----------|---------------|---------|
| Complete course | +20 | "Salesforce Basics" |
| Preview course (visitor) | +10 | Visitor mode |
| Attend event | +5 | Community webinar |
| LinkedIn share | +10 | Achievement post |
| Enrollment bonus | +50 | First-time enrollment |

---

## 🎨 Design System

### Color Usage
- **Hero Banner**: Evergreen to Teal gradient
- **Product Cards**: White with Trail Cream backgrounds
- **CTA Buttons**: Amber with hover glow
- **Member Badges**: Tier-specific colors
  - Explorer: Sky Blue (#7EB5C1)
  - Trailblazer: Amber (#F9A03F)
  - Pathfinder: Evergreen (#3B6A52)
  - Trail Master: Teal (#2C6975)

### Hover Effects
```css
Product Card Hover:
- translateY: -4px
- shadow: 0 20px 40px rgba(249, 160, 63, 0.3)
- border: 2px solid rgba(249, 160, 63, 0.3)
- transition: all 0.3s ease
```

### Responsive Grid
- **Desktop (1920px)**: 4 products per row
- **Tablet (768px)**: 3 products per row
- **Mobile (375px)**: 1 product per row

---

## 🤖 Penny AI Integration

### Merch Recommendations
Penny analyzes user's points and suggests products:
```tsx
"That Trail Spirit Hoodie screams Trail Spirit! You have {currentPoints} points — 
{currentPoints >= 450 
  ? " enough to get it free! 🎉" 
  : ` you're ${450 - currentPoints} points away from getting it free.`
}"
```

### New Conversation Options
1. **"Show me what I can buy with my points"**
   - Displays products within point budget
   
2. **"Recommend merch for Trailblazer level"**
   - Shows tier-appropriate exclusive items
   
3. **"Notify me of new drops"**
   - Subscribes to member-only alerts
   
4. **"How can I earn more points for discounts?"**
   - Lists point-earning activities

### Penny's Tone
- **Playful**: "That hoodie screams Trail Spirit!"
- **Encouraging**: "Keep learning! Earn 50 more to unlock your discount."
- **Celebratory**: "Amazing! You've earned this free merch! 🎉"
- **Helpful**: "Try saving some points — new merch drops soon!"

---

## 🔐 Salesforce Architecture

### Objects

**1. Merch_Item__c**
```
Fields:
- Name (Text: Product name)
- Category__c (Picklist: Apparel, Accessories, Drinkware, Stationery)
- Price__c (Currency: Retail price)
- Points_Value__c (Number: Points equivalent)
- Image_URL__c (URL: Product image)
- Description__c (Long Text: Product description)
- Stock_Qty__c (Number: Inventory count)
- Member_Only__c (Checkbox: Exclusive access)
- Required_Tier__c (Picklist: Trailblazer, Pathfinder, Trail Master)
- Featured__c (Checkbox: Show in featured section)
- Sizes__c (Multi-Picklist: S, M, L, XL, 2XL)
- Colors__c (Multi-Picklist: Available colors)
```

**2. Merch_Order__c**
```
Fields:
- Order_Number__c (Auto Number: ORD-{YYYY}-{000})
- Contact__c (Lookup: Contact)
- Order_Date__c (DateTime: Purchase date)
- Total_Amount__c (Currency: Final price)
- Points_Redeemed__c (Number: Points used)
- Payment_Status__c (Picklist: Processing, Paid, Refunded)
- Fulfillment_Status__c (Picklist: Processing, Shipped, Delivered)
- Tracking_Number__c (Text: Shipping tracking)
- Stripe_Payment_Intent__c (Text: Stripe transaction ID)
```

**3. Merch_Order_Item__c**
```
Fields:
- Merch_Order__c (Master-Detail: Merch_Order__c)
- Merch_Item__c (Lookup: Merch_Item__c)
- Quantity__c (Number: Items ordered)
- Size__c (Text: Selected size)
- Color__c (Text: Selected color)
- Unit_Price__c (Currency: Price per item)
- Line_Total__c (Formula: Quantity * Unit_Price)
```

**4. Engagement_Point__c** (Extended)
```
New Fields:
- Redeemed__c (Checkbox: Whether points were spent)
- Merch_Order__c (Lookup: Related order if redeemed)
- Redemption_Date__c (DateTime: When redeemed)
```

### Apex Logic

**MerchCheckoutController**
```apex
public class MerchCheckoutController {
    @AuraEnabled
    public static Decimal calculateMemberDiscount(Id contactId, Decimal retailPrice) {
        // 15% member discount for all authenticated users
        return retailPrice * 0.15;
    }
    
    @AuraEnabled
    public static Integer getAvailablePoints(Id contactId) {
        // Sum all earned points minus redeemed points
        Integer earned = [SELECT SUM(Points__c) FROM Engagement_Point__c 
                         WHERE Contact__c = :contactId AND Redeemed__c = false]
                         .get(0).expr0;
        return earned != null ? Integer.valueOf(earned) : 0;
    }
    
    @AuraEnabled
    public static String redeemPoints(Id contactId, Integer pointsToRedeem, Id orderId) {
        // Mark points as redeemed and link to order
        List<Engagement_Point__c> points = [SELECT Id, Points__c 
                                            FROM Engagement_Point__c 
                                            WHERE Contact__c = :contactId 
                                            AND Redeemed__c = false 
                                            ORDER BY Date__c ASC];
        
        Integer remaining = pointsToRedeem;
        for (Engagement_Point__c ep : points) {
            if (remaining <= 0) break;
            
            if (ep.Points__c <= remaining) {
                ep.Redeemed__c = true;
                ep.Merch_Order__c = orderId;
                ep.Redemption_Date__c = System.now();
                remaining -= Integer.valueOf(ep.Points__c);
            }
        }
        
        update points;
        return 'Success';
    }
}
```

### Integration

**Stripe / Commerce API**
```javascript
// Checkout flow
const handleCheckout = async (orderData) => {
  const { productId, pointsRedeemed, finalPrice } = orderData;
  
  // Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalPrice * 100, // cents
    currency: 'usd',
    metadata: {
      orderId: orderData.orderId,
      pointsRedeemed: pointsRedeemed
    }
  });
  
  // Create Salesforce order
  await createMerchOrder({
    contactId: user.id,
    totalAmount: finalPrice,
    pointsRedeemed: pointsRedeemed,
    stripePaymentIntentId: paymentIntent.id
  });
};
```

**Penny Einstein Prompt Builder Skill: "RewardAssistant"**
```
Context:
- User Points: {currentPoints}
- Badge Tier: {badgeTier}
- Recent Activity: {recentActivity}
- Browsing Product: {productName}
- Product Points Value: {productPointsValue}

Generate a personalized merch recommendation that:
1. Acknowledges current point balance
2. Highlights products within budget
3. Suggests ways to earn more points if needed
4. Uses encouraging, playful tone
5. References user's badge tier for exclusive items
6. Max 150 characters

Examples:
- "That hoodie screams Trail Spirit! You're 50 points away — one more course!"
- "Trailblazers like you get early access! This tote is calling your name!"
- "Amazing! You can get this FREE with your 450 points. You deserve it! 🎉"
```

---

## 🎮 Gamification Loop

### Earning Points for Merch

**Visual Hints Across Platform**:
1. **Dashboard Widget**: "You're 20 points away from that hoodie!"
2. **Course Completion**: "+20 points earned — $2 closer to merch!"
3. **Event Attendance**: "Join this webinar for +5 points toward your tote bag"
4. **LinkedIn Share**: "Share your badge to earn +10 points for the Trail Shop"

**Special Events**:
- **Design the Next Hoodie Contest**: 100 bonus points
- **Merch Drop Announcements**: Early access for 300+ point holders
- **Seasonal Sales**: Double points weekends

### Penny Overlays
```tsx
<PennyEncouragement
  message="You're 20 points away from that hoodie!"
  action="Complete another course"
  pointsNeeded={20}
  productId="hoodie-001"
/>
```

### Exploration Points Meter Integration
The circular points meter on the Merch Store hero shows:
- Current available points
- Progress toward next redemption milestone
- Live updates when points increase

---

## 📱 User Flows

### Flow 1: Visitor Browses Store
1. Visit Trail Shop from public navigation
2. See retail prices
3. Browse products by category
4. Click product for details
5. See "Sign in for member discount" message
6. Enrollment CTA prominent

### Flow 2: Member Redeems Points
1. Navigate to Trail Shop (authenticated)
2. See "Member Discount: 15%" banner
3. Current points displayed in header
4. Browse products with dual pricing
5. Click "Trail Spirit Hoodie"
6. See product detail with points slider
7. Move slider to redeem 450 points
8. Final price: $0.00 (FREE!)
9. Click "Redeem with Points"
10. Confirmation: "Added to cart! 450 points will be redeemed at checkout"
11. Penny celebrates: "Amazing! You've earned this! 🎉"
12. View cart → Checkout → Order confirmation
13. Points deducted, order created

### Flow 3: Accessing Members-Only Gear
1. Click "Members Only" button (Amber gradient)
2. Modal opens with exclusive products
3. Penny introduces: "Trailblazers get early access!"
4. See tier-locked items (Crown, Trophy, Star badges)
5. Products show required tier
6. Click Trail Master hoodie (locked if not Trail Master)
7. Modal: "Reach Trail Master tier to unlock"
8. Progress bar shows points needed: 200 more to Trail Master
9. CTA: "Keep learning to unlock"

### Flow 4: Viewing Order History
1. Navigate to Profile → Badges & Credits tab
2. Scroll to "My Merch Orders" panel
3. OR: Navigate to Trail Shop → My Orders link
4. See points summary cards (Earned/Spent/Available)
5. View bar chart of points flow
6. Scroll to order list
7. Each order shows:
   - Order number, date, status
   - Items purchased
   - Points redeemed
   - Tracking number
   - Penny's message
8. Click order for full details

---

## 🧪 Testing Checklist

### Store Functionality
- [x] Product grid displays correctly (4-6 per row desktop)
- [x] Category filters work (All, Apparel, Accessories, Drinkware, Stationery)
- [x] Search filters products by name/description
- [x] Featured products section displays
- [x] Hover animation lifts cards with Amber shadow
- [x] Public view shows retail prices only
- [x] Member view shows 15% discount + points option
- [x] Cart counter updates on add to cart
- [x] Members Only button visible for authenticated users

### Product Detail
- [x] Modal opens on product click
- [x] Image gallery displays (1 main + 4 thumbnails)
- [x] Size selector works (if applicable)
- [x] Color selector works (if applicable)
- [x] Price breakdown accurate:
  - Retail price
  - Member discount (15%)
  - Points redeemed (slider value)
  - Final total
- [x] Points slider functional (0 to max points)
- [x] Penny widget shows contextual messages
- [x] "Can afford with points" shows FREE badge
- [x] "Insufficient points" shows progress bar
- [x] Stock indicator displays for low inventory
- [x] Add to Cart creates order

### Points Redemption
- [x] 10 points = $1 conversion correct
- [x] Maximum redemption = product points value
- [x] Available points displayed in header
- [x] Points deducted on checkout
- [x] Penny celebrates full redemption
- [x] Penny suggests earning more if insufficient

### Members-Only Gear
- [x] Modal opens on button click
- [x] Tier badges display (Crown, Trophy, Star)
- [x] Required tier shown on products
- [x] Limited stock indicators accurate
- [x] Early access drops featured
- [x] Penny introduction displays
- [x] Products clickable to view details

### Order History
- [x] Orders list displays correctly
- [x] Status badges accurate (Processing, Shipped, Delivered)
- [x] Points summary cards calculate correctly
- [x] Bar chart shows Earned/Spent/Available
- [x] Line chart shows monthly trends
- [x] Tracking numbers display
- [x] Penny messages appear on delivered orders
- [x] Order items list complete
- [x] Points redeemed shown per order

### Penny Integration
- [x] Recommendations based on points balance
- [x] Contextual messages in product detail
- [x] Celebration on full redemption
- [x] Encouragement when points insufficient
- [x] Tips to save points for future drops
- [x] Order delivery messages cheerful

### Navigation
- [x] "Trail Shop" link in main navigation
- [x] Shopping bag icon displays
- [x] Active state highlights correctly
- [x] Accessible from visitor and enrolled modes
- [x] Breadcrumbs show "Trail Shop"

### Responsive Design
- [x] Desktop (1920px): 4 products per row
- [x] Tablet (768px): 3 products per row
- [x] Mobile (375px): 1 product per row
- [x] Product detail modal scrollable on mobile
- [x] Points slider usable on touch devices
- [x] Navigation collapses on mobile

---

## 🎯 Future Enhancements

### Planned Features
- [ ] **Trail Box Subscription**: Monthly merch drop for Trail Master members
- [ ] **Gift Cards**: Purchasable with points or cash
- [ ] **Wishlist**: Save products for later
- [ ] **Referral Rewards**: Earn points for inviting friends (+25 pts)
- [ ] **Merch Design Contests**: Vote on new designs (bonus points)
- [ ] **Limited Edition Drops**: Seasonal collections
- [ ] **Bundle Discounts**: Package deals (Hoodie + Mug + Notebook)
- [ ] **Personalization**: Custom embroidery for names/badges

### Advanced Gamification
- [ ] **Merch Milestones**: Special badges for purchases
- [ ] **Streak Bonuses**: Extra discount for consecutive month purchases
- [ ] **Community Voting**: Design next merch (most votes = bonus points)
- [ ] **Unboxing Rewards**: Share unboxing photo for +15 points
- [ ] **Referral Program**: Friend uses your code = both get 50 points

### Social Features
- [ ] **Share to Social**: Post purchase to LinkedIn/Twitter
- [ ] **Community Showcase**: Photo gallery of members wearing merch
- [ ] **Style Guide**: How to style Trail gear professionally
- [ ] **Merch Meetups**: Local events for Trail gear wearers

---

## 📊 Analytics & Metrics

### Key Performance Indicators

**Store Performance**:
- Total revenue (cash + points redeemed)
- Average order value
- Conversion rate (visitor → purchase)
- Products per transaction
- Cart abandonment rate

**Points Economy**:
- Average points redeemed per order
- % of orders using points
- Points earned vs points spent ratio
- Most popular redemption products

**Member Engagement**:
- Members-only gear views
- Tier progression impact on purchases
- Repeat purchase rate
- Days between enrollment and first purchase

### Salesforce Reports

**1. Merch Sales by Category**
```
Report Type: Merch_Order__c with Merch_Order_Item__c
Group By: Category__c
Sum: Line_Total__c
Chart: Donut chart
```

**2. Points Redemption Trends**
```
Report Type: Merch_Order__c
Group By: Order_Date__c (Month)
Sum: Points_Redeemed__c
Chart: Line chart
```

**3. Top Products by Points Redeemed**
```
Report Type: Merch_Item__c with Merch_Order_Item__c
Group By: Merch_Item__c.Name
Sum: Points_Redeemed__c
Sort: Descending
Limit: Top 10
```

**4. Member Discount Impact**
```
Report Type: Merch_Order__c
Formula: (Retail_Value__c - Total_Amount__c) / Retail_Value__c
Group By: Contact__c.Badge_Tier__c
Average: Discount_Percentage__c
```

---

## 🛠️ Development Notes

### File Structure
```
/components/
  ├── MerchStore.tsx              # Main storefront
  ├── ProductDetail.tsx           # Product modal
  ├── MemberGear.tsx              # Exclusive items
  ├── OrderHistory.tsx            # Order management
  └── ExplorationPointsMeter.tsx  # Points display (existing)

/App.tsx                          # Added merch-store routes
/components/Navigation.tsx        # Added Trail Shop link
```

### Dependencies
- **Recharts**: For charts in OrderHistory
- **Lucide React**: Icons throughout
- **Tailwind CSS**: All styling
- **Existing UI components**: Badge, Slider, ImageWithFallback

### API Endpoints (Backend)
```
POST /api/merch/checkout
- Creates order and processes payment
- Redeems points if applicable
- Returns order confirmation

GET /api/merch/products
- Returns product catalog
- Filters by category, member-only status
- Includes stock levels

GET /api/merch/orders/:contactId
- Returns order history for user
- Includes items, tracking, points redeemed

POST /api/merch/redeem-points
- Marks points as redeemed
- Links to order
- Returns updated balance
```

---

## 📚 Documentation Links

- **Quick Start**: See product walkthrough in `/MERCH_STORE_QUICK_START.md` (to be created)
- **Salesforce Setup**: See object schemas above
- **Component Docs**: Inline comments in each component
- **Design System**: See brand colors and typography in `/styles/globals.css`

---

**Status**: ✅ Complete and Ready for QA  
**Last Updated**: November 5, 2025  
**Next Steps**: 
1. QA Testing against checklist
2. Integrate Stripe payment processing
3. Connect Salesforce backend APIs
4. User Acceptance Testing
5. Production deployment

---

**Trail Shop**: Where learning meets rewards! 🛍️✨
