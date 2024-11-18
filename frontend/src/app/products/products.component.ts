import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor() {}
  products! : Array<any>
  ngOnInit() {
    this.products = [
      {id : 1 , name:"Computer"  , price : 7500},
      {id : 2 , name:"Printer"  , price : 2800},
      {id : 3 , name:"Smart Phone"  , price : 1500},
    ]
  }


}
