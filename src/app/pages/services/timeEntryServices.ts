import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class timeEntryService {

    res: any;
    url: string = "";
    constructor( @Inject(httpService) private http: httpService) {

    }
    getTimeEntry(data): Observable<any> {
        this.url = this.updateURL();
        return this.http.get(this.url + 'GetTimeEntryForValidation?userId=' + data);
    }
    timeEntry(params): Observable<any> {
        this.url = this.updateURL();
        return this.http.get(this.url + 'TimeEntry', params);
    }

    private updateURL(): any {
        return this.url = '/api/Attendance/';
    }

}