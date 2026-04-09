import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  standalone: false,
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  form: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    // Already logged in as admin — go straight to dashboard
    if (this.auth.isAuthenticated && this.auth.isAdmin) {
      this.router.navigate(['/admin/dashboard']);
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading = true;
    this.errorMsg = '';

    this.auth.login(this.form.value).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user.role !== 'admin' && user.role !== 'staff') {
          this.auth.logout();
          this.errorMsg = 'Acesso negado. Esta área é exclusiva para administradores.';
          return;
        }
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Credenciais inválidas.';
      }
    });
  }
}
