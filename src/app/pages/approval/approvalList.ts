import { Component } from '@angular/core';
import { approvalService } from "../services/approvalServices";
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { commonService, authentication, Load, headerPage } from '../services/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'page-approval',
  templateUrl: '../approval/approvalList.html'
})

export class ApprovalList {
  pendingList: any = [];
  searchDataPagination: any;
  auth: authentication;
  segmentVal: any;
  Item: any;
  data: any = [];
  headerData: headerPage;
  constructor(private approval: approvalService, navParam: NavParams, private nav: NavController, private globalVar: commonService, private loading: Load) {
    this.searchDataPagination = { page: null, reverse: true, itemsPerPage: 10, sortBy: null, totalItems: 64 }
    this.Item = navParam.get('data');
    this.headerData = { page: 'dash', pageTitle: this.Item + ' Approval List', params: this.Item };
    this.Oninit();
  }
  Oninit() {
    this.auth = this.globalVar.auth;
    if (this.auth == undefined || this.auth == null) {
      this.nav.setRoot('login');
    }
    console.log(this.Item);
    if (!this.auth.isplantteamleader || this.Item == 'Pre-compOff') {
      this.segmentChange();
    }
  }
  doInfinite(event) {
    console.log(event);
    let count = Math.round(this.searchDataPagination.totalRecordCount / this.searchDataPagination.pageSize)
    if (this.searchDataPagination.pageNo <= count) {
      this.searchDataPagination.page = this.searchDataPagination.pageNo + 1;
      let result: any;
      switch (this.Item) {
        case "Leave":
          result = this.getLeavePending();
          break;
        case "ComOff":
          result = this.getcomOffPending();
          break;
        case "Pre-compOff":
          result = this.getPreComOffPending();
          break;
      }
      result.subscribe(
        (result) => {
          this.searchDataPagination = result;
          result.items.forEach(element => {
            this.pendingList.push(element);
          });
          event.complete();
          console.log(this.pendingList);
          this.loading.dismiss();
        }, (err) => {
          event.complete();
          this.loading.dismiss();
        });
    }
    else {
      event.complete();
    }
  }
  getLeavePending(): Observable<any> {
    this.loading.show();
    return this.approval.getAllLeavePendingApproval(this.searchDataPagination, ((this.segmentVal == 1) ? false : true))
  }
  getcomOffPending(): Observable<any> {
    this.loading.show();
    return this.approval.getAllCompoffPendingApproval(this.searchDataPagination, ((this.segmentVal == 1) ? false : true));
  }

  getPreComOffPending(): Observable<any> {
    this.loading.show();
    return this.approval.getAllPreCompoffPendingApproval(this.searchDataPagination, ((this.segmentVal == 0) ? false : true));
  }

  segmentChange() {
    this.searchDataPagination = { page: null, reverse: false, itemsPerPage: null, sortBy: null, totalItems: 64 }
    let result: any;
    this.pendingList = [];
    switch (this.Item) {
      case "Leave":
        result = this.getLeavePending();
        break;
      case "ComOff":
        result = this.getcomOffPending();
        break;
      case "Pre-compOff":
        result = this.getPreComOffPending();
        break;
    }
    result.subscribe(
      (result) => {
        this.searchDataPagination = result;
        result.items.forEach(element => {
          this.pendingList.push(element);
        });
        console.log(this.pendingList);
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      });
  }
  editDetail($event, item) {
    let val = {
      data:
        {
          item: item,
          plant: ((this.segmentVal == 1) ? false : true),
          type: this.Item
        }
    };
    this.nav.setRoot('approvalpage', val);
  }

}
