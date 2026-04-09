import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { StoreSettings, DashboardMetrics, Banner } from '../models/store.model';
import { Coupon, CouponValidation } from '../models/coupon.model';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class StoreService {
  private settings$ = new BehaviorSubject<StoreSettings | null>(null);
  storeName$ = new BehaviorSubject<string>('ECOMAEVON');

  constructor(private http: HttpClient) {
    // Load settings once on startup to populate storeName globally
    this.getSettings().subscribe();
  }

  applyCssVars(s: Partial<StoreSettings>): void {
    if (s.storeName) this.storeName$.next(s.storeName);
    if (s.primaryColor) {
      document.documentElement.style.setProperty('--primary', s.primaryColor);
      document.documentElement.style.setProperty('--primary-dim', this.lightenHex(s.primaryColor, 0.35));
    }
    if (s.accentColor) document.documentElement.style.setProperty('--accent', s.accentColor);
  }

  /** Returns a lighter version of a hex color by mixing with white at ratio (0–1). */
  private lightenHex(hex: string, ratio: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const lr = Math.round(r + (255 - r) * ratio);
    const lg = Math.round(g + (255 - g) * ratio);
    const lb = Math.round(b + (255 - b) * ratio);
    return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
  }

  getSettings(): Observable<StoreSettings> {
    return this.http.get<any>(`${API}/store/settings`).pipe(
      map(res => res.data || res),
      tap(s => { this.settings$.next(s); this.applyCssVars(s); }),
      catchError(() => of(this.settings$.value || {} as StoreSettings))
    );
  }

  updateSettings(updates: Partial<StoreSettings>): Observable<StoreSettings> {
    return this.http.put<any>(`${API}/store/settings`, updates).pipe(
      map(res => res.data || res),
      tap(s => { this.settings$.next(s); this.applyCssVars(s); })
    );
  }

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return this.http.get<any>(`${API}/analytics/dashboard`).pipe(
      map(res => {
        const d = res.data || res;
        const kpis = d.kpis || d;
        return {
          todaySales: kpis.todaySales || 0,
          todayOrders: kpis.todayOrders || 0,
          pendingOrders: kpis.pendingOrders || 0,
          totalProducts: kpis.totalProducts || 0,
          lowStockProducts: kpis.lowStockProducts || 0,
          totalCustomers: kpis.totalCustomers || 0,
          monthlyRevenue: kpis.monthlyRevenue || 0,
          monthlyGrowth: kpis.monthlyGrowth || 0,
          monthlyReach: kpis.monthlyReach || 0,
          conversionRate: kpis.conversionRate || 0,
          avgOrderValue: kpis.avgOrderValue || 0,
          refundRate: kpis.refundRate || 0,
          revenueChart: (d.revenueChart || []).map((r: any) => ({
            label: r.date,
            value: r.revenue || 0
          })),
          topProducts: (d.topProducts || []).map((p: any) => ({
            productId: p.id,
            name: p.name,
            image: p.imageUrl,
            sales: p.salesCount || 0,
            revenue: (p.salesCount || 0) * Number(p.price || 0)
          })),
          salesByCategory: (d.salesByCategory || []).map((c: any, i: number, arr: any[]) => {
            const total = arr.reduce((s: number, x: any) => s + (x.salesCount || 0), 0);
            return {
              category: c.category,
              revenue: c.salesCount || 0,
              percent: total > 0 ? Math.round((c.salesCount / total) * 100) : 0
            };
          }),
          recentOrders: d.recentOrders || []
        } as DashboardMetrics;
      }),
      catchError(() => of({} as DashboardMetrics))
    );
  }

  getBanners(): Observable<Banner[]> {
    return this.http.get<any>(`${API}/store/banners`).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<any>(`${API}/coupons`).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  createCoupon(coupon: Partial<Coupon>): Observable<Coupon> {
    return this.http.post<any>(`${API}/coupons`, coupon).pipe(map(res => res.data || res));
  }

  updateCoupon(id: string, updates: Partial<Coupon>): Observable<Coupon> {
    return this.http.put<any>(`${API}/coupons/${id}`, updates).pipe(map(res => res.data || res));
  }

  deleteCoupon(id: string): Observable<void> {
    return this.http.delete<void>(`${API}/coupons/${id}`);
  }

  updateBanner(banner: Partial<Banner>): Observable<Banner> {
    return this.http.put<any>(`${API}/store/banners/${banner.id}`, banner).pipe(map(res => res.data || res));
  }

  toggleCoupon(id: string): Observable<Coupon> {
    return this.http.patch<any>(`${API}/coupons/${id}/toggle`, {}).pipe(map(res => res.data || res));
  }

  validateCoupon(code: string, subtotal: number): Observable<CouponValidation> {
    return this.http.post<any>(`${API}/coupons/validate`, { code, subtotal }).pipe(
      map(res => res.data || res),
      catchError(() => of({ isValid: false, discountAmount: 0, message: 'Cupom inválido' } as CouponValidation))
    );
  }
}
