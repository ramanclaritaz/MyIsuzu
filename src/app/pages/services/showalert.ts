import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class showMessage{



constructor(private alertCtrl: AlertController) {

}

sucess(subTitle,message) {
  let alert = this.alertCtrl.create({
    title: 'sucess',
    subTitle: subTitle,
    message:message,
    buttons: ['Ok']
  });
  alert.present();
}

alert(subTitle,message) {
  let alert = this.alertCtrl.create({
    title: 'alert',
    subTitle: subTitle,
    message:message,
    buttons: ['Ok']
  });
  alert.present();
}

error(title,subTitle,confirmtext) {
  let alert = this.alertCtrl.create({
    title: 'error',
    subTitle: subTitle,
    buttons: ['Dimiss'],
  });
  alert.present();
}

confirm(message,confirm) {
  let alert = this.alertCtrl.create({
    title: 'confirm',
    message: message,
    buttons: [
      {
        text: 'cancel',
        role: 'cancel',
        handler: ()=>{
        }
      },
      {
        text: 'confirm',
        handler: confirm
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