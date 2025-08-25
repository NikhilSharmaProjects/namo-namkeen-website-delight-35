import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import CartSidebar from "@/components/CartSidebar";
import { useSEO } from "@/hooks/useSEO";
import { seoConfig } from "@/config/seo";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useSEO(seoConfig.pages.blog);

    const blogPosts = [
        {
            id: 1,
            title: "Why Indori Namkeen Is Famous All Over India",
            slug: "why-indori-namkeen-famous-india",
            excerpt: "Discover the rich history and unique flavors that make Indore's namkeen the most sought-after snacks across India. From traditional recipes to modern packaging.",
            content: `
                <h2>The Heritage of Indori Namkeen</h2>
                <p>Indore, the commercial capital of Madhya Pradesh, has been the epicenter of India's most beloved namkeen culture for over a century. The city's strategic location and rich culinary traditions have made it the undisputed king of savory snacks.</p>
                
                <h2>What Makes Indori Namkeen Special?</h2>
                <p><strong>Traditional Recipes:</strong> Passed down through generations, these recipes use specific spice blends and cooking techniques that create the perfect balance of flavor and texture.</p>
                <p><strong>Quality Ingredients:</strong> Indore's namkeen makers source the finest ingredients - from premium gram flour to authentic spices - ensuring consistent quality.</p>
                <p><strong>Unique Preparation Methods:</strong> The traditional oil temperature, timing, and hand-crafting techniques create the distinctive crunch and taste that sets Indori namkeen apart.</p>

                <h2>Popular Varieties from Indore</h2>
                <ul>
                    <li><strong>Ratlami Sev:</strong> The crown jewel of Indori snacks, known for its perfect spice level and crunch</li>
                    <li><strong>Khatta Meetha:</strong> A delightful mix of sweet and tangy flavors</li>
                    <li><strong>Mixture:</strong> A royal blend of various ingredients creating a symphony of textures</li>
                    <li><strong>Bhakarwadi:</strong> Spiral-shaped spicy rolls that melt in your mouth</li>
                </ul>

                <h2>Why Choose Authentic Indori Namkeen?</h2>
                <p>When you order authentic Indori namkeen from Namo Namkeen, you're not just buying snacks - you're experiencing a piece of India's culinary heritage. Our products maintain the traditional taste while meeting modern hygiene and quality standards.</p>
            `,
            image: "/images/productImages/ratalamiSev.jpg",
            date: "2024-01-15",
            author: "Namo Namkeen Team"
        },
        {
            id: 2,
            title: "Top 5 Namkeen You Must Try from Indore",
            slug: "top-5-namkeen-must-try-indore",
            excerpt: "Explore the five most popular Indori namkeen varieties that have won hearts across India. Each with its unique taste profile and traditional preparation method.",
            content: `
                <h2>1. Premium Ratlami Sev - The King of Indori Snacks</h2>
                <p>Ratlami Sev is undoubtedly the most famous export from Indore. This thin, crispy noodle-like snack is made from gram flour and a secret blend of spices that gives it its characteristic golden color and irresistible taste.</p>
                <p><strong>Why it's special:</strong> The authentic Ratlami Sev has the perfect balance of spice and salt, with a texture that's crispy yet melts in your mouth.</p>

                <h2>2. Satwik Khatta Meetha - Perfect Balance</h2>
                <p>This delightful mixture combines sweet and tangy elements, creating a flavor explosion that keeps you coming back for more. Made with 100% groundnut oil following Satwik principles.</p>
                <p><strong>Key ingredients:</strong> Sev, dried fruits, puffed rice, curry leaves, and a special tamarind-based seasoning.</p>

                <h2>3. Navratna Mixture - Royal Blend</h2>
                <p>As the name suggests, this mixture contains nine different ingredients, each adding its unique texture and flavor to create a truly royal snacking experience.</p>
                <p><strong>Perfect for:</strong> Festivals, celebrations, and when you want to treat your guests to something special.</p>

                <h2>4. Tikhi Bundi - For Spice Lovers</h2>
                <p>These perfectly round, bite-sized pieces pack a fiery punch that will awaken your taste buds. Made with premium spices and traditional techniques.</p>
                <p><strong>Spice level:</strong> High - perfect for those who love their snacks with a kick!</p>

                <h2>5. Delicus Mixture - The Modern Classic</h2>
                <p>A contemporary take on traditional mixture, combining classic ingredients with modern flavoring techniques to create a snack that appeals to all age groups.</p>
                <p><strong>Best enjoyed:</strong> With evening tea or as a movie-time snack with family.</p>

                <h2>Order Your Favorites Today</h2>
                <p>Experience these authentic Indori flavors delivered fresh to your doorstep. At Namo Namkeen, we ensure each product maintains its traditional taste while meeting modern quality standards.</p>
            `,
            image: "/images/productImages/navaratanMixture.jpg",
            date: "2024-01-10",
            author: "Chef Ramesh"
        },
        {
            id: 3,
            title: "How Namo Namkeen Delivers Fresh Snacks Across India",
            slug: "namo-namkeen-fresh-delivery-process",
            excerpt: "Learn about our comprehensive delivery system that ensures your favorite Indori snacks reach you fresh, crispy, and full of flavor, no matter where you are in India.",
            content: `
                <h2>Our Fresh-to-Door Promise</h2>
                <p>At Namo Namkeen, freshness isn't just a promise - it's our commitment. We've developed a comprehensive delivery system that ensures your favorite Indori snacks reach you in perfect condition, maintaining their authentic taste and crunch.</p>

                <h2>The Journey from Kitchen to Your Door</h2>
                <h3>1. Fresh Preparation</h3>
                <p>Every batch of namkeen is prepared fresh in our FSSAI-certified facilities in Indore. We follow traditional recipes while maintaining modern hygiene standards.</p>

                <h3>2. Quality Packaging</h3>
                <p>Our products are packed in food-grade, airtight containers that preserve freshness and prevent moisture. Each package is sealed immediately after preparation to lock in the authentic flavors.</p>

                <h3>3. Temperature-Controlled Storage</h3>
                <p>Before dispatch, all products are stored in temperature-controlled environments to maintain their quality and extend shelf life naturally.</p>

                <h3>4. Fast Dispatch</h3>
                <p>Orders are processed within 24 hours and dispatched through our network of reliable courier partners who understand the importance of handling food products with care.</p>

                <h2>Delivery Network Across India</h2>
                <p><strong>Metro Cities:</strong> Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad - 2-3 days delivery</p>
                <p><strong>Tier-2 Cities:</strong> Pune, Ahmedabad, Jaipur, Lucknow, Bhopal - 3-4 days delivery</p>
                <p><strong>Smaller Towns:</strong> We deliver to over 500+ locations across India - 4-5 days delivery</p>

                <h2>Ensuring Quality During Transit</h2>
                <ul>
                    <li>Protective packaging to prevent breakage</li>
                    <li>Moisture-resistant sealing</li>
                    <li>Fragile handling instructions for courier partners</li>
                    <li>Real-time tracking for all orders</li>
                    <li>Temperature monitoring for sensitive products</li>
                </ul>

                <h2>Customer Satisfaction Guarantee</h2>
                <p>If you're not completely satisfied with the freshness or quality of your order, we offer hassle-free returns and replacements. Your satisfaction is our priority.</p>

                <p><strong>Order Today:</strong> Experience the authentic taste of Indore delivered fresh to your doorstep, anywhere in India!</p>
            `,
            image: "/images/productImages/delicusMixture.jpg",
            date: "2024-01-05",
            author: "Operations Team"
        },
        {
            id: 4,
            title: "Difference Between Ratlami Sev & Normal Sev",
            slug: "ratlami-sev-vs-normal-sev-difference",
            excerpt: "Understanding what makes Ratlami Sev unique compared to regular sev. From ingredients to preparation methods, discover why Ratlami Sev is considered the premium choice.",
            content: `
                <h2>The Legend of Ratlami Sev</h2>
                <p>Ratlami Sev, originating from the city of Ratlam in Madhya Pradesh, is considered the gold standard of sev varieties in India. But what exactly sets it apart from regular sev found in local stores?</p>

                <h2>Key Differences Explained</h2>

                <h3>1. Ingredient Quality</h3>
                <p><strong>Ratlami Sev:</strong> Uses premium quality gram flour (besan) sourced from select regions, ensuring consistent texture and taste.</p>
                <p><strong>Normal Sev:</strong> Often uses mixed flours or lower-grade besan, resulting in inconsistent quality.</p>

                <h3>2. Spice Blend</h3>
                <p><strong>Ratlami Sev:</strong> Features a secret blend of spices including special varieties of red chili, turmeric, and aromatic spices that create the distinctive flavor.</p>
                <p><strong>Normal Sev:</strong> Uses standard spice combinations without the regional specialty blends.</p>

                <h3>3. Preparation Technique</h3>
                <p><strong>Ratlami Sev:</strong> Follows traditional methods with specific oil temperatures, timing, and hand-crafted techniques passed down through generations.</p>
                <p><strong>Normal Sev:</strong> Often mass-produced using automated processes that may compromise on texture and taste.</p>

                <h3>4. Texture & Appearance</h3>
                <p><strong>Ratlami Sev:</strong> Thin, uniform strands with a golden-yellow color and perfect crispiness that doesn't break easily.</p>
                <p><strong>Normal Sev:</strong> May vary in thickness and color, sometimes lacking the perfect crunch.</p>

                <h3>5. Flavor Profile</h3>
                <p><strong>Ratlami Sev:</strong> Balanced spice level with a distinctive aftertaste that's neither too mild nor overpowering.</p>
                <p><strong>Normal Sev:</strong> Often either too bland or too spicy, lacking the nuanced flavor balance.</p>

                <h2>Health Aspects</h2>
                <p><strong>Ratlami Sev (Authentic):</strong></p>
                <ul>
                    <li>No artificial preservatives</li>
                    <li>Uses high-quality oil for frying</li>
                    <li>Natural ingredients and spices</li>
                    <li>Better digestibility due to traditional preparation</li>
                </ul>

                <h2>How to Identify Authentic Ratlami Sev</h2>
                <ul>
                    <li>Golden-yellow color (not too bright or dull)</li>
                    <li>Uniform thickness of strands</li>
                    <li>Fresh, aromatic smell</li>
                    <li>Crispy texture that doesn't crumble easily</li>
                    <li>Balanced spice level</li>
                </ul>

                <h2>Why Choose Namo Namkeen's Ratlami Sev</h2>
                <p>Our Ratlami Sev maintains all the authentic characteristics while ensuring modern hygiene standards. Made fresh daily and delivered across India, it's the closest you can get to the original Ratlam experience.</p>

                <p><strong>Try the difference today</strong> - order our Premium Ratlami Sev and taste the authentic flavors that have made this snack famous across India!</p>
            `,
            image: "/images/productImages/ratalamiSev.jpg",
            date: "2024-01-01",
            author: "Food Expert Team"
        }
    ];

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <div className="pt-24">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-4">
                            Indori Snacks Blog & Stories
                        </h1>
                        <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
                            Discover the rich heritage of authentic Indore namkeen, traditional recipes, 
                            and fascinating stories behind India's most beloved snacks. Learn why Indori 
                            namkeen is considered the gold standard of Indian savory snacks.
                        </p>
                    </div>

                    <ScrollAnimation direction="up" delay={200}>
                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {blogPosts.map((post, index) => (
                                <article 
                                    key={post.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt={`${post.title} - Authentic Indori Namkeen by Namo Namkeen`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-warmBrown/60 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(post.date).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {post.author}
                                            </div>
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-warmBrown mb-3 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-warmBrown/70 mb-4 line-clamp-3 font-merriweather">
                                            {post.excerpt}
                                        </p>
                                        
                                        <Link 
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-saffron hover:text-saffron/80 font-semibold transition-colors"
                                        >
                                            Read Full Article
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation direction="up" delay={400}>
                        <div className="max-w-4xl mx-auto mt-16 text-center">
                            <h2 className="text-3xl font-bold text-warmBrown mb-6">
                                Craving Authentic Indori Snacks?
                            </h2>
                            <p className="text-lg text-warmBrown/80 mb-8 font-merriweather">
                                After reading about these delicious snacks, why not experience them yourself? 
                                Order fresh, authentic Indori namkeen delivered straight to your door.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    to="/products"
                                    className="bg-gradient-to-r from-saffron to-turmeric text-white px-8 py-3 rounded-lg font-semibold hover:from-saffron/90 hover:to-turmeric/90 transition-all duration-300 transform hover:scale-105"
                                >
                                    Shop Our Products
                                </Link>
                                <Link 
                                    to="/about"
                                    className="border-2 border-saffron text-saffron px-8 py-3 rounded-lg font-semibold hover:bg-saffron hover:text-white transition-all duration-300"
                                >
                                    Learn About Us
                                </Link>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
            <Footer />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <Toaster />
        </div>
    );
};

export default Blog;