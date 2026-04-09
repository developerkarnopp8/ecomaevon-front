import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { MockDataService } from './core/services/mock-data.service';
import { CartService } from './core/services/cart.service';
import { AuthService } from './core/services/auth.service';
import { ProductService } from './core/services/product.service';
import { OrderService } from './core/services/order.service';
import { StoreService } from './core/services/store.service';
import { ToastService } from './core/services/toast.service';
import { AuthGuard } from './core/guards/auth.guard';
import { ApiInterceptor } from './core/interceptors/api.interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MockDataService,
    CartService,
    AuthService,
    ProductService,
    OrderService,
    StoreService,
    ToastService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule {}
