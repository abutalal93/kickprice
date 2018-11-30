import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryPage } from "../category/category";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-verfication',
  templateUrl: 'verfication.html'
})
export class VerficationPage {

  verificationForm: FormGroup;
  loading: any;

  private cfg: any;

  private requestOptions: any = {
    method: "POST",
    path: "",
    body: ''
  };

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public storage: Storage) {
    this.menu.swipeEnable(false);
    this.verificationForm = new FormGroup({
      verifyCode: new FormControl('', Validators.required)
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  verify() {
    this.storage.set('empId','1234');
    this.nav.setRoot(CategoryPage);
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

}
