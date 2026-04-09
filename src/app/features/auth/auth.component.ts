import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  standalone: false,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'register' = 'login';
  isLoading = false;
  returnUrl = '/';
  showPassword = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  demoAccounts = [
    { label: '👤 Cliente Demo', email: 'cliente@demo.com', password: 'demo123' },
    { label: '⚙️ Admin Demo', email: 'admin@demo.com', password: 'admin123' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      cpf: [''],
      phone: [''],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => this.returnUrl = p['returnUrl'] || '/');
    this.route.url.subscribe(segments => {
      if (segments.some(s => s.path === 'cadastro')) this.mode = 'register';
    });
  }

  login(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(user => {
      this.isLoading = false;
      this.toast.success(`Bem-vindo, ${user.name}!`);
      this.router.navigate([user.role === 'admin' ? '/admin' : this.returnUrl]);
    }, () => {
      this.isLoading = false;
      this.toast.error('E-mail ou senha inválidos');
    });
  }

  register(): void {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe(user => {
      this.isLoading = false;
      this.toast.success('Conta criada com sucesso!', `Bem-vindo, ${user.name}!`);
      this.router.navigate([this.returnUrl]);
    }, () => {
      this.isLoading = false;
      this.toast.error('Erro ao criar conta');
    });
  }

  demoLogin(email: string): void {
    this.isLoading = true;
    this.authService.login({ email, password: 'demo' }).subscribe(user => {
      this.isLoading = false;
      this.toast.success(`Bem-vindo, ${user.name}!`);
      this.router.navigate([user.role === 'admin' ? '/admin' : '/']);
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    if (pass !== confirm) form.get('confirmPassword')?.setErrors({ mismatch: true });
    return null;
  }
}
