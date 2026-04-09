import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { StoreService } from '../../../core/services/store.service';
import { ToastService } from '../../../core/services/toast.service';
import { Cart } from '../../../core/models/cart.model';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  couponInput = '';
  isCouponLoading = false;
  couponError = '';
  couponSuccess = '';
  readonly Math = Math;

  constructor(
    public cartService: CartService,
    private storeService: StoreService,
    private toast: ToastService,
    public router: Router
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {}

  updateQty(itemId: string, qty: number): void {
    this.cartService.updateQuantity(itemId, qty);
  }

  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId);
    this.toast.info('Item removido do carrinho');
  }

  applyCoupon(): void {
    if (!this.couponInput.trim()) return;
    this.isCouponLoading = true;
    this.couponError = '';
    this.couponSuccess = '';
    this.storeService.validateCoupon(this.couponInput, this.cartService.cart.subtotal).subscribe(res => {
      this.isCouponLoading = false;
      if (res.isValid) {
        this.cartService.applyCoupon(this.couponInput.toUpperCase(), res.discountAmount);
        this.couponSuccess = res.message;
      } else {
        this.couponError = res.message;
      }
    });
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponInput = '';
    this.couponSuccess = '';
  }

  checkout(): void { this.router.navigate(['/checkout']); }
}
