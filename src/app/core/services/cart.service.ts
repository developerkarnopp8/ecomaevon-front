import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>(this.emptyCart());
  cart$: Observable<Cart> = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private emptyCart(): Cart {
    return { id: 'cart-local', items: [], subtotal: 0, discountAmount: 0, shippingCost: 0, tax: 0, total: 0, itemCount: 0, updatedAt: new Date() };
  }

  get cart(): Cart { return this.cartSubject.getValue(); }

  private loadCart(): void {
    this.http.get<any>(`${API}/cart`).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
    });
  }

  private mapCart(res: any): Cart {
    const items: CartItem[] = (res.items || []).map((item: any) => {
      const product = this.mapProduct(item.product);
      return {
        id: item.id,
        productId: item.productId,
        product,
        quantity: item.quantity,
        selectedColor: item.variantColor,
        selectedColorHex: undefined,
        selectedSize: item.variantSize,
        unitPrice: Number(item.product?.price || 0),
        totalPrice: Number(item.product?.price || 0) * item.quantity
      } as CartItem;
    });

    const itemCount = items.reduce((s, i) => s + i.quantity, 0);

    return {
      id: res.id || 'cart-local',
      userId: res.userId,
      items,
      subtotal: Number(res.subtotal || 0),
      discountAmount: Number(res.discount || res.couponDiscount || 0),
      couponCode: res.couponCode || undefined,
      shippingCost: Number(res.shipping || 0),
      tax: Number(res.tax || 0),
      total: Number(res.total || 0),
      itemCount,
      updatedAt: new Date(res.updatedAt || Date.now())
    };
  }

  private mapProduct(p: any): Product {
    if (!p) return {} as Product;
    const primaryImage = p.images?.[0];
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      categoryId: p.categoryId || '',
      categoryName: p.category?.name || '',
      brand: p.brand || '',
      price: Number(p.price),
      stock: p.stock ?? 0,
      stockStatus: p.stockStatus || 'in_stock',
      stockThreshold: p.stockThreshold || 5,
      isPremiumPlacement: p.isPremium || false,
      priceType: 'standard' as const,
      images: (p.images || []).map((img: any) => ({
        id: img.id, url: img.url, alt: img.alt || p.name, isPrimary: img.isPrimary, order: img.sortOrder
      })),
      primaryImageUrl: primaryImage?.url || `https://picsum.photos/seed/${p.slug || p.id}/400/400`,
      colorVariants: [],
      sizeVariants: [],
      rating: Number(p.rating || 0),
      reviewCount: p.reviewCount || 0,
      soldCount: p.salesCount || 0,
      tags: p.tags || [],
      isFeatured: p.isFeatured ?? false,
      isNewArrival: p.isNew ?? false,
      isLimitedEdition: p.isLimitedEdition ?? false,
      isPremium: p.isPremium ?? false,
      isActive: p.isActive ?? true,
      fiscal: { sku: p.sku || '' },
      createdAt: new Date(p.createdAt || Date.now()),
      updatedAt: new Date(p.updatedAt || Date.now())
    } as Product;
  }

  addItem(product: Product, quantity: number = 1, color?: string, colorHex?: string, size?: string): void {
    this.http.post<any>(`${API}/cart/items`, {
      productId: product.id,
      quantity,
      variantColor: color || undefined,
      variantSize: size || undefined
    }).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
    });
  }

  removeItem(itemId: string): void {
    this.http.delete<any>(`${API}/cart/items/${itemId}`).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
      else {
        // Optimistic local removal
        const cart = { ...this.cart, items: this.cart.items.filter(i => i.id !== itemId) };
        this.cartSubject.next(this.recalculateLocal(cart));
      }
    });
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) { this.removeItem(itemId); return; }
    this.http.put<any>(`${API}/cart/items/${itemId}`, { quantity }).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
    });
  }

  applyCoupon(code: string, discount: number = 0): void {
    this.http.post<any>(`${API}/cart/coupon`, { code }).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
    });
  }

  removeCoupon(): void {
    this.http.delete<any>(`${API}/cart/coupon`).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) this.cartSubject.next(this.mapCart(res.data || res));
    });
  }

  clearCart(): void {
    this.http.delete<any>(`${API}/cart`).pipe(
      catchError(() => of(null))
    ).subscribe(() => {
      this.cartSubject.next(this.emptyCart());
    });
  }

  mergeGuestCart(sessionId: string): Observable<any> {
    return this.http.post<any>(`${API}/cart/merge`, {}, {
      headers: { 'X-Session-ID': sessionId }
    }).pipe(
      tap(res => {
        if (res) this.cartSubject.next(this.mapCart(res.data || res));
      }),
      catchError(() => of(null))
    );
  }

  // Fallback local recalculation if API fails
  private recalculateLocal(cart: Cart): Cart {
    const subtotal = cart.items.reduce((s, i) => s + i.totalPrice, 0);
    const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);
    const shippingCost = subtotal >= 300 ? 0 : subtotal > 0 ? 15 : 0;
    const taxableAmount = subtotal - cart.discountAmount;
    const tax = taxableAmount > 0 ? taxableAmount * 0.08 : 0;
    const total = taxableAmount + shippingCost + tax;
    return { ...cart, subtotal, itemCount, shippingCost, tax, total, updatedAt: new Date() };
  }
}
