import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MensurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensuration',
  templateUrl: 'mensuration.html',
})
export class MensurationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensurationPage');
  }

  mensurualPain(){
    this.navCtrl.push('MensurualPainPage');
  }

  abnormalBleeding(){
    this.navCtrl.push('AbnormalBleedingPage');
  }

  others(){
    this.navCtrl.push('OthersPage');
  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }
}
