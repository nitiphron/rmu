import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  orderStatus: string = '';
  orderDetails: any = {};
  cartItems: any[] = [];

  constructor(
    private router: Router,
    private callService: CallserviceService
  ) {}

  ngOnInit(): void {
    // Fetch cart items
    this.callService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.updateOrderDetails();
    });

    // Set order status
    this.orderStatus = 'คำสั่งซื้อของคุณได้รับการยืนยันแล้ว';

    // Initialize order details
    this.orderDetails = {
      orderId: '123456', // Replace with actual orderId from backend
      orderDate: new Date(),
      totalItems: 0,
      totalPrice: 0,
      shippingAddress: '123 Street, City, Country' // Replace with actual shipping address from backend
    };

    // Save order to database
    this.saveOrder();
  }

  // Function to update order details after fetching cart items
  updateOrderDetails(): void {
    this.orderDetails.totalItems = this.cartItems.length;
    this.orderDetails.totalPrice = this.calculateTotalPrice();
  }

  // Function to calculate the total price of all items
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price;
    }
    return totalPrice;
  }

  // Function to save order to the database
  saveOrder(): void {
    const orderData = {
      orderId: this.orderDetails.orderId,
      orderDate: this.orderDetails.orderDate,
      totalItems: this.orderDetails.totalItems,
      totalPrice: this.orderDetails.totalPrice,
      shippingAddress: this.orderDetails.shippingAddress
    };

    this.callService.saveOrder(orderData).subscribe(response => {
      console.log('Order saved successfully:', response);
    }, error => {
      console.error('Error saving order:', error);
    });
  }

  navigateToDashboardAdmin(): void {
    this.router.navigate(['/dashbord-admin']); // Make sure this route exists in your application
  }
}
