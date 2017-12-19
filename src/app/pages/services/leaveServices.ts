import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { environment } from "./app.environment";
import { httpService } from './httpProvider';


@Injectable()
export class leaveService {
    constructor(private _http: httpService) {

    }
    getAvailableLeaves(data, isplant): Observable<any> {
        let url = this.updateUrl(isplant);
        return this._http.get(url + 'GetAvailableLeaves', data);
    }
    getTypeOfLeave(): Observable<any> {
        return this._http.get('/api/LeaveType/GetAllLeaveType');
    }
    getLeaveCode(data): Observable<any> {
        return this._http.get('/api/LeaveCode/GetSelectedAcronymOfLeave', data);
    }
    GetProbabilityOfLeave(data, isplant) {
        let url = this.updateUrl(isplant);
        return this._http.get(url + 'GetProbabilityOfLeave', data);
    }
    GetTotalDaysExceptAnyLeaves(data, isplant) {
        let url = this.updateUrl(isplant);
        return this._http.get(url + 'GetTotalDaysExceptAnyLeaves', data);
    }
    SaveAppliedLeave(data,isplant){
        let url = this.updateUrl(isplant);
        return this._http.post(url + 'SaveAppliedLeave', data);
    }
    private updateUrl(isPlant): string {
        return "/Api/" + ((isPlant) ? "LeaveApplying/" : "LeaveApplyingPlant/");
    }



}