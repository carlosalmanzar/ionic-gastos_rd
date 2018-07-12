import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCompanyPage } from './create-company';

@NgModule({
  declarations: [
    CreateCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCompanyPage),
  ],
})
export class CreateCompanyPageModule {}
