import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tag" [ngClass]="type">
      {{ type === 'low-in-stock' ? 'Low in Stock' : type }}
    </div>
  `,
  styles: [`
    .tag {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .low-in-stock {
      background-color: #FFE4E4;
      color: #FF4D4D;
    }
  `]
})
export class TagComponent {
  @Input() type: string = '';
} 