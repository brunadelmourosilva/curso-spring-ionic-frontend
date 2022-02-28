import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { StorangeService } from '../../services/storange.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : AddressDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storange: StorangeService,
              public customerService : CustomerService) {
  }

  ionViewDidLoad() {
    let localUser = this.storange.getLocalUser();

    if (localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];
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

}
