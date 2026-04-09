import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyBrPipe } from '../core/pipes/currency-br.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    CurrencyBrPipe,
    ProductCardComponent,
    StarRatingComponent,
    ToastContainerComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ConfirmModalComponent,
    ImageUploaderComponent,
    PaginationComponent,
    BreadcrumbComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    CurrencyBrPipe,
    ProductCardComponent, StarRatingComponent, ToastContainerComponent,
    LoadingSpinnerComponent, EmptyStateComponent, ConfirmModalComponent,
    ImageUploaderComponent, PaginationComponent, BreadcrumbComponent
  ]
})
export class SharedModule {}
