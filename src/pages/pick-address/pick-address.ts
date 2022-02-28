import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { RequestDTO } from '../../models/request.dto';
import { CartService } from '../../services/domain/cart.service';
import { CustomerService } from '../../services/domain/customer.service';
import { StorangeService } from '../../services/storange.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : AddressDTO[];

  request : RequestDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storange: StorangeService,
              public customerService : CustomerService,
              public cartService : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storange.getLocalUser();

    if (localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          this.request = {
            customer: {id: response['id']},
            deliveryAddress: null,
            payment: null,
            items : cart.items.map(x => {return {amount: x.amount, product: {id: x.product.id}}})
          }

        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
      }
      else {
        this.navCtrl.setRoot('HomePage');
      }
  }

  nextPage(item: AddressDTO) {
    this.request.deliveryAddress = {id: item.id};
    console.log(this.request); 
  }

}
