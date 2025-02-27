import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="element">
      <img class="background-image" src="assets/img/0.png" alt="background" />
      <div class="role-select-container">
        <div class="header">
          <h2>Are you a ...</h2>
        </div>
        <div class="role-options">
          <button class="role-button" [class.selected]="selectedRole === 'farmer'" (click)="selectRole('farmer')">
            <div class="role-content">
              <div class="check-box">
                <span *ngIf="selectedRole === 'farmer'" class="check-mark">✔</span>
              </div>
              <span class="role-title">Farmer</span>
              <img class="role-icon" src="assets/img/Frame 1984077650.svg" alt="farmer" />
            </div>
          </button>
          <button class="role-button" [class.selected]="selectedRole === 'buyer'" (click)="selectRole('buyer')">
            <div class="role-content">
              <div class="check-box">
                <span *ngIf="selectedRole === 'buyer'" class="check-mark">✔</span>
              </div>
              <span class="role-title">Buyer</span>
              <img class="role-icon" src="assets/img/Frame 1984077652.svg" alt="buyer" />
            </div>
          </button>
        </div>
        <!-- Confirm button only shows after role selection -->
        <button 
          *ngIf="selectedRole" 
          class="confirm-button" 
          (click)="confirmRole()">
          Confirm
        </button>
      </div>
    </div>
  `,
  styles: [`
    .element {
      width: 100%;
      height: 100vh;
      position: relative;
    }
    .background-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .role-select-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      gap: 2rem;
    }
    .header {
      text-align: center;
    }
    .header h2 {
      color: #333;
      font-size: 24px;
      font-weight: bold;
    }
    .role-options {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 400px;
    }
    .role-button {
      padding: 1.5rem 2rem;
      border: 2px solid #ddd;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }
    .role-button:hover {
      border-color: #007bff;
      background: rgba(255, 255, 255, 1);
      transform: scale(1.02);
    }
    .role-button.selected {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.2);
    }
    .role-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .check-box {
      width: 24px;
      height: 24px;
      border: 2px solid #666;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .role-button.selected .check-box {
      border-color: #4CAF50;
      background-color: #4CAF50;
    }
    .check-mark {
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
    .role-title {
      font-size: 22px;
      color: #333;
      margin-right: auto;
    }
    .role-icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
    .confirm-button {
      width: 200px;
      padding: 12px;
      background-color: #333;
      color: white;
      font-size: 18px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.3s;
    }
    .confirm-button:hover {
      background-color: #555;
    }
  `]
})
export class RoleSelectComponent {
  selectedRole: string | null = null;

  constructor(private router: Router) { }

  selectRole(role: string) {
    // Just update the selected role, don't navigate yet
    this.selectedRole = role;
  }

  confirmRole() {
    if (this.selectedRole) {
      this.router.navigate(['/confirmation', this.selectedRole]);
    }
  }
}