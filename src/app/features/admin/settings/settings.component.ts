import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../../core/services/store.service';
import { ToastService } from '../../../core/services/toast.service';
import { StoreSettings, Banner } from '../../../core/models/store.model';

@Component({
  standalone: false,
  selector: 'app-admin-settings',
  templateUrl: './settings.component.html'
})
export class AdminSettingsComponent implements OnInit {
  settings?: StoreSettings;
  banners: Banner[] = [];
  activeTab: 'general' | 'appearance' | 'banners' | 'payments' | 'notifications' = 'general';
  isSaving = false;

  form: FormGroup;

  templates = [
    { id: 'tpl-1', name: 'The Curator', niche: 'Premium Geral', preview: '🎨', active: true },
    { id: 'tpl-2', name: 'Boutique Fashion', niche: 'Moda & Vestuário', preview: '👗', active: false },
    { id: 'tpl-3', name: 'TechStore', niche: 'Eletrônicos', preview: '💻', active: false },
    { id: 'tpl-4', name: 'Casa & Lar', niche: 'Móveis & Decoração', preview: '🛋️', active: false },
    { id: 'tpl-5', name: 'AutoShop', niche: 'Automóveis', preview: '🚗', active: false },
    { id: 'tpl-6', name: 'TicketHub', niche: 'Ingressos & Eventos', preview: '🎟️', active: false },
  ];

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      storeName: ['', Validators.required],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      whatsapp: [''],
      cnpj: [''],
      primaryColor: ['#004be3'],
      accentColor: ['#f893e7'],
      freeShippingThreshold: [300],
      taxRate: [8],
      enableReviews: [true],
      enableWishlist: [true],
      maintenanceMode: [false],
      // Payment methods
      payCardEnabled: [true],
      payPixEnabled: [true],
      payCashEnabled: [true],
      payWalletEnabled: [false],
      // Notification preferences
      notifyNewOrder: [true],
      notifyLowStock: [true],
      notifyNewReview: [false],
      notifyAbandonedCart: [true],
      notifyMonthlyReport: [true],
    });
  }

  ngOnInit(): void {
    this.storeService.getSettings().subscribe(s => {
      this.settings = s;
      this.form.patchValue(s);
      this.cdr.detectChanges();
    });
    this.storeService.getBanners().subscribe(b => {
      this.banners = b;
      this.cdr.detectChanges();
    });
    this.form.get('primaryColor')?.valueChanges.subscribe(color => {
      if (color) this.storeService.applyCssVars({ primaryColor: color });
    });
    this.form.get('accentColor')?.valueChanges.subscribe(color => {
      if (color) document.documentElement.style.setProperty('--accent', color);
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.isSaving = true;
    this.storeService.updateSettings(this.form.value).subscribe({
      next: () => {
        this.isSaving = false;
        this.toast.success('Configurações salvas com sucesso!');
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSaving = false;
        this.toast.error('Erro ao salvar configurações');
        this.cdr.detectChanges();
      }
    });
  }

  toggleBanner(banner: Banner): void {
    this.storeService.updateBanner({ ...banner, isActive: !banner.isActive }).subscribe(updated => {
      this.banners = this.banners.map(b => b.id === updated.id ? updated : b);
      this.cdr.detectChanges();
    });
  }

  activateTemplate(id: string): void {
    this.templates.forEach(t => t.active = t.id === id);
    this.toast.success('Template ativado!');
  }
}
