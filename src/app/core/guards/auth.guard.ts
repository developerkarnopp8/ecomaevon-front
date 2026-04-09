import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    }
    const requireAdmin = route.data?.['requireAdmin'];
    if (requireAdmin && !this.auth.isAdmin) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
