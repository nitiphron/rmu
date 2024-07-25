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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const price = this.route.snapshot.queryParamMap.get('amount'); // ดึงราคาจาก query parameters
    if (price) {
      this.qrCodeData = `https://example.com/payment?amount=${price}`; // สร้าง URL สำหรับ QR Code พร้อมจำนวนเงิน
    } else {
      this.qrCodeData = 'https://example.com/payment'; // สร้าง URL สำหรับ QR Code ไม่มีจำนวนเงิน
    }
  }

  // ฟังก์ชันจัดการการเลือกไฟล์สำหรับอัพโหลดสลิป
  handleSlipUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // หากมีไฟล์ให้เรียกใช้ฟังก์ชันอัพโหลด
      this.uploadSlip(file);
    }
  }

  // ฟังก์ชันจัดการการอัพโหลดสลิป
  uploadSlip(file: File) {
    // ตัวอย่างการอัพโหลดสลิป สำหรับการสาธิตให้ตั้งค่า URL ของสลิปที่อัพโหลด
    this.uploadedSlip = 'https://example.com/uploads/slip.jpg';
    this.isPaymentValid = true; // อัพเดตสถานะการตรวจสอบการชำระเงินหลังจากอัพโหลดสลิป
  }

  // ฟังก์ชันจัดการการกดปุ่มชำระเงิน
  processPayment() {
    if (this.isPaymentValid) {
      Swal.fire({
        title: 'ยืนยันการชำระเงิน',
        text: 'คุณต้องการยืนยันการชำระเงินหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          // หากผู้ใช้ยืนยันการชำระเงิน
          Swal.fire(
            'สำเร็จ!',
            'ชำระเงินเรียบร้อยแล้ว',
            'success'
          ).then(() => {
            this.router.navigate(['/home']); // เปลี่ยนเส้นทางไปที่หน้า /home
          });
        }
      });
    } else {
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
