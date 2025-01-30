import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-add-produce',
  templateUrl: './add-produce.component.html',
  styleUrls: ['./add-produce.component.css'],
    imports: [FormsModule], // ✅ Add FormsModule here

})
export class AddProduceComponent {
  
  productName: string = '';
  category: string = '';
  shelfLife: number = 7;
  shelfLifeUnit: string = 'Days';
  unlimitedShelfLife: boolean = false;
  packUnit: string = '';
  description: string = '';
  productImage: string | null = '';

  constructor(private router: Router) { }

  // ✅ Handle Image Upload
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.productImage = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  submitForm() {
    // ✅ Basic form validation
    if (!this.productName || !this.category || !this.packUnit) {
      alert('Please fill out all required fields.');
      return;
    }

    // ✅ Log data before navigation (for debugging)
    console.log('Form Submitted:', {
      productName: this.productName,
      category: this.category,
      shelfLife: this.unlimitedShelfLife ? 'Unlimited' : `${this.shelfLife} ${this.shelfLifeUnit}`,
      packUnit: this.packUnit,
      description: this.description
    });

    // ✅ Navigate to the "Added Product" confirmation page with form data
    this.router.navigate(['/product/added-product'], {
      queryParams: {
        name: this.productName,
        category: this.category,
        shelfLife: this.unlimitedShelfLife ? 'Unlimited' : `${this.shelfLife} ${this.shelfLifeUnit}`,
        packUnit: this.packUnit,
        description: this.description
      }
    });
  }
}
