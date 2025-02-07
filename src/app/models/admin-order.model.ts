import { Order } from "./order.model";

export interface AdminOrder {
    order: Order,
    userId: number,
    username: string
  }