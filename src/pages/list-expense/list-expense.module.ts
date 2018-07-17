import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListExpensePage } from './list-expense';

@NgModule({
  declarations: [
    ListExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(ListExpensePage),
  ],
})
export class ListExpensePageModule {}
