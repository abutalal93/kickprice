import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, LoadingController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Validators, FormGroup, FormControl } from '@angular/forms';
import *  as AppConfig from '../../app/config';
import { VerficationPage } from "../verfication/verfication";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  loading: any;

  private cfg: any;

  private requestOptions: any = {
    method: "POST",
    path: "",
    body: ''
  };

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loginForm = new FormGroup({
      empId: new FormControl('', Validators.required)
    });
    this.menu.swipeEnable(false);
    this.cfg = AppConfig.cfg;
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.showLoading();
    this.openPage(VerficationPage);
    this.loading.dismiss();
    //this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  
  openPage(pageName: any, param: any = null) {
    this.nav.push(pageName, param);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
