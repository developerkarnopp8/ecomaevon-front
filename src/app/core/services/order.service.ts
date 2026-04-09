import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order, OrderFilters, OrderListResponse, OrderStatus } from '../models/order.model';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(filters: Partial<OrderFilters> = {}): Observable<OrderListResponse> {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', (filters.limit || 20).toString());

    return this.http.get<any>(`${API}/orders`, { params }).pipe(
      map(res => this.mapOrderList(res)),
      catchError(() => of({ orders: [], total: 0, page: 1, totalPages: 1 }))
    );
  }

  getMyOrders(page = 1, limit = 10): Observable<OrderListResponse> {
    return this.http.get<any>(`${API}/orders/me`, {
      params: new HttpParams().set('page', page.toString()).set('limit', limit.toString())
    }).pipe(
      map(res => this.mapOrderList(res)),
      catchError(() => of({ orders: [], total: 0, page: 1, totalPages: 1 }))
    );
  }

  private mapOrderList(res: any): OrderListResponse {
    // API returns { data: [...], total, page, totalPages } at top level
    // (buildPaginatedResponse not double-wrapped by TransformInterceptor)
    const items: any[] = Array.isArray(res.data) ? res.data
      : Array.isArray(res.data?.data) ? res.data.data
      : Array.isArray(res) ? res : [];
    return {
      orders: items.map((o: any) => this.mapOrder(o)),
      total: res.total ?? res.data?.total ?? items.length,
      page: res.page ?? res.data?.page ?? 1,
      totalPages: res.totalPages ?? res.data?.totalPages ?? 1
    };
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return this.http.get<any>(`${API}/orders/${id}`).pipe(
      map(res => this.mapOrder(res.data || res)),
      catchError(() => of(undefined))
    );
  }

  createOrder(data: {
    addressId: string;
    paymentMethod: string;
    couponCode?: string;
    cardToken?: string;
    installments?: number;
    notes?: string;
  }): Observable<Order> {
    return this.http.post<any>(`${API}/orders`, data).pipe(
      map(res => this.mapOrder(res.data || res))
    );
  }

  updateOrderStatus(id: string, status: OrderStatus): Observable<Order> {
    return this.http.patch<any>(`${API}/orders/${id}/status`, { status }).pipe(
      map(res => this.mapOrder(res.data || res))
    );
  }

  cancelOrder(id: string): Observable<Order> {
    return this.http.patch<any>(`${API}/orders/${id}/cancel`, {}).pipe(
      map(res => this.mapOrder(res.data || res))
    );
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      processing: 'Em Processamento',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
      refunded: 'Reembolsado'
    };
    return labels[status] || status;
  }

  private mapOrder(o: any): Order {
    return {
      id: o.id,
      orderNumber: o.orderNumber,
      userId: o.userId,
      customerName: o.user?.name || 'Cliente',
      customerEmail: o.user?.email || '',
      status: o.status,
      paymentStatus: o.paymentStatus,
      paymentMethod: o.paymentMethod,
      subtotal: Number(o.subtotal || 0),
      discountAmount: Number(o.discount || o.couponDiscount || 0),
      shippingCost: Number(o.shipping || 0),
      tax: Number(o.tax || 0),
      total: Number(o.total || 0),
      couponCode: o.couponCode,
      shippingAddress: o.shippingAddress || o.address,
      items: (o.items || []).map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        selectedColor: item.variantColor,
        selectedSize: item.variantSize,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice)
      })),
      tracking: o.tracking || [],
      notes: o.notes,
      estimatedDelivery: o.estimatedDelivery ? new Date(o.estimatedDelivery) : undefined,
      createdAt: new Date(o.createdAt || Date.now()),
      updatedAt: new Date(o.updatedAt || Date.now())
    } as Order;
  }
}
