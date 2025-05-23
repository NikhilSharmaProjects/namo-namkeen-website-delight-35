import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#products", label: "Products" },
        { href: "#about", label: "About Us" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-saffron/20">
            {/* Top bar with contact info */}
            <div className="bg-saffron text-white py-2 px-4">
                <div className="container mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+91 88238 18001</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>namoindiaifoodindustriess@gmail.com</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        Swad Indore Ka, Vishwas Namo Ka
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Namo Namkeen Logo"
                            className="w-12 h-12 object-contain hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                            <h1 className="font-poppins font-bold text-xl text-warmBrown">
                                NAMO NAMKEEN
                            </h1>
                            <p className="text-sm text-turmeric">
                                Authentic Indian Snacks
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-poppins font-medium text-warmBrown hover:text-saffron transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <Button className="bg-chili hover:bg-chili/90 text-white font-poppins font-medium px-6">
                            Order Now
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-saffron/20">
                        <div className="flex flex-col gap-4 pt-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="font-poppins font-medium text-warmBrown hover:text-saffron transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button className="bg-chili hover:bg-chili/90 text-white font-poppins font-medium w-fit">
                                Order Now
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
