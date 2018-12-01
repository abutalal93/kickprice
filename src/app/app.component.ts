import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { Storage } from '@ionic/storage';
import { CategoryPage } from "../pages/category/category";
import { GoogleNotificationService } from "../services/google-notification.service";
import { tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public storage: Storage,
    public googleNotificationService: GoogleNotificationService,
  ) {
    this.storage.get('empId').then((empId) => {
      console.log('Your empId is', empId);
      if(empId){
        this.nav.setRoot(CategoryPage);
      }else{
        this.nav.setRoot(LoginPage);
      }
    }, (error) => {
      console.log('error', error);
      this.openPage(LoginPage);
    });
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      console.log('generate token ');
      this.googleNotificationService.getToken();

      console.log('listin fcm push ');
      this.googleNotificationService.listenToNotifications().subscribe(data => {
        if (data.wasTapped) {
          //Notification was received on device tray and tapped by the user.
          console.log("data");
        } else {
          //Notification was received in foreground. Maybe the user needs to be notified.
          console.log("error");
        }
      });

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
