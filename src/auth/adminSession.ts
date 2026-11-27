/**
 * Browser-side admin session marker. Same key and value the admin pages have always checked.
 * NOTE: this is not real security. Everything in the browser bundle is public, so the API must enforce access.
 */
const STORAGE_KEY = 'userKey';
const SESSION_VALUE = 'asWqFreafdgADFGRE@#%34563';

export const hasAdminSession = () => localStorage.getItem(STORAGE_KEY) === SESSION_VALUE;
export const startAdminSession = () => localStorage.setItem(STORAGE_KEY, SESSION_VALUE);
export const endAdminSession = () => localStorage.removeItem(STORAGE_KEY);
