import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../../core/services/store.service';
import { ToastService } from '../../../core/services/toast.service';
import { Coupon } from '../../../core/models/coupon.model';

@Component({
  standalone: false,
  selector: 'app-admin-coupons',
  templateUrl: './coupons.component.html'
})
export class AdminCouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  isFormOpen = false;
  isSaving = false;
  editingId = '';
  form: FormGroup;

  couponTypes = [
    { value: 'percentage', label: '% Porcentagem' },
    { value: 'fixed', label: 'R$ Valor Fixo' },
    { value: 'free_shipping', label: '🚚 Frete Grátis' },
  ];

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      type: ['percentage', Validators.required],
      value: [10, [Validators.min(0)]],
      minOrderValue: [null],
      maxDiscount: [null],
      usageLimit: [null],
      perUserLimit: [1],
      startDate: [''],
      expiryDate: [''],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.storeService.getCoupons().subscribe(c => this.coupons = c);
  }

  openForm(coupon?: Coupon): void {
    if (coupon) {
      this.editingId = coupon.id;
      this.form.patchValue({
        ...coupon,
        startDate: coupon.startDate ? this.toInputDate(coupon.startDate) : '',
        expiryDate: coupon.expiryDate ? this.toInputDate(coupon.expiryDate) : '',
      });
    } else {
      this.editingId = '';
      this.form.reset({ type: 'percentage', value: 10, isActive: true, perUserLimit: 1 });
    }
    this.isFormOpen = true;
  }

  saveCoupon(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSaving = true;
    const val = this.form.value;
    const save$ = this.editingId
      ? this.storeService.updateCoupon(this.editingId, val)
      : this.storeService.createCoupon(val);

    save$.subscribe(coupon => {
      if (this.editingId) {
        this.coupons = this.coupons.map(c => c.id === this.editingId ? coupon : c);
      } else {
        this.coupons = [coupon, ...this.coupons];
      }
      this.isSaving = false;
      this.isFormOpen = false;
      this.toast.success(this.editingId ? 'Cupom atualizado!' : 'Cupom criado!');
    });
  }

  toggleActive(coupon: Coupon): void {
    this.storeService.updateCoupon(coupon.id, { isActive: !coupon.isActive }).subscribe(updated => {
      this.coupons = this.coupons.map(c => c.id === coupon.id ? updated : c);
      this.toast.success(updated.isActive ? 'Cupom ativado' : 'Cupom desativado');
    });
  }

  private toInputDate(d: Date): string {
    return new Date(d).toISOString().split('T')[0];
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = { percentage: '% Desconto', fixed: 'R$ Fixo', free_shipping: 'Frete Grátis', buy_x_get_y: 'Compre X Ganhe Y' };
    return map[type] || type;
  }
}
