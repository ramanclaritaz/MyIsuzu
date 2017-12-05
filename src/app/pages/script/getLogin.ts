import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    url:any;
  constructor (
    private http: Http
  ) {
    this.url="https://imanage.isuzu.in:4435/token";
  }

 public getUser(userName,passWord) {
    let body = new FormData();
    body.append('grant_type', 'password');
    body.append('username', userName);
    body.append('password', passWord);
   return this.http.post(this.url, body) .map((res:Response) => res.json());
       
  }

}