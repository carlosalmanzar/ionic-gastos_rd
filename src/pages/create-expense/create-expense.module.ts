import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateExpensePage } from './create-expense';

@NgModule({
  declarations: [
    CreateExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateExpensePage),
  ],
})
export class CreateExpensePageModule {}
