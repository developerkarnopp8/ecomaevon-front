import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  standalone: false,
  selector: 'app-breadcrumb',
  template: `
    <nav class="flex items-center gap-1.5 text-xs" style="color: var(--on-surface-variant);" aria-label="Breadcrumb">
      <ng-container *ngFor="let item of items; let last = last">
        <a *ngIf="item.url && !last" [routerLink]="item.url"
           class="hover:text-[#004be3] transition-colors">{{ item.label }}</a>
        <span *ngIf="!item.url || last" [class.font-semibold]="last" [style.color]="last ? 'var(--on-surface)' : ''">
          {{ item.label }}
        </span>
        <svg *ngIf="!last" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </ng-container>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
