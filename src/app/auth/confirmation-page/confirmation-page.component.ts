import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <img class="background-image" src="assets/img/0.png" alt="background" />

      <div class="progress-container">
        <!-- First circle -->
        <div class="progress-circle" [class.active]="progress >= 1">
          <div class="progress-ring" [style.clip-path]="progressClipPath(1)"></div>
          <span class="progress-text">1</span>
        </div>

        <!-- Progress line 1-2 -->
        <div class="progress-line">
          <div class="progress-bar" [style.width.%]="progress >= 2 ? 100 : 0"></div>
        </div>

        <!-- Second circle -->
        <div class="progress-circle" [class.active]="progress >= 2">
          <div class="progress-ring" [style.clip-path]="progressClipPath(2)"></div>
          <span class="progress-text">2</span>
        </div>

        <!-- Progress line 2-3 -->
        <div class="progress-line">
          <div class="progress-bar" [style.width.%]="progress >= 3 ? 100 : 0"></div>
        </div>

        <!-- Third circle -->
        <div class="progress-circle" [class.active]="progress >= 3">
          <div class="progress-ring" [style.clip-path]="progressClipPath(3)"></div>
          <span class="progress-text">3</span>
        </div>

        <div class="register-header">
          <h2>Register</h2>
          <div class="step-info">
            <span class="next-label">Next:</span>
            <span class="step-detail" *ngIf="progress === 1">Farm Information</span>
            <span class="step-detail" *ngIf="progress === 2">Business Details</span>
            <span class="step-detail" *ngIf="progress === 3">Review</span>
          </div>
        </div>
      </div>

      <div class="form-container">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" [(ngModel)]="name">

        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" [(ngModel)]="email">

        <label for="password">Password</label>
        <div class="password-wrapper">
          <input [type]="showPassword ? 'text' : 'password'" 
                id="password" 
                placeholder="Enter your password"
                [(ngModel)]="password">
          <span class="toggle-password" (click)="togglePassword('password')">👁️</span>
        </div>

        <label for="confirm-password">Confirm Password</label>
        <div class="password-wrapper">
          <input [type]="showConfirmPassword ? 'text' : 'password'" 
                id="confirm-password" 
                placeholder="Confirm your password"
                [(ngModel)]="confirmPassword">
          <span class="toggle-password" (click)="togglePassword('confirm-password')">👁️</span>
        </div>

        <div class="button-container">
          <button class="back-button" (click)="goBack()">Back</button>
          <button class="next-button" (click)="proceed()">Next</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  selectedRole: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  progress: number = 1; // 当前进度

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedRole = params['role'];
    });
  }

  togglePassword(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  goBack() {
    if (this.progress > 1) {
      this.progress--;
    } else {
      this.router.navigate(['/role-select']);
    }
  }

  proceed() {
    if (this.progress < 3) {
      this.progress++;
      if (this.progress === 2 && this.selectedRole === 'farmer') {
        this.router.navigate(['/farm-information']);
      }
    } else {
      if (this.selectedRole === 'farmer') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/product']);
      }
    }
  }

  progressClipPath(progress: number) {
    switch(progress) {
      case 1:
        return 'circle(0% at 50% 50%)';
      case 2:
        return 'circle(50% at 50% 50%)';
      case 3:
        return 'circle(100% at 50% 50%)';
      default:
        return 'circle(0% at 50% 50%)';
    }
  }

  progressBarWidth() {
    switch(this.progress) {
      case 1:
        return 0;
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0;
    }
  }
}
