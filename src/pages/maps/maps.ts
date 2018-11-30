import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxjs/Observable';

import { GoogleMap } from "../google-map/google-map";
import { GoogleMapsService } from "./maps.service";
import { MapsModel, MapPlace } from './maps.model';

import { } from '@types/googlemaps';

@Component({
  selector: 'maps-page',
  templateUrl: 'maps.html'
})

export class MapsPage implements OnInit {
  @ViewChild(GoogleMap) _GoogleMap: GoogleMap;
  map_model: MapsModel = new MapsModel();
  toast: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public GoogleMapsService: GoogleMapsService,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public keyboard: Keyboard
  ) {
  }

  ngOnInit() {
    let _loading = this.loadingCtrl.create();
    _loading.present();

    this._GoogleMap.$mapReady.subscribe(map => {
      this.map_model.init(map);
      let lat = this.navParams.get("lat");
      let lng = this.navParams.get("lng");
      console.log(lat,lng)
      let parentLocation = new google.maps.LatLng(lat, lng);
      this.map_model.addPlaceToMap(parentLocation, "#FF0000");
      this.setOrigin(parentLocation);
      _loading.dismiss();
    });
  }

  // searchPlacesPredictions(query: string) {
  //   let env = this;

  //   if (query !== "") {
  //     env.GoogleMapsService.getPlacePredictions(query).subscribe(
  //       places_predictions => {
  //         env.map_model.search_places_predictions = places_predictions;
  //       },
  //       e => {
  //         console.log('onError: %s', e);
  //       },
  //       () => {
  //         console.log('onCompleted');
  //       }
  //     );
  //   } else {
  //     env.map_model.search_places_predictions = [];
  //   }
  // }

  setOrigin(location: google.maps.LatLng) {
    let env = this;
    
    env.map_model.directions_origin.location = location;

    let bound = new google.maps.LatLngBounds(location);

    env.map_model.map.fitBounds(bound);
    env.map_model.map.setZoom(15);

  }

  selectSearchResult(place: google.maps.places.AutocompletePrediction) {
    let env = this;

    env.map_model.search_query = place.description;
    env.map_model.search_places_predictions = [];

    // We need to get the location from this place. Let's geocode this place!
    env.GoogleMapsService.geocodePlace(place.place_id).subscribe(
      place_location => {
        env.setOrigin(place_location);
      },
      e => {
        console.log('onError: %s', e);
      },
      () => {
        console.log('onCompleted');
      }
    );
  }

  clearSearch() {

  }

  geolocateMe() {
    let env = this,
      _loading = env.loadingCtrl.create();

    _loading.present();

    this.geolocation.getCurrentPosition().then((position) => {
      let current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      env.map_model.search_query = position.coords.latitude.toFixed(2) + ", " + position.coords.longitude.toFixed(2);
      env.setOrigin(current_location);
      env.map_model.using_geolocation = true;

      _loading.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error);
      _loading.dismiss();
    });
  }
}
