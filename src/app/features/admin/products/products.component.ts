import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { Product } from '../../../core/models/product.model';

@Component({
  standalone: false,
  selector: 'app-admin-products',
  templateUrl: './products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  searchQuery = '';
  deleteTargetId = '';
  showDeleteConfirm = false;
  currentPage = 1;
  totalPages = 1;
  total = 0;

  constructor(
    private productService: ProductService,
    private toast: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.isLoading = true;
    this.productService.getProducts({ search: this.searchQuery, page: this.currentPage, limit: 10 }).subscribe({
      next: res => {
        this.products = res.products;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Products] Load failed:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void { this.currentPage = 1; this.load(); }

  editProduct(id: string): void { this.router.navigate(['/admin/products/edit', id]); }

  confirmDelete(id: string): void { this.deleteTargetId = id; this.showDeleteConfirm = true; }

  deleteProduct(): void {
    this.productService.deleteProduct(this.deleteTargetId).subscribe(() => {
      this.products = this.products.filter(p => p.id !== this.deleteTargetId);
      this.toast.success('Produto removido com sucesso');
      this.showDeleteConfirm = false;
    });
  }

  getStockClass(stock: string): string {
    if (stock === 'out_of_stock') return 'status-cancelled';
    if (stock === 'low_stock') return 'status-processing';
    return 'status-delivered';
  }

  getStockLabel(stock: string): string {
    if (stock === 'out_of_stock') return 'Esgotado';
    if (stock === 'low_stock') return 'Estoque Baixo';
    return 'Saudável';
  }
}
