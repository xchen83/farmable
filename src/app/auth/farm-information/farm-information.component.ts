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
        <div class="progress-numbers">
          <div class="number active">1</div>
          <div class="number active">2</div>
          <div class="number">3</div>
        </div>
        <div class="header-text">
          <h2>Farm Information</h2>
          <div class="step-info">
            <span class="next-label">Next:</span>
            <span class="step-detail">Business Details</span>
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
      background-color: #A5C49C;
      color: white;
    }
    .progress-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
    }
    .progress-numbers {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 16px;
    }
    .number {
      width: 40px;
      height: 40px;
      border: 2px solid #ddd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 16px;
    }
    .number.active {
      border-color: #4CAF50;
      color: #4CAF50;
    }
    .header-text {
      text-align: center;
    }
    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .step-info {
      display: flex;
      gap: 8px;
      justify-content: center;
      color: #666;
      font-size: 14px;
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