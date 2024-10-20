import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component'; // Adjust the import path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, TitleComponent,ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fc() {
    return this.signUpForm.controls;
  }

  submit(): void {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      // Store user information in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.signUpForm.value.username); // Store username
      alert(`Username: ${this.signUpForm.value.username}, Email: ${this.signUpForm.value.email}`);
      
      this.router.navigate(['/']); // Redirect to the home page
    } else {
      alert('Please enter valid credentials.');
    }
  }
}