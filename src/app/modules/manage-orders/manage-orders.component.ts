import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private callService: CallserviceService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.callService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  viewOrderDetails(order: any): void {
    // Implement view order details functionality
  }

  deleteOrder(orderId: any): void {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบคำสั่งซื้อนี้จริงหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callService.deleteOrder(orderId).subscribe(
          () => {
            this.orders = this.orders.filter(order => order.id !== orderId);
            Swal.fire('ลบแล้ว!', 'คำสั่งซื้อของคุณถูกลบแล้ว.', 'success');
          },
          (error) => {
            console.error('Error deleting order:', error);
            Swal.fire('ข้อผิดพลาด', 'ไม่สามารถลบคำสั่งซื้อได้', 'error');
          }
        );
      }
    });
  }
}
