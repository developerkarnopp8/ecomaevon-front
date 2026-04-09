export interface Address {
  id: string;
  label: string;
  recipientName: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface SavedPaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'pix' | 'wallet';
  brand?: string;
  lastFour?: string;
  holderName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: Date;
  avatarUrl?: string;
  role: 'customer' | 'admin' | 'staff';
  addresses: Address[];
  paymentMethods: SavedPaymentMethod[];
  wishlist: string[];
  newsletterOptIn: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  totalOrders: number;
  totalSpent: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
}
