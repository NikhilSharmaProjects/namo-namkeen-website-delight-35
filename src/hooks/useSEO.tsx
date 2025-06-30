
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  structuredData?: object;
}

export const useSEO = (data: SEOData) => {
  const location = useLocation();
  const baseUrl = 'https://www.namoindianamkeen.com';
  
  useEffect(() => {
    // Update title
    document.title = data.title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', data.description);
    if (data.keywords) updateMetaTag('keywords', data.keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', data.title, true);
    updateMetaTag('og:description', data.description, true);
    updateMetaTag('og:url', `${baseUrl}${location.pathname}`, true);
    updateMetaTag('og:type', data.ogType || 'website', true);
    updateMetaTag('og:site_name', 'Namo Namkeen', true);
    updateMetaTag('og:image', data.ogImage || `${baseUrl}/logo.png`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);
    updateMetaTag('twitter:image', data.ogImage || `${baseUrl}/logo.png`);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = data.canonical || `${baseUrl}${location.pathname}`;
    
    // Structured Data
    if (data.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-page-schema]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-schema', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data.structuredData);
    }
  }, [data, location.pathname]);
};
