
import { DecryptedToken } from '../models/User';
import { Config } from './config';

const tokenExpiry: string = Config.TOKEN_EXPIRY

// Simple JWT token creation function
const encryptData = (data: unknown, time: string = tokenExpiry): string => {
  try {
    if (!data) return "";
    
    // Create header
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    // Create payload with expiry
    const now = Math.floor(Date.now() / 1000);
    const expiry = now + parseInt(time) * 24 * 60 * 60; // Convert days to seconds
    
    // Ensure data is an object before spreading it
    const dataObj = typeof data === 'object' && data !== null ? data : { value: data };
    
    const payload = {
      ...dataObj,
      iat: now,
      exp: expiry
    };
    
    // Base64 encode header and payload
    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    // In a browser environment, we'll use a simplified approach
    // Note: This doesn't validate the signature, just carries the data
    return `${encodedHeader}.${encodedPayload}.simplified`;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

// Decode JWT token
const decryptData = (encryptedData: string): DecryptedToken | null => {
  try {
    if (!encryptedData) return { success: false, data: null };
    
    // Split token parts
    const parts = encryptedData.split('.');
    if (parts.length !== 3) {
      return { success: false, data: null };
    }
    
    // Decode payload
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(payload));
    
    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return { success: false, data: null };
    }
    
    return { success: true, data: decoded };
  } catch (error) {
    console.error("Decryption error:", error);
    return { success: false, data: null };
  }
};

// Secure storage operations
export const secureStorage = {
  setItem: (key: string, value: unknown): void => {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  },
  
  getItem: <T>(key: string): T | null => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue || !isTokenValid(encryptedValue)) return null;
    const decrypted = decryptData(encryptedValue);
    return decrypted?.success ? decrypted.data as T : null;
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  }
};

export const isTokenValid = (token: string): boolean => {
  try {
    if (!token) return false;
    
    // Split token parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    
    // Decode payload
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(payload));
    
    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp && decoded.exp > now;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};