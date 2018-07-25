import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ExpenseServiceProvider } from '../../providers/expense-service/expense-service';
import { Expense } from 'models/expense';
import { CreateExpensePage } from '../create-expense/create-expense';

/**
 * Generated class for the ListExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-expense',
  templateUrl: 'list-expense.html',
})
export class ListExpensePage {

  expense: Expense[] = []; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public expenseService: ExpenseServiceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListExpensePage');
  }

  ionViewWillEnter() {
    this.loadData()
  }

  itemTapped(event, item) {
    this.navCtrl.push(CreateExpensePage, {
      item: item
    });
  }

  add(){
    
  }
  
  loadData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.expenseService.getAllExpense().then((e) => {
      this.expense = e;
      console.log(this.expense);
      loading.dismiss();
    });
  }

}
