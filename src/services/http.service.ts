import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import *  as AppConfig from '../app/config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  private cfg: any;
  public headers: Headers = new Headers();
  private options: RequestOptions = new RequestOptions();
  private path;

  constructor(private http: Http) {
    this.cfg = AppConfig.cfg;
  }

  async http_request(request_options:any): Promise<any>{
    this.options.headers = this.headers;
    this.options.method = request_options.method;
    if(request_options.body){
      this.options.body = request_options.body;
    }
    this.path = request_options.path ;
    let http_response = await this.http.request(this.cfg.apiUrl +  this.path,  this.options)
    .toPromise()
    .then(response => response)
    .catch((err: any) => {
      let response: any;
      switch(err.status){
        case 401:
          response = err.json();
          break;
        case 500:
          response = { status: err.status , message_key: err.statusText}
          break;
        default:
          response = err.json();
          break;
        }
      return response;
    });

    return http_response;
  }

  async getJSON(url: string): Promise<any> {
        let http_response = await this.http.get("assets/" + url).toPromise().then(response => response.json());
        return http_response;
  }
  
}
