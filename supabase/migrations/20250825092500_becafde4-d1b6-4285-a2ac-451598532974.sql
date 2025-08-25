-- Create blogs table for admin-managed blog posts
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Namo Namkeen Team',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can manage all blogs" 
ON public.blogs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_blogs_updated_at();

-- Insert existing blog posts
INSERT INTO public.blogs (title, slug, excerpt, content, image_url) VALUES
(
  'Why Indori Namkeen is Famous All Over India',
  'why-indori-namkeen-famous',
  'Discover the rich history and unique flavors that make Indori namkeen a beloved snack across the nation.',
  '# Why Indori Namkeen is Famous All Over India

Indore, the commercial capital of Madhya Pradesh, has gifted India with some of the most delicious and unique namkeen varieties. The city''s rich culinary heritage dates back centuries, making it a hub for authentic Indian snacks.

## The Secret Behind Indori Namkeen

### Traditional Recipes Passed Down Generations
The recipes for Indori namkeen have been carefully preserved and passed down through generations of skilled artisans. Each family has their own secret blend of spices and techniques.

### Premium Quality Ingredients
- **Fresh Gram Flour**: Only the finest quality besan is used
- **Aromatic Spices**: Carefully selected spices from across India
- **Pure Oil**: Traditional cooking methods with pure vegetable oil
- **No Artificial Preservatives**: Natural ingredients ensure authentic taste

## What Makes Indori Namkeen Special

### Unique Texture and Taste
Indori namkeen is known for its perfect balance of:
- **Crispiness**: Achieved through traditional frying methods
- **Spice Levels**: Perfect blend of heat and flavor
- **Freshness**: Made fresh daily using time-tested techniques

### Popular Varieties from Indore
1. **Ratlami Sev**: The crown jewel of Indori namkeen
2. **Khatta Meetha**: Perfect sweet and sour combination
3. **Mixture**: A delightful mix of various ingredients
4. **Ujjaini Sev**: Another regional specialty

## Why Choose Namo Namkeen

At Namo Namkeen, we maintain the authentic taste of traditional Indori recipes while ensuring:
- **Hygiene Standards**: Modern packaging with traditional taste
- **Quality Assurance**: Every batch is quality tested
- **Fresh Delivery**: Direct from Indore to your doorstep
- **Authentic Recipes**: No compromise on traditional methods

## Health Benefits

Contrary to popular belief, traditional namkeen made with quality ingredients offers:
- **Protein**: From gram flour and lentils
- **Healthy Fats**: When made with pure oil
- **Digestive Spices**: Cumin, coriander aid digestion
- **Energy**: Perfect evening snack for instant energy

## Conclusion

Indori namkeen represents more than just a snack - it''s a cultural heritage that brings families together. The unique combination of traditional recipes, quality ingredients, and skilled craftsmanship makes it famous nationwide.

**Order authentic Indori namkeen from Namo Namkeen and experience the real taste of Indore delivered fresh to your home!**',
  '/images/productImages/gujratiMixture.jpg'
),
(
  'Top 5 Namkeen You Must Try from Indore',
  'top-5-namkeen-indore',
  'Explore the must-try namkeen varieties from Indore that will tantalize your taste buds.',
  '# Top 5 Namkeen You Must Try from Indore

Indore is synonymous with delicious namkeen, and if you''re a snack lover, these five varieties are absolutely unmissable. Each has its own unique flavor profile and texture that represents the authentic taste of Indore.

## 1. Ratlami Sev - The King of All Sevs

### What Makes It Special
Ratlami Sev is not just a snack; it''s an emotion for people from Madhya Pradesh. This fine, crispy sev has a distinctive taste that sets it apart from regular sev.

### Key Features:
- **Ultra-fine texture**: Much finer than regular sev
- **Perfect spice blend**: Just the right amount of heat
- **Shelf life**: Stays fresh for weeks when stored properly
- **Versatility**: Perfect as a standalone snack or topping

### Best Enjoyed With:
- Evening tea
- As a topping on chaat
- Mixed with chopped onions and coriander

## 2. Khatta Meetha - The Perfect Balance

### The Sweet and Sour Delight
This namkeen perfectly captures the essence of Indian flavors with its unique combination of sweet and tangy tastes.

### Ingredients Include:
- **Sev and boondi**: For the base crunch
- **Dried fruits**: Raisins and dates for sweetness
- **Spices**: Chaat masala for tanginess
- **Nuts**: Peanuts for extra crunch

### Perfect For:
- Festival celebrations
- Office snacking
- Kids'' favorite healthy treat

## 3. Dal Moth - The Protein-Rich Snack

### Nutritious and Delicious
Dal Moth is a healthy namkeen option packed with protein and flavor.

### Health Benefits:
- **High Protein**: From various lentils
- **Fiber Rich**: Good for digestion
- **Iron Content**: From green moong and chana
- **Low Oil**: Traditionally roasted, not deep-fried

### Best Consumption Time:
- Pre-workout snack
- Evening hunger pangs
- Healthy munching option

## 4. Mixture - The All-in-One Delight

### The Complete Snack Experience
Indori mixture is a carefully crafted blend of various namkeen items, offering multiple textures and flavors in every bite.

### Components:
- **Different types of sev**: Various thicknesses
- **Peanuts**: Roasted to perfection
- **Curry leaves**: For aromatic flavor
- **Spices**: Secret blend of Indori spices

### Why It''s Popular:
- **Variety**: Something for everyone
- **Convenience**: Complete snack in one pack
- **Sharing**: Perfect for family gatherings

## 5. Cornflakes Sweet Mix - The Modern Twist

### Traditional Meets Modern
This innovative namkeen combines the crunch of cornflakes with traditional Indian flavors.

### Unique Selling Points:
- **Light and crispy**: Easy to digest
- **Sweet coating**: Appeals to all age groups
- **Modern ingredient**: Cornflakes add nutrition
- **Festive appeal**: Great for celebrations

### Ideal For:
- Children''s snack boxes
- Light evening munchies
- Festival treats

## How to Choose Quality Namkeen

### Signs of Fresh Namkeen:
1. **Crispy texture**: Should not be soggy
2. **Vibrant color**: Natural, not artificial
3. **Fresh aroma**: Should smell appetizing
4. **Proper packaging**: Sealed and hygienic

### Storage Tips:
- Store in airtight containers
- Keep away from moisture
- Consume within recommended time
- Avoid direct sunlight

## Why Order from Namo Namkeen?

### Our Promise:
- **Authentic recipes**: Traditional Indori taste
- **Fresh preparation**: Made in small batches
- **Quality ingredients**: No compromise on quality
- **Hygienic packaging**: Food-grade materials
- **Fast delivery**: Fresh from Indore to your doorstep

## Conclusion

These five namkeen varieties represent the best of Indori snack culture. Each offers a unique taste experience that has made Indore famous across India for its exceptional namkeen.

**Ready to experience authentic Indori flavors? Order your favorite namkeen from Namo Namkeen today and get them delivered fresh to your home!**

*Which of these namkeen is your favorite? Try them all and discover your personal preference!*',
  '/images/productImages/cornflakesSweetMix.jpg'
),
(
  'How Namo Namkeen Delivers Fresh Snacks Across India',
  'namo-namkeen-delivery-process',
  'Learn about our commitment to delivering the freshest Indori namkeen across India with our advanced logistics.',
  '# How Namo Namkeen Delivers Fresh Snacks Across India

At Namo Namkeen, we understand that the key to great namkeen is freshness. Our comprehensive delivery system ensures that the authentic taste of Indore reaches your doorstep in perfect condition, no matter where you are in India.

## Our Fresh-to-Door Promise

### Daily Fresh Production
- **Small Batch Preparation**: We prepare namkeen in small batches daily
- **Quality Control**: Each batch undergoes strict quality checks
- **Same Day Packaging**: Products are packaged within hours of preparation
- **Temperature Controlled Storage**: Maintaining optimal freshness conditions

## Advanced Packaging Technology

### Multi-Layer Protection
Our packaging system includes:

#### Primary Packaging:
- **Food-grade materials**: 100% safe for food contact
- **Moisture barriers**: Prevents humidity damage
- **Oxygen absorbers**: Maintains crispiness
- **Tamper-evident seals**: Ensures product integrity

#### Secondary Packaging:
- **Cushioned boxes**: Prevents crushing during transit
- **Fragile handling labels**: Ensures careful handling
- **Temperature indicators**: Monitors storage conditions

## Logistics Network Across India

### Zone-wise Distribution
We''ve strategically divided India into delivery zones for optimal freshness:

#### Zone 1: Central India (1-2 Days)
- Madhya Pradesh, Chhattisgarh
- **Delivery Time**: 24-48 hours
- **Freshness Guarantee**: 98% retention

#### Zone 2: North & West India (2-3 Days)  
- Delhi, Punjab, Rajasthan, Gujarat, Maharashtra
- **Delivery Time**: 48-72 hours
- **Freshness Guarantee**: 95% retention

#### Zone 3: South & East India (3-4 Days)
- Karnataka, Tamil Nadu, Andhra Pradesh, West Bengal
- **Delivery Time**: 72-96 hours
- **Freshness Guarantee**: 92% retention

## Quality Assurance During Transit

### Temperature Management
- **Climate-controlled vehicles**: For long-distance transport
- **Insulated packaging**: For temperature-sensitive items
- **Real-time monitoring**: Temperature tracking throughout journey

### Handling Protocols
- **Trained personnel**: Specialized in food product handling
- **Gentle handling**: Minimal movement to prevent breakage
- **Priority processing**: Namkeen gets expedited handling

## Technology Integration

### Order Tracking System
- **Real-time updates**: Track your order from preparation to delivery
- **SMS notifications**: Updates at every stage
- **Expected delivery time**: Accurate time predictions
- **Delivery confirmation**: Photo confirmation upon delivery

### Quality Feedback Loop
- **Customer feedback**: Continuous improvement based on reviews
- **Return policy**: Easy returns for unsatisfactory products
- **Quality reports**: Regular analysis of delivery quality

## Special Delivery Services

### Express Delivery
- **Same-day delivery**: Available in select cities
- **Priority processing**: Expedited preparation and dispatch
- **Premium packaging**: Extra protection for express orders

### Bulk Orders
- **Corporate deliveries**: Special handling for office orders
- **Event catering**: Large quantity fresh delivery
- **Wholesale pricing**: Better rates for bulk purchases

### Gift Packaging
- **Festival specials**: Beautiful packaging for occasions
- **Custom messages**: Personalized notes
- **Premium presentation**: Gift-ready packaging

## Seasonal Considerations

### Monsoon Precautions
- **Extra moisture protection**: Enhanced barrier packaging
- **Modified routes**: Avoiding flood-prone areas
- **Extended storage**: Climate-controlled warehousing

### Summer Adaptations
- **Cool chain logistics**: Refrigerated transport when needed
- **Early morning delivery**: Avoiding peak heat hours
- **Insulated packaging**: Extra protection from heat

## Customer-Centric Approach

### Flexible Delivery Options
- **Choose your slot**: Morning, afternoon, or evening delivery
- **Weekend delivery**: Available across all zones
- **Leave at door**: Contactless delivery option
- **Specific instructions**: Custom delivery preferences

### Communication Excellence
- **Pre-delivery call**: Confirmation before delivery attempt
- **Multiple contact attempts**: Ensuring successful delivery
- **Rescheduling options**: Flexible delivery timing
- **Customer support**: 24/7 assistance

## Sustainability Initiatives

### Eco-Friendly Packaging
- **Recyclable materials**: Environmentally responsible packaging
- **Minimal packaging**: Reducing waste without compromising protection
- **Biodegradable options**: Where technically feasible

### Carbon Footprint Reduction
- **Route optimization**: Efficient delivery routes
- **Consolidated shipments**: Reducing individual trips
- **Local partnerships**: Regional distribution centers

## Quality Metrics We Track

### Freshness Indicators
- **Crispiness retention**: Texture quality upon delivery
- **Flavor integrity**: Taste consistency
- **Visual appeal**: Product appearance
- **Shelf life remaining**: Days of freshness left

### Delivery Performance
- **On-time delivery**: 95%+ delivery in promised timeframe
- **Damage-free delivery**: 99%+ products reach intact
- **Customer satisfaction**: Regular surveys and feedback
- **Return rate**: Less than 1% due to quality issues

## Future Innovations

### Upcoming Enhancements
- **Drone delivery**: Pilot projects in select cities
- **AI-powered logistics**: Predictive delivery optimization  
- **Smart packaging**: IoT-enabled freshness monitoring
- **Subscription service**: Regular automated deliveries

## Conclusion

Our commitment to delivering fresh, authentic Indori namkeen across India is backed by robust logistics, advanced packaging, and customer-centric service. We continuously invest in technology and processes to ensure that every bite of Namo Namkeen tastes as fresh as if it were made in your kitchen.

**Experience the difference of truly fresh namkeen delivery. Order from Namo Namkeen today and taste the authentic flavors of Indore, delivered fresh to your doorstep!**

*Have questions about our delivery process? Contact our customer support team for detailed information about delivery to your area.*',
  '/images/productImages/delicusMixture.jpg'
),
(
  'Difference Between Ratlami Sev and Normal Sev',
  'ratlami-sev-vs-normal-sev',
  'Understand what makes Ratlami Sev unique and why it stands apart from regular sev varieties.',
  '# Difference Between Ratlami Sev and Normal Sev

If you''ve ever wondered what makes Ratlami Sev so special compared to regular sev, you''re not alone. This comprehensive guide will help you understand the distinct characteristics that make Ratlami Sev a premium namkeen choice.

## Historical Background

### Origin of Ratlami Sev
- **Birthplace**: Ratlam district in Madhya Pradesh
- **History**: Over 100 years of traditional preparation
- **Cultural significance**: Integral part of Malwa region cuisine
- **Recognition**: Geographical indication tag for authenticity

### Normal Sev Evolution
- **Widespread production**: Made across various regions
- **Variations**: Different states have their own versions
- **Commercial adaptation**: Mass production techniques
- **Availability**: Easily found in most markets

## Key Differences

### 1. Texture and Fineness

#### Ratlami Sev:
- **Ultra-fine strands**: Much thinner than regular sev
- **Delicate texture**: Melts in mouth
- **Uniform thickness**: Consistent strand diameter
- **Crispy factor**: Exceptional crunchiness

#### Normal Sev:
- **Thicker strands**: Generally wider diameter
- **Coarser texture**: More substantial bite
- **Variable thickness**: May have inconsistent strands
- **Standard crispiness**: Good but not exceptional

### 2. Ingredient Quality and Composition

#### Ratlami Sev Ingredients:
- **Premium gram flour**: Specially selected fine besan
- **Specific spice blend**: Secret mixture of aromatic spices
- **Pure oil**: Traditional cold-pressed oils
- **No additives**: Minimal processing agents

#### Normal Sev Ingredients:
- **Standard gram flour**: Regular quality besan
- **Common spices**: Basic spice combinations
- **Commercial oil**: Refined oils for cost efficiency
- **Preservatives**: May contain artificial preservatives

### 3. Preparation Method

#### Traditional Ratlami Sev Process:
1. **Dough preparation**: Specific consistency and resting time
2. **Specialized equipment**: Traditional sev machines with fine holes
3. **Oil temperature**: Precisely controlled frying temperature
4. **Timing**: Exact frying duration for perfect texture
5. **Cooling process**: Gradual cooling for optimal crispiness

#### Normal Sev Process:
1. **Standard mixing**: Regular dough preparation
2. **Common equipment**: Standard sev-making machines
3. **Variable temperature**: Less precise temperature control
4. **Bulk processing**: Focus on quantity over precision
5. **Quick cooling**: Faster processing for commercial efficiency

## Taste Profile Comparison

### Ratlami Sev Flavor:
- **Balanced spicing**: Perfect heat-to-flavor ratio
- **Aromatic experience**: Rich, complex flavor notes
- **Lingering taste**: Flavors develop and last longer
- **No artificial aftertaste**: Clean, natural finish

### Normal Sev Flavor:
- **Simple taste**: Straightforward spice profile
- **Immediate flavor**: Quick taste sensation
- **Short-lived**: Flavor doesn''t linger as long
- **May have additives**: Artificial flavor enhancers

## Visual Differences

### Ratlami Sev Appearance:
- **Golden yellow color**: Natural, appetizing hue
- **Fine, hair-like strands**: Delicate appearance
- **Uniform coloring**: Consistent throughout
- **Natural shine**: From quality oil and proper frying

### Normal Sev Appearance:
- **Variable color**: May range from pale to dark yellow
- **Thicker strands**: More substantial appearance
- **Color inconsistency**: May have darker or lighter patches
- **Less lustrous**: May appear dull or over-processed

## Shelf Life and Storage

### Ratlami Sev:
- **Longer freshness**: Maintains crispiness longer
- **Better storage**: Resists moisture absorption
- **Quality retention**: Flavor remains consistent
- **Packaging sensitivity**: Requires proper airtight storage

### Normal Sev:
- **Standard shelf life**: Good but shorter than Ratlami
- **Moisture sensitive**: May become soggy faster
- **Flavor degradation**: May lose taste over time
- **Less demanding storage**: More forgiving storage conditions

## Price and Value

### Ratlami Sev Pricing:
- **Premium pricing**: Higher cost due to quality ingredients
- **Value for money**: Superior taste justifies cost
- **Artisanal product**: Handcrafted quality commands premium
- **Limited production**: Small batch production affects pricing

### Normal Sev Pricing:
- **Affordable**: Lower cost due to mass production
- **Volume availability**: Economies of scale pricing
- **Commercial product**: Machine-made efficiency
- **Widespread production**: Competition keeps prices low

## Nutritional Aspects

### Ratlami Sev Nutrition:
- **Higher protein**: Premium gram flour content
- **Better oil quality**: Healthier oil choices
- **Natural ingredients**: No artificial additives
- **Digestibility**: Traditional methods aid digestion

### Normal Sev Nutrition:
- **Standard protein**: Regular gram flour content
- **Variable oil quality**: Depends on manufacturer
- **Preservatives**: May contain artificial ingredients
- **Processing impact**: Heavy processing may affect nutrition

## Regional Preferences

### Where Ratlami Sev is Preferred:
- **Central India**: Traditional stronghold
- **Metro cities**: Premium snack market
- **Connoisseurs**: Those who appreciate fine textures
- **Festivals**: Special occasion consumption

### Normal Sev Popularity:
- **Pan-India**: Available and consumed everywhere
- **Daily consumption**: Regular snacking choice
- **Budget-conscious**: Price-sensitive consumers
- **Mass market**: Widely distributed product

## How to Identify Authentic Ratlami Sev

### Quality Indicators:
1. **Fineness test**: Should be extremely fine
2. **Color check**: Natural golden yellow
3. **Aroma test**: Rich, spicy fragrance
4. **Texture feel**: Should be crispy, not oily
5. **Taste test**: Balanced, complex flavors

### Common Imitations:
- **Thick strands**: Passed off as fine
- **Artificial coloring**: Unnaturally bright colors
- **Excessive oil**: Greasy texture
- **Strong artificial flavors**: Overpowering taste
- **Quick staleness**: Loses crispiness fast

## Best Uses for Each Type

### Ratlami Sev Applications:
- **Premium snacking**: Evening tea accompaniment
- **Garnishing**: Topping for upscale chaats
- **Gifts**: Premium gift packaging
- **Special occasions**: Festivals and celebrations

### Normal Sev Applications:
- **Daily consumption**: Regular household snacking
- **Cooking ingredient**: Mixed in various dishes
- **Street food**: Common chaat ingredient
- **Bulk consumption**: Parties and gatherings

## Making the Right Choice

### Choose Ratlami Sev If:
- You appreciate fine textures and premium quality
- Taste and authenticity matter more than price
- You''re buying for special occasions or gifts
- You want to experience traditional Indori flavors

### Choose Normal Sev If:
- You need everyday snacking options
- Budget is a primary consideration
- You''re buying in large quantities
- You''re using it as a cooking ingredient

## Conclusion

While both Ratlami Sev and normal sev have their place in Indian snacking culture, Ratlami Sev stands out for its exceptional fineness, authentic preparation methods, and superior taste profile. The price difference is justified by the quality of ingredients, traditional preparation methods, and the unique sensory experience it provides.

**Want to experience the authentic taste of Ratlami Sev? Order premium quality Ratlami Sev from Namo Namkeen and discover why it''s considered the king of all sevs!**

*Have you tried both varieties? Share your experience and let us know which one you prefer and why!*',
  '/images/productImages/ratalamiSev.jpg'
);