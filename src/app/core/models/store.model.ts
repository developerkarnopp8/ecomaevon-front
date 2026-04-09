export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  isActive: boolean;
  sortOrder: number;
  startDate?: Date;
  endDate?: Date;
}

export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  niche: 'fashion' | 'electronics' | 'furniture' | 'food' | 'beauty' | 'automotive' | 'tickets' | 'general';
  primaryColor: string;
  isActive: boolean;
}

export interface CarouselConfig {
  id: string;
  title: string;
  type: 'products' | 'categories' | 'brands' | 'banners';
  items: string[];
  isActive: boolean;
  autoplay: boolean;
  interval: number;
  position: 'home_top' | 'home_middle' | 'home_bottom' | 'catalog_sidebar';
}

export interface StoreSettings {
  id: string;
  storeName: string;
  storeSlug: string;
  logoUrl?: string;
  faviconUrl?: string;
  description: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  cnpj?: string;
  activeTemplateId: string;
  primaryColor: string;
  accentColor: string;
  banners: Banner[];
  carousels: CarouselConfig[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    pinterest?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  freeShippingThreshold?: number;
  taxRate: number;
  currency: string;
  currencySymbol: string;
  enableReviews: boolean;
  enableWishlist: boolean;
  enableCompare: boolean;
  maintenanceMode: boolean;
  updatedAt: Date;
}

export interface DashboardMetrics {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  monthlyReach: number;
  conversionRate: number;
  avgOrderValue: number;
  refundRate: number;
  revenueChart: { label: string; value: number }[];
  topProducts: { productId: string; name: string; image: string; sales: number; revenue: number }[];
  recentOrders: any[];
  salesByCategory: { category: string; revenue: number; percent: number }[];
}
