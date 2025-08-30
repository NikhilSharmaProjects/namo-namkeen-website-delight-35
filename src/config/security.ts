// Security Configuration for NAMO Namkeen Payment System
export const SECURITY_CONFIG = {
    // Rate Limiting
    RATE_LIMITS: {
        PAYMENT_INITIATION: {
            WINDOW_MS: 15 * 60 * 1000, // 15 minutes
            MAX_REQUESTS: 10, // Max 10 payment attempts per 15 minutes
        },
        PAYMENT_VERIFICATION: {
            WINDOW_MS: 15 * 60 * 1000, // 15 minutes
            MAX_REQUESTS: 20, // Max 20 verification attempts per 15 minutes
        },
        WEBHOOK_PROCESSING: {
            WINDOW_MS: 15 * 60 * 1000, // 15 minutes
            MAX_REQUESTS: 30, // Max 30 webhook calls per 15 minutes
        },
    },

    // Input Validation
    VALIDATION: {
        ORDER_ID: {
            MIN_LENGTH: 10,
            MAX_LENGTH: 100,
            PATTERN: /^[a-zA-Z0-9_-]+$/,
        },
        PHONE_NUMBER: {
            PATTERN: /^[6-9]\d{9}$/,
            MIN_LENGTH: 10,
            MAX_LENGTH: 10,
        },
        EMAIL: {
            PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            MAX_LENGTH: 254,
        },
        AMOUNT: {
            MIN: 100, // ₹1.00 in paise
            MAX: 10000000, // ₹100,000.00 in paise
        },
        NAME: {
            MIN_LENGTH: 2,
            MAX_LENGTH: 100,
            PATTERN: /^[a-zA-Z\s]+$/,
        },
        ADDRESS: {
            MIN_LENGTH: 10,
            MAX_LENGTH: 500,
        },
        PINCODE: {
            PATTERN: /^\d{6}$/,
        },
        TRANSACTION_ID: {
            MIN_LENGTH: 10,
            MAX_LENGTH: 100,
            PATTERN: /^[a-zA-Z0-9_-]+$/,
        },
    },

    // CORS Configuration
    CORS: {
        ALLOWED_ORIGINS: [
            "https://namoindianamkeen.com",
            "https://www.namoindianamkeen.com",
            "https://namo-namkeen.vercel.app",
            "http://localhost:3000", // Development
            "http://localhost:5173", // Vite dev server
        ],
        ALLOWED_METHODS: ["GET", "POST", "OPTIONS"],
        ALLOWED_HEADERS: [
            "authorization",
            "x-client-info",
            "apikey",
            "content-type",
            "x-request-id",
            "x-forwarded-for",
            "x-real-ip",
        ],
        EXPOSE_HEADERS: ["x-request-id"],
        MAX_AGE: 86400, // 24 hours
    },

    // Security Headers
    SECURITY_HEADERS: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy":
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
    },

    // PhonePe Configuration
    PHONEPE: {
        ENVIRONMENTS: {
            PREPROD: {
                BASE_URL: "https://api-preprod.phonepe.com/apis/pg-sandbox",
                NAME: "preprod",
            },
            PROD: {
                BASE_URL: "https://api.phonepe.com/apis/hermes",
                NAME: "prod",
            },
        },
        SALT_INDEX: 1,
        PAYMENT_INSTRUMENT: {
            TYPE: "PAY_PAGE",
        },
        REDIRECT_MODE: "POST",
    },

    // Authentication Requirements
    AUTH_REQUIREMENTS: {
        LARGE_AMOUNT_THRESHOLD: 1000000, // ₹10,000 in paise
        GUEST_ORDER_LIMIT: 500000, // ₹5,000 in paise for guest users
    },

    // Error Codes
    ERROR_CODES: {
        VALIDATION_ERROR: "VALIDATION_ERROR",
        RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
        UNAUTHORIZED_ORIGIN: "UNAUTHORIZED_ORIGIN",
        ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
        ORDER_ALREADY_PAID: "ORDER_ALREADY_PAID",
        PAYMENT_ALREADY_INITIATED: "PAYMENT_ALREADY_INITIATED",
        MISSING_SIGNATURE: "MISSING_SIGNATURE",
        INVALID_SIGNATURE: "INVALID_SIGNATURE",
        INVALID_PAYLOAD_FORMAT: "INVALID_PAYLOAD_FORMAT",
        INVALID_PAYLOAD_STRUCTURE: "INVALID_PAYLOAD_STRUCTURE",
        INVALID_PAYLOAD_ENCODING: "INVALID_PAYLOAD_ENCODING",
        MISSING_TRANSACTION_ID: "MISSING_TRANSACTION_ID",
        ORDER_UPDATE_FAILED: "ORDER_UPDATE_FAILED",
        PAYMENT_INITIATION_FAILED: "PAYMENT_INITIATION_FAILED",
        VERIFICATION_FAILED: "VERIFICATION_FAILED",
        WEBHOOK_PROCESSING_FAILED: "WEBHOOK_PROCESSING_FAILED",
        GATEWAY_ERROR: "GATEWAY_ERROR",
        METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
        INVALID_JSON: "INVALID_JSON",
        INTERNAL_ERROR: "INTERNAL_ERROR",
    },

    // Logging
    LOGGING: {
        SENSITIVE_FIELDS: [
            "password",
            "token",
            "secret",
            "key",
            "salt",
            "checksum",
            "signature",
        ],
        MAX_PAYLOAD_LOG_LENGTH: 200, // Max characters to log from payloads
        LOG_LEVELS: {
            ERROR: "error",
            WARN: "warn",
            INFO: "info",
            DEBUG: "debug",
        },
    },

    // Retry Configuration
    RETRY: {
        MAX_ATTEMPTS: 5,
        BASE_DELAY: 1000, // 1 second
        MAX_DELAY: 10000, // 10 seconds
        BACKOFF_MULTIPLIER: 2,
    },

    // Timeouts
    TIMEOUTS: {
        PHONEPE_API: 30000, // 30 seconds
        PAYMENT_VERIFICATION: 60000, // 1 minute
        WEBHOOK_PROCESSING: 15000, // 15 seconds
    },
};

