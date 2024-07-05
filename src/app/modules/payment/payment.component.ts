import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  qrCodeData: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // รับข้อมูลราคาจากเส้นทางหรือการสื่อสารอื่นๆ
    const price = this.route.snapshot.queryParamMap.get('price');
    if (price) {
      this.qrCodeData = `https://example.com/payment?amount=${price}`;
    } else {
      this.qrCodeData = 'https://example.com/payment';
    }
  }
}
