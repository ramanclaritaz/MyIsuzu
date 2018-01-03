import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class dashboardService {
    res: any;
    url: string = "";

    constructor( @Inject(httpService) private http: httpService) {

    }
    getPendingCount(isPlant): Observable<any> {

        this.url = this.updateURL();
        if (!isPlant) {
            return this.http.get(this.url + 'GetPendingCounts');
        }
        else {
            return this.http.get(this.url + 'GetPendingCountsForPlant');
        }
    }


    private updateURL(): string {
        return this.url = '/api/Dashboard/';
    }

}