// Validation Functions
export const ValidationUtils = {
    // Validate order ID
    isValidOrderId: (orderId: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.ORDER_ID;
        return (
            orderId &&
            typeof orderId === "string" &&
            orderId.length >= config.MIN_LENGTH &&
            orderId.length <= config.MAX_LENGTH &&
            config.PATTERN.test(orderId)
        );
    },

    // Validate phone number
    isValidPhoneNumber: (phone: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.PHONE_NUMBER;
        const cleaned = phone.replace(/\D/g, "");
        return (
            cleaned.length === config.MIN_LENGTH &&
            cleaned.length === config.MAX_LENGTH &&
            config.PATTERN.test(cleaned)
        );
    },

    // Validate email
    isValidEmail: (email: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.EMAIL;
        return (
            email &&
            typeof email === "string" &&
            email.length <= config.MAX_LENGTH &&
            config.PATTERN.test(email)
        );
    },

    // Validate amount
    isValidAmount: (amount: number): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.AMOUNT;
        return (
            typeof amount === "number" &&
            amount >= config.MIN &&
            amount <= config.MAX
        );
    },

    // Validate name
    isValidName: (name: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.NAME;
        return (
            name &&
            typeof name === "string" &&
            name.trim().length >= config.MIN_LENGTH &&
            name.length <= config.MAX_LENGTH &&
            config.PATTERN.test(name.trim())
        );
    },

    // Validate address
    isValidAddress: (address: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.ADDRESS;
        return (
            address &&
            typeof address === "string" &&
            address.trim().length >= config.MIN_LENGTH &&
            address.length <= config.MAX_LENGTH
        );
    },

    // Validate pincode
    isValidPincode: (pincode: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.PINCODE;
        return config.PATTERN.test(pincode);
    },

    // Validate transaction ID
    isValidTransactionId: (txnId: string): boolean => {
        const config = SECURITY_CONFIG.VALIDATION.TRANSACTION_ID;
        return (
            txnId &&
            typeof txnId === "string" &&
            txnId.length >= config.MIN_LENGTH &&
            txnId.length <= config.MAX_LENGTH &&
            config.PATTERN.test(txnId)
        );
    },

    // Sanitize input string
    sanitizeString: (input: string, maxLength: number = 100): string => {
        if (!input || typeof input !== "string") return "";
        return input
            .trim()
            .replace(/[<>]/g, "") // Remove potential HTML tags
            .substring(0, maxLength);
    },

    // Sanitize phone number
    sanitizePhoneNumber: (phone: string): string => {
        return phone.replace(/\D/g, "");
    },

    // Sanitize email
    sanitizeEmail: (email: string): string => {
        return email.trim().toLowerCase();
    },

    // Check if amount requires authentication
    requiresAuthentication: (amount: number): boolean => {
        return (
            amount > SECURITY_CONFIG.AUTH_REQUIREMENTS.LARGE_AMOUNT_THRESHOLD
        );
    },

    // Check if guest can place order
    canGuestOrder: (amount: number): boolean => {
        return amount <= SECURITY_CONFIG.AUTH_REQUIREMENTS.GUEST_ORDER_LIMIT;
    },
};

