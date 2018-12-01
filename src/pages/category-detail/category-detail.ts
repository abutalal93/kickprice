import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TripService } from "../../services/trip-service";
import { CheckoutTripPage } from "../checkout-trip/checkout-trip";
import { MapsPage } from "../maps/maps";
import *  as AppConfig from '../../app/config';
import { HttpService } from "../../services/http.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html'
})
export class CategoryDetailPage {

  private requestOptions: any = {
    method: "GET",
    path: "",
    body: ''
  };

  public offersList: any = [];

  private cfg: any;

  constructor(public nav: NavController,
    public httpService: HttpService,
    public storage: Storage,
    public navParam: NavParams) {
    this.cfg = AppConfig.cfg;
  }


  async doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    refresher.complete();
  }

  async ionViewDidLoad() {
    //this.storage.get('companyId');
    let companyIdStorage = await this.storage.get("companyId").then(companyId => ({ status: 200, message: companyId })).catch(error => ({ status: 400, message: error }));
    let categoryId = this.navParam.get("id");
    console.log('companyIdStorage', companyIdStorage);
    console.log('categoryId', categoryId);
    this.requestOptions.path = this.cfg.api.offers + "/" + companyIdStorage.message + "/" + categoryId;
    let response = await this.httpService.http_request(this.requestOptions);
    console.log('TEST: ', response)
    if (response.status == 200) {
      console.log('response', response.json());
      this.offersList = response.json();
    } else {
      console.log('error');
    }
  }

  viewDetail(offer) {
    console.log(offer);
    this.nav.push(MapsPage, { lat: offer.lat, lng: offer.lang });
  }
}
