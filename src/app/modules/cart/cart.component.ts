import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service'; // Adjust the import path as needed

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private router: Router,
    private callserviceService: CallserviceService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.callserviceService.getCartItems().subscribe({
      next: items => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      error: error => {
        console.error('Error loading cart items:', error);
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  removeFromCart(productId: any): void {
    this.callserviceService.removeFromCart(productId);
    this.getCartItems();
  }

  clearCart(): void {
    this.callserviceService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }

  goToPaymentPage(): void {
    this.router.navigate(['/payment'], { queryParams: { price: this.totalPrice } });
  }
}
