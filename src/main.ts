// main.ts
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { OrderService } from './app/services/order.service';
import { MockOrderService } from './app/services/mock-order.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // 使用模拟服务替代真实服务
    { provide: OrderService, useClass: MockOrderService }
  ]
}).catch(err => console.error(err));