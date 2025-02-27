import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmation-page.component.html',
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
}