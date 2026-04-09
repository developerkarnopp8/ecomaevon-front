import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Product, ProductVariant } from '../../../core/models/product.model';
import { Review } from '../../../core/models/review.model';

@Component({
  standalone: false,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  relatedProducts: Product[] = [];
  reviews: Review[] = [];
  isLoading = true;
  isAddingToCart = false;

  selectedImageIdx = 0;
  selectedColor?: ProductVariant;
  selectedSize?: ProductVariant;
  quantity = 1;
  activeTab: 'description' | 'specs' | 'reviews' = 'description';
  isWishlisted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProduct(params['slug']);
    });
  }

  private loadProduct(slug: string): void {
    this.isLoading = true;
    this.productService.getProductBySlug(slug).subscribe(p => {
      if (!p) { this.router.navigate(['/catalogo']); return; }
      this.product = p;
      this.isLoading = false;
      this.selectedImageIdx = 0;
      this.selectedColor = p.colorVariants[0];
      this.selectedSize = p.sizeVariants[0];
      this.isWishlisted = this.authService.currentUser?.wishlist.includes(p.id) ?? false;
      this.cdr.detectChanges();
      this.productService.getReviews(p.id).subscribe(r => {
        this.reviews = r;
        this.cdr.detectChanges();
      });
      this.productService.getRelatedProducts(p.id, p.categoryId).subscribe(r => {
        this.relatedProducts = r;
        this.cdr.detectChanges();
      });
    });
  }

  selectImage(idx: number): void { this.selectedImageIdx = idx; }

  selectColor(color: ProductVariant): void {
    this.selectedColor = color;
    if (color.stock === 0) this.toast.warning('Esta cor está indisponível');
  }

  selectSize(size: ProductVariant): void {
    if (size.stock === 0) return;
    this.selectedSize = size;
  }

  updateQty(delta: number): void {
    const newQty = this.quantity + delta;
    const max = this.product?.stock || 99;
    if (newQty >= 1 && newQty <= max) this.quantity = newQty;
  }

  addToCart(): void {
    if (!this.product) return;
    if (this.product.sizeVariants.length > 0 && !this.selectedSize) {
      this.toast.warning('Selecione um tamanho');
      return;
    }
    this.isAddingToCart = true;
    this.cartService.addItem(
      this.product, this.quantity,
      this.selectedColor?.name, this.selectedColor?.hex,
      this.selectedSize?.name
    );
    this.toast.success('Adicionado ao carrinho!', `${this.quantity}x ${this.product.name}`);
    setTimeout(() => this.isAddingToCart = false, 600);
  }

  buyNow(): void {
    this.addToCart();
    setTimeout(() => this.router.navigate(['/checkout']), 100);
  }

  toggleWishlist(): void {
    if (!this.authService.isAuthenticated) {
      this.toast.info('Faça login para salvar nos favoritos');
      return;
    }
    this.isWishlisted = this.authService.toggleWishlist(this.product!.id);
    this.toast.success(this.isWishlisted ? 'Salvo nos favoritos' : 'Removido dos favoritos');
  }

  get currentPrice(): number {
    if (!this.product) return 0;
    const base = this.product.price;
    const colorMod = this.selectedColor?.priceModifier || 0;
    const sizeMod = this.selectedSize?.priceModifier || 0;
    return base + colorMod + sizeMod;
  }

  get discountPercent(): number {
    if (!this.product?.originalPrice) return 0;
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }

  get reviewAvg(): number {
    if (!this.reviews.length) return 0;
    return this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length;
  }
}
