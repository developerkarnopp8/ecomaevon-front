import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-toast-container',
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      <div *ngFor="let toast of toasts$ | async; trackBy: trackToast"
           class="anim-slide-right flex items-start gap-3 p-3.5 rounded-xl shadow-lg"
           [ngClass]="getClass(toast.type)">
        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" [ngClass]="getIconBg(toast.type)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" [attr.stroke]="getIconColor(toast.type)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <ng-container [ngSwitch]="toast.type">
              <ng-container *ngSwitchCase="'success'">
                <polyline points="20 6 9 17 4 12"/>
              </ng-container>
              <ng-container *ngSwitchCase="'error'">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </ng-container>
              <ng-container *ngSwitchCase="'warning'">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </ng-container>
              <ng-container *ngSwitchDefault>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </ng-container>
            </ng-container>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-600 text-sm" style="font-weight: 600;">{{ toast.title }}</p>
          <p *ngIf="toast.message" class="text-xs mt-0.5 opacity-80">{{ toast.message }}</p>
        </div>
        <button class="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity" (click)="dismiss(toast.id)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `
})
export class ToastContainerComponent implements OnInit {
  toasts$!: Observable<Toast[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void { this.toasts$ = this.toastService.toasts$; }

  dismiss(id: string): void { this.toastService.dismiss(id); }

  trackToast(index: number, toast: Toast): string { return toast.id; }

  getClass(type: string): string {
    const map: Record<string, string> = {
      success: 'bg-white text-[#1a6e2e] border border-[#b7f0c5]',
      error: 'bg-white text-[#ba1a1a] border border-[#ffdad6]',
      warning: 'bg-white text-[#7a5900] border border-[#ffdf9e]',
      info: 'bg-white text-[#004be3] border border-[rgba(0,75,227,0.2)]'
    };
    return map[type] || map['info'];
  }

  getIconBg(type: string): string {
    const map: Record<string, string> = {
      success: 'bg-[#b7f0c5]', error: 'bg-[#ffdad6]',
      warning: 'bg-[#ffdf9e]', info: 'bg-[rgba(0,75,227,0.1)]'
    };
    return map[type] || map['info'];
  }

  getIconColor(type: string): string {
    const map: Record<string, string> = {
      success: '#1a6e2e', error: '#ba1a1a', warning: '#7a5900', info: '#004be3'
    };
    return map[type] || map['info'];
  }
}
