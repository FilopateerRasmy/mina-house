import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../shared/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
categories!:ICategory[];
responsiveOptions=[
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }
];
  constructor(private categoryService:CategoryService) {

   }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
    next: (result)=>{
      this.categories = result;
    }
    })
  }

}
