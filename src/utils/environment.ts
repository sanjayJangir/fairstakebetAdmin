/**
 * Determines if code is running in browser/frontend
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
};

/**
 * Gets the appropriate API URL based on environment
 */
export const getApiUrl = (): string => {
    // Check if running in browser

    // Server-side - use environment variable
    return import.meta.env.DEV ? 'http://localhost:8000' : 'https://www.apis.fairstakebet.com'
};
