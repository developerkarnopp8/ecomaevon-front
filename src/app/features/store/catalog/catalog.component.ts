import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductFilters } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

@Component({
  standalone: false,
  selector: 'app-catalog',
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  total = 0;
  totalPages = 0;
  isLoading = true;
  isFiltersOpen = false;

  filters: Partial<ProductFilters> = {
    page: 1, limit: 12, sortBy: 'newest'
  };

  sortOptions = [
    { value: 'newest', label: 'Mais Recentes' },
    { value: 'popular', label: 'Mais Vendidos' },
    { value: 'rating', label: 'Melhor Avaliados' },
    { value: 'price_asc', label: 'Menor Preço' },
    { value: 'price_desc', label: 'Maior Preço' },
  ];

  priceRanges = [
    { label: 'Até R$200', min: 0, max: 200 },
    { label: 'R$200 – R$500', min: 200, max: 500 },
    { label: 'R$500 – R$1.000', min: 500, max: 1000 },
    { label: 'R$1.000 – R$5.000', min: 1000, max: 5000 },
    { label: 'Acima de R$5.000', min: 5000, max: undefined }
  ];
  selectedPriceRange: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(c => {
      this.categories = c;
      this.cdr.detectChanges();
    });
    this.route.queryParams.subscribe(params => {
      this.filters = {
        ...this.filters,
        page: 1,
        search: params['busca'],
        categoryId: params['categoria'],
        isFeatured: params['destaque'] === 'true' ? true : undefined,
        isNew: params['novo'] === 'true' ? true : undefined,
      };
      this.load();
    });
  }

  load(): void {
    this.isLoading = true;
    this.productService.getProducts(this.filters).subscribe(res => {
      this.products = res.products;
      this.total = res.total;
      this.totalPages = res.totalPages;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  applySort(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    this.filters = { ...this.filters, sortBy: sortBy as any, page: 1 };
    this.load();
  }

  applyCategory(categoryId: string | undefined): void {
    this.filters = { ...this.filters, categoryId, page: 1 };
    this.load();
  }

  applyPriceRange(range: any): void {
    this.selectedPriceRange = range ? range.label : null;
    this.filters = { ...this.filters, minPrice: range?.min, maxPrice: range?.max, page: 1 };
    this.load();
  }

  toggleStock(inStock: boolean): void {
    this.filters = { ...this.filters, inStock: this.filters.inStock ? undefined : true, page: 1 };
    this.load();
  }

  clearFilters(): void {
    this.selectedPriceRange = null;
    this.filters = { page: 1, limit: 12, sortBy: 'newest' };
    this.router.navigate(['/catalogo']);
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, page };
    this.load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get activeCategory(): Category | undefined {
    return this.categories.find(c => c.id === this.filters.categoryId);
  }

  get hasActiveFilters(): boolean {
    return !!(this.filters.categoryId || this.filters.search || this.selectedPriceRange || this.filters.inStock);
  }
}
