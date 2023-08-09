import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localStorage = window.localStorage;

  constructor() { }

  getCart() {
    const products = this.localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  clearCart() {
    this.localStorage.clear();
  }
}
