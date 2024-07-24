import { Component, OnInit, OnDestroy } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashbordAdmin',
  templateUrl: './dashbordAdmin.component.html',
  styleUrls: ['./dashbordAdmin.component.css']
})
export class DashbordAdminComponent implements OnInit, OnDestroy {
  imageBlobUrls: SafeResourceUrl[] = [];
  productImgList: any;
  productList: any;
  productTypeList: any = [];
  subscriptions: Subscription[] = [];

  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductTypeAll();

    const productSub = this.callService.getAllProduct().subscribe(res => {
      if (res.data) {
        this.productList = res.data;
        for (let product of this.productList) {
          product.imgList = [];
          product.productType = this.productTypeList.filter((x: any) => x.productTypeId == product.productTypeId);
          const imgSub = this.callService.getProductImgByProductId(product.productId).subscribe((res) => {
            if (res.data) {
              this.productImgList = res.data;
              for (let productImg of this.productImgList) {
                this.getImage(productImg.productImgName, product.imgList);
              }
            } else {
              window.location.reload();
            }
          });
          this.subscriptions.push(imgSub);
        }
      }
    });
    this.subscriptions.push(productSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getImage(fileNames: any, imgList: any) {
    const imgSub = this.callService.getBlobThumbnail(fileNames).subscribe((res) => {
      let objectURL = URL.createObjectURL(res);
      let imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      imgList.push(imageBlobUrl);
    });
    this.subscriptions.push(imgSub);
  }

  getProductTypeAll() {
    const typeSub = this.callService.getProductTypeAll().subscribe((res) => {
      if (res.data) {
        this.productTypeList = res.data;
      }
    });
    this.subscriptions.push(typeSub);
  }

  onDeleteProduct(productId: any) {
    if (productId) {
      const deleteSub = this.callService.deleteProduct(productId).subscribe(res => {
        if (res.data) {
          window.location.reload();
        }
      });
      this.subscriptions.push(deleteSub);
    }
  }

  onUpdateProduct(productId: any) {
    this.router.navigate(['/product/' + productId]);
  }

  addToCart(product: any) {
    this.callService.addToCart(product);
    this.router.navigate(['/order-status']);
  }
}
