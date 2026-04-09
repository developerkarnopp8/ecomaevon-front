import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-loading-spinner',
  template: `
    <div class="flex items-center justify-center" [style.padding]="fullPage ? '5rem 0' : ''">
      <div class="flex flex-col items-center gap-3">
        <div class="relative" [style.width.px]="size" [style.height.px]="size">
          <div class="absolute inset-0 rounded-full border-2 border-[#eae7e7]"></div>
          <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-[#004be3] animate-spin"></div>
        </div>
        <p *ngIf="text" class="text-sm" style="color: var(--on-surface-variant);">{{ text }}</p>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() size = 36;
  @Input() text = '';
  @Input() fullPage = false;
}
