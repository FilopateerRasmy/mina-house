import { OrderItem } from './order-item';
export interface Order {
  orderItems: OrderItem[];
  shippingAddress: {
    street: String;
    city: string;
  };
  phone: string;
  user: string;
}
