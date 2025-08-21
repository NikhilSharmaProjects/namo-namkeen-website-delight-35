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
        <footer className="bg-warmBrown text-white">
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
                            <a
                                href="https://www.facebook.com/share/18w47g6RQm/"
                                target="_blank"
                                className="bg-saffron hover:bg-saffron/80 p-2 rounded-full transition-all duration-300 hover:scale-110"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/namo_india_namkeen/"
                                target="_blank"
                                className="bg-turmeric hover:bg-turmeric/80 p-2 rounded-full transition-all duration-300 hover:scale-110"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/namo-india-namkeen-84a50a371/"
                                target="_blank"
                                className="bg-saffron/80 hover:bg-saffron p-2 rounded-full transition-all duration-300 hover:scale-110"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-saffron to-transparent"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Home",
                                "Products",
                                "About Us",
                                "Contact",
                                "Quality Policy",
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-white/80 hover:text-saffron transition-colors font-merriweather text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-turmeric group-hover:bg-saffron transition-colors"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Our Products
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-saffron to-transparent"></span>
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Super Products",
                                "Premium Range",
                                "Satwik Products",
                                "Falahari Items",
                                "Traditional Sweets",
                            ].map((product) => (
                                <li key={product}>
                                    <a
                                        href="#"
                                        className="text-white/80 hover:text-turmeric transition-colors font-merriweather text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-saffron group-hover:bg-turmeric transition-colors"></span>
                                        {product}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-poppins font-semibold text-lg mb-6 relative inline-block">
                            Contact Info
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-saffron to-transparent"></span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group hover:bg-warmBrown/40 p-2 rounded-lg transition-all">
                                <MapPin className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0 group-hover:text-turmeric transition-colors" />
                                <div>
                                    <p className="text-white/80 font-merriweather text-sm">
                                        65-A, Nagin Nagar
                                        <br />
                                        Indore (M.P.), India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group hover:bg-warmBrown/40 p-2 rounded-lg transition-all">
                                <Phone className="w-5 h-5 text-turmeric flex-shrink-0 group-hover:text-saffron transition-colors" />
                                <p className="text-white/80 font-merriweather text-sm">
                                    +91 88238 18001
                                </p>
                            </div>

                            <div className="flex items-center gap-3 group hover:bg-warmBrown/40 p-2 rounded-lg transition-all">
                                <Mail className="w-5 h-5 text-chili flex-shrink-0 group-hover:text-turmeric transition-colors" />
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
                                className="hover:text-turmeric transition-colors"
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
                        <div className="inline-block bg-gradient-to-r from-saffron to-turmeric text-white px-6 py-2 rounded-full font-poppins font-medium text-sm">
                            "Namo Is Not Name It's a Promise Of Good Quality"
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
