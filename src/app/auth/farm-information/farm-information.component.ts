import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farm-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <img class="background-image" src="assets/img/0.png" alt="background" />
      
      <div class="progress-container">
        <div class="progress-bar-wrapper">
          <div class="progress-circle active">
            <div class="progress-ring" style="clip-path: circle(100% at 50% 50%)"></div>
            <span class="progress-text">1</span>
          </div>
          <div class="progress-line">
            <div class="progress-bar" style="width: 100%"></div>
          </div>
          <div class="progress-circle active">
            <div class="progress-ring" style="clip-path: circle(100% at 50% 50%)"></div>
            <span class="progress-text">2</span>
          </div>
          <div class="progress-line">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
          <div class="progress-circle">
            <div class="progress-ring" style="clip-path: circle(0% at 50% 50%)"></div>
            <span class="progress-text">3</span>
          </div>
        </div>
        <div class="register-header flex">
          <h2>Farm Information</h2>
          <div class="step-info">
            <span class="next-label">Next:</span>
            <span class="step-detail">More Information</span>
          </div>
        </div>
      </div>
      
      <div class="form-container">
        <label for="farmName">Farm name</label>
        <input id="farmName" type="text" placeholder="Enter farm name">
        <label for="country">Country</label>
        <select id="country">
          <option>Select country</option>
        </select>
        <label for="address">Address</label>
        <input id="address" type="text" placeholder="Find your address">
        <label for="year">What year was your farm or operation established?</label>
        <select id="year">
          <option value="">Select year</option>
          <option *ngFor="let year of yearOptions" [value]="year">
            {{year}}
          </option>
        </select>
        <label for="size">What is the estimated size of the area you have under production?</label>
        <div class="size-input">
          <input id="size" type="number" placeholder="Enter size">
          <select>
            <option>acres</option>
            <option>hectares</option>
            <option>square meters</option>
          </select>
        </div>
        <label class="checkbox-label">
          <input type="checkbox"> I don't know my farm size
        </label>
        <div class="button-container">
          <button class="back-button" (click)="goBack()">Back</button>
          <button class="next-button" (click)="proceed()">Next</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../confirmation-page/confirmation-page.component.css'],
  styles: [`
      .background-image {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .form-container input,
    .form-container select {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: 8px;
      background-color: #F5F5F5;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .form-container label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #000;
    }
    .size-input {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .size-input input {
      flex: 2;
      margin-bottom: 0;
    }
    .size-input select {
      flex: 1;
      margin-bottom: 0;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 1rem 0;
      font-weight: normal;
    }
    .checkbox-label input {
      width: auto;
      margin: 0;
    }
    .button-container {
      display: flex;
      gap: 16px;
      margin-top: 32px;
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
      background-color: #2E872B !important;
      color: white;
    }
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
    .form-container {
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.9);
      padding: 2rem;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      flex-grow: 1;
    }
  `]
})
export class FarmInformationComponent {
  yearOptions: number[] = [];

  constructor(private router: Router) {
    this.generateYearOptions();
  }

  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.yearOptions.push(i);
    }
  }

  goBack() {
    this.router.navigate(['/confirmation/farmer']);
  }

  proceed() {
    this.router.navigate(['/more-information']);
  }
} 