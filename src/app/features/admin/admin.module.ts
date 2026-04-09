import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminGuard } from '../../core/guards/admin.guard';

import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form.component';
import { AdminOrdersComponent } from './orders/orders.component';
import { AdminCustomersComponent } from './customers/customers.component';
import { AdminCouponsComponent } from './coupons/coupons.component';
import { AdminSettingsComponent } from './settings/settings.component';
import { AdminAnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  // Dedicated admin login — no layout wrapper, no guard
  { path: 'login', component: AdminLoginComponent },

  // Protected admin area
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'customers', component: AdminCustomersComponent },
      { path: 'coupons', component: AdminCouponsComponent },
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'analytics', component: AdminAnalyticsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminProductsComponent,
    ProductFormComponent,
    AdminOrdersComponent,
    AdminCustomersComponent,
    AdminCouponsComponent,
    AdminSettingsComponent,
    AdminAnalyticsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {}
