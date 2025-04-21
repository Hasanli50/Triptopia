export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
  earnings: number;
  favorites: string[];
  isFrozen: boolean;
  isBanned: boolean;
  banExpiresAt: Date;
  phone_number: string;
  verificationCode: null | number;
  isVerified: boolean;
  isDeleted: boolean;
  travel_history: string[];
  // photo
}
