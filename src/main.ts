// src/main.ts
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { OrderService } from './app/services/order.service';

console.log('Application starting - Using real OrderService');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
    // No need to explicitly provide OrderService as it has { providedIn: 'root' }
  ]
}).catch(err => console.error(err));