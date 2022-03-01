import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestService } from '../../services/domain/request.service';
import { OrderConfirmationPage } from './order-confirmation';

@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
  ],
  providers: [
    RequestService
  ]
})
export class OrderConfirmationPageModule {}
