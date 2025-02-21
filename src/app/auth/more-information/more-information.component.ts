import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Define interface outside the class
interface Option {
  label: string;
  description?: string;
}

interface Section {
  title: string;
  placeholder: string;
  allowOther: boolean;
  options: Option[];
}

@Component({
  selector: 'app-more-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="progress-wrapper">
        <div class="progress-circle">
          <svg viewBox="0 0 36 36">
            <path class="circle-bg" d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831" />
            <path class="circle-progress" d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831" stroke-dasharray="100, 100" />
          </svg>
          <span class="progress-text">3/3</span>
        </div>
      </div>
      
      <h2 class="form-title">More Information</h2>
      <p class="subtitle">Next: Publish</p>
      <p class="help-text">Help buyers know more about your farm!</p>
      <p class="skip-text">Skip for now</p>
      
      <div class="form-group" *ngFor="let section of sections">
        <h3>{{ section.title }} <span class="optional">(Optional)</span></h3>
        <div class="checkbox-group" *ngFor="let item of section.options">
          <label>
            <input type="checkbox"> {{ item.label }}
          </label>
          <p *ngIf="item.description">{{ item.description }}</p>
        </div>
        <div class="other-input" *ngIf="section.allowOther">
          <input type="text" [placeholder]="'Enter ' + section.placeholder">
        </div>
        <p class="show-more">Show more</p>
      </div>
      
      <div class="button-group">
        <button class="back-button" (click)="goBack()">Back</button>
        <button class="finish-button" (click)="finish()">Finish</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 400px;
      margin: auto;
    }
    .progress-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    .progress-circle {
      position: relative;
      width: 50px;
      height: 50px;
    }
    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      font-weight: bold;
    }
    .form-title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .subtitle {
      text-align: center;
      color: gray;
      font-size: 14px;
    }
    .help-text, .skip-text {
      text-align: center;
      font-size: 14px;
      color: green;
      font-weight: bold;
    }
    .form-group {
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 8px;
      background: #f8f8f8;
    }
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
    }
    .checkbox-group p {
      font-size: 12px;
      color: gray;
    }
    .other-input input {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
    }
    .show-more {
      color: green;
      cursor: pointer;
      text-align: center;
    }
    .button-group {
      display: flex;
      justify-content: space-between;
    }
    .back-button, .finish-button {
      padding: 10px 20px;
      border: none;
      font-size: 16px;
    }
    .finish-button {
      background-color: #cfe5c6;
      color: black;
    }
  `]
})
export class MoreInformationComponent {
  sections: Section[] = [
    {
      title: "Farm's philosophy",
      placeholder: "philosophy",
      allowOther: true,
      options: [
        { label: "Local & Small-Scale Production" },
        { label: "Environmental Responsibility & Sustainability" },
        { label: "Ethical Treatment of Workers & Animals" }
      ]
    },
    {
      title: "Farming methods",
      placeholder: "methods",
      allowOther: true,
      options: [
        { 
          label: "Organic Practices", 
          description: "Avoiding synthetic fertilizers and pesticides." 
        },
        { 
          label: "Sustainable & Regenerative Farming", 
          description: "Enhancing soil health and biodiversity." 
        }
      ]
    },
    {
      title: "Certifications",
      placeholder: "certification",
      allowOther: true,
      options: [
        { label: "Certified Organic (UsDA, Eu, etc.)" },
        { label: "Biodynamic Certified Demeter" }
      ]
    }
  ];
  
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/farm-information']);
  }

  finish() {
    this.router.navigate(['/dashboard']);
  }
}
