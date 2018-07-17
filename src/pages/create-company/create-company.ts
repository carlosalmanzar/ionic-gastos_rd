import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyServiceProvider
    , public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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

  delete(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.companyService.deleteCompany(this.company.key).then(() => {
      loading.dismiss();
      this.navCtrl.pop();
    })
  }

  save() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    

    if (!this.isEditing) {
      this.companyService.addCompany(this.company).then(() => {
        loading.dismiss();

        let toast = this.toastCtrl.create({
          message: 'Agregado exitosamente!',
          duration: 3000
        });
        toast.present();

        this.navCtrl.pop();
      });
    } else {
      this.companyService.updateCompany(this.company.key, this.company).then(() => {
        loading.dismiss();

        let toast = this.toastCtrl.create({
          message: 'Modificado exitosamente!',
          duration: 3000
        });

        toast.present();
        this.navCtrl.pop();
      });
    }
    this.isEditing = false;
    //clear form
    this.company.name = '';
    this.company.rnc = '';
    this.company.uid = '';
  }


}
