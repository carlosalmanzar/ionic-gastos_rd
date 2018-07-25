import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Config } from '../config';
import { HttpModule } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ListCompanyPage } from '../pages/list-company/list-company';
import { ListExpensePage } from '../pages/list-expense/list-expense';
import { CreateCompanyPage } from '../pages/create-company/create-company';
import { CreateExpensePage } from '../pages/create-expense/create-expense';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CompanyServiceProvider } from '../providers/company-service/company-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ExpenseServiceProvider } from '../providers/expense-service/expense-service';
import { DgiiServiceProvider } from '../providers/dgii-service/dgii-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CreateCompanyPage,
    CreateExpensePage,
    ListExpensePage,
    ListCompanyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxErrorsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CreateCompanyPage,
    CreateExpensePage,
    ListCompanyPage,
    ListExpensePage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    HttpClient,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    CompanyServiceProvider,
    ExpenseServiceProvider,
    DgiiServiceProvider,
  ]
})
export class AppModule { }
