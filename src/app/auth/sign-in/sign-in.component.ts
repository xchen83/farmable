import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-6 space-y-6">
        <!-- Logo -->
        <div class="text-center">
          <img class="mx-auto h-12 w-auto" src="https://i.ibb.co/Hfc0nWZz/logo.png" alt="Farmable">
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <!-- Sign in form -->
        <form class="space-y-4" (ngSubmit)="onSubmit()" #signInForm="ngForm">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              [(ngModel)]="email"
              name="email"
              type="email"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500"
              placeholder="Enter your email"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              [(ngModel)]="password"
              name="password"
              type="password"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500"
              placeholder="Enter your password"
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                [(ngModel)]="rememberMe"
                name="remember-me"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>

            <a href="#" class="text-sm font-medium text-lime-600 hover:text-lime-500">Forgot password?</a>
          </div>

          <button
            type="submit"
            [disabled]="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Sign up link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <a href="#" class="font-medium text-lime-600 hover:text-lime-500">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  loading: boolean = false;

  constructor(private router: Router) { }

  onSubmit() {
    this.loading = true;
    console.log('Form submitted:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    // Simulate API call delay
    setTimeout(() => {
      this.loading = false;
      // Navigate to dashboard after successful sign in
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
} 