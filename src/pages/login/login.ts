import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

	constructor(
		private navCtrl: NavController,
		private auth: AuthServiceProvider,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }
  
  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
			);
  }
  
  signup(){
    this.navCtrl.push(SignupPage);
  }

}