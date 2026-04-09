import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { StoreLayoutComponent } from '../../layout/store-layout/store-layout.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'catalogo', component: CatalogComponent },
      { path: 'catalogo/:category', component: CatalogComponent },
      { path: 'produto/:slug', component: ProductDetailComponent },
      { path: 'carrinho', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'pedido-confirmado', component: OrderSuccessComponent },
      { path: 'perfil', component: ProfileComponent },
      { path: 'perfil/:tab', component: ProfileComponent },
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    ProfileComponent
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
export class StoreModule {}
