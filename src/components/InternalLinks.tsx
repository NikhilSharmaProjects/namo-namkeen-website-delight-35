import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield } from "lucide-react";

interface InternalLinksProps {
    variant?: "product" | "blog" | "footer" | "inline";
    currentPage?: string;
}

export const InternalLinks = ({ variant = "inline", currentPage }: InternalLinksProps) => {
    const productLinks = [
        { to: "/products", text: "Buy Ratlami Sev Online", keywords: "Ratlami Sev online" },
        { to: "/products", text: "Authentic Bhujia Delivery", keywords: "Bhujia delivery" },
        { to: "/products", text: "Order Mixture Snacks", keywords: "Mixture snacks online" },
        { to: "/products", text: "Premium Namkeen Collection", keywords: "Premium namkeen" }
    ];

    const blogLinks = [
        { to: "/blog", text: "Why Indori Namkeen is Famous", keywords: "Indori namkeen famous" },
        { to: "/blog", text: "Best Namkeen from Indore", keywords: "Best Indori namkeen" },
        { to: "/blog", text: "Ratlami Sev vs Normal Sev", keywords: "Ratlami Sev difference" }
    ];

    const serviceLinks = [
        { to: "/faq", text: "Delivery Questions Answered", keywords: "namkeen delivery FAQ" },
        { to: "/quality-policy", text: "Quality Standards", keywords: "FSSAI certified snacks" },
        { to: "/shipping-policy", text: "Fast India Delivery", keywords: "pan India delivery" }
    ];

    if (variant === "product") {
        return (
            <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-gradient-to-br from-saffron/10 to-turmeric/10 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-warmBrown mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-saffron" />
                        Related Products You'll Love
                    </h3>
                    <ul className="space-y-3">
                        {productLinks.slice(0, 3).filter(link => currentPage !== link.to).map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.to}
                                    className="flex items-center gap-2 text-warmBrown hover:text-saffron transition-colors group"
                                >
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green/10 to-turmeric/10 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-warmBrown mb-4 flex items-center gap-2">
                        <Truck className="h-5 w-5 text-green" />
                        Delivery & Quality Info
                    </h3>
                    <ul className="space-y-3">
                        {serviceLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.to}
                                    className="flex items-center gap-2 text-warmBrown hover:text-saffron transition-colors group"
                                >
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    if (variant === "blog") {
        return (
            <div className="bg-gradient-to-br from-cream/50 to-saffron/10 p-8 rounded-xl mt-12">
                <h3 className="text-2xl font-bold text-warmBrown mb-6 text-center">
                    Explore More About Authentic Indori Snacks
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-semibold text-warmBrown mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4 text-saffron" />
                            Our Products
                        </h4>
                        <ul className="space-y-2">
                            {productLinks.slice(0, 2).map((link, index) => (
                                <li key={index}>
                                    <Link to={link.to} className="text-warmBrown/80 hover:text-saffron transition-colors text-sm">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-warmBrown mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-turmeric" />
                            Quality & Service
                        </h4>
                        <ul className="space-y-2">
                            {serviceLinks.slice(0, 2).map((link, index) => (
                                <li key={index}>
                                    <Link to={link.to} className="text-warmBrown/80 hover:text-saffron transition-colors text-sm">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-warmBrown mb-3 flex items-center gap-2">
                            <Truck className="h-4 w-4 text-chili" />
                            Learn More
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-warmBrown/80 hover:text-saffron transition-colors text-sm">
                                    Our Story & Heritage
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-warmBrown/80 hover:text-saffron transition-colors text-sm">
                                    Contact & Store Location
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "footer") {
        return (
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <h4 className="font-semibold text-cream mb-3">Shop Categories</h4>
                    <ul className="space-y-2">
                        <li><Link to="/products" className="text-cream/80 hover:text-cream transition-colors">Buy Ratlami Sev Online</Link></li>
                        <li><Link to="/products" className="text-cream/80 hover:text-cream transition-colors">Premium Bhujia Delivery</Link></li>
                        <li><Link to="/products" className="text-cream/80 hover:text-cream transition-colors">Authentic Mixture Snacks</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold text-cream mb-3">Learn & Discover</h4>
                    <ul className="space-y-2">
                        <li><Link to="/blog" className="text-cream/80 hover:text-cream transition-colors">Indori Snacks Stories</Link></li>
                        <li><Link to="/faq" className="text-cream/80 hover:text-cream transition-colors">Delivery & Quality FAQ</Link></li>
                        <li><Link to="/about" className="text-cream/80 hover:text-cream transition-colors">Our Heritage Since 2021</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold text-cream mb-3">Policies & Support</h4>
                    <ul className="space-y-2">
                        <li><Link to="/quality-policy" className="text-cream/80 hover:text-cream transition-colors">FSSAI Quality Standards</Link></li>
                        <li><Link to="/shipping-policy" className="text-cream/80 hover:text-cream transition-colors">Pan India Shipping</Link></li>
                        <li><Link to="/contact" className="text-cream/80 hover:text-cream transition-colors">Customer Support</Link></li>
                    </ul>
                </div>
            </div>
        );
    }

    // Default inline variant
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <span className="text-warmBrown/60 text-sm">Related:</span>
            {productLinks.slice(0, 3).map((link, index) => (
                <Link 
                    key={index}
                    to={link.to}
                    className="text-saffron hover:text-saffron/80 text-sm font-medium transition-colors"
                >
                    {link.text}
                </Link>
            ))}
        </div>
    );
};

export default InternalLinks;