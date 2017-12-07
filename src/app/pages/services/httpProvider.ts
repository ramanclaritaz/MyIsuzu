import { Injectable,Inject } from '@angular/core';
import { environment } from "./app.environment";
import { RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

import 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class httpService {
  
    constructor(@Inject(Http) private http: Http) {
  }

private extractData(res: Response):Promise<any> {
  let body = res.json();
  return body;
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

public request(url: string | Request, options?: RequestOptionsArgs): Promise<any> {
  return this.http.request(url, this.getRequestOptionArgs(options)).toPromise().then(this.extractData ).catch(this.handleError);
}

public get(url: string, options?: RequestOptionsArgs):  Promise<Response>  {
  url = this.updateUrl(url);
  return this.http.get(url, this.getRequestOptionArgs(options)).toPromise().then(this.extractData).catch(this.handleError);
}

public post(url: string, body: string, options?: RequestOptionsArgs):  Promise<Response>  {
  url = this.updateUrl(url);
  return this.http.post(url,body, this.getRequestOptionArgs(options)).toPromise().then(this.extractData).catch(this.handleError);
}

public put(url: string, body: string, options?: RequestOptionsArgs):  Promise<Response>  {
  url = this.updateUrl(url);
  return this.http.put(url, this.getRequestOptionArgs(options)).toPromise().then(this.extractData).catch(this.handleError);
}

public delete(url: string, options?: RequestOptionsArgs):  Promise<Response>  {
  url = this.updateUrl(url);
  return this.http.delete(url, this.getRequestOptionArgs(options)).toPromise().then(this.extractData).catch(this.handleError);
}

private updateUrl(req: string) {
  return  environment.origin + req;
}

private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
  if (options == null) {
      options = new RequestOptions();
  }
  if (options.headers == null) {
      options.headers = new Headers();
  }
var token= localStorage.getItem('token');
options.headers.append('Content-Type', 'application/json');
options.headers.append('Content-Type','application/x-www-form-urlencoded' );
if(token!=undefined){
  options.headers.append('Authorization', 'Bearer ' + token);
}
  return options;
}

}