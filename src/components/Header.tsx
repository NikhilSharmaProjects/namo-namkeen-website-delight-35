
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-cream/95 backdrop-blur-sm border-b-2 border-saffron/20">
            <div className="bg-saffron text-white py-2 px-4">
                <div className="container mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+91 88238 18001</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <Mail size={16} />
                            <span>namoindiaifoodindustriess@gmail.com</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        Swad Indore Ka, Vishwas Namo Ka
                    </div>
                </div>
            </div>

            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
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
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`font-poppins font-medium transition-colors duration-300 relative group ${
                                    isActive(link.href) 
                                        ? 'text-saffron' 
                                        : 'text-warmBrown hover:text-saffron'
                                }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-saffron transition-all duration-300 ${
                                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </Link>
                        ))}
                        <Button className="bg-chili hover:bg-chili/90 text-white font-poppins font-medium px-6">
                            Order Now
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-saffron/20">
                        <div className="flex flex-col gap-4 pt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`font-poppins font-medium transition-colors duration-300 ${
                                        isActive(link.href) 
                                            ? 'text-saffron' 
                                            : 'text-warmBrown hover:text-saffron'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
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
