
import { useEffect, useState, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
}

export const ScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClass} transform translate-y-10 opacity-0`;
        case 'down':
          return `${baseClass} transform -translate-y-10 opacity-0`;
        case 'left':
          return `${baseClass} transform translate-x-10 opacity-0`;
        case 'right':
          return `${baseClass} transform -translate-x-10 opacity-0`;
        case 'scale':
          return `${baseClass} transform scale-95 opacity-0`;
        case 'rotate':
          return `${baseClass} transform rotate-12 scale-95 opacity-0`;
        default:
          return `${baseClass} transform translate-y-10 opacity-0`;
      }
    }
    
    return `${baseClass} transform translate-y-0 translate-x-0 scale-100 rotate-0 opacity-100`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// Stagger animation for multiple elements
export const StaggeredAnimation = ({ 
  children, 
  className = '', 
  staggerDelay = 100 
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation 
          key={index} 
          delay={index * staggerDelay}
          direction="up"
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
};

// Parallax scroll effect
export const ParallaxScroll = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};
