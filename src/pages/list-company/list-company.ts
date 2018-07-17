import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyServiceProvider, public loadingCtrl: LoadingController) {
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


  ionViewWillEnter(){
    this.loadData()
  }


  loadData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.companyService.getAllCompany().then((e)=>{
      this.companies = e;
      console.log(this.companies);
      loading.dismiss();
    });
  }

  public addItem() {
    this.navCtrl.push(CreateCompanyPage);
	}

}


