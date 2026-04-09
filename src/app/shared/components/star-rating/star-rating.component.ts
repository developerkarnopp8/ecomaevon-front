import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-star-rating',
  template: `
    <div class="flex items-center gap-0.5">
      <ng-container *ngFor="let star of stars; let i = index">
        <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" [attr.fill]="getFill(i)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </ng-container>
    </div>
  `
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() size = 16;
  stars = [1, 2, 3, 4, 5];

  getFill(index: number): string {
    const filled = '#f59e0b';
    const half = 'url(#half)';
    const empty = '#dfdcdc';
    const pos = index + 1;
    if (this.rating >= pos) return filled;
    if (this.rating >= pos - 0.5) return '#f59e0b'; // simplified half
    return empty;
  }
}
