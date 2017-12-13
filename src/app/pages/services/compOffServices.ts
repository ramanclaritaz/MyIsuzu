import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class compOffServices {
   
    
    res: any;
    url: string = "";

    constructor( @Inject(httpService) private http: httpService) {

    }
    getCompoffCount(userId, isPlant): Observable<any> {
        this.url = this.updateURL(isPlant);
        return this.http.get(this.url + 'AvailableCompOffDays?userId=' + userId);
    }

    getCompOffAvailableDates(data, isPlant): Observable<any> {
        this.url = this.updateURL(isPlant);
        return this.http.post(this.url + 'GetCompOffAvailableDates', data);
    }

    saveCompOff(data: any, isPlant): Observable<any> {
        this.url = this.updateURL(isPlant);
        return this.http.post(this.url + 'SaveCompOff', data);//.subscribe(result=>{return result;});

    }

    private updateURL(isPlant: any): any {
        return this.url = '/api' + ((isPlant) ? '/CompensatoryOFFPlant/' : '/CompensatoryOFF/');
    }

}