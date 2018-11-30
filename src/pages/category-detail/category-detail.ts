import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { TripService } from "../../services/trip-service";
import { CheckoutTripPage } from "../checkout-trip/checkout-trip";
import { MapsPage } from "../maps/maps";

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html'
})
export class CategoryDetailPage {
  public promotionList: any;

  constructor(public nav: NavController) {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  viewDetail() {
    this.nav.push(MapsPage, {lat: 31.935265 , lng: 35.895387});
  }
}
