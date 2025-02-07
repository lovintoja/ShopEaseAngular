import { Product } from "./product.model";

export interface Order {
    id: number;
    orderDate: Date;
    status: string;
    totalPrice: number;
    shippingAddress: Address;
    paymentInfo: PaymentInfo;
    contactPhone: string;
    note?: string;
    items: OrderItem[];
  }
  
  export interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface PaymentInfo {
    paymentMethod: string;
    transactionId: string;
    paymentDate: Date;
  }
  
  export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    product?: Product;
  }