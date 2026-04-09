import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, ProductFilters, ProductListResponse } from '../models/product.model';
import { Category } from '../models/category.model';
import { Review } from '../models/review.model';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(filters: Partial<ProductFilters> = {}): Observable<ProductListResponse> {
    let params = new HttpParams();
    if (filters.search) params = params.set('search', filters.search);
    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
    if (filters.inStock) params = params.set('inStock', 'true');
    if (filters.isFeatured) params = params.set('isFeatured', 'true');
    if (filters.isNew) params = params.set('isNew', 'true');
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());

    return this.http.get<any>(`${API}/products`, { params }).pipe(
      map(res => this.mapProductList(res)),
      catchError(err => {
        console.error('[ProductService] getProducts error:', err);
        return of({ products: [], total: 0, page: 1, totalPages: 1 } as ProductListResponse);
      })
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<any>(`${API}/products/${id}`).pipe(
      map(res => this.mapProduct(res.data || res)),
      catchError(() => of(undefined))
    );
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.http.get<any>(`${API}/products/${slug}`).pipe(
      map(res => this.mapProduct(res.data || res)),
      catchError(() => of(undefined))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<any>(`${API}/products/featured`).pipe(
      map(res => this.toArray(res).map((p: any) => this.mapProduct(p)))
    );
  }

  getNewArrivals(): Observable<Product[]> {
    return this.http.get<any>(`${API}/products/new-arrivals`).pipe(
      map(res => this.toArray(res).map((p: any) => this.mapProduct(p)))
    );
  }

  getRelatedProducts(productId: string, categoryId: string): Observable<Product[]> {
    return this.http.get<any>(`${API}/products/${productId}/related`, {
      params: new HttpParams().set('categoryId', categoryId)
    }).pipe(
      map(res => this.toArray(res).map((p: any) => this.mapProduct(p)))
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${API}/categories`).pipe(
      map(res => this.toArray(res).map((c: any) => this.mapCategory(c)))
    );
  }

  private toArray(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  }

  getReviews(productId: string): Observable<Review[]> {
    return this.http.get<any>(`${API}/products/${productId}/reviews`).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<any>(`${API}/products`, product).pipe(
      map(res => this.mapProduct(res.data || res))
    );
  }

  updateProduct(id: string, updates: Partial<Product>): Observable<Product> {
    return this.http.put<any>(`${API}/products/${id}`, updates).pipe(
      map(res => this.mapProduct(res.data || res))
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${API}/products/${id}`);
  }

  // ─── Mappers (API → frontend model) ────────────────────────────────────────

  private mapProductList(res: any): ProductListResponse {
    // API returns: { data: [...], total, page, limit, totalPages }
    // (buildPaginatedResponse, not double-wrapped because interceptor detects 'data' key)
    const items = Array.isArray(res.data) ? res.data :
                  Array.isArray(res) ? res : [];
    const meta = Array.isArray(res.data) ? res : (res.data || res);
    return {
      products: items.map((p: any) => this.mapProduct(p)),
      total: meta.total || items.length,
      page: meta.page || 1,
      totalPages: meta.totalPages || 1
    };
  }

  private mapProduct(p: any): Product {
    const primaryImage = p.images?.find((i: any) => i.isPrimary) || p.images?.[0];
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      shortDescription: p.shortDescription || p.short_description || '',
      categoryId: p.categoryId || p.category?.id || '',
      categoryName: p.category?.name || '',
      brand: p.brand || '',
      price: Number(p.price),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
      stock: p.stock ?? 0,
      stockStatus: p.stockStatus || 'in_stock',
      stockThreshold: p.stockThreshold || 5,
      isPremiumPlacement: p.isPremium || false,
      priceType: 'standard' as const,
      images: (p.images || []).map((img: any) => ({
        id: img.id, url: img.url, alt: img.alt || p.name, isPrimary: img.isPrimary, order: img.sortOrder
      })),
      primaryImageUrl: primaryImage?.url || `https://picsum.photos/seed/${p.slug}/800/600`,
      colorVariants: (p.variants || []).filter((v: any) => v.color).map((v: any) => ({
        id: v.id, name: v.color, hex: v.colorHex, stock: v.stock, priceModifier: Number(v.priceModifier || 0)
      })),
      sizeVariants: (p.variants || []).filter((v: any) => v.size).map((v: any) => ({
        id: v.id, name: v.size, stock: v.stock, priceModifier: Number(v.priceModifier || 0)
      })),
      rating: Number(p.rating || 0),
      reviewCount: p.reviewCount || p.review_count || 0,
      soldCount: p.salesCount || p.sales_count || 0,
      tags: p.tags || [],
      isFeatured: p.isFeatured ?? false,
      isNewArrival: p.isNew ?? p.isNewArrival ?? false,
      isLimitedEdition: p.isLimitedEdition ?? false,
      isPremium: p.isPremium ?? false,
      isActive: p.isActive ?? true,
      fiscal: { sku: p.sku || '', barcode: p.barcode, ncm: p.ncm },
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      createdAt: new Date(p.createdAt || Date.now()),
      updatedAt: new Date(p.updatedAt || Date.now())
    } as Product;
  }

  private mapCategory(c: any): Category {
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon || '🛍️',
      description: c.description || '',
      productCount: c.productCount || c._count?.products || 0,
      isActive: c.isActive ?? true,
      sortOrder: c.sortOrder || 0
    };
  }
}
