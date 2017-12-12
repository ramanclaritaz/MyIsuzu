import { Component } from '@angular/core';

import { approvalService } from '../services/approvalServices';
import { iApprovalItem } from '../services/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalPage.html',
})

export class ApprovalPage {
  Item: iApprovalItem;
  model: any;
  leaveapply: any;

  constructor(private approval: approvalService, navParam: NavParams, private nav: NavController) {
    this.Item = navParam.get('data');

    if (this.Item == undefined) {
      nav.setRoot('approval');
    }
    this.Oninit();
  }
  Oninit() {
    this.approval.getEditLeaveDetail(this.Item.id, false).subscribe((result) => {
      console.log(result);
      this.model = result;
      this.leaveapply = this.model.leaveapply;
      console.log(this.model);

    })
  }
  update(event, Item: iApprovalItem) {
    if (Item.approvalStatus == undefined || Item.approvalStatus == null) {
      alert("Please select approval status");
      return false;
    }
    else if (Item.approvalStatus == 2 && (Item.comments == undefined || Item.comments == null)) {
      alert("Please enter comments");
      return false;
    }
    this.leaveapply.la1ApprovedStatus = Item.approvalStatus;
    this.leaveapply.la1ApprovedReason = Item.comments;
    this.leaveapply.la1ApprovedDate = Date.now;
    this.model.leaveapply = this.leaveapply;
    this.approval.EditLeaveApply(this.model, false).subscribe((result) => {
      alert('Request has been updated');
      this.nav.setRoot('approval');
    }, (err) => {
      alert('error occured...!')
    })
  }


}
