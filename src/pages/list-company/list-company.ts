import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateCompanyPage } from '../create-company/create-company';
import { CompanyServiceProvider } from '../../providers/company-service/company-service';
import { Company } from 'models/company';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the ListCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-company',
  templateUrl: 'list-company.html',
})
export class ListCompanyPage {

  selectedItem: any;
  icons: string[];
  public companyList: Observable<any[]>;
  public com : Observable<any[]>;
  public companies : Company[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    //this.loadData();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CreateCompanyPage, {
      item: item
    });
  }
  ionViewDidLoad() {
    //this.companyList = this.companyService.getListOfCompany().valueChanges();
    this.loadData()
  }

  loadData(){
    this.companyService.getAllCompany().then((e)=>{
      this.companies = e;
      console.log(this.companies);
    });
  }

  public addItem() {
    this.navCtrl.push(CreateCompanyPage);
	}

}


