import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,TitleComponent,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginForm!:FormGroup;
  isSubmitted = false;
  constructor(private formBuilder:FormBuilder,private router: Router) { }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }
  get fc(){
    return this.loginForm.controls;

  }

  submit(): void {
    this.isSubmitted = true; // Set the form as submitted
    if (this.loginForm.valid) {
        // Here you would normally check credentials against a backend
        const username = this.loginForm.value.username; // Get this from your login logic, replace with actual username
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username); // Save the username in localStorage
        alert(`Logged in as: ${username}`); // Display alert or redirect to another page
        this.router.navigate(['/']); // Navigate to home or another page
    } else {
        alert('Please enter valid credentials.');
    }
}
}