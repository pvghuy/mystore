import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private cartService: CartService, private route: Router, private productService: ProductService) {}

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.products.reduce((acc: number, product: Product) => {
      this.total = parseFloat((acc + product.price * product.amount).toFixed(2));
      return this.total;
    }, 0);
  }

  changeAmount(value: any, product: Product) {
    const position = this.products.indexOf(product);
    this.products[position].amount = value;
    this.calculateTotal();
  }

  deleteProduct(name: string, id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.cartService.clearCart();
    this.productService.addProductToStorage(this.products);
    const message = `You have removed ${name} from your cart`;
    alert(message);
  }

  onSubmit(value: any) {
    this.cartService.clearCart();
    this.route.navigate([`success/${value.name}/${this.total}`]);
  }
}
