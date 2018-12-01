import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import {VerficationPage} from "../pages/verfication/verfication";
import { HttpModule } from '@angular/http';
import { HttpService } from "../services/http.service";
import { CategoryPage } from "../pages/category/category";
import { CategoryService } from "../services/category-service";
import { CategoryDetailPage } from "../pages/category-detail/category-detail";
import { GoogleMap } from "../pages/google-map/google-map";
import { GoogleMapsService } from '../pages/maps/maps.service';
import { MapsPage } from '../pages/maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';
import { GoogleNotificationService } from "../services/google-notification.service";
// import services
// end import services
// end import services

// import pages
// end import pages
const firebase = {
  apiKey: "AIzaSyDpNPYBqR8dh3k1920yusPFNG2aKWV1Dx8",
  authDomain: "kickprice-2ec6b.firebaseapp.com",
  databaseURL: "https://kickprice-2ec6b.firebaseio.com",
  projectId: "kickprice-2ec6b",
  storageBucket: "kickprice-2ec6b.appspot.com",
  messagingSenderId: "568222748916"
}

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    VerficationPage,
    CategoryPage,
    CategoryDetailPage,
    GoogleMap,
    MapsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    VerficationPage,
    CategoryPage,
    CategoryDetailPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    HttpService,
    CategoryService,
    GoogleMapsService,
    Geolocation,
    Firebase,
    GoogleNotificationService
  ]
})

export class AppModule {
}
