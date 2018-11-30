import {Injectable} from "@angular/core";
import { CATEGORY } from "./mock-caregory";

@Injectable()
export class CategoryService {
  private category: any;

  constructor() {
    this.category = CATEGORY;
  }

  getAll() {
    return this.category;
  }

  getItem(id) {
    for (var i = 0; i < this.category.length; i++) {
      if (this.category[i].id === parseInt(id)) {
        return this.category[i];
      }
    }
    return null;
  }

  remove(item) {
    this.category.splice(this.category.indexOf(item), 1);
  }
}
