import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../../core/services/store.service';
import { OrderService } from '../../../core/services/order.service';
import { DashboardMetrics } from '../../../core/models/store.model';
import { Order } from '../../../core/models/order.model';

@Component({
  standalone: false,
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  metrics?: DashboardMetrics;
  recentOrders: Order[] = [];
  isLoading = true;

  constructor(
    private storeService: StoreService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.storeService.getDashboardMetrics().subscribe({
      next: m => { this.metrics = m; this.isLoading = false; this.cdr.detectChanges(); },
      error: () => { this.isLoading = false; this.cdr.detectChanges(); }
    });
    this.orderService.getOrders({ page: 1, limit: 5 }).subscribe({
      next: res => { this.recentOrders = res.orders; this.cdr.detectChanges(); },
      error: () => {}
    });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente', processing: 'Processando', shipped: 'Enviado',
      delivered: 'Entregue', cancelled: 'Cancelado', refunded: 'Reembolsado'
    };
    return map[status] || status;
  }

  getBarWidth(value: number): number {
    if (!this.metrics) return 0;
    const max = Math.max(...this.metrics.revenueChart.map(d => d.value));
    return (value / max) * 100;
  }
}
