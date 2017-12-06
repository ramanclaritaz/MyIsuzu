import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import { envitonment } from "./app.environment";
import 'rxjs/add/operator/map';

@Injectable()
export class masterService {
  private apiUrl = envitonment.apiUrl; 
  
  list:any;
  headers : any;
    constructor(@Inject(Http) private http: Http) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json'); 
  }

 public getUser(userName,passWord) {
    let body = new FormData();
    body.append('grant_type', 'password');
    body.append('username', userName);
    body.append('password', passWord);
    this.http.post(this.apiUrl, body) .map(
      (res:Response) => res.json()
      
    ).do(data=>console.log(JSON.stringify(data)));
       
  }

}