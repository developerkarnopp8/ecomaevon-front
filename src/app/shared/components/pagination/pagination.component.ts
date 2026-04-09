import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-pagination',
  template: `
    <div *ngIf="totalPages > 1" class="pagination justify-center">
      <button class="page-btn" [disabled]="currentPage === 1" (click)="go(currentPage - 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button *ngFor="let p of pages" class="page-btn" [class.active]="p === currentPage"
              (click)="go(p)">{{ p }}</button>
      <button class="page-btn" [disabled]="currentPage === totalPages" (click)="go(currentPage + 1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();
  pages: number[] = [];

  ngOnChanges(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1)
      .filter(p => p === 1 || p === this.totalPages || Math.abs(p - this.currentPage) <= 2);
  }

  go(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.pageChange.emit(page);
  }
}
