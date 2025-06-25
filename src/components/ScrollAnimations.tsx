
import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right" | "scale";
    delay?: number;
    className?: string;
}

export const ScrollAnimation = ({
    children,
    direction = "up",
    delay = 0,
    className = "",
}: ScrollAnimationProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay]);

    const getTransformClasses = () => {
        const baseClasses = "transition-all duration-700 ease-out";

        if (!isVisible) {
            switch (direction) {
                case "up":
                    return `${baseClasses} translate-y-8 opacity-0`;
                case "down":
                    return `${baseClasses} -translate-y-8 opacity-0`;
                case "left":
                    return `${baseClasses} translate-x-8 opacity-0`;
                case "right":
                    return `${baseClasses} -translate-x-8 opacity-0`;
                case "scale":
                    return `${baseClasses} scale-95 opacity-0`;
                default:
                    return `${baseClasses} translate-y-8 opacity-0`;
            }
        }

        return `${baseClasses} translate-x-0 translate-y-0 scale-100 opacity-100`;
    };

    return (
        <div
            ref={elementRef}
            className={`${getTransformClasses()} ${className}`}
        >
            {children}
        </div>
    );
};

export const ParallaxElement = ({
    children,
    speed = 0.5,
    className = "",
}: {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            setOffset(scrolled * speed);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div
            ref={elementRef}
            className={className}
            style={{ transform: `translateY(${offset}px)` }}
        >
            {children}
        </div>
    );
};

// New component for floating food elements
export const FloatingFoodElement = ({
    src,
    alt,
    size = "w-16 h-16",
    position,
    animationDelay = "0s",
}: {
    src: string;
    alt: string;
    size?: string;
    position: string;
    animationDelay?: string;
}) => {
    return (
        <div 
            className={`absolute ${position} ${size} opacity-30 animate-float pointer-events-none`}
            style={{ animationDelay }}
        >
            <img 
                src={src}
                alt={alt}
                className="w-full h-full object-cover rounded-full border-2 border-white/40 shadow-lg"
            />
        </div>
    );
};

// Component for image overlays with gradient
export const ImageOverlay = ({
    src,
    alt,
    className = "",
    overlayColor = "from-black/30 to-black/60",
}: {
    src: string;
    alt: string;
    className?: string;
    overlayColor?: string;
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img 
                src={src}
                alt={alt}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${overlayColor}`}></div>
        </div>
    );
};
