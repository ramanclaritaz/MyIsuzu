import { Component } from '@angular/core';

import { approvalService } from '../services/approvalServices';
import { iApprovalItem, commonService, authentication } from '../services/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { showMessage } from '../services/showalert';

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalPage.html',
})

export class ApprovalPage {
  Item: iApprovalItem;
  model: any;
  leaveapply: any;
  auth:authentication;
  constructor(private approval: approvalService, navParam: NavParams, private nav: NavController,private show:showMessage,private globalVar:commonService) {
    this.Item = navParam.get('data');

    if (this.Item == undefined) {
      nav.setRoot('approval');
    }
    this.Oninit();
  }
  Oninit() {
    this.approval.getEditLeaveDetail(this.Item.id, false).subscribe((result) => {
      this.model = result;
      this.leaveapply = this.model.leaveapply;
      this.globalVar.goBack = 'dash';
    this.globalVar.pageTitle = 'Approval Page';
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }

    })
  }
  update(event, Item: iApprovalItem) {

    if (Item.approvalStatus == undefined || Item.approvalStatus == null) {
      this.show.alert('error',"Please select approval status")
      return false;
    }
    else if (Item.approvalStatus == 2 && (Item.comments == undefined || Item.comments == null)) {
      this.show.alert('error',"Please enter comments")
      return false;
    }
    this.leaveapply.la1ApprovedStatus = Item.approvalStatus;
    this.leaveapply.la1ApprovedReason = Item.comments;
    this.leaveapply.la1ApprovedDate = Date.now;
    this.model.leaveapply = this.leaveapply;
    this.show.confirm('Approval','Do you want to continue...',this)
  }

  confirm(){
    this.approval.EditLeaveApply(this.model, false).subscribe((result) => {
      this.show.alert('sucess',"Request has been updated")
      this.nav.setRoot('approval');
    }, (err) => {
      this.show.alert('error',"Please enter comments")
    })
  }


}
