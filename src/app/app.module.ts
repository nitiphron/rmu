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
 // Uncomment this line
 @NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PaymentComponent
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
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
