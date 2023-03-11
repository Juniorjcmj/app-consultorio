import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [
    {
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 50.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 100.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 75.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      name: 'Product 4',
      description: 'This is a description for product 4',
      price: 25.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
  ];

  cardWidth: string = '100%';

  constructor() { }

  ngOnInit(): void {
  }

}
