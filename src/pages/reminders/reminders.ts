import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindersPage');
  }

  goTask(){
    this.navCtrl.push('ReminderHomePage')
  }

  goMed(){
    this.navCtrl.push('MedicineHomePage')
  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }
}
