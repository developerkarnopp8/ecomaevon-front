import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-confirm-modal',
  template: `
    <div *ngIf="isOpen" class="overlay" (click)="onCancel()">
      <div class="fixed inset-0 flex items-center justify-center z-50 p-4" (click)="$event.stopPropagation()">
        <div class="card anim-scale-in w-full max-w-md p-6">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                 [class]="type === 'danger' ? 'bg-[#ffdad6]' : 'bg-[rgba(0,75,227,0.1)]'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   [attr.stroke]="type === 'danger' ? '#ba1a1a' : '#004be3'"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold mb-1" style="font-family: 'Manrope', sans-serif;">{{ title }}</h3>
              <p class="text-sm" style="color: var(--on-surface-variant);">{{ message }}</p>
            </div>
          </div>
          <div class="flex gap-3 justify-end">
            <button class="btn-secondary" (click)="onCancel()">{{ cancelLabel }}</button>
            <button class="btn-primary"
                    [style.background]="type === 'danger' ? '#ba1a1a' : ''"
                    (click)="onConfirm()">{{ confirmLabel }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmar ação';
  @Input() message = 'Tem certeza que deseja continuar?';
  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';
  @Input() type: 'default' | 'danger' = 'default';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void { this.confirm.emit(); }
  onCancel(): void { this.cancel.emit(); }
}
