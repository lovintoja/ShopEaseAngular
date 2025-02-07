import { Address } from "./order.model";

export interface Profile {
    address: Address;
    phoneNumber: string;
    dateOfBirth: Date;
    bio: string;
  }
  