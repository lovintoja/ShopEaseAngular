import { Address, Order, OrderItem, PaymentInfo } from "./order.model";

export interface AdminOrder {
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