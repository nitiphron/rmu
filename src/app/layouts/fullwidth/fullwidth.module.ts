// fullwidth.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxLoadingModule } from 'ngx-loading';

import { FullwidthComponent } from './fullwidth.component'; // Assuming this is correctly imported
import { HomeComponent } from 'src/app/modules/home/home.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { DashbordAdminComponent } from 'src/app/modules/dashbordAdmin/dashbordAdmin.component';
import { DashbordUserComponent } from 'src/app/modules/dashbordUser/dashbordUser.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { ManageUserComponent } from 'src/app/modules/manageUser/manageUser.component';
import { ManageProductComponent } from 'src/app/modules/manageProduct/manageProduct.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { UpdateProductComponent } from 'src/app/modules/updateProduct/updateProduct.component';
import { ReportComponent } from 'src/app/modules/report/report.component';

@NgModule({
  declarations: [
    FullwidthComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashbordAdminComponent,
    DashbordUserComponent,
    ProfileComponent,
    ManageUserComponent,
    ManageProductComponent,
    ProductComponent,
    UpdateProductComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    FullwidthComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashbordAdminComponent,
    DashbordUserComponent,
    ProfileComponent,
    ManageUserComponent,
    ManageProductComponent,
    ProductComponent,
    UpdateProductComponent,
    ReportComponent
  ]
})
export class FullwidthModule { }
