import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { httpService } from './httpProvider';


@Injectable()
export class leaveService {
  constructor(@Inject(httpService) private _http: httpService) {

  }
  getshiftDetails(data, isplant): Observable<any> {
    let url = this.updateUrl(isplant);
    return this._http.get(url + 'GetShiftdeails', data);
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
  SaveAppliedLeave(data, isplant) {
    let url = this.updateUrl(isplant);
    return this._http.post(url + (isplant ? 'SaveAppliedPlantLeave' : 'SaveAppliedLeave'), data);
  }
  private updateUrl(isPlant): string {
    return "/Api/" + ((!isPlant) ? "LeaveApplying/" : "LeaveApplyingPlant/");
  }
}
