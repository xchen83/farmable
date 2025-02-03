import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  isSidebarOpen = false;
  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // ✅ Listen for route changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url; // Store the active route
      this.isSidebarOpen = false; // Auto-close menu on navigation
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToHome() {
    this.router.navigate(['/']); // ✅ Navigates to Home
  }

  navigateToAddInventory() {
    this.router.navigate(['/add-inventory']);
  }

  navigateToProduct() {
    this.router.navigate(['/product']);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
