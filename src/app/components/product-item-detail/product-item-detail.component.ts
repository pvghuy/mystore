import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    url: '',
    amount: 0
  };
  selection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  id: number = 1;
  backArrow = faArrowLeft;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.id = parseInt(params['id']));
    this.productService.getProductById(this.id).subscribe((result: Product) => this.product = result);
  }

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

  setAmount(e: Event) {
    this.product.amount = parseInt((e.target as HTMLSelectElement).value);
  }
}
