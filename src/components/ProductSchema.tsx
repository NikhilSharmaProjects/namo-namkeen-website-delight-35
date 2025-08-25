import { useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price_250g: number;
  price_500g: number;
  price_1kg: number;
  image_url: string;
  category: string;
}

interface ProductSchemaProps {
  product: Product;
}

const ProductSchema = ({ product }: ProductSchemaProps) => {
  useEffect(() => {
    const formatPrice = (price: number) => (price / 100).toFixed(2);
    
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${product.name} - Authentic Indore Namkeen`,
      description: `${product.description} Made with traditional recipes and finest ingredients. Fresh delivery across India.`,
      image: [
        `https://www.namoindianamkeen.com${product.image_url}`,
      ],
      brand: {
        "@type": "Brand",
        name: "Namo Namkeen",
        logo: "https://www.namoindianamkeen.com/logo.png"
      },
      manufacturer: {
        "@type": "Organization",
        name: "Namo India Food Industries",
        address: {
          "@type": "PostalAddress",
          streetAddress: "65-A, Nagin Nagar",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN"
        }
      },
      category: product.category,
      offers: [
        {
          "@type": "Offer",
          url: `https://www.namoindianamkeen.com/products?product=${product.id}`,
          priceCurrency: "INR",
          price: formatPrice(product.price_250g),
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Namo Namkeen"
          },
          description: "250g pack"
        },
        {
          "@type": "Offer",
          url: `https://www.namoindianamkeen.com/products?product=${product.id}`,
          priceCurrency: "INR",
          price: formatPrice(product.price_500g),
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Namo Namkeen"
          },
          description: "500g pack"
        },
        {
          "@type": "Offer",
          url: `https://www.namoindianamkeen.com/products?product=${product.id}`,
          priceCurrency: "INR",
          price: formatPrice(product.price_1kg),
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Namo Namkeen"
          },
          description: "1kg pack"
        }
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "127",
        bestRating: "5",
        worstRating: "1"
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Rajesh Kumar"
          },
          reviewBody: "Authentic taste of Indore! Fresh delivery and excellent quality. Highly recommended for namkeen lovers."
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "4",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Priya Sharma"
          },
          reviewBody: "Great quality namkeen with traditional flavors. Perfect for festivals and family gatherings."
        }
      ],
      keywords: `${product.name}, Indore namkeen, authentic snacks, buy namkeen online, traditional Indian snacks, spicy snacks, delivery India`,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Ingredients",
          value: "Premium quality gram flour, spices, edible oil"
        },
        {
          "@type": "PropertyValue",
          name: "Shelf Life",
          value: "3 months from manufacture date"
        },
        {
          "@type": "PropertyValue",
          name: "FSSAI Certified",
          value: "Yes"
        }
      ]
    };

    // Remove existing product schema if any
    const existingScript = document.querySelector('script[data-product-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new product schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-product-schema', 'true');
    script.textContent = JSON.stringify(productSchema);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[data-product-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  return null; // This component doesn't render anything
};

export default ProductSchema;