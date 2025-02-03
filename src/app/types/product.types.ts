export interface Product {
    productName: string;
    category: string;
    shelfLife: number | null;
    shelfLifeUnit: string | null;
    unlimitedShelfLife: boolean;
    packUnit: string;
    description: string | null;
    productImage: string | null;
}

export interface ProductResponse {
    success: boolean;
    message: string;
    newProduct: Product;
    allProducts: Product[];
}

export type ProductCategory = 'Fruits' | 'Vegetables' | 'Dairy';

export const PRODUCT_CATEGORIES: ProductCategory[] = ['Fruits', 'Vegetables', 'Dairy'];
