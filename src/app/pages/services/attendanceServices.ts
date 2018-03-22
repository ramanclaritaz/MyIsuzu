import { Injectable, Inject } from '@angular/core';

import { httpService } from "./httpProvider";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class attendanceService {
    res: any;
    url: string = "";

    constructor( @Inject(httpService) private http: httpService) {

    }
    getAttendance(data, isPlant): Observable<any> {
        this.url = this.updateURL(isPlant);
        return this.http.get(this.url + 'FilderAttendanceByDate', data);
    }


    private updateURL(isPlant: boolean): string {
        return this.url = '/api' + ((isPlant) ? '/PlantAttendance/' : '/Attendance/');
    }

}
