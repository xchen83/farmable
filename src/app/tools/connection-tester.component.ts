// src/app/tools/connection-tester.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connection-tester',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">API Connection Tester</h1>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">API URL</label>
        <input 
          type="text" 
          [(ngModel)]="apiUrl" 
          class="w-full p-2 border rounded" 
          placeholder="Enter API URL"
        />
        <button 
          (click)="testConnection()" 
          class="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          [disabled]="isTesting"
        >
          {{ isTesting ? 'Testing...' : 'Test Connection' }}
        </button>
      </div>
      
      <!-- Endpoints Testing -->
      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4">Test Specific Endpoints</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            *ngFor="let endpoint of endpoints" 
            class="border rounded p-4 flex flex-col"
          >
            <h3 class="font-bold">{{ endpoint.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ endpoint.url }}</p>
            
            <button 
              (click)="testEndpoint(endpoint)" 
              class="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              [disabled]="endpoint.isTesting"
            >
              {{ endpoint.isTesting ? 'Testing...' : 'Test' }}
            </button>
            
            <div *ngIf="endpoint.lastTestTime" class="mt-2">
              <p class="text-sm">
                Last tested: {{ endpoint.lastTestTime | date:'medium' }}
              </p>
              <p class="font-bold" [ngClass]="endpoint.isSuccess ? 'text-green-600' : 'text-red-600'">
                {{ endpoint.isSuccess ? 'Success' : 'Failed' }}
              </p>
              <pre *ngIf="endpoint.response" class="bg-gray-100 p-2 mt-2 text-xs overflow-auto max-h-40">{{ endpoint.response | json }}</pre>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Connection Logs -->
      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4">Connection Logs</h2>
        
        <div *ngIf="logs.length === 0" class="text-gray-500">
          No logs yet. Test some endpoints to see results.
        </div>
        
        <div *ngFor="let log of logs" 
             [ngClass]="log.success ? 'border-green-500' : 'border-red-500'" 
             class="border-l-4 p-3 mb-2 bg-gray-50">
          <div class="flex justify-between">
            <span class="font-bold">{{ log.endpoint }}</span>
            <span class="text-sm text-gray-600">{{ log.timestamp | date:'medium' }}</span>
          </div>
          <div [ngClass]="log.success ? 'text-green-600' : 'text-red-600'">
            {{ log.message }}
          </div>
          <pre *ngIf="log.details" class="bg-gray-100 p-2 mt-2 text-xs overflow-auto max-h-40">{{ log.details }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class ConnectionTesterComponent implements OnInit {
  apiUrl = 'https://farmable-backend.xchen83.workers.dev/api';
  isTesting = false;
  
  endpoints = [
    { 
      name: 'API Root', 
      url: '/api', 
      isTesting: false,
      lastTestTime: null,
      isSuccess: null,
      response: null
    },
    { 
      name: 'Orders', 
      url: '/api/orders', 
      isTesting: false,
      lastTestTime: null,
      isSuccess: null,
      response: null
    },
    { 
      name: 'Products', 
      url: '/api/products', 
      isTesting: false,
      lastTestTime: null,
      isSuccess: null,
      response: null
    },
    { 
      name: 'Customers', 
      url: '/api/customers', 
      isTesting: false,
      lastTestTime: null,
      isSuccess: null,
      response: null
    }
  ];
  
  logs = [];
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    // Update endpoint URLs with the base API URL
    this.updateEndpointUrls();
  }
  
  updateEndpointUrls() {
    this.endpoints.forEach(endpoint => {
      endpoint.url = this.apiUrl + endpoint.url.substring(4); // Remove '/api' and add the new base URL
    });
  }
  
  testConnection() {
    this.isTesting = true;
    this.updateEndpointUrls();
    
    // Add a log entry
    this.addLog('General', true, `Testing connection to ${this.apiUrl}`, null);
    
    // Test all endpoints in sequence
    this.endpoints.forEach(endpoint => {
      this.testEndpoint(endpoint);
    });
    
    this.isTesting = false;
  }
  
  testEndpoint(endpoint) {
    endpoint.isTesting = true;
    
    this.http.get(endpoint.url).subscribe(
      response => {
        endpoint.lastTestTime = new Date();
        endpoint.isSuccess = true;
        endpoint.response = response;
        this.addLog(endpoint.name, true, 'Connection successful', response);
        endpoint.isTesting = false;
      },
      error => {
        endpoint.lastTestTime = new Date();
        endpoint.isSuccess = false;
        endpoint.response = error;
        this.addLog(endpoint.name, false, `Error: ${error.message}`, error);
        endpoint.isTesting = false;
      }
    );
  }
  
  addLog(endpoint, success, message, details) {
    this.logs.unshift({
      endpoint,
      success,
      message,
      details,
      timestamp: new Date()
    });
    
    // Keep only the last 20 logs
    if (this.logs.length > 20) {
      this.logs.pop();
    }
  }
}