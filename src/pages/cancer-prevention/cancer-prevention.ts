import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CancerPreventionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancer-prevention',
  templateUrl: 'cancer-prevention.html',
})
export class CancerPreventionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancerPreventionPage');
  }

  breastCancer(){
    this.navCtrl.push('BreastCancerPage');
  }

  colonCancer(){
    this.navCtrl.push('ColonCancerPage');
  }

  cervicalCancer(){
    this.navCtrl.push('CervicalCancerPage');
  }

}
