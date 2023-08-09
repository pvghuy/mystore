import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() customerInfo = new EventEmitter();
  products: Product[] = [];
  selection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  total: number = 0;

  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.calculateTotal();
    
  }

  calculateTotal() {
    this.total = 0;
    this.products.forEach(product => {
      this.total = Number((this.total + product.price * product.amount).toFixed(2));
    })
  }

  changeAmount(e: Event, product: Product) {
    const position = this.products.indexOf(product);
    this.products[position].amount = parseInt((e.target as HTMLSelectElement).value);
    this.calculateTotal();
  }

  onSubmit(value: any) {
    this.cartService.clearCart();
    this.route.navigate([`success/${value.name}/${this.total}`]);
  }
}
