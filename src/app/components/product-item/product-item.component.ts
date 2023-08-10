import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    url: '',
    amount: 0
  };
  selection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private productService: ProductService, private cartService: CartService) {}

  addProductToCart() {
    const cartProducts: Product[] = this.cartService.getCart();
    const productInCart = cartProducts.find(product => product.id === this.product.id);
    if (productInCart) {
      let position = cartProducts.indexOf(productInCart);
      cartProducts[position] = this.product;
      this.productService.addProductToStorage(cartProducts);
    } else {
      cartProducts.push(this.product);
      this.productService.addProductToStorage(cartProducts);
    }
    const message = `${this.product.name} has been added to your cart.`;
    alert(message);
  }

  setAmount(value: any) {
    this.product.amount = value;
  }
}
