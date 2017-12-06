import { Injectable,Inject } from '@angular/core';
import 'rxjs/Rx';
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import { envitonment } from "./app.environment";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private apiUrl = envitonment.apiUrl; 
  
  list:any;
  headers : any;
    constructor(@Inject(Http) private http: Http) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json'); 
  }

 public getUser(userName,passWord) {
  var data = "grant_type=password&username=" + userName + "&password=" + passWord;
    this.http.post(this.apiUrl+'token', data) .map(
      (res:Response) => res.json()
      
    ).do(data=>console.log(JSON.stringify(data)));
       
  }

}