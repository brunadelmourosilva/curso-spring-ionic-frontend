import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService : ProductService) {
  }

  ionViewDidLoad() {
    let category_id = this.navParams.get('category_id');
    
    this.productService.findByCategory(category_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => {});
  }
  
  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];

      this.productService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail() {
    this.navCtrl.push('ProductDetailPage');
  }
    
}