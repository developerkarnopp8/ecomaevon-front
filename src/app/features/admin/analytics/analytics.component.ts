import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../../core/services/store.service';
import { DashboardMetrics } from '../../../core/models/store.model';

@Component({
  standalone: false,
  selector: 'app-admin-analytics',
  templateUrl: './analytics.component.html'
})
export class AdminAnalyticsComponent implements OnInit {
  metrics?: DashboardMetrics;

  constructor(private storeService: StoreService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.storeService.getDashboardMetrics().subscribe(m => {
      this.metrics = m;
      this.cdr.detectChanges();
    });
  }

  getBarWidth(value: number): number {
    if (!this.metrics) return 0;
    const max = Math.max(...this.metrics.revenueChart.map(d => d.value));
    return (value / max) * 100;
  }
}
