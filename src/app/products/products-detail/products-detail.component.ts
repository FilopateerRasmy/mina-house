import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/shared/products';
import { MessageService } from 'primeng/api';
import { OrderItem } from 'src/app/shared/order-item';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss'],
  providers: [MessageService],
})
export class ProductsDetailComponent implements OnInit {
  product!: IProduct;
  image!: string;
  message!: boolean;
  msg = '';
  quantity: number = 1;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private messageService: MessageService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.productService.getSingleProduct(id).subscribe({
          next: (result) => {
            this.isLoading = false;
            this.product = result.product;
          },
          error: (err) => {
            this.isLoading = false;
            this.msg = err.error.msg;
          },
        });
      }
    });
  }
  cart(product: IProduct) {
    const cartItem: OrderItem = {
      product: product._id,
      quantity: this.quantity,
      price: product.price,
      countInStock: product.countInStock,
      name: product.name,
      image: product.image,
      subTotal: product.price * this.quantity,
    };
    console.log(cartItem)
    this.cartService.saveCartItems(cartItem);

    this.cartService.incrementItems(this.quantity);
    this.messageService.add({
      severity: 'success',
      summary: 'Added to cart',
      detail: product.name,
    });
  }

}
