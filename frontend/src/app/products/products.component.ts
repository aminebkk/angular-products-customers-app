import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../services/product.service';
import {Product} from '../model/Product.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private productService:ProductService) {}
  products! : Array<Product>
  errorMessage!: string;
  ngOnInit() {
    this.handleGetAllProducts();
  }

   handleGetAllProducts(){
    this.productService.getAllProduct().subscribe({
      next: (data)=> {
        this.products = data;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm("Are you sure you want to delete this product?");
    if(!conf) return ;
     this.productService.DeleteProduct(p.id).subscribe({
       next: (data)=> {
          let index = this.products.indexOf(p);
          this.products.splice(index, 1);
       },
       error: err => {
         this.errorMessage = err;
       }
     })
  }
}
