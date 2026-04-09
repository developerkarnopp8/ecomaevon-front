export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  hex?: string;
  stock: number;
  priceModifier: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductDimensions {
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  unit: 'cm' | 'mm' | 'in';
  weightUnit: 'kg' | 'g' | 'lb';
}

export interface ProductFiscal {
  sku: string;
  barcode?: string;
  ncm?: string;
  cfop?: string;
  origem?: number;
  cst?: string;
  aliquotaICMS?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: ProductImage[];
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  brand?: string;
  tags: string[];
  colorVariants: ProductVariant[];
  sizeVariants: ProductVariant[];
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockThreshold: number;
  isActive: boolean;
  isFeatured: boolean;
  isLimitedEdition: boolean;
  isNewArrival: boolean;
  isPremiumPlacement: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  priceType: 'standard' | 'flash_sale' | 'promotional';
  dimensions?: ProductDimensions;
  fiscal: ProductFiscal;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  brand?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating';
  page: number;
  limit: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
