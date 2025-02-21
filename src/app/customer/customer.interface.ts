export interface Customer {
    id: string;
    name: string;
    contact: {
        phone: string;
        email: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    orderHistory: {
        orderId: string;
        date: Date;
        total: number;
        status: 'pending' | 'completed' | 'cancelled';
    }[];
    totalSpend: number;
    lastOrderDate: Date;
    paymentStatus: {
        outstanding: number;
        isGoodStanding: boolean;
    };
    preferredProducts: {
        productId: string;
        productName: string;
        orderCount: number;
    }[];
    notes: string;
} 