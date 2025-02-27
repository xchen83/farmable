import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHouse,
  faBoxArchive,
  faClipboardList,
  faHandshake,
  faSignIn,
  faGear,
  faBell,
  faChevronDown,
  faChartLine,
  faWallet,
  faMessage,
  faCircleQuestion,
  faRightFromBracket,
  faBars,
  faXmark,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Icons
  faHouse = faHouse;
  faBoxArchive = faBoxArchive;
  faClipboardList = faClipboardList;
  faHandshake = faHandshake;
  faSignIn = faSignIn;
  faGear = faGear;
  faBell = faBell;
  faChevronDown = faChevronDown;
  faChartLine = faChartLine;
  faWallet = faWallet;
  faMessage = faMessage;
  faCircleQuestion = faCircleQuestion;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;
  faXmark = faXmark;
  faUser = faUser;

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
    this.router.navigate(['/dashboard']);
  }

  navigateToAddInventory() {
    this.router.navigate(['/product/inventory']);
  }

  navigateToProduct() {
    this.router.navigate(['/product']);
  }

  navigateToOrder(): void {
    this.router.navigate(['/order']);
    this.isSidebarOpen = false; // Close sidebar after navigation on mobile
  }

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
    this.isSidebarOpen = false;
  }

  navigateToCustomer(): void {
    this.router.navigate(['/customer']);
    this.isSidebarOpen = false;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
