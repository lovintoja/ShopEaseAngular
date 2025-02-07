export interface AdminOrderSearchQuery {
    userId?: number;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    paymentMethod?: string;
    minTotalPrice?: number;
    maxTotalPrice?: number;
  }