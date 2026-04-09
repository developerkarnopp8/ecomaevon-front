import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check in-memory state first
    if (this.auth.isAuthenticated && this.auth.isAdmin) return true;

    // Fallback: check localStorage directly (handles page refresh)
    const token = localStorage.getItem('access_token');
    const stored = localStorage.getItem('eco_user');
    if (token && stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === 'admin' || user.role === 'staff') return true;
      } catch {}
    }

    this.router.navigate(['/admin/login']);
    return false;
  }
}
