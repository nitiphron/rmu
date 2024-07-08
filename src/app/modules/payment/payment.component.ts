import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  qrCodeData: string = '';
  uploadedSlip: string | null = null; // Define a property to hold the uploaded slip URL

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const price = this.route.snapshot.queryParamMap.get('amount');
    if (price) {
      this.qrCodeData = `https://example.com/payment?amount=${price}`;
    } else {
      this.qrCodeData = 'https://example.com/payment';
    }
  }

  // Method to handle file selection for slip upload
  handleSlipUpload(event: Event) {
    // Implement logic to handle file selection here
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Optionally, you can perform additional logic here if needed
    }
  }

  // Method to handle slip upload
  uploadSlip(event: Event) {
    // Implement logic to handle slip upload here
    // For demonstration purposes, just set the uploadedSlip to a mock URL
    this.uploadedSlip = 'https://example.com/uploads/slip.jpg';
  }
}
