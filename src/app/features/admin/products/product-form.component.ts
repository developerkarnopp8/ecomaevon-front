import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../core/services/toast.service';
import { Category } from '../../../core/models/category.model';
import { UploadedImage } from '../../../shared/components/image-uploader/image-uploader.component';

@Component({
  standalone: false,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  isSaving = false;
  productId = '';
  isEdit = false;
  activeTab: 'general' | 'pricing' | 'variants' | 'fiscal' | 'seo' = 'general';
  uploadedImages: UploadedImage[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      brand: [''],
      tags: [''],

      // Pricing
      price: [0, [Validators.required, Validators.min(0.01)]],
      originalPrice: [null],
      priceType: ['standard'],

      // Inventory
      stock: [0, Validators.required],
      stockThreshold: [5],

      // Flags
      isActive: [true],
      isFeatured: [false],
      isLimitedEdition: [false],
      isNewArrival: [false],
      isPremiumPlacement: [false],

      // Fiscal
      sku: ['', Validators.required],
      barcode: [''],
      ncm: [''],

      // SEO
      metaTitle: [''],
      metaDescription: [''],
    });
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(c => this.categories = c);
    this.productId = this.route.snapshot.params['id'];
    if (this.productId && this.productId !== 'novo') {
      this.isEdit = true;
      this.isLoading = true;
      this.productService.getProductById(this.productId).subscribe(p => {
        if (!p) { this.router.navigate(['/admin/products']); return; }
        this.form.patchValue({
          ...p,
          tags: p.tags.join(', '),
          sku: p.fiscal.sku,
          barcode: p.fiscal.barcode || '',
          ncm: p.fiscal.ncm || '',
        });
        this.uploadedImages = p.images.map(img => ({
          id: img.id, url: img.url, isPrimary: img.isPrimary
        }));
        this.isLoading = false;
      });
    }

    this.form.get('name')?.valueChanges.subscribe(name => {
      if (!this.isEdit) {
        this.form.patchValue({ slug: this.slugify(name) }, { emitEvent: false });
      }
    });
  }

  slugify(text: string): string {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSaving = true;
    const val = this.form.value;
    const productData = {
      ...val,
      tags: val.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      images: this.uploadedImages.map((img, i) => ({
        id: img.id, url: img.url, alt: val.name, isPrimary: img.isPrimary, order: i
      })),
      fiscal: { sku: val.sku, barcode: val.barcode, ncm: val.ncm },
      stockStatus: val.stock > val.stockThreshold ? 'in_stock' : val.stock > 0 ? 'low_stock' : 'out_of_stock',
    };

    const save$ = this.isEdit
      ? this.productService.updateProduct(this.productId, productData)
      : this.productService.createProduct(productData);

    save$.subscribe(() => {
      this.isSaving = false;
      this.toast.success(this.isEdit ? 'Produto atualizado!' : 'Produto criado!');
      this.router.navigate(['/admin/products']);
    }, () => {
      this.isSaving = false;
      this.toast.error('Erro ao salvar produto');
    });
  }

  cancel(): void { this.router.navigate(['/admin/products']); }
}
