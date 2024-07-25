// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private callService: CallserviceService, private router: Router) {}

  ngOnInit(): void {
    this.callService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  removeFromCart(productId: any): void {
    this.callService.removeFromCart(productId);
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.calculateTotalPrice();
  }

  clearCart(): void {
    this.callService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.callService.updateCartItemQuantity(item.id, item.quantity).subscribe(() => {
      this.calculateTotalPrice();
    });
  }
  
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.callService.updateCartItemQuantity(item.id, item.quantity).subscribe(() => {
        this.calculateTotalPrice();
      });
    }
  }
  

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  

  gotocart(): void {
    this.router.navigate(['/order-status']);
  }
}
