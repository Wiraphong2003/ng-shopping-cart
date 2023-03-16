import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { DataServiceService } from '../service/data-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  foodList:any;
  constructor(
    private product_service: ProductService,
    private router: Router,
    private dataService:DataServiceService,
    private http :HttpClient
  ) {

    this.http.get(this.dataService.apiEndpoint + '/foods').subscribe((data: any) => {
      console.log(data);
      this.foodList = data;
    });
    this.product_service.loadCart();
    this.products = this.product_service.getProduct();
  }

  //Add product to Cart
  addToCart(food: any) {
    if (!this.product_service.productInCart(food)) {
      food.quantity = 1;
      this.product_service.addToCart(food);
      this.products = [...this.product_service.getProduct()];
      this.subTotal = food.price;
    }
  }

  //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;

  //   this.subTotal = amt * qty;

  //   this.product_service.saveCart();
  // }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.product_service.removeProduct(product);
    this.products = this.product_service.getProduct();
  }

  //Calculate Total

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  // checkout() {
  //   localStorage.setItem('cart_total', JSON.stringify(this.total));
  //   this.router.navigate(['/payment']);
  // }
  cart() {
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.router.navigate(['/cart']);
  }
}
