import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Alert } from 'ionic-angular/components/alert/alert';

@Injectable()
export class showMessage {



  constructor(private alertCtrl: AlertController) {

  }

  sucess(subTitle, message) {
    let alert = this.alertCtrl.create({
      title: 'sucess',
      subTitle: subTitle,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  alert(subTitle, message) {
    let alert = this.alertCtrl.create({
      subTitle: subTitle,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  error(subTitle, message) {
    let alert = this.alertCtrl.create({
      title: 'error',
      subTitle: subTitle,
      message: message,
      buttons: ['Dimiss'],
    });
    alert.present();
  }

  confirm(subTitle, message,page) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      // subTitle: subTitle,
      message: message,
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: ()=>
          {
            console.log('cancel fired');
          }
        },
        {
          text: 'Confirm',
          handler: () => { page.confirm(); }
        }
      ]
    });
    alert.present();
  }

  // presentPrompt() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Login',
  //     inputs: [
  //       {
  //         name: 'username',
  //         placeholder: 'Username'
  //       },
  //       {
  //         name: 'password',
  //         placeholder: 'Password',
  //         type: 'password'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Login',
  //         handler: data => {
  //           if (User.isValid(data.username, data.password)) {
  //             // logged in!
  //           } else {
  //             // invalid login
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}