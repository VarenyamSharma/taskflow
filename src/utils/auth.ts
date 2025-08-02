import { User } from '../types';

// Simulated JWT token operations
export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

export const verifyToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      createdAt: payload.createdAt || new Date().toISOString()
    };
  } catch {
    return null;
  }
};

// Simulated password hashing (in real app, use bcrypt on backend)
export const hashPassword = async (password: string): Promise<string> => {
  // This is just for demonstration - real hashing should be done server-side
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password);
  return hashedInput === hash;
};