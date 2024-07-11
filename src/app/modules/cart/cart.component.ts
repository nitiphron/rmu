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

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  gotocart(): void {
    this.router.navigate(['/payment']);
  }
}
