import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCompanyPage } from './list-company';

@NgModule({
  declarations: [
    ListCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCompanyPage),
  ],
})
export class ListCompanyPageModule {}
