import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private callService: CallserviceService
  ) {
    this.orderForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCartItems(); // โหลดข้อมูลตะกร้าเมื่อเริ่มต้น
  }

  loadCartItems(): void {
    this.callService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.calculateTotalPrice(); // คำนวณราคาทั้งหมด
    });
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  

  clearCart(): void {
    this.callService.clearCart().subscribe(() => {
      this.cartItems = []; // ลบข้อมูลในตะกร้า
      this.totalPrice = 0; // รีเซ็ตค่าราคาทั้งหมด
      this.router.navigate(['/payment']).then(() => {
        console.log('การนำทางไปยัง /payment สำเร็จ');
      }).catch(err => {
        console.error('ข้อผิดพลาดในการนำทาง:', err);
      });
    }, error => {
      console.error('ข้อผิดพลาดในการลบตะกร้า:', error);
    });
  }

  gotocart(): void {
    if (this.orderForm.invalid) {
      let errorMessage = '';
    
      if (!this.orderForm.value.address) {
        errorMessage = 'กรุณากรอกที่อยู่';
      } else if (!this.orderForm.value.city) {
        errorMessage = 'กรุณากรอกเมือง';
      } else if (!this.orderForm.value.country) {
        errorMessage = 'กรุณากรอกประเทศ';
      }
    
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
        text: errorMessage,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3085d6',
        iconColor: '#f39c12'
      });
      return;
    }
    
    Swal.fire({
      title: 'ยืนยันการชำระสินค้า',
      text: "คุณต้องการชำระเงินจริงหรือไม่?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      customClass: {
        popup: 'alert-popup',
        title: 'alert-title',
        confirmButton: 'alert-confirm-button',
        cancelButton: 'alert-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearCart(); // เรียกใช้ clearCart เพื่อจัดการการลบตะกร้า
        // ทำการนำทางไปยังหน้า /payment หลังจากที่คำสั่งซื้อได้รับการบันทึกเรียบร้อยแล้ว
        this.router.navigate(['/payment']);
      }
    });
  }
}
