import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../services/product.service';
import {Product} from '../model/Product.model';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private productService:ProductService , private fb : FormBuilder) {}
  products! : Array<Product>
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  totalPages:number=5;
  currentAction:String="all";
  ngOnInit() {
    this.handlePageProducts();
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    })
  }

  handlePageProducts(){
    this.productService.getPagesProduct(this.currentPage,this.pageSize).subscribe({
      next: (data)=> {
        this.products = data.products;
        this.totalPages = data.totalPages;
        //console.log(data.totalPages);
      },
      error: err => {
        this.errorMessage = err;
      }
    });
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

  handleSetPromotions(p: Product) {
    let promo = p.promotion;
     this.productService.SetPromotion(p.id).subscribe({
       next: (data)=> {
        // console.log("OK I'M HERE");
         p.promotion =!promo;
       },
       error: err => {
         this.errorMessage = err;
       }
     })
  }

  handleSearchProduct() {
    this.currentAction="Search";
    this.currentPage=0;
     let keyword = this.searchFormGroup.value.keyword;
     this.productService.searchProduct(keyword , this.currentPage , this.pageSize).subscribe({
       next: (data)=> {
         this.products = data.products;
         this.totalPages = data.totalPages;
       }
     })
  }

  protected readonly Array = Array;

  gotoPage(i: number) {
    this.currentPage = i;
    if(this.currentAction==='all'){
      this.handlePageProducts();
    }else{
      this.handleSearchProduct();
    }

  }
}
