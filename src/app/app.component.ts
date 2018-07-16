import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ListCompanyPage } from '../pages/list-company/list-company';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  pages;
	rootPage;

	@ViewChild(Nav) nav: Nav;

  private app;
	private platform;
  private menu: MenuController;

  constructor(
    app: App, 
    platform: Platform, 
    menu: MenuController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private auth: AuthServiceProvider ) {
  
    this.app = app;
    this.menu = menu;
    this.platform = platform;
    this.initializeApp();   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
          this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage },
            { title: 'Compañias', component: ListCompanyPage }
          ];
        } else {
          this.rootPage = LoginPage;
          this.pages = [];
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );
  }

	openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
    }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
