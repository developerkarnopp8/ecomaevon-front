import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface UploadedImage {
  id: string;
  url: string;
  file?: File;
  isPrimary: boolean;
}

@Component({
  standalone: false,
  selector: 'app-image-uploader',
  template: `
    <div class="space-y-3">
      <!-- Upload Area -->
      <div class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
           [class]="isDragOver ? 'border-[#004be3] bg-[rgba(0,75,227,0.04)]' : 'border-[#dfdcdc] hover:border-[#afacac]'"
           (click)="fileInput.click()"
           (dragover)="onDragOver($event)"
           (dragleave)="isDragOver = false"
           (drop)="onDrop($event)">
        <div class="w-12 h-12 rounded-full bg-[#f3f0ef] flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004be3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <p class="text-sm font-semibold" style="color: var(--on-surface);">
          {{ label || 'Upload de imagens' }}
        </p>
        <p class="text-xs mt-1" style="color: var(--on-surface-variant);">
          Arraste e solte ou clique para navegar
        </p>
        <p class="text-xs mt-1" style="color: var(--outline-variant);">
          Suporta: JPG, PNG, WEBP (Máx. 5MB por arquivo)
        </p>
        <input #fileInput type="file" class="hidden" accept="image/jpeg,image/png,image/webp"
               [multiple]="multiple" (change)="onFileSelect($event)">
      </div>

      <!-- Preview Grid -->
      <div *ngIf="images.length > 0" class="grid grid-cols-3 gap-2 sm:grid-cols-4">
        <div *ngFor="let img of images; let i = index"
             class="relative group aspect-square rounded-lg overflow-hidden"
             [class]="img.isPrimary ? 'ring-2 ring-[#004be3]' : ''">
          <img [src]="img.url" class="w-full h-full object-cover">

          <!-- Actions overlay -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button *ngIf="!img.isPrimary" class="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-[#004be3] hover:text-white text-[#004be3] transition-all" (click)="setPrimary(i)" title="Definir como principal">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            <button class="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white text-red-500 transition-all" (click)="removeImage(i)" title="Remover">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Primary badge -->
          <div *ngIf="img.isPrimary" class="absolute top-1 left-1">
            <span class="badge badge-primary text-[9px]">Principal</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ImageUploaderComponent {
  @Input() label = '';
  @Input() multiple = true;
  @Input() images: UploadedImage[] = [];
  @Output() imagesChange = new EventEmitter<UploadedImage[]>();
  isDragOver = false;

  onFileSelect(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) this.processFiles(Array.from(input.files));
  }

  onDragOver(e: DragEvent): void { e.preventDefault(); this.isDragOver = true; }

  onDrop(e: DragEvent): void {
    e.preventDefault(); this.isDragOver = false;
    if (e.dataTransfer?.files) this.processFiles(Array.from(e.dataTransfer.files));
  }

  private processFiles(files: File[]): void {
    files.filter(f => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImg: UploadedImage = {
          id: `img-${Date.now()}-${Math.random()}`,
          url: e.target?.result as string,
          file, isPrimary: this.images.length === 0
        };
        this.images = [...this.images, newImg];
        this.imagesChange.emit(this.images);
      };
      reader.readAsDataURL(file);
    });
  }

  setPrimary(index: number): void {
    this.images = this.images.map((img, i) => ({ ...img, isPrimary: i === index }));
    this.imagesChange.emit(this.images);
  }

  removeImage(index: number): void {
    this.images = this.images.filter((_, i) => i !== index);
    if (this.images.length > 0 && !this.images.some(i => i.isPrimary)) {
      this.images[0].isPrimary = true;
    }
    this.imagesChange.emit(this.images);
  }
}
