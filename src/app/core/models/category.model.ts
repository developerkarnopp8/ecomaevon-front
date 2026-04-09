export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  parentId?: string;
  subcategories?: Category[];
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}
