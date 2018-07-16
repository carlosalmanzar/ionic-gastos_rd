import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Company } from 'models/company';
import { CompanyServiceProvider } from '../../providers/company-service/company-service';

/**
 * Generated class for the CreateCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-company',
  templateUrl: 'create-company.html',
})
export class CreateCompanyPage {

  company: Company;
  isEditing: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyServiceProvider) {
    this.company = navParams.get('item');
    if (this.company == null) {
      this.isEditing = false;

      this.company = {
        key: '',
        name: '',
        rnc: '',
        uid: ''
      }
    }
  }

  ionViewDidLoad() {

  }

  save() {
    if (!this.isEditing) {
      this.companyService.addCompany(this.company).then(() => {
        //this.loadData();//refresh view
        this.navCtrl.pop()
      });
    } else {
      this.companyService.updateCompany(this.company.key, this.company).then(() => {
        //this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.company.name = '';
    this.company.rnc = '';
    this.company.uid = '';
  }


}
