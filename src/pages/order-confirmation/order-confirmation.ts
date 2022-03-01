import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CartItem } from '../../models/cart-item';
import { CustomerDTO } from '../../models/customer.dto';
import { RequestDTO } from '../../models/request.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';
import { RequestService } from '../../services/domain/request.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  request : RequestDTO;
  cartItems : CartItem[];
  customer : CustomerDTO;
  address : AddressDTO;
  codrequest : string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public customerService : CustomerService,
              public cartService : CartService,
              public requestService : RequestService) {

              this.request = this.navParams.get('request');  
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.customerService.findById(this.request.customer.id)
      .subscribe(response => {
        this.customer = response as CustomerDTO;

        this.address = this.findAddress(this.request.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout() {
    this.requestService.insert(this.request)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        
        this.codrequest = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location : string) : string{
      let position = location.lastIndexOf('/');

      return location.substring(position + 1, location.length);
  }

}
