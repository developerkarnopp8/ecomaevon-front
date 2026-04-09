import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { StoreService } from '../../../core/services/store.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { Banner, StoreSettings } from '../../../core/models/store.model';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  banners: Banner[] = [];
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  categories: Category[] = [];
  settings!: StoreSettings;
  currentBannerIdx = 0;
  isLoadingFeatured = true;
  isLoadingNew = true;

  private bannerInterval?: ReturnType<typeof setInterval>;

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.storeService.getBanners().subscribe(banners => {
      this.banners = banners.filter((b: any) => b.isActive);
      if (this.banners.length > 1) this.startBannerAutoplay();
      this.cdr.detectChanges();
    });
    this.productService.getFeaturedProducts().subscribe(p => {
      this.featuredProducts = p;
      this.isLoadingFeatured = false;
      this.cdr.detectChanges();
    });
    this.productService.getNewArrivals().subscribe(p => {
      this.newArrivals = p;
      this.isLoadingNew = false;
      this.cdr.detectChanges();
    });
    this.productService.getCategories().subscribe(c => {
      this.categories = c;
      this.cdr.detectChanges();
    });
  }

  private startBannerAutoplay(): void {
    this.bannerInterval = setInterval(() => {
      this.currentBannerIdx = (this.currentBannerIdx + 1) % this.banners.length;
      this.cdr.detectChanges();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.bannerInterval) clearInterval(this.bannerInterval);
  }

  goToBanner(idx: number): void { this.currentBannerIdx = idx; }
  prevBanner(): void { this.currentBannerIdx = (this.currentBannerIdx - 1 + this.banners.length) % this.banners.length; }
  nextBanner(): void { this.currentBannerIdx = (this.currentBannerIdx + 1) % this.banners.length; }
}
