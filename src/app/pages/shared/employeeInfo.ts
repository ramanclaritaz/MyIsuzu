import { Component,Input } from '@angular/core';
import { employeeInfo } from '../services/common';

@Component({
  selector: 'page-empinfo',
  templateUrl: '../shared/employeeInfo.html'
})

export class empInfo {
  @Input('empInfo') data:employeeInfo;
  constructor() {

  }

}
