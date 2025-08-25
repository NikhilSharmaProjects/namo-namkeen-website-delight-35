export const seoConfig = {
    baseUrl: "https://www.namoindianamkeen.com",
    defaultImage: "/logo.png",

    pages: {
        home: {
            title: "Buy Namkeen Online | Authentic Indori Snacks Delivered",
            description:
                "Order authentic Indore namkeen online! Ratlami Sev, Bhujia, Mixture & more. Fresh delivery across India. No preservatives. Order now!",
            keywords:
                "buy namkeen online, Indori snacks delivery, Ratlami sev online, authentic namkeen India, order Indori snacks, best namkeen delivery, mixture online, bhujia delivery, traditional snacks India, spicy namkeen online",
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Namo Namkeen",
                alternateName: "Namo India Food Industries",
                url: "https://www.namoindianamkeen.com/",
                logo: "https://www.namoindianamkeen.com/logo.png",
                description:
                    "Authentic Indore namkeen and traditional Indian snacks delivered fresh across India. Premium quality, no preservatives, traditional recipes since 1990.",
                foundingDate: "1990",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "65-A, Nagin Nagar",
                    addressLocality: "Indore",
                    addressRegion: "Madhya Pradesh",
                    addressCountry: "IN",
                },
                contactPoint: [
                    {
                        "@type": "ContactPoint",
                        telephone: "+91-88238-18001",
                        contactType: "customer service",
                        areaServed: "IN",
                        availableLanguage: ["en", "hi"],
                    },
                ],
            },
        },

        products: {
            title: "Indori Namkeen Online | Premium Snacks Delivery India",
            description:
                "Shop authentic Indore snacks online! Ratlami Sev, Bhujia, Mixture delivered fresh. Premium quality, no preservatives. Order now!",
            keywords:
                "buy namkeen online India, Indori snacks delivery, Ratlami sev price, premium bhujia online, mixture snacks delivery, authentic namkeen shop, spicy snacks online, traditional Indore snacks",
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Product",
                name: "Premium Ratlami Sev Collection",
                image: "https://www.namoindianamkeen.com/logo.png",
                description:
                    "Original spicy and crunchy Ratlami Sev from Indore, made with traditional recipe and finest ingredients. No preservatives, authentic taste.",
                brand: {
                    "@type": "Brand",
                    name: "Namo Namkeen",
                },
                offers: {
                    "@type": "Offer",
                    url: "https://www.namoindianamkeen.com/products",
                    priceCurrency: "INR",
                    price: "99.00",
                    availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    reviewCount: "150",
                },
            },
        },

        about: {
            title: "About Us | Authentic Indori Namkeen Since 2021",
            description:
                "Learn about Namo Namkeen's journey crafting authentic Indore snacks. Premium quality, traditional recipes, trusted by 5000+ families.",
            keywords:
                "Namo Namkeen story, authentic Indore namkeen makers, traditional snack company India, premium namkeen manufacturer, FSSAI certified snacks",
        },

        blog: {
            title: "Indori Snacks Blog | Namkeen Stories & Recipes",
            description:
                "Discover authentic Indore namkeen stories, traditional recipes, and snack culture. Learn why Indori snacks are famous across India.",
            keywords:
                "Indori namkeen blog, authentic snack recipes, traditional Indian snacks, Ratlami sev history, Indore food culture, namkeen stories",
        },

        faq: {
            title: "FAQ | Namkeen Delivery & Quality Questions Answered",
            description:
                "Get answers about Namo Namkeen delivery, quality, ingredients & ordering. Fast delivery across India. Premium Indori snacks FAQ.",
            keywords:
                "namkeen delivery FAQ, Indori snacks questions, authentic namkeen quality, snack delivery India, FSSAI certified snacks",
        },

        contact: {
            title: "Contact Namo Namkeen — Order Fresh Indori Snacks Today",
            description:
                "Get in touch with Namo Namkeen for fresh namkeen delivery across India. Call +91-88238-18001 or visit our Indore store.",
            keywords:
                "Namo Namkeen contact, order namkeen online, Indore snacks delivery, namkeen store contact",
        },

        quality: {
            title: "Quality Policy — Namo Namkeen",
            description:
                "Our commitment to quality, hygiene, and authenticity in every batch of namkeen.",
            keywords:
                "quality policy, food quality, hygiene standards, FSSAI, Namo Namkeen quality",
        },

        terms: {
            title: "Terms & Conditions — Namo Namkeen",
            description:
                "Read the Terms of Use for accessing and using Namo Namkeen’s website and services.",
            keywords:
                "terms and conditions, terms of use, user agreement, Namo Namkeen terms",
        },

        privacy: {
            title: "Privacy Policy — Namo Namkeen",
            description:
                "Learn how Namo Namkeen collects, uses, and protects your personal data.",
            keywords:
                "privacy policy, data protection, personal data, Namo Namkeen privacy",
        },

        shipping: {
            title: "Shipping Policy — Namo Namkeen",
            description:
                "Details on order dispatch timelines, delivery methods, and shipping refunds at Namo Namkeen.",
            keywords:
                "shipping policy, delivery timelines, courier, refunds, Namo Namkeen shipping",
        },
    },
};
