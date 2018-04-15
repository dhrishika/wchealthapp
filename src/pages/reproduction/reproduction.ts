import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReproductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reproduction',
  templateUrl: 'reproduction.html',
})
export class ReproductionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReproductionPage');
  }

  reproProb(){
    this.navCtrl.push('ReproductiveProblemsPage');
  }

  meno(){
    this.navCtrl.push('MenopausePage');
  }

  contraception(){
    this.navCtrl.push('ContraceptionPage');
  }

  mens(){
    this.navCtrl.push('MensurationPage');
  }

  infections(){
    this.navCtrl.push('InfectionsPage');
  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }
}
