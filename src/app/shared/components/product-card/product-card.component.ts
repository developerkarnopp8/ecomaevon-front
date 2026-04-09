import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  standalone: false,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() quickView = new EventEmitter<Product>();

  isWishlisted = false;
  isAddingToCart = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.isWishlisted = user?.wishlist.includes(this.product.id) ?? false;
  }

  get primaryImage(): string {
    return this.product.images.find(i => i.isPrimary)?.url || this.product.images[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80';
  }

  get discountPercent(): number {
    if (!this.product.originalPrice) return 0;
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }

  get stockBadge(): { text: string; class: string } | null {
    if (this.product.stockStatus === 'out_of_stock') return { text: 'Esgotado', class: 'badge-out' };
    if (this.product.stockStatus === 'low_stock') return { text: `Últimas ${this.product.stock}`, class: 'badge-warning' };
    return null;
  }

  addToCart(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    if (this.product.stock === 0) return;
    this.isAddingToCart = true;
    const firstColor = this.product.colorVariants[0];
    const firstSize = this.product.sizeVariants[0];
    this.cartService.addItem(
      this.product, 1,
      firstColor?.name, firstColor?.hex,
      firstSize?.name
    );
    this.toast.success('Adicionado ao carrinho!', this.product.name);
    setTimeout(() => this.isAddingToCart = false, 600);
  }

  toggleWishlist(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    if (!this.authService.isAuthenticated) {
      this.toast.info('Faça login para salvar produtos');
      return;
    }
    this.isWishlisted = this.authService.toggleWishlist(this.product.id);
    this.toast.success(this.isWishlisted ? 'Salvo nos favoritos' : 'Removido dos favoritos');
  }

  onQuickView(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
    this.quickView.emit(this.product);
  }
}
