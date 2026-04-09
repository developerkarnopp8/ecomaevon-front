import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { ToastService } from '../../../core/services/toast.service';
import { Order, OrderStatus } from '../../../core/models/order.model';

@Component({
  standalone: false,
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html'
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  total = 0;
  totalPages = 1;
  currentPage = 1;
  isLoading = true;
  searchQuery = '';
  selectedStatus = '';
  selectedOrder?: Order;

  statuses = [
    { value: '', label: 'Todos os Status' },
    { value: 'processing', label: 'Processando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregue' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'refunded', label: 'Reembolsado' }
  ];

  constructor(
    private orderService: OrderService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.isLoading = true;
    this.orderService.getOrders({
      status: this.selectedStatus as OrderStatus || undefined,
      search: this.searchQuery,
      page: this.currentPage, limit: 10
    }).subscribe({
      next: res => {
        this.orders = res.orders;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.isLoading = false; this.cdr.detectChanges(); }
    });
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(updated => {
      this.orders = this.orders.map(o => o.id === orderId ? updated : o);
      if (this.selectedOrder?.id === orderId) this.selectedOrder = updated;
      this.toast.success(`Status atualizado: ${this.getStatusLabel(status)}`);
    });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendente', processing: 'Processando', shipped: 'Enviado',
      delivered: 'Entregue', cancelled: 'Cancelado', refunded: 'Reembolsado'
    };
    return map[status] || status;
  }
}
