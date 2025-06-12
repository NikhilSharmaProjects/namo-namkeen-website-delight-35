
import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

export const ScrollAnimation = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
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
      { threshold: 0.1, rootMargin: '50px' }
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
        case 'up':
          return `${baseClasses} translate-y-8 opacity-0`;
        case 'down':
          return `${baseClasses} -translate-y-8 opacity-0`;
        case 'left':
          return `${baseClasses} translate-x-8 opacity-0`;
        case 'right':
          return `${baseClasses} -translate-x-8 opacity-0`;
        case 'scale':
          return `${baseClasses} scale-95 opacity-0`;
        default:
          return `${baseClasses} translate-y-8 opacity-0`;
      }
    }
    
    return `${baseClasses} translate-x-0 translate-y-0 scale-100 opacity-100`;
  };

  return (
    <div ref={elementRef} className={`${getTransformClasses()} ${className}`}>
      {children}
    </div>
  );
};

export const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = '' 
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
