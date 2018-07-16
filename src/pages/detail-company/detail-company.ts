import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Company } from 'models/company';

/**
 * Generated class for the DetailCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-company',
  templateUrl: 'detail-company.html',
})
export class DetailCompanyPage {

  company: Company;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('item');
  }

  ionViewDidLoad() {
  }



}
