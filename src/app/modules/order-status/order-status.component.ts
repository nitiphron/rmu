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
    // Fetch cart items for displaying in the form
    this.callService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.calculateTotalPrice();
    });
  }

  // Function to calculate the total price of all items
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return Math.floor(totalPrice); // Round down the price
  }

  // Function to save the order to the database
  saveOrder(): void {
    const orderData = {
      orderId: '123456', // Replace with actual logic for orderId
      orderDate: new Date(),
      totalItems: this.cartItems.length,
      totalPrice: this.totalPrice,
      shippingAddress: this.orderForm.value.address + ', ' + this.orderForm.value.city + ', ' + this.orderForm.value.country
    };

    this.callService.saveOrder(orderData).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'คำสั่งซื้อของคุณถูกบันทึกเรียบร้อยแล้ว',
        confirmButtonText: 'ตกลง'
      });
      this.clearCart(); // Optionally clear the cart after saving the order
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด!',
        text: 'ไม่สามารถบันทึกคำสั่งซื้อได้',
        confirmButtonText: 'ตกลง'
      });
    });
  }

  // Function to clear the cart
  clearCart(): void {
    this.callService.clearCart().subscribe(() => {
      this.cartItems = []; // Clear the local cart items
    }, error => {
      console.error('Error clearing cart:', error);
    });
  }

  // Navigate to the payment page
  gotocart(): void {
    if (this.orderForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
        text: 'ที่อยู่, เมือง และ ประเทศ จำเป็นต้องกรอกเพื่อดำเนินการชำระสินค้า',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    Swal.fire({
      title: 'ยืนยันการชำระสินค้า',
      text: "คุณต้องการชำระเงินจริงหรือไม่?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/payment']);
      }
    });
  }
}
