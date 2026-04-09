import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Component({
  standalone: false,
  selector: 'app-admin-customers',
  templateUrl: './customers.component.html'
})
export class AdminCustomersComponent implements OnInit {
  customers: User[] = [];
  total = 0;
  totalPages = 1;
  currentPage = 1;
  isLoading = true;
  searchQuery = '';
  selectedCustomer?: User;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.isLoading = true;
    let params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('limit', '15');
    if (this.searchQuery) params = params.set('search', this.searchQuery);

    this.http.get<any>(`${API}/users`, { params }).pipe(
      catchError(() => of({ data: [], total: 0, totalPages: 1 }))
    ).subscribe(res => {
      const list = res.data || res;
      const items = Array.isArray(list) ? list : (list.data || []);
      this.customers = items.map((u: any) => this.mapUser(u));
      this.total = list.total || this.customers.length;
      this.totalPages = list.totalPages || 1;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  onSearch(): void { this.currentPage = 1; this.load(); }

  get filtered(): User[] { return this.customers; }

  toggleStatus(customer: User): void {
    this.http.patch<any>(`${API}/users/${customer.id}/toggle-active`, {}).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) {
        this.customers = this.customers.map(c =>
          c.id === customer.id ? { ...c, isActive: !c.isActive } : c
        );
        if (this.selectedCustomer?.id === customer.id) {
          this.selectedCustomer = { ...this.selectedCustomer, isActive: !customer.isActive };
        }
      }
    });
  }

  changeRole(customer: User, role: string): void {
    this.http.patch<any>(`${API}/users/${customer.id}/role`, { role }).pipe(
      catchError(() => of(null))
    ).subscribe(res => {
      if (res) {
        const updated = { ...customer, role: role as any };
        this.customers = this.customers.map(c => c.id === customer.id ? updated : c);
        this.selectedCustomer = updated;
      }
    });
  }

  private mapUser(u: any): User {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      cpf: u.cpf || '',
      role: u.role || 'customer',
      avatarUrl: u.avatarUrl,
      isActive: u.isActive ?? true,
      newsletterOptIn: u.newsletterOptIn ?? false,
      addresses: u.addresses || [],
      paymentMethods: u.paymentMethods || [],
      wishlist: [],
      totalOrders: u.totalOrders || 0,
      totalSpent: Number(u.totalSpent || 0),
      createdAt: new Date(u.createdAt || Date.now())
    } as User;
  }
}
