import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-added-product',
  templateUrl: './added-product.component.html',
  styleUrls: ['./added-product.component.css']
})
export class AddedProductComponent {
  productName: string | null = '';
  category: string | null = '';
  shelfLife: number | null = null;
  shelfLifeUnit: string | null = 'Days';
  unlimitedShelfLife: boolean = false;
  packUnit: string | null = '';
  description: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // ✅ Read query parameters passed from the form submission
    this.route.queryParams.subscribe(params => {
      this.productName = params['name'];
      this.category = params['category'];
      this.shelfLife = params['shelfLife'] ? Number(params['shelfLife']) : null;
      this.shelfLifeUnit = params['shelfLifeUnit'] || 'Days';
      this.unlimitedShelfLife = params['unlimitedShelfLife'] === 'true';
      this.packUnit = params['packUnit'];
      this.description = params['description'];
    });
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-produce']);
  }
}
