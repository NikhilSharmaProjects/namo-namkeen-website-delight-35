import {
    Facebook,
    Instagram,
    Phone,
    Mail,
    MapPin,
    Youtube,
    Twitter,
    Linkedin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Namo Namkeen Logo"
                                className="w-16 h-16 object-contain hover:rotate-12 transition-transform duration-500"
                            />
                            <div>
                                <h3 className="font-poppins font-bold text-xl">
                                    NAMO NAMKEEN
                                </h3>
                                <p className="text-sm text-white/80">
                                    Authentic Indian Snacks
                                </p>
                            </div>
                        </div>

                        <p className="text-white/80 font-merriweather text-sm leading-relaxed">
                            Celebrating the rich flavors of Indore with
                            traditional recipes and premium quality ingredients.
                            स्वाद इंदौर का, विश्वास नमो का
                        </p>

                        <div className="flex gap-3">
                            <div className="bg-saffron/20 p-2 rounded-full">
                                <Facebook size={20} className="text-saffron" />
                            </div>
                            <div className="bg-turmeric/20 p-2 rounded-full">
                                <Instagram size={20} className="text-turmeric" />
                            </div>
                            <div className="bg-saffron/20 p-2 rounded-full">
                                <Linkedin size={20} className="text-saffron" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary to-transparent"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Products", href: "/products" },
                                { label: "About Us", href: "/about" },
                                 { label: "Contact", href: "/contact" },
                                 { label: "Blog", href: "/blog" },
                                 { label: "FAQ", href: "/faq" },
                                {
                                     label: "Quality Policy",
                                     href: "/quality-policy",
                                 },
                            ].map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="text-white/80 hover:text-primary transition-colors font-merriweather text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors"></span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Our Products
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary to-transparent"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                {
                                    label: "Featured Products",
                                    href: "/products?section=featured",
                                },
                                {
                                    label: "Premium Products",
                                    href: "/products?category=Premium%20Products",
                                },
                                {
                                    label: "Satwik Products",
                                    href: "/products?category=Satwik%20Products",
                                },
                            ].map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="text-white/80 hover:text-secondary transition-colors font-merriweather text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-secondary transition-colors"></span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Contact Info
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary to-transparent"></span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group hover:bg-accent/20 p-2 rounded-lg transition-all">
                                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:text-secondary transition-colors" />
                                <div>
                                    <p className="text-white/80 font-merriweather text-sm">
                                        65-A, Nagin Nagar
                                        <br />
                                        Indore (M.P.), India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group hover:bg-accent/20 p-2 rounded-lg transition-all">
                                <Phone className="w-5 h-5 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" />
                                <p className="text-white/80 font-merriweather text-sm">
                                    +91 88238 18001
                                </p>
                            </div>

                            <div className="flex items-center gap-3 group hover:bg-accent/20 p-2 rounded-lg transition-all">
                                <Mail className="w-5 h-5 text-accent-foreground flex-shrink-0 group-hover:text-secondary transition-colors" />
                                <p className="text-white/80 font-merriweather text-sm break-all">
                                    namoindiaifoodindustriess@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/80 font-merriweather text-sm text-center md:text-left">
                            © 2024 Namo India Food Industries. All rights
                            reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm text-white/80 font-merriweather">
                            <a
                                href="/policies"
                                className="hover:text-saffron transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms-and-conditions"
                                className="hover:text-secondary transition-colors"
                            >
                                Terms & Conditions
                            </a>
                            <a
                                href="/shipping-policies"
                                className="hover:text-chili transition-colors"
                            >
                                Shipping Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full font-poppins font-medium text-sm">
                            "Namo Is Not Name It's a Promise Of Good Quality"
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
