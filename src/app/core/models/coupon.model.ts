export type CouponType = 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  perUserLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  excludedProducts?: string[];
  startDate?: Date;
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface CouponValidation {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}
