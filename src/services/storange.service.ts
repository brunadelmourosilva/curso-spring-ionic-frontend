import { Injectable } from "@angular/core";
import { STORANGE_KEYS } from "../config/storange_keys.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local_user";


@Injectable()
export class StorangeService {


    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORANGE_KEYS.localUser);

        if(usr == null){
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORANGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORANGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart() : Cart {
        let str = localStorage.getItem(STORANGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }

    setCart(obj : Cart) {
        if (obj != null) {
            localStorage.setItem(STORANGE_KEYS.cart, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORANGE_KEYS.cart);
        }
    }
}