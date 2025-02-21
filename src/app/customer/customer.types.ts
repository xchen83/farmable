export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  total_spent: number;
  transaction_count: number;
  last_transaction_date?: string;
  created_at: string;
} 