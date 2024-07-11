import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { DashbordAdminComponent } from './modules/dashbordAdmin/dashbordAdmin.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ManageUserComponent } from './modules/manageUser/manageUser.component';
import { ManageProductComponent } from './modules/manageProduct/manageProduct.component';
import { ProductComponent } from './modules/product/product.component';
import { UpdateProductComponent } from './modules/updateProduct/updateProduct.component';
import { ReportComponent } from './modules/report/report.component';
import { CartComponent } from './modules/cart/cart.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { OrderStatusComponent } from './modules/order-status/order-status.component'; // นำเข้า OrderStatusComponent

const routes: Routes = [
  {
    path: '',
    component: FullwidthComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashbord-admin', component: DashbordAdminComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'manage-user', component: ManageUserComponent },
      { path: 'profile/:userId', component: ProfileComponent },
      { path: 'manage-product', component: ManageProductComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product/:productId', component: UpdateProductComponent },
      { path: 'report', component: ReportComponent },
      { path: 'cart', component: CartComponent },
      { path: 'payment', component: PaymentComponent }, // เส้นทางสำหรับ PaymentComponent
      { path: 'order-status', component: OrderStatusComponent } // เส้นทางสำหรับ OrderStatusComponent
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
