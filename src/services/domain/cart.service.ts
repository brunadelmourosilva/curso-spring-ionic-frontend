import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProductDTO } from "../../models/product.dto";
import { StorangeService } from "../storange.service";

@Injectable()
export class CartService {

    constructor(public storange: StorangeService) {
    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storange.setCart(cart);
        
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storange.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduct(product: ProductDTO) : Cart {
        let cart = this.getCart();

        let position = cart.items.findIndex(x => x.product.id == product.id);

        if (position == -1) {
            cart.items.push({amount: 1, product: product});
        }
        this.storange.setCart(cart);
        
        return cart;
    }
}