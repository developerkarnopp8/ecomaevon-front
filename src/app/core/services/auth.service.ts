import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User, AuthState, LoginRequest, RegisterRequest } from '../models/user.model';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    user: null, token: null, isAuthenticated: false, isLoading: false
  });

  auth$: Observable<AuthState> = this.authState.asObservable();
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<User | null>(null);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    const stored = localStorage.getItem('eco_user');
    if (token && stored) {
      try {
        const user = JSON.parse(stored);
        this.setAuth(user, token);
        // Refresh user data from API
        this.http.get<any>(`${API}/auth/me`).pipe(
          catchError(() => of(null))
        ).subscribe(res => {
          if (res?.data || res?.id) this.setAuth(this.mapUser(res.data || res), token);
        });
      } catch {}
    }
  }

  private mergeGuestCartAfterLogin(): void {
    const sessionId = localStorage.getItem('session_id');
    if (sessionId) {
      this.http.post<any>(`${API}/cart/merge`, {}, {
        headers: { 'X-Session-ID': sessionId }
      }).pipe(catchError(() => of(null))).subscribe();
    }
  }

  login(req: LoginRequest): Observable<User> {
    this.authState.next({ ...this.authState.value, isLoading: true });
    return this.http.post<any>(`${API}/auth/login`, req).pipe(
      tap(res => {
        const data = res.data || res;
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        const user = this.mapUser(data.user);
        localStorage.setItem('eco_user', JSON.stringify(user));
        this.setAuth(user, data.accessToken);
        this.mergeGuestCartAfterLogin();
      }),
      map(res => this.mapUser((res.data || res).user))
    );
  }

  register(req: RegisterRequest): Observable<User> {
    this.authState.next({ ...this.authState.value, isLoading: true });
    return this.http.post<any>(`${API}/auth/register`, req).pipe(
      tap(res => {
        const data = res.data || res;
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        const user = this.mapUser(data.user);
        localStorage.setItem('eco_user', JSON.stringify(user));
        this.setAuth(user, data.accessToken);
        this.mergeGuestCartAfterLogin();
      }),
      map(res => this.mapUser((res.data || res).user))
    );
  }

  // Demo quick-access (uses real API with seeded credentials)
  loginAsCustomer(): Observable<User> {
    return this.login({ email: 'cliente@ecomaevon.com', password: 'Cliente@123' });
  }

  loginAsAdmin(): Observable<User> {
    return this.login({ email: 'admin@ecomaevon.com', password: 'Admin@123' });
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.http.post(`${API}/auth/logout`, { refreshToken }).pipe(catchError(() => of(null))).subscribe();
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('eco_user');
    this.authState.next({ user: null, token: null, isAuthenticated: false, isLoading: false });
    this.isAuthenticated$.next(false);
    this.currentUser$.next(null);
    this.isAdmin$.next(false);
  }

  get currentUser(): User | null { return this.authState.value.user; }
  get isAuthenticated(): boolean { return this.authState.value.isAuthenticated; }
  get isAdmin(): boolean { return this.authState.value.user?.role === 'admin' || this.authState.value.user?.role === 'staff'; }

  updateUser(updates: Partial<User>): void {
    const current = this.authState.value.user;
    if (current) {
      const updated = { ...current, ...updates };
      this.authState.next({ ...this.authState.value, user: updated });
      this.currentUser$.next(updated);
      localStorage.setItem('eco_user', JSON.stringify(updated));
    }
  }

  toggleWishlist(productId: string): boolean {
    const user = this.currentUser;
    if (!user) return false;
    const inWishlist = user.wishlist.includes(productId);
    const endpoint = inWishlist
      ? this.http.delete(`${API}/users/me/wishlist/${productId}`)
      : this.http.post(`${API}/users/me/wishlist/${productId}`, {});
    endpoint.pipe(catchError(() => of(null))).subscribe();
    const wishlist = inWishlist
      ? user.wishlist.filter(id => id !== productId)
      : [...user.wishlist, productId];
    this.updateUser({ wishlist });
    return !inWishlist;
  }

  private setAuth(user: User, token: string): void {
    this.authState.next({ user, token, isAuthenticated: true, isLoading: false });
    this.isAuthenticated$.next(true);
    this.currentUser$.next(user);
    this.isAdmin$.next(user.role === 'admin' || user.role === 'staff');
  }

  private mapUser(u: any): User {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      cpf: u.cpf,
      role: u.role || 'customer',
      avatarUrl: u.avatarUrl,
      isActive: u.isActive ?? true,
      newsletterOptIn: u.newsletterOptIn ?? false,
      addresses: u.addresses || [],
      paymentMethods: u.paymentMethods || [],
      wishlist: Array.isArray(u.wishlist)
        ? u.wishlist.map((w: any) => typeof w === 'string' ? w : w.productId)
        : [],
      totalOrders: u.totalOrders || 0,
      totalSpent: Number(u.totalSpent || 0),
      createdAt: new Date(u.createdAt || Date.now())
    } as User;
  }
}
