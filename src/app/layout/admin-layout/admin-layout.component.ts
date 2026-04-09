import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { StoreService } from '../../core/services/store.service';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { Observable } from 'rxjs';

interface NavItem { label: string; icon: string; route: string; badge?: number; }

export interface AppNotification {
  id: string;
  type: 'order' | 'stock' | 'review';
  title: string;
  body: string;
  route: string;
  time: string;
  read: boolean;
}

@Component({
  standalone: false,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isSidebarOpen = true;
  isMobileSidebarOpen = false;
  isNotifOpen = false;
  activeRoute = '';
  storeName$: Observable<string>;
  notifications: AppNotification[] = [];

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Catálogo', icon: 'catalog', route: '/admin/products' },
    { label: 'Pedidos', icon: 'orders', route: '/admin/orders' },
    { label: 'Clientes', icon: 'customers', route: '/admin/customers' },
    { label: 'Cupons', icon: 'coupon', route: '/admin/coupons' },
    { label: 'Analytics', icon: 'analytics', route: '/admin/analytics' },
    { label: 'Configurações', icon: 'settings', route: '/admin/settings' },
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
    private storeService: StoreService,
    private orderService: OrderService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    this.storeName$ = this.storeService.storeName$;
  }

  ngOnInit(): void {
    this.activeRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
      this.isMobileSidebarOpen = false;
      this.isNotifOpen = false;
    });
    this.loadNotifications();
  }

  private loadNotifications(): void {
    forkJoin({
      orders: this.orderService.getOrders({ status: 'pending', limit: 5 }),
      products: this.productService.getProducts({ sortBy: 'newest', limit: 50 })
    }).subscribe(({ orders, products }) => {
      const notifs: AppNotification[] = [];

      orders.orders.forEach(o => notifs.push({
        id: `order-${o.id}`,
        type: 'order',
        title: 'Novo pedido pendente',
        body: `#${o.orderNumber} — ${o.customerName}`,
        route: '/admin/orders',
        time: this.timeAgo(o.createdAt),
        read: false
      }));

      products.products
        .filter(p => p.stock <= (p.stockThreshold ?? 5) && p.stock > 0)
        .slice(0, 5)
        .forEach(p => notifs.push({
          id: `stock-${p.id}`,
          type: 'stock',
          title: 'Estoque baixo',
          body: `${p.name} — apenas ${p.stock} unidades`,
          route: '/admin/products',
          time: '',
          read: false
        }));

      this.notifications = notifs;
      this.cdr.detectChanges();
    });
  }

  get unreadCount(): number { return this.notifications.filter(n => !n.read).length; }

  toggleNotif(): void { this.isNotifOpen = !this.isNotifOpen; }

  markAllRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
  }

  openNotif(n: AppNotification): void {
    n.read = true;
    this.isNotifOpen = false;
    this.router.navigate([n.route]);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.notif-wrapper')) this.isNotifOpen = false;
  }

  private timeAgo(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (!d || isNaN(d.getTime())) return '';
    const diff = Math.floor((Date.now() - d.getTime()) / 60000);
    if (diff < 1) return 'agora';
    if (diff < 60) return `${diff}min atrás`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`;
    return `${Math.floor(diff / 1440)}d atrás`;
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/admin/login']); }

  isActive(route: string): boolean {
    if (route === '/admin/dashboard') return this.activeRoute === '/admin' || this.activeRoute.startsWith('/admin/dashboard');
    return this.activeRoute.startsWith(route);
  }
}
