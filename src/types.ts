export interface Product {
  id: string;
  title: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  imageUrl?: string;
  description?: string;
  specs?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  name?: string;
  isAdmin?: boolean;
}

export type OrderStatus = 'Pending' | 'Dispatched' | 'Delivered';

export interface Order {
  id: string;
  customerEmail: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryOption: string;
  createdAt: string;
}

export interface DeliveryOption {
  id: string;
  label: string;
  price: number;
}
