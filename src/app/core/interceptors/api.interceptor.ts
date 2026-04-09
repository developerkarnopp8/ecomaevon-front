import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrl)) {
      return next.handle(req);
    }

    req = this.addHeaders(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Don't try to refresh for auth endpoints themselves
        if (error.status === 401 && !req.url.includes('/auth/')) {
          return this.handle401(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const headers: Record<string, string> = {};

    const token = localStorage.getItem('access_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const sessionId = localStorage.getItem('session_id') || this.generateSessionId();
    headers['X-Session-ID'] = sessionId;

    return req.clone({ setHeaders: headers });
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      // Wait for the ongoing refresh to complete, then retry
      return this.refreshToken$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.cloneWithToken(req, token!)))
      );
    }

    this.isRefreshing = true;
    this.refreshToken$.next(null);

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearAuth();
      this.isRefreshing = false;
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      switchMap(res => {
        const data = res.data || res;
        const newToken = data.accessToken;
        localStorage.setItem('access_token', newToken);
        this.isRefreshing = false;
        this.refreshToken$.next(newToken);
        return next.handle(this.cloneWithToken(req, newToken));
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.clearAuth();
        return throwError(() => err);
      })
    );
  }

  private cloneWithToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const sessionId = localStorage.getItem('session_id') || '';
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'X-Session-ID': sessionId
      }
    });
  }

  private clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('eco_user');
  }

  private generateSessionId(): string {
    const id = 'sess_' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('session_id', id);
    return id;
  }
}
