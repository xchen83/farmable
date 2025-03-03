// src/app/order/message-dialog/message-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPaperPlane, faSmile, faImage, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  template: `
  <div class="message-container">
    <!-- Header -->
    <div class="message-header">
      <button class="close-btn" (click)="closeDialog()">
        <fa-icon [icon]="faTimes"></fa-icon>
      </button>
      <h2 class="header-title">Message {{customerName}}</h2>
    </div>

    <!-- Loading state -->
    <div *ngIf="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Processing...</p>
    </div>

    <!-- Error state -->
    <div *ngIf="error" class="error-message">
      {{ error }}
    </div>

    <!-- Success message -->
    <div *ngIf="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <!-- Message area -->
    <div class="message-area">
      <div class="message-bubble">
        <div class="message-content">
          <p class="instruction">Send buyer a message</p>
          <div class="preset-message">
            {{defaultMessage}}
          </div>
          <button class="use-preset" (click)="usePresetMessage()">Use this template</button>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="input-area">
      <div class="input-actions">
        <button class="action-icon">
          <fa-icon [icon]="faSmile"></fa-icon>
        </button>
        <button class="action-icon">
          <fa-icon [icon]="faImage"></fa-icon>
        </button>
        <button class="action-icon">
          <fa-icon [icon]="faMicrophone"></fa-icon>
        </button>
      </div>
      <input 
        type="text" 
        class="message-input" 
        placeholder="Type a message" 
        [(ngModel)]="messageText"
        (keyup.enter)="sendMessage()"
      />
      <button class="send-btn" [disabled]="!messageText.trim() || isLoading" (click)="sendMessage()">
        <fa-icon [icon]="faPaperPlane"></fa-icon>
        Send
      </button>
    </div>
  </div>
  `,
  styles: [`
    .message-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: white;
    }

    .message-header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      background-color: white;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 18px;
      color: #6b7280;
      cursor: pointer;
      margin-right: 16px;
    }

    .header-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .loading-container {
      text-align: center;
      padding: 20px;
    }

    .loading-spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #22c55e;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
      margin: 10px auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      background-color: rgba(220, 38, 38, 0.1);
      color: #dc2626;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 12px 16px;
    }

    .success-message {
      background-color: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 12px 16px;
    }

    .message-area {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background-color: #f9fafb;
    }

    .message-bubble {
      display: inline-block;
      max-width: 80%;
      margin-bottom: 12px;
      background-color: #e5e7eb;
      padding: 12px 16px;
      border-radius: 18px;
      border-top-left-radius: 4px;
    }

    .message-content {
      color: #111827;
    }

    .instruction {
      font-weight: 600;
      color: #22c55e;
      margin: 0 0 8px 0;
    }

    .preset-message {
      white-space: pre-line;
      margin-bottom: 12px;
    }

    .use-preset {
      background-color: #f3f4f6;
      color: #4b5563;
      padding: 6px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }

    .use-preset:hover {
      background-color: #e5e7eb;
    }

    .input-area {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-top: 1px solid #e5e7eb;
      background-color: white;
    }

    .input-actions {
      display: flex;
      margin-right: 8px;
    }

    .action-icon {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 20px;
      margin-right: 12px;
      cursor: pointer;
    }

    .message-input {
      flex: 1;
      padding: 10px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      outline: none;
      font-size: 16px;
    }

    .message-input:focus {
      border-color: #22c55e;
    }

    .send-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #22c55e;
      color: white;
      border: none;
      border-radius: 24px;
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 500;
      margin-left: 12px;
      cursor: pointer;
    }

    .send-btn:hover {
      background-color: #16a34a;
    }

    .send-btn:disabled {
      background-color: #d1d5db;
      cursor: not-allowed;
    }
  `]
})
export class MessageDialogComponent implements OnInit {
  customerId: string = '';
  customerName: string = '';
  orderId: string = '';
  messageText: string = '';
  defaultMessage: string = 'Hello, thank you for your order.\nOnly 25 lbs of Fuji Apples are available. Would you like to proceed with this quantity?';
  
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  // FontAwesome icons
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faSmile = faSmile;
  faImage = faImage;
  faMicrophone = faMicrophone;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'] || '';
      this.customerName = params['customerName'] || 'Customer';
      this.orderId = params['orderId'] || '';
      
      // 根据订单ID和客户ID加载消息模板
      this.loadMessageTemplate();
    });
  }

  loadMessageTemplate(): void {
    // 实际应用中，可以根据订单状态或特定情况加载不同的消息模板
    // 这里简化处理，使用不同的默认模板
    if (this.orderId && this.customerId) {
      // 模拟获取订单状态以定制消息
      const templates = [
        'Hello, thank you for your order #' + this.orderId + '.\nOnly 25 lbs of Fuji Apples are available. Would you like to proceed with this quantity?',
        'Hello, we noticed there is a shortage on some of the items you ordered. Please let us know if you would like to proceed with a partial order.',
        'Hello, we wanted to inform you that your order #' + this.orderId + ' has been received and is being processed. Is there anything else you need?'
      ];
      
      // 随机选择一个模板（实际应用中应基于业务逻辑选择）
      const randomIndex = Math.floor(Math.random() * templates.length);
      this.defaultMessage = templates[randomIndex];
    }
  }

  usePresetMessage(): void {
    this.messageText = this.defaultMessage;
  }

  sendMessage(): void {
    if (!this.messageText.trim() || this.isLoading) return;
    
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    
    // 调用服务发送消息
    this.orderService.sendMessageToBuyer(
      parseInt(this.orderId), 
      parseInt(this.customerId), 
      this.messageText
    ).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = 'Message sent successfully!';
          this.messageText = ''; // 清空消息输入框
          
          // 2秒后自动关闭对话框
          setTimeout(() => {
            this.closeDialog();
          }, 2000);
        } else {
          this.error = response.error || 'Failed to send message. Please try again.';
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.error = 'Connection error. Please check your network and try again.';
        console.error('Error sending message:', error);
      }
    });
  }

  closeDialog(): void {
    this.router.navigate(['/order']);
  }
}