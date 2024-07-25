import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  qrCodeData: string = ''; // ข้อมูล QR Code
  uploadedSlip: string | null = null; // กำหนด property เพื่อเก็บ URL ของสลิปที่อัพโหลด
  isPaymentValid: boolean = false; // กำหนด property เพื่อเก็บสถานะการตรวจสอบการชำระเงิน
  selectedPaymentMethod: string = ''; // กำหนด property เพื่อเก็บวิธีการชำระเงินที่เลือก
  orderNumber: string = 'ORD123456'; // หมายเลขคำสั่งซื้อ (ตัวอย่าง)
  orderDate: string = new Date().toLocaleDateString(); // วันและเวลา (ตัวอย่าง)

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const price = this.route.snapshot.queryParamMap.get('amount'); // ดึงราคาจาก query parameters
    if (price) {
      this.qrCodeData = `https://example.com/payment?amount=${price}`; // สร้าง URL สำหรับ QR Code พร้อมจำนวนเงิน
    } else {
      this.qrCodeData = 'https://example.com/payment'; // สร้าง URL สำหรับ QR Code ไม่มีจำนวนเงิน
    }
  }

  handleSlipUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadSlip(file);
    }
  }

  uploadSlip(file: File) {
    // ตัวอย่างการอัพโหลดสลิป สำหรับการสาธิตให้ตั้งค่า URL ของสลิปที่อัพโหลด
    this.uploadedSlip = 'https://example.com/uploads/slip.jpg';
    this.isPaymentValid = true; // อัพเดตสถานะการตรวจสอบการชำระเงินหลังจากอัพโหลดสลิป
  }

  processPayment() {
    if (this.selectedPaymentMethod === 'cod') {
      // หากเลือกชำระปลายทาง (COD) ให้ข้ามการตรวจสอบสลิป
      Swal.fire({
        title: 'สำเร็จ!',
        text: `คำสั่งซื้อ: ${this.orderNumber}\nวันที่: ${this.orderDate}\nวิธีการชำระเงิน: ชำระปลายทาง`,
        icon: 'success'
      }).then(() => {
        this.router.navigate(['/home']); // เปลี่ยนเส้นทางไปที่หน้า /home
      });
    } else if (this.isPaymentValid) {
      // หากเลือกชำระด้วย QR Code และอัพโหลดสลิปแล้ว
      Swal.fire({
        title: 'ยืนยันการชำระเงิน',
        text: `คุณต้องการยืนยันการชำระเงินหรือไม่?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'สำเร็จ!',
            text: `คำสั่งซื้อ: ${this.orderNumber}\nวันที่: ${this.orderDate}\nวิธีการชำระเงิน: ชำระด้วย QR Code`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/home']); // เปลี่ยนเส้นทางไปที่หน้า /home
          });
        }
      });
    } else {
      // หากยังไม่อัพโหลดสลิปและเลือกชำระด้วย QR Code
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาอัพโหลดสลิปการชำระเงิน',
        text: 'ก่อนที่จะดำเนินการชำระสินค้า',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#3085d6'
      });
    }
  }
}
