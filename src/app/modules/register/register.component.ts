import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CallserviceService } from '../services/callservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isPassword: boolean = false;

  constructor(
    private callService: CallserviceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      roleId: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });

    // this.getAllRole();
  }

  // getAllRole() {
  //   this.callService.getAllRole().subscribe(res => {
  //     if (res) {
  //       this.roleList = res;
  //     }
  //   });
  // }

  onSubmit() {
    this.isPassword = false;

    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน!',
        text: 'ข้อมูลที่จำเป็นยังไม่ครบถ้วน กรุณาตรวจสอบอีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    if (this.passwordValidate()) {
      const data = this.registerForm.value;
      Swal.fire({
        title: 'ต้องการสมัครสมาชิก?',
        text: "คุณต้องการสมัครสมาชิกใช่หรือไม่!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.callService.saveRegister(data).subscribe(res => {
            if (res.data) {
              Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'สมัครสมาชิกสำเร็จ',
                confirmButtonText: 'ตกลง',
              }).then(() => {
                this.router.navigate(['/login']);
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'บันทึกไม่สำเร็จ!',
                text: 'กรุณาตรวจสอบข้อมูลอีกครั้ง',
                confirmButtonText: 'ตกลง',
              });
            }
          });
        }
      });
    }
  }

  passwordValidate(): boolean {
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {
      this.isPassword = true;
      return false;
    } else {
      return true;
    }
  }
}
