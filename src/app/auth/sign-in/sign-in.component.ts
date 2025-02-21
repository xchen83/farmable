import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="element">
      <div class="overlap-group">
        <img class="logo-pic" src="assets/img/5361728065911-pic-2.png" alt="logo" />
        <div class="text-wrapper">Welcome</div>
        <div class="button-container">
          <button class="back-button" (click)="navigateToLogin()">Login</button>
          <button class="next-button" (click)="navigateToRoleSelect()">Sign up</button>
        </div>
        <img class="element-pic" src="assets/img/0.png" alt="background" />
      </div>
    </div>
  `,
  styleUrls: ['./sign-in.component.css'],
  styles: [`
    .logo-pic {
      width: 200px;
      height: auto;
      margin-bottom: 20px;
      object-fit: contain;
    }

    .button-container {
      display: flex;
      gap: 16px;
      margin-top: 32px;
      width: 100%;
    }

    .back-button,
    .next-button {
      flex: 1;
      padding: 16px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    .back-button {
      background-color: white;
      border: 1px solid #E0E0E0;
    }

    .next-button {
      background-color: #A5C49C;
      color: white;
    }
  `]
})
export class SignInComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRoleSelect() {
    console.log('Navigating to role-select...');
    this.router.navigate(['/role-select']);
  }
}
  