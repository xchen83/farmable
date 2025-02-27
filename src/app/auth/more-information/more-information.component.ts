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
    <div class="register-container">
      <img class="background-image" src="assets/img/0.png" alt="background" />
      
      <div class="progress-container">
        <div class="progress-circle" [class.active]="true">
          <div class="progress-ring" style="clip-path: circle(100% at 50% 50%)"></div>
          <span class="progress-text">1</span>
        </div>
        <div class="progress-line">
          <div class="progress-bar" style="width: 100%"></div>
        </div>
        <div class="progress-circle" [class.active]="true">
          <div class="progress-ring" style="clip-path: circle(100% at 50% 50%)"></div>
          <span class="progress-text">2</span>
        </div>
        <div class="progress-line">
          <div class="progress-bar" style="width: 100%"></div>
        </div>
        <div class="progress-circle" [class.active]="true">
          <div class="progress-ring" style="clip-path: circle(100% at 50% 50%)"></div>
          <span class="progress-text">3</span>
        </div>
        <div class="register-header">
          <h2>More Information</h2>
          <div class="step-info">
            <span class="next-label">Next:</span>
            <span class="step-detail">Publish</span>
          </div>
        </div>
      </div>
      <div class="content">
        <p class="help-text">Help buyers know more about your farm!</p>
        <p class="skip-text">Skip for now</p>
        <div class="section" *ngFor="let section of sections; let i = index">
          <div class="section-header" (click)="toggleSection(i)">
            <span>{{ i + 1 }}. {{ section.title }} <span class="optional">(Optional)</span></span>
            <span class="chevron" [class.expanded]="expandedSections[i]">^</span>
          </div>
          
          <div class="section-content" [class.expanded]="expandedSections[i]">
            <div class="option" *ngFor="let item of getVisibleOptions(section, i)">
              <label class="checkbox-label">
                <input type="checkbox">
                <span class="option-icon">{{ item.icon }}</span>
                <span class="label">{{ item.label }}</span>
              </label>
              <span class="description" *ngIf="item.description">{{ item.description }}</span>
            </div>
            
            <div class="other-input">
              <input type="text" [placeholder]="'Enter ' + section.placeholder">
            </div>
            
            <div class="show-more" (click)="toggleShowMore(i)" *ngIf="section.options.length > 3">
              {{ showMoreStates[i] ? 'Show less' : 'Show more' }}
            </div>
          </div>
        </div>
        <div class="button-container">
          <button class="back-button" (click)="goBack()">Back</button>
          <button class="finish-button" (click)="finish()">Finish</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../confirmation-page/confirmation-page.component.css'],
  styles: [`
    .register-container {
      min-height: 100vh;
      height: auto;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 20px;
    }
    .background-image {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .progress-container {
      position: relative;
      z-index: 1;
      margin-bottom: 2rem;
    }
    .progress-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .progress-circle.active {
      border-color: #4CAF50;
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
    h2 {
      margin: 0;
      font-size: 20px;
      margin-bottom: 4px;
    }
    .step-info {
      color: #666;
      font-size: 14px;
    }
    .help-text {
      text-align: left;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .skip-text {
      text-align: left;
      color: #4CAF50;
      margin-bottom: 24px;
      cursor: pointer;
      font-size: 14px;
    }
    .section {
      background: white;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: visible;
    }
    .section-header {
      display: flex;
      align-items: center;
      padding: 16px;
      cursor: pointer;
    }
    .section-header span:first-child {
      flex-grow: 1;
      text-align: left;
    }
    .optional {
      color: #666;
      font-weight: normal;
      margin-left: 4px;
    }
    .chevron {
      transition: transform 0.3s;
    }
    .chevron.expanded {
      transform: rotate(180deg);
    }
    .section-content {
      padding: 16px;
      overflow: visible;
    }
    .option {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 5px;
      width: fit-content;
      cursor: pointer;
    }
    input[type="checkbox"] {
      margin: 0;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }
    .option-icon {
      flex-shrink: 0;
      font-size: 16px;
      display: inline-block;
      width: 20px;
      text-align: center;
    }
    .label {
      white-space: nowrap;
      flex-shrink: 0;
      overflow: visible;
      text-align: left;
      font-size: 14px;
      color: #333;
    }
    .description {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
      padding-left: 24px;
      line-height: 1.4;
    }
    .other-input input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 8px;
      font-size: 14px;
    }
    .show-more {
      color: #4CAF50;
      text-align: center;
      padding: 12px;
      cursor: pointer;
      font-size: 14px;
    }
    .button-container {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }
    .back-button, .finish-button {
      flex: 1;
      padding: 16px;
      border-radius: 8px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    .back-button {
      background: white;
      border: 1px solid #ddd;
    }
    .finish-button {
      background: #A5C49C;
      color: white;
    }
    .content {
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
export class MoreInformationComponent {
  sections = [
    {
      title: "Farm's philosophy",
      placeholder: "philosophy",
      allowOther: true,
      options: [
        { icon: "📍", label: "Local & Small-Scale Production" },
        { icon: "🌍", label: "Environmental Responsibility & Sustainability" },
        { icon: "❤️", label: "Ethical Treatment of Workers & Animals" },
        { icon: "🥬", label: "Freshness & Nutritional Quality" },
        { icon: "🌾", label: "Traditional & Heritage Farming Methods" },
        { icon: "🌱", label: "Organic & Natural Farming" },
        { icon: "🚜", label: "Technology-Driven & Precision Farming" }
      ]
    },
    {
      title: "Farming methods",
      placeholder: "methods",
      allowOther: true,
      options: [
        { icon: "🌱", label: "Organic Practices", description: "Avoiding synthetic fertilizers and pesticides." },
        { icon: "♻️", label: "Sustainable & Regenerative Farming", description: "Enhancing soil health and biodiversity." },
        { icon: "🚜", label: "Hand-Cultivated & Low Mechanization", description: "Minimal use of machinery, prioritizing manual labor." },
        { icon: "🐝", label: "Pollinator-Friendly Farming", description: "Growing crops that support bees and other pollinators." },
        { icon: "🌾", label: "No-Till or Reduced-Till Farming", description: "Minimizing soil disturbance for better soil health." },
        { icon: "🚫", label: "Pesticide-Free or Chemical-Free", description: "Avoiding synthetic chemicals in cultivation." },
        { icon: "💧", label: "Hydroponic or Vertical Farming", description: "Growing produce using water-based systems." },
        { icon: "🌿", label: "Crop Rotation & Companion Planting", description: "Natural methods to enrich soil and control pests." }
      ]
    },
    {
      title: "Certifications",
      placeholder: "certification",
      allowOther: true,
      options: [
        { label: "Certified Organic (USDA, EU, etc.)" },
        { label: "Biodynamic Certified Demeter" },
        { label: "Regenerative Organic Certified (ROC)" },
        { label: "Non-GMO Project Verified" },
        { label: "Certified Naturally Grown" }
      ]
    }
  ];

  expandedSections: boolean[] = [true, false, false];
  showMoreStates: boolean[] = [false, false, false];

  toggleSection(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }

  toggleShowMore(index: number) {
    this.showMoreStates[index] = !this.showMoreStates[index];
  }

  getVisibleOptions(section: any, index: number) {
    if (this.showMoreStates[index]) {
      return section.options;
    }
    return section.options.slice(0, 3);
  }

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/farm-information']);
  }

  finish() {
    this.router.navigate(['/dashboard']);
  }
}
