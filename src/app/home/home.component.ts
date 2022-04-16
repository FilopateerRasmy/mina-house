
import { ProductsService } from 'src/app/services/products.service';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../services/category.service';

import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  {
  categories$ = this.categoryService.categories$
  products$ = this.productService.productsWithCategory$.pipe(
    map(products => products.filter(product => product.featured == true)
    )
  );

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService
  ) { }

  
}
