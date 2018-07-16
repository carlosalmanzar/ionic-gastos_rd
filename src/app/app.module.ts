import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Config } from '../config';
import { HttpModule } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';

import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SignupPage } from '../pages/signup/signup';
import { ListCompanyPage } from '../pages/list-company/list-company';
import { CreateCompanyPage } from '../pages/create-company/create-company';
import { CompanyServiceProvider } from '../providers/company-service/company-service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DetailCompanyPage } from '../pages/detail-company/detail-company';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage, 
    SignupPage,
    CreateCompanyPage,
    ListCompanyPage,
    DetailCompanyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxErrorsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    CreateCompanyPage,
    ListCompanyPage,
    DetailCompanyPage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    CompanyServiceProvider
  ]
})
export class AppModule {}
