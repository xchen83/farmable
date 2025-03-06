import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, PRODUCT_CATEGORIES } from '../../types/product.types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-produce',
  templateUrl: './add-produce.component.html',
  styleUrls: ['./add-produce.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class AddProduceComponent {
  isDropdownOpen = false;
  isPackUnitDropdownOpen = false;
  isShelfLifeUnitDropdownOpen = false;
  selectedCategory = '';
  selectedPackUnit = '';
  selectedShelfLifeUnit = 'Days';
  isDragging = false;
  productImages: string[] = [];
  isDraggingIndex: number | null = null;

  shelfLifeUnits = [
    { value: 'Days', label: 'Days' },
    { value: 'Weeks', label: 'Weeks' },
    { value: 'Months', label: 'Months' }
  ];

  packUnits = [
    { value: 'lbs', label: 'Pounds (lbs)' },
    { value: 'bskt', label: 'Baskets (bskt)' },
    { value: 'cs', label: 'Cases (cs)' },
    { value: 'ct', label: 'Count (ct)' },
    { value: 'ea', label: 'Each (ea)' }
  ];

  categories = {
    'Produce': [
      { value: 'Fruits', label: 'Fruits' },
      { value: 'Vegetables', label: 'Vegetables' },
      { value: 'Herbs', label: 'Herbs & Microgreens' },
      { value: 'Mushrooms', label: 'Mushrooms' },
      { value: 'Sprouts', label: 'Sprouts & Shoots' }
    ],
    'Animal Products': [
      { value: 'Eggs', label: 'Eggs' },
      { value: 'Dairy', label: 'Dairy Products' },
      { value: 'Honey', label: 'Honey & Bee Products' }
    ],
    'Pantry Items': [
      { value: 'Nuts', label: 'Nuts & Seeds' },
      { value: 'Grains', label: 'Grains & Legumes' },
      { value: 'Preserves', label: 'Jams & Preserves' },
      { value: 'Sauces', label: 'Sauces & Condiments' }
    ],
    'Specialty': [
      { value: 'Flowers', label: 'Cut Flowers & Bouquets' },
      { value: 'Plants', label: 'Live Plants & Seedlings' },
      { value: 'Specialty', label: 'Specialty Items' }
    ]
  };

  formData: Product = {
    productName: '',
    category: '',
    shelfLife: 7,
    shelfLifeUnit: 'Days',
    unlimitedShelfLife: false,
    packUnit: '',
    description: null,
    productImage: null
  };

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.category-dropdown')) {
      this.isDropdownOpen = false;
    }
    if (!target.closest('.pack-unit-dropdown')) {
      this.isPackUnitDropdownOpen = false;
    }
    if (!target.closest('.shelf-life-unit-dropdown')) {
      this.isShelfLifeUnitDropdownOpen = false;
    }
  }

  toggleDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  togglePackUnitDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isPackUnitDropdownOpen = !this.isPackUnitDropdownOpen;
  }

  toggleShelfLifeUnitDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isShelfLifeUnitDropdownOpen = !this.isShelfLifeUnitDropdownOpen;
  }

  selectCategory(value: string, label: string) {
    this.formData.category = value;
    this.selectedCategory = label;
    this.isDropdownOpen = false;
  }

  selectPackUnit(value: string, label: string) {
    this.formData.packUnit = value;
    this.selectedPackUnit = label;
    this.isPackUnitDropdownOpen = false;
  }

  selectShelfLifeUnit(value: string) {
    this.formData.shelfLifeUnit = value;
    this.selectedShelfLifeUnit = value;
    this.isShelfLifeUnitDropdownOpen = false;
  }

  submitForm(): void {
    console.log('Submit button clicked');

    if (!this.isFormValid()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form data:', this.formData);
    this.loading = true;
    this.errorMessage = null;

    this.productService.addProduct(this.formData).subscribe({
      next: (response) => {
        console.log('Success response:', response);
        this.handleSuccess();
      },
      error: (error) => {
        console.error('Error in component:', error);
        this.handleError(error);
      }
    });
  }

  private isFormValid(): boolean {
    if (!this.formData.productName || !this.formData.category || !this.formData.packUnit) {
      this.errorMessage = 'Please fill out all required fields.';
      console.log('Missing required fields:', {
        name: !this.formData.productName,
        category: !this.formData.category,
        packUnit: !this.formData.packUnit
      });
      return false;
    }
    return true;
  }

  private handleSuccess(): void {
    this.loading = false;
    this.router.navigate(['/product/current-inventory'], {
      queryParams: { refresh: Date.now().toString() }
    });
  }

  private handleError(error: Error): void {
    console.error('Error adding product:', error);
    this.loading = false;
    this.errorMessage = 'Failed to add product. Please try again.';
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingIndex = index;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingIndex = null;
  }

  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingIndex = null;

    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please upload an image file';
        return;
      }
      this.handleFile(file, index);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0], index);
    }
  }

  private handleFile(file: File, index: number): void {
    if (file.size > 10 * 1024 * 1024) {
      this.errorMessage = 'File size should not exceed 10MB';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        // Ensure array has enough slots
        while (this.productImages.length <= index) {
          this.productImages.push('');
        }
        this.productImages[index] = e.target.result as string;
        // Update formData to include all images
        this.formData.productImage = this.productImages.filter(img => img).join(',');
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number): void {
    if (index >= 0 && index < this.productImages.length) {
      this.productImages[index] = '';
      this.formData.productImage = this.productImages.filter(img => img).join(',');
    }
  }

}
