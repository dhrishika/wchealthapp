import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infections',
  templateUrl: 'infections.html',
})
export class InfectionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfectionsPage');
  }

  sexualTransition(){
    this.navCtrl.push('SexualTransitionPage');
  }

  vaginitis(){
    this.navCtrl.push('VaginitisPage');
  }

  uti(){
    this.navCtrl.push('UtiPage');
  }

}
