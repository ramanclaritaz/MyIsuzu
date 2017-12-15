import { Component } from '@angular/core';

import { commonService } from '../services/common';
import { showMessage } from '../services/showalert';
import { compOffServices } from '../services/compOffServices';

@Component({
  selector: 'page-compOffApply',
  templateUrl: '../apply/compOffApply.html'
})

export class compOffApply {
  formGroup: any;
  availCompOff = {
    Comp_Info_fullday: 1, Comp_Info_halfday: 1
  }

  Emp_Info: any;
  comOffDay: any;
  TLList: any;
  constructor(private show: showMessage, private globalVar: commonService, private comOffService: compOffServices) {
    let _date =new Date().toISOString();
    this.comOffDay = { isFullDay: false, fromDate: _date, toDate: _date };
    this.Oninit();
  }
  Oninit() {
    this.Emp_Info = this.globalVar.employeeInfo;
    this.TLList = this.globalVar.getListOfTL();
    this.getCompOffCount();
  }

  getCompOffCount() {
    this.comOffService.getCompoffCount(this.globalVar.auth.userid, this.globalVar.auth.isplantuser).subscribe((result) => {
      // this.comOffDay = result;
    });
  }

}
