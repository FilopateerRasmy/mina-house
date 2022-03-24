export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string[];
  countInStock: number;
  subTotal?: number;
}
