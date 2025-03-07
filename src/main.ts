// main.ts
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { OrderService } from './app/services/order.service';
import { MockOrderService } from './app/services/mock-order.service';

// For debugging - log which service will be used
console.log('Using real OrderService instead of MockOrderService');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Explicitly provide the real service
    { provide: OrderService, useClass: OrderService }
  ]
}).catch(err => console.error(err));