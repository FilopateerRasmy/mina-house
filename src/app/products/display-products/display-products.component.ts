import { OrderItem } from './../../shared/order-item';
import { CartService } from 'src/app/services/cart.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IProduct } from 'src/app/shared/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
  providers: [MessageService],
})
export class DisplayProductsComponent implements OnInit, OnChanges {
  productName = '';

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  @Input() products: IProduct[] = [];
  beforeFilter: IProduct[] = [];
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.beforeFilter = this.products;
  }
  sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];

  sortOrder!: number;

  sortField!: string;

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  cart(product: IProduct) {
    const cartItem: OrderItem = {
      product: product._id,
      quantity: 1,
      price: product.price,
      name: product.name,
      image: product.image,
      countInStock: product.countInStock,
      subTotal: product.price * 1,
    };
    this.cartService.saveCartItems(cartItem);

    this.cartService.incrementItems(1);
    this.messageService.add({
      severity: 'success',
      summary: 'Added to cart',
      detail: product.name,
    });
  }

  onFilter($event: Event) {
    const filter = ($event.target as HTMLInputElement).value;
    if (filter) {
      const filteredProducts = this.products.filter((product) =>
        product.name.toLocaleLowerCase().includes(filter.toLowerCase())
      );
      this.products = filteredProducts.length
        ? filteredProducts
        : this.beforeFilter;
      console.log(this.beforeFilter);
    } else {
      this.products = this.beforeFilter;
    }
  }
}
