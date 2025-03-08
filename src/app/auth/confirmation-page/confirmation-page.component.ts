import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
  styles: [`
    /* New progress bar styles */
    .progress-container {
      position: relative;
      z-index: 1;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
      border-radius: 12px;
    }
    .progress-bar-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 150px;
      max-width: 300px;
    }
    .progress-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: white;
    }

    .progress-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: white;
    }

    .progress-circle.active {
      border-color: #4CAF50;
    }

    .progress-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #4CAF50;
      border-radius: 50%;
      z-index: -1;
      transition: clip-path 0.3s;
    }

    .progress-text {
      z-index: 1;
      color: #000;
    }

    .progress-line {
      height: 2px;
      background: #ddd;
      flex: 1;
    }

    .progress-bar {
      height: 100%;
      background: #4CAF50;
    }

    .register-header {
      text-align: center;
      margin-bottom: 16px;
    }

    .register-header h2 {
      margin: 0;
      font-size: 20px;
      margin-bottom: 4px;
    }

    .step-info {
      color: #666;
      font-size: 14px;
      display: flex;
      gap: 4px;
      justify-content: center;
    }
  `]
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
  ) { }

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
    switch (progress) {
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
    switch (this.progress) {
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

  // Get next step name
  getNextStepName(): string {
    if (this.selectedRole === 'farmer') {
      return this.progress === 1 ? 'Farm Information' : 'Business Details';
    } else {
      return 'Account Verification';
    }
  }

  // Get title for current step
  getCurrentStepTitle(): string {
    return this.progress === 1 ? 'Create Account' : 'Verification';
  }
}