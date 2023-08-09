import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { switchMap, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  localStorage = window.localStorage;
  apiUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product[]>(this.apiUrl).pipe(switchMap(products => {
      const result = products.find(product => product.id === id);
      return result ? of(result) : of({} as Product)
    }));
  }

  addProductToStorage(products: Product[]) {
    this.localStorage.setItem('products', JSON.stringify(products));
  }
}
