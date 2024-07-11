import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DataSharingService } from './modules/DataSharingService';
import { CartComponent } from './modules/cart/cart.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { OrderStatusComponent } from './modules/order-status/order-status.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PaymentComponent,
    OrderStatusComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    DefaultModule,
    FullwidthModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxQRCodeModule // Ensure NgxQRCodeModule is imported
  ],
  providers: [
    DataSharingService
    // Add other services/providers as needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
