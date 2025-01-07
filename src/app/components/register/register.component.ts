import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {
  register: FormGroup | any;
  registeruser: any;

  constructor(private route: Router, private http: HttpClient, private toast: ToastrService) {}

  ngOnInit(): void {
    this.register = new FormGroup({
      'fname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$')  
      ]),
      'lname': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.email  
      ]),
      'phone number': new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+3556[789]\d{7}$/)  
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)  
      ]),
      'role': new FormControl('', Validators.required)
    });
  }

  registerdata() {
    if (this.register.invalid) {
      this.toast.error('Ju lutem plotësoni të gjitha fushat siç duhet.'); 
      return;
    }

    this.registeruser = this.register.value.fname;
    const userRole = this.register.value.role;

    this.http.post<any>("http://localhost:3000/register", {
      ...this.register.value,
      role: userRole
    }).subscribe(res => {
      this.toast.success('Regjistrimi u krye me sukses');
      this.register.reset();
      this.route.navigate(['login']);
    }, err => {
      this.toast.error('Diçka shkoi keq gjatë regjistrimit');
    });
  }
}