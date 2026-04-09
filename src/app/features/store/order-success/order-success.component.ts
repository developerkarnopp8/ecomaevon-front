import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';

@Component({
  standalone: false,
  selector: 'app-order-success',
  templateUrl: './order-success.component.html'
})
export class OrderSuccessComponent implements OnInit {
  order?: Order;
  orderNumber = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderNumber = params['orderNumber'] || '';
      if (params['orderId']) {
        this.orderService.getOrderById(params['orderId']).subscribe(o => this.order = o);
      }
    });
    if (!this.orderNumber) this.router.navigate(['/']);
  }

  get estimatedDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}