// Rate Limiting Utilities
export const RateLimitUtils = {
    // Check if request is within rate limit
    isWithinLimit: (
        clientId: string,
        store: Map<string, { count: number; resetTime: number }>,
        maxRequests: number,
        windowMs: number
    ): boolean => {
        const now = Date.now();
        const clientData = store.get(clientId);

        if (!clientData || now > clientData.resetTime) {
            store.set(clientId, { count: 1, resetTime: now + windowMs });
            return true;
        }

        if (clientData.count >= maxRequests) {
            return false;
        }

        clientData.count++;
        return true;
    },

    // Get remaining requests
    getRemainingRequests: (
        clientId: string,
        store: Map<string, { count: number; resetTime: number }>,
        maxRequests: number
    ): number => {
        const clientData = store.get(clientId);
        if (!clientData) return maxRequests;
        return Math.max(0, maxRequests - clientData.count);
    },

    // Get reset time
    getResetTime: (
        clientId: string,
        store: Map<string, { count: number; resetTime: number }>
    ): number => {
        const clientData = store.get(clientId);
        return clientData?.resetTime || 0;
    },
};

// Security Headers Utilities
export const SecurityHeaderUtils = {
    // Get CORS headers for allowed origin
    getCorsHeaders: (origin: string | null): Record<string, string> => {
        const allowedOrigins = SECURITY_CONFIG.CORS.ALLOWED_ORIGINS;
        const isAllowedOrigin = origin && allowedOrigins.includes(origin);

        return {
            "Access-Control-Allow-Origin": isAllowedOrigin
                ? origin
                : allowedOrigins[0],
            "Access-Control-Allow-Headers":
                SECURITY_CONFIG.CORS.ALLOWED_HEADERS.join(", "),
            "Access-Control-Allow-Methods":
                SECURITY_CONFIG.CORS.ALLOWED_METHODS.join(", "),
            "Access-Control-Max-Age": SECURITY_CONFIG.CORS.MAX_AGE.toString(),
            "Access-Control-Expose-Headers":
                SECURITY_CONFIG.CORS.EXPOSE_HEADERS.join(", "),
            ...SECURITY_CONFIG.SECURITY_HEADERS,
        };
    },

    // Get security headers only
    getSecurityHeaders: (): Record<string, string> => {
        return { ...SECURITY_CONFIG.SECURITY_HEADERS };
    },
};

// Error Response Utilities
export const ErrorResponseUtils = {
    // Create standardized error response
    createErrorResponse: (
        error: string,
        code: string,
        status: number = 400,
        details?: any
    ): Response => {
        const response = {
            success: false,
            error,
            code,
            ...(details && { details }),
        };

        return new Response(JSON.stringify(response), {
            status,
            headers: {
                "Content-Type": "application/json",
                ...SecurityHeaderUtils.getSecurityHeaders(),
            },
        });
    },

    // Create rate limit error response
    createRateLimitResponse: (
        retryAfter: number,
        remainingRequests: number = 0
    ): Response => {
        const response = {
            success: false,
            error: "Rate limit exceeded. Please try again later.",
            code: SECURITY_CONFIG.ERROR_CODES.RATE_LIMIT_EXCEEDED,
            retryAfter,
            remainingRequests,
        };

        return new Response(JSON.stringify(response), {
            status: 429,
            headers: {
                "Content-Type": "application/json",
                "Retry-After": retryAfter.toString(),
                ...SecurityHeaderUtils.getSecurityHeaders(),
            },
        });
    },
};

export default SECURITY_CONFIG;
