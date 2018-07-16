import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCompanyPage } from './detail-company';

@NgModule({
  declarations: [
    DetailCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailCompanyPage),
  ],
})
export class DetailCompanyPageModule {}
