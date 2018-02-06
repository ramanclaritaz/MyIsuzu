import { Component } from '@angular/core';

import { approvalService } from '../services/approvalServices';
import { iApprovalItem, commonService, authentication, Load, headerPage } from '../services/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { showMessage } from '../services/showalert';

import moment from "moment";

@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalPage.html',
})

export class ApprovalPage {
  Item: iApprovalItem;
  data: any;
  model: any;
  leaveapply: any;
  auth: authentication;
  headerData:headerPage;
  constructor(private approval: approvalService, navParam: NavParams, private nav: NavController, private show: showMessage, private globalVar: commonService, private loading: Load) {
    this.data = navParam.get('data');
    this.Item = this.data.item;
    this.headerData = { page: 'approval', pageTitle: this.data.type + ' Approval Page', params: this.data.type };
    this.Oninit();
  }
  Oninit() {
    this.loading.show();
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }

    if (this.Item == undefined) {
      this.nav.setRoot('approval', { data: this.data.type });
    }

    this.getData();
    this.loading.dismiss();
  }
  getData() {
    switch (this.data.type) {
      case "Leave":
        this.approval.getEditLeaveDetail(this.Item.id, this.data.Plant).subscribe((result) => {
          this.model = result;
        }, (err) => {
        });
        break;
      case "ComOff":
        this.approval.getEditCompoffDetail(this.Item.id, this.data.Plant).subscribe((result) => {
          this.model = result;
        }, (err) => {
        });
        break;
      case "Pre-compOff":
        this.approval.getEditPreCompoffDetail(this.Item.id, this.data.Plant).subscribe((result) => {
          this.model = result;
        }, (err) => {
        });
        break;
    }


  }
  update(event, Item: iApprovalItem) {
    this.Item = Item;
    if (Item.approvalStatus == undefined || Item.approvalStatus == null) {
      this.show.alert('error', "Please select approval status")
      return false;
    }
    else if (Item.approvalStatus == 2 && (Item.comments == undefined || Item.comments == null)) {
      this.show.alert('error', "Please enter comments")
      return false;
    }
    this.Item.la1ApprovedStatus = Item.approvalStatus;
    this.Item.la1ApprovedReason = this.Item.comments;
    this.Item.la1ApprovedDate = moment(new Date()).format('MM/DD/YYYY');
    this.show.confirm('Approval', 'Do you want to continue...', this)
  }

  confirm() {
    switch (this.data.type) {
      case "Leave":
        if (this.data.Plant) {
          this.UpdateLeavePlant();
        } else {
          this.UpdateLeave();
        }

        break;
      case "ComOff":
        if (this.data.Plant) {
          this.UpdateCompOffPlant();
        } else {
          this.UpdateCompOff();
        }
        break;
      case "Pre-compOff":
        this.UpdatePreCompoff();
        break;
    }
  }
  UpdateLeave() {
    this.model.leaveapply.la1ApprovedStatus = this.Item.approvalStatus;
    this.model.leaveapply.la1ApprovedReason = this.Item.comments;
    this.model.leaveapply.la1ApprovedDate = this.Item.la1ApprovedDate;
    this.loading.show();
    this.approval.EditLeaveApply(this.model, this.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      this.show.sucess('Approval', "Request has been updated")
      this.nav.setRoot('approval', { data: this.data.type });
    }, (err) => {
      this.loading.dismiss();
      this.show.alert('error', err);
    });
  }
  UpdateLeavePlant() {
    this.model.leaveapplyforplant.la1ApprovedStatus = this.Item.approvalStatus;
    this.model.leaveapplyforplant.la1ApprovedReason = this.Item.comments;
    this.model.leaveapplyforplant.la1ApprovedDate = this.Item.la1ApprovedDate;
    this.loading.show();
    this.approval.EditLeaveApply(this.model, this.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      this.show.sucess('Approval', "Request has been updated")
      this.nav.setRoot('approval', { data: this.data.type });
    }, (err) => {
      this.loading.dismiss();
      this.show.alert('error', err);
    });

  }
  UpdateCompOff() {
    this.model.CompOff.la1ApprovedStatus = this.Item.approvalStatus;
    this.model.CompOff.la1ApprovedReason = this.Item.comments;
    this.model.CompOff.la1ApprovedDate = this.Item.la1ApprovedDate;
    this.loading.show();
    this.approval.updateCompOff(this.model, this.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      this.show.sucess('Approval', "Request has been updated")
      this.nav.setRoot('approval', { data: this.data.type });
    }, (err) => {
      this.loading.dismiss();
      this.show.alert('error', err);
    });
  }
  UpdateCompOffPlant() {
    this.model.plantCompOff.la1ApprovedStatus = this.Item.approvalStatus;
    this.model.plantCompOff.la1ApprovedReason = this.Item.comments;
    this.model.plantCompOff.la1ApprovedDate = this.Item.la1ApprovedDate;
    this.loading.show();
    this.approval.updateCompOff(this.model, this.auth.isplantuser).subscribe((result) => {
      this.loading.dismiss();
      this.show.alert('Approval', "Request has been updated")
      this.nav.setRoot('approval', { data: this.data.type });
    }, (err) => {
      this.loading.dismiss();
      this.show.sucess('error', err);
    });
  }
  UpdatePreCompoff() {
    this.model.postCompoffModel.departApprovedStatus = this.Item.approvalStatus;
    this.model.postCompoffModel.departComments = this.Item.comments;
    this.model.postCompoffModel.departApprovedDate = this.Item.la1ApprovedDate;
    this.loading.show();
    this.approval.UpdatePostCompOff(this.model).subscribe((result) => {
      this.loading.dismiss();
      this.show.sucess('Approval', "Request has been updated")
      this.nav.setRoot('approval', { data: this.data.type });
    }, (err) => {
      this.loading.dismiss();
      this.show.alert('error', err);
    });
  }
  cancel($event) {
    this.nav.setRoot('approval', { data: this.data.type });
  }
}
