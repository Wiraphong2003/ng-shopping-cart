import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from './data-service.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  foods: any[] = [];

  constructor(private http: HttpClient,
    private dataService: DataServiceService) {

  }


  getAllProductss() {
    return this.http.get('assets/data.json');
    // return this.http.get(this.dataService.apiEndpoint + '/foods').subscribe((data: any) => {
    //   console.log(data);
    //   this.foods = data;
    // });
  }

  getProduct() {
    return this.foods;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.foods));
  }

  addToCart(addedProduct: any) {
    this.foods.push(addedProduct);
    this.saveCart();
  }

  loadCart(): void {
    this.foods = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.foods.findIndex((x: any) =>
      x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.foods.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.foods.splice(index, 1);
      this.saveCart();
    }
  }
  clearProducts() {
    localStorage.clear();
  }
}
