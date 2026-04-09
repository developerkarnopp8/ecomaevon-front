import { Address } from './user.model';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'cash' | 'wallet';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  selectedColor?: string;
  selectedColorHex?: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderTracking {
  status: OrderStatus;
  description: string;
  location?: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingCost: number;
  tax: number;
  total: number;
  notes?: string;
  tracking?: OrderTracking[];
  trackingCode?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  page: number;
  limit: number;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}
