import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Expense } from 'models/expense';
import { ExpenseServiceProvider } from '../../providers/expense-service/expense-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Company } from 'models/company';
import { CompanyServiceProvider } from '../../providers/company-service/company-service';
import { DatePicker } from '../../../node_modules/@ionic-native/date-picker';

/**
 * Generated class for the CreateExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-expense',
  templateUrl: 'create-expense.html',
})
export class CreateExpensePage {

  expense: Expense
  isEditing: boolean = true;
  list_company: Company[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public expenseService: ExpenseServiceProvider, public companyService: CompanyServiceProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, private auth: AuthServiceProvider, private datePicker: DatePicker) {
    this.expense = navParams.get('item');

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    if (this.expense == null) {
      this.isEditing = false;

      this.expense = {
        key: '',
        amount: '',
        companyId: '',
        date: '',
        description: '',
        ncf: '',
        rnc: '',
        uid: ''
      }

      this.showDate(new Date())      
    } else {
      this.showDate(this.expense.date)
    }

    this.companyService.getAllCompany().then((e) => {
      this.list_company = e;
      loading.dismiss();
    });
  }

  showDate(initialDate){
    this.datePicker.show({
      date: initialDate,
      mode: 'datetime',
      locale: 'true',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }).then(
      date => {
        this.expense.date
        let toast = this.toastCtrl.create({
          message: 'fecha:' + date,
          duration: 3000
        });
        toast.present();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateExpensePage');
  }

  save() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.expense.uid = this.auth.afAuth.auth.currentUser.uid

    if (!this.isEditing) {
      this.expenseService.addExpense(this.expense).then(() => {
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
      this.expenseService.updateExpense(this.expense.key, this.expense).then(() => {
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

  delete() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.expenseService.deleteExpense(this.expense.key).then(() => {
      loading.dismiss();
      this.navCtrl.pop();
    })
  }

  clearForm() {
    this.expense.key = '';
    this.expense.amount = '';
    this.expense.companyId = '';
    this.expense.date = '';
    this.expense.description = '';
    this.expense.ncf = '';
    this.expense.rnc = '';
    this.expense.uid = '';
  }


}
