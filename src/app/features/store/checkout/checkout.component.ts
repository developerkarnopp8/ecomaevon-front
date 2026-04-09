import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Cart } from '../../../core/models/cart.model';
import { Address } from '../../../core/models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: false,
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  step: 'shipping' | 'payment' = 'shipping';
  paymentMethod: 'credit_card' | 'pix' | 'cash' = 'credit_card';
  isProcessing = false;

  shippingForm: FormGroup;
  paymentForm: FormGroup;

  savedAddresses: Address[] = [];
  selectedAddressId = '';
  useNewAddress = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public cartService: CartService,
    private orderService: OrderService,
    public authService: AuthService,
    private toast: ToastService
  ) {
    this.cart$ = this.cartService.cart$;
    this.shippingForm = this.fb.group({
      recipientName: ['Alexander Lumina', Validators.required],
      street: ['742 Evergreen Terrace', Validators.required],
      number: ['742', Validators.required],
      complement: [''],
      neighborhood: ['Jardins', Validators.required],
      city: ['São Paulo', Validators.required],
      state: ['SP', Validators.required],
      zipCode: ['01310-100', [Validators.required, Validators.minLength(8)]],
    });

    this.paymentForm = this.fb.group({
      holderName: ['ALEXANDER LUMINA'],
      cardNumber: ['4111 1111 1111 4421'],
      expiryDate: ['12/27'],
      cvv: ['123'],
    });
  }

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) this.savedAddresses = user.addresses;
    if (this.savedAddresses.length > 0) {
      const defaultAddr = this.savedAddresses.find(a => a.isDefault) || this.savedAddresses[0];
      this.selectedAddressId = defaultAddr.id;
      this.prefillShippingForm(defaultAddr);
    }
  }

  prefillShippingForm(addr: Address): void {
    this.shippingForm.patchValue({
      recipientName: addr.recipientName,
      street: addr.street,
      number: addr.number,
      complement: addr.complement || '',
      neighborhood: addr.neighborhood,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
    });
  }

  selectAddress(addr: Address): void {
    this.selectedAddressId = addr.id;
    this.prefillShippingForm(addr);
  }

  continueToPayment(): void {
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      this.toast.error('Preencha todos os campos de endereço');
      return;
    }
    this.step = 'payment';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  placeOrder(): void {
    const cart = this.cartService.cart;
    if (cart.items.length === 0) return;

    if (this.paymentMethod === 'credit_card' && this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      this.toast.error('Preencha os dados do cartão');
      return;
    }

    this.isProcessing = true;
    const form = this.shippingForm.value;

    // If we have a selected saved address, use it; otherwise create address first
    const addressId$ = this.selectedAddressId
      ? of({ id: this.selectedAddressId })
      : this.http.post<any>(`${environment.apiUrl}/users/me/addresses`, {
          ...form, label: 'Entrega', recipientName: form.recipientName
        }).pipe(
          catchError(() => of({ id: null }))
        );

    addressId$.pipe(
      switchMap((addr: any) => this.orderService.createOrder({
        addressId: addr.id || addr.data?.id,
        paymentMethod: this.paymentMethod as any,
      }))
    ).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/pedido-confirmado'], { queryParams: { orderId: order.id, orderNumber: order.orderNumber } });
      },
      error: (err) => {
        this.isProcessing = false;
        const msg = err?.error?.message || 'Erro ao processar o pedido. Tente novamente.';
        this.toast.error(msg);
      }
    });
  }

  get shippingAddress(): Address {
    const form = this.shippingForm.value;
    return { id: '', label: 'Entrega', country: 'Brasil', isDefault: false, ...form };
  }
}
