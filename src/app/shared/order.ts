import { OrderItem } from './order-item';
export interface Order {
  orderItems: any[];
  address: {
    street: String;
    city: string;
  };
  phone: string;
  user: string;
  createdAt?: Date;
  totalPrice?: number;
  status?: string;
}
