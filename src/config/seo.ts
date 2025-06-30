
export const seoConfig = {
  baseUrl: 'https://www.namoindianamkeen.com',
  defaultImage: '/logo.png',
  
  pages: {
    home: {
      title: 'Namo Namkeen — Authentic Indori Snacks Delivered Fresh',
      description: 'Order authentic Indore namkeen online – Ratlami Sev, Bhujia, Khatta Meetha & more. Fresh, hygienic, no preservatives.',
      keywords: 'namkeen online, buy snacks India, Indore namkeen, Ratlami sev, Khatta Meetha, authentic Indian snacks, namkeen delivery',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Namo Namkeen",
        "alternateName": "Namo India Food Industries",
        "url": "https://www.namoindianamkeen.com/",
        "logo": "https://www.namoindianamkeen.com/logo.png",
        "description": "Authentic Indore namkeen and traditional Indian snacks delivered fresh across India. Premium quality, no preservatives, traditional recipes since 1990.",
        "foundingDate": "1990",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "65-A, Nagin Nagar",
          "addressLocality": "Indore",
          "addressRegion": "Madhya Pradesh",
          "addressCountry": "IN"
        },
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "+91-88238-18001",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en","hi"]
        }]
      }
    },
    
    products: {
      title: 'Buy Indori Namkeen Online — Namo Namkeen Products',
      description: 'Browse our selection of authentic Indore snacks—Sev, Bhujia, Mixture & more. Fresh, hygienic, direct to your door.',
      keywords: 'buy namkeen online, Indore snacks, Ratlami sev price, bhujia online, mixture snacks, premium namkeen',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Premium Ratlami Sev Collection",
        "image": "https://www.namoindianamkeen.com/logo.png",
        "description": "Original spicy and crunchy Ratlami Sev from Indore, made with traditional recipe and finest ingredients. No preservatives, authentic taste.",
        "brand": {
          "@type": "Brand",
          "name": "Namo Namkeen"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.namoindianamkeen.com/products",
          "priceCurrency": "INR",
          "price": "99.00",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        }
      }
    },
    
    about: {
      title: 'About Namo Namkeen — 30+ Years of Authentic Indore Flavors',
      description: 'Discover the story of Namo Namkeen, crafting authentic Indore namkeen since 1990. Premium quality, traditional recipes, trusted by 5000+ families.',
      keywords: 'Namo Namkeen story, Indore food heritage, traditional namkeen makers, authentic Indian snacks company'
    },
    
    contact: {
      title: 'Contact Namo Namkeen — Order Fresh Indori Snacks Today',
      description: 'Get in touch with Namo Namkeen for fresh namkeen delivery across India. Call +91-88238-18001 or visit our Indore store.',
      keywords: 'Namo Namkeen contact, order namkeen online, Indore snacks delivery, namkeen store contact'
    }
  }
};
