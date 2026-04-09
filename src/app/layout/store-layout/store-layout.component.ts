import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { StoreService } from '../../core/services/store.service';
import { Cart } from '../../core/models/cart.model';
import { Category } from '../../core/models/category.model';
import { StoreSettings } from '../../core/models/store.model';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html'
})
export class StoreLayoutComponent implements OnInit {
  cart$: Observable<Cart>;
  storeName$: Observable<string>;
  categories: Category[] = [];
  storeSettings: StoreSettings | null = null;
  isScrolled = false;
  isMenuOpen = false;
  isCategoryMenuOpen = false;
  isUserMenuOpen = false;
  isSearchOpen = false;
  isCartPreviewOpen = false;
  searchQuery = '';
  activeNav = '';
  currentYear = new Date().getFullYear();

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private productService: ProductService,
    private storeService: StoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.cart$ = this.cartService.cart$;
    this.storeName$ = this.storeService.storeName$;
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.cdr.detectChanges();
    });
    this.storeService.getSettings().subscribe(s => {
      this.storeSettings = s;
      this.cdr.detectChanges();
    });
    this.storeService.storeName$.subscribe(() => this.cdr.detectChanges());
    this.activeNav = this.router.url;
    this.router.events.subscribe(() => this.activeNav = this.router.url);
  }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 40; }

  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalogo'], { queryParams: { busca: this.searchQuery } });
      this.isSearchOpen = false;
      this.searchQuery = '';
    }
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/']); }
}
