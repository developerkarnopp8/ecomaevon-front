import { Product } from './product.model';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedColorHex?: string;
  selectedSize?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  couponId?: string;
  shippingCost: number;
  tax: number;
  total: number;
  itemCount: number;
  updatedAt: Date;
}
