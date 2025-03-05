export interface InventoryRecord {
    amount: string;
    type: string;
    detail: string;
    date: string;
}

export interface Product {
    id?: number;
    productName: string;
    category: string;
    shelfLife: number | null;
    shelfLifeUnit: string | null;
    unlimitedShelfLife: boolean;
    packUnit: string;
    description: string | null;
    productImage: string | null;
    price?: number;
    records?: InventoryRecord[];
}

export interface ProductResponse {
    success: boolean;
    data?: Product | null;
    error?: string;
}

export type ProductCategory = 'Fruits' | 'Vegetables' | 'Dairy';

export const PRODUCT_CATEGORIES: ProductCategory[] = ['Fruits', 'Vegetables', 'Dairy'];
