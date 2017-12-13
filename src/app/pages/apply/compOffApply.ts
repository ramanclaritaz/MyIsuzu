import { Component } from '@angular/core';
import { employeeInfo, comOffDay, commonService } from '../services/common';
import { showMessage } from '../services/showalert';
import { compOffServices } from '../services/compOffServices';
import { DateTime } from 'ionic-angular/components/datetime/datetime';
@Component({
  selector: 'page-compOffApply',
  templateUrl: '../apply/compOffApply.html'
})

export class compOffApply {
  from_date:DateTime;
  to_date:DateTime;
  availCompOff = {
    Comp_Info_fullday: 1, Comp_Info_halfday: 1
  }
  Emp_Info: employeeInfo;
  comOffDay: comOffDay;
  constructor(private show: showMessage, private globalVar: commonService, private comOffService: compOffServices) {
    this.Oninit();
  }
  Oninit() {
    
    this.Emp_Info = this.globalVar.employeeInfo;
    this.getCompOffCount();
  }

  getCompOffCount() {
    this.comOffService.getCompoffCount(this.globalVar.auth.userid, this.globalVar.auth.isplantuser).subscribe((result) => {
      this.comOffDay = result;
    });
  }


}
