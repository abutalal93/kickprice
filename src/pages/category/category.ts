import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CategoryService} from "../../services/category-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { CategoryDetailPage } from "../category-detail/category-detail";
import { HttpService } from "../../services/http.service";
import *  as AppConfig from '../../app/config';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public categoryList: any;

  private requestOptions: any = {
    method: "GET",
    path: "",
    body: ''
  };

  private cfg: any;

  constructor(public nav: NavController, public categoryService: CategoryService, public httpService: HttpService) {
    this.categoryList = categoryService.getAll();
    this.cfg = AppConfig.cfg;
  }

  async ionViewDidLoad() {
    this.requestOptions.path = this.cfg.api.offers;
    let response = await this.httpService.http_request(this.requestOptions);
    console.log('TEST: ',response)
    if (response.status == 200) {

    } else {
    }
  } 

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  viewDetail(id) {
    this.nav.push(CategoryDetailPage, {id: id});
  }
}
