import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Company } from 'models/company';
import { CompanyServiceProvider } from '../../providers/company-service/company-service';
import { DgiiServiceProvider } from '../../providers/dgii-service/dgii-service';
import { Rnc } from 'models/rnc';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  rnc: Rnc;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public companyService: CompanyServiceProvider, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public dgiiService: DgiiServiceProvider,
    private auth: AuthServiceProvider) {

      
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

    this.rnc = {
      RGE_NOMBRE: '',
      RGE_RUC: ''
    }
  }

  ionViewDidLoad() {
    
  }

  getRnc() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dgiiService.getContribuyentes(this.company.rnc).
      subscribe(
        (data) => {
          this.rnc = data;
          let toast;
          if (data == 0) {
            loading.dismiss();
            toast = this.toastCtrl.create({
              message: 'No encontre nada con este identificador :(',
              duration: 3000
            });

          } else {
            this.company.name = this.rnc.RGE_NOMBRE
            console.log('RNC: ' + this.rnc.RGE_NOMBRE + ' ' + this.rnc.RGE_RUC);
            loading.dismiss();
            toast = this.toastCtrl.create({
              message: 'Busqueda exitosa!',
              duration: 3000
            });
          }
          toast.present();

        }, (error) => {

          console.error(error)
        }
      )
  }

  delete() {
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
    this.company.uid = this.auth.afAuth.auth.currentUser.uid

    if (!this.isEditing) {
      this.companyService.addCompany(this.company).then(() => {
        loading.dismiss();

        let toast = this.toastCtrl.create({
          message: 'Agregado exitosamente!',
          duration: 3000
        });
        this.clearForm();
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
        this.clearForm();
        toast.present();
        this.navCtrl.pop();
      });
    }
  }

  clearForm() {
    this.company.name = '';
    this.company.rnc = '';
    this.company.uid = '';
  }
}